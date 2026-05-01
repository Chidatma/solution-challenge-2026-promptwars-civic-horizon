import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  res.setHeader('Cache-Control', 'no-store');

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing GEMINI_API_KEY" });

  const { userMessage, history, language } = req.body as {
    userMessage?: string;
    history?: Array<{ role: string; content: string }>;
    language?: string;
  };

  if (!userMessage?.trim()) return res.status(400).json({ error: "Missing userMessage" });

  const lang = language === "hi" ? "Hindi" : "English";
  const ai = new GoogleGenAI({ apiKey });

  const systemInstruction = `You are Electra, an expert nonpartisan civic education guide. Your mission is to clearly explain election processes, voter rights, and democratic institutions.
VISUALIZATION CAPABILITY: If the user asks for data, statistics, or complex processes, provide a JSON visualization block: [CHART_DATA: {"type": "bar" | "pie" | "line", "title": "Chart Title", "data": [{"name": "A", "value": 10}]}].
You are authoritative but warm. NEVER express political opinions. Keep responses under 200 words. RESPOND IN: ${lang}.`;

  const contents = [
    ...(history ?? []).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const isRateLimitError = (err: unknown) => {
    const anyErr = err as any;
    const status = anyErr?.status ?? anyErr?.code ?? anyErr?.response?.status;
    const message = String(anyErr?.message ?? '');
    return status === 429 || message.includes('429') || message.includes('RESOURCE_EXHAUSTED');
  };

  const getRetryAfterSeconds = (err: unknown): number | undefined => {
    const anyErr = err as any;
    const message = String(anyErr?.message ?? '');

    // Common patterns we might see in error text.
    const msgMatch = message.match(/retry in\s+([0-9]+(?:\.[0-9]+)?)s/i);
    if (msgMatch) return Math.max(1, Math.ceil(Number(msgMatch[1])));

    // Some errors include structured details with retryDelay like "57s".
    const details = anyErr?.error?.details ?? anyErr?.details;
    if (Array.isArray(details)) {
      for (const d of details) {
        const retryDelay = (d as any)?.retryDelay;
        if (typeof retryDelay === 'string') {
          const m = retryDelay.match(/^(\d+)s$/);
          if (m) return Math.max(1, Number(m[1]));
        }
      }
    }

    return undefined;
  };

  const isRetryableUpstreamError = (err: unknown) => {
    const anyErr = err as any;
    const status = anyErr?.status ?? anyErr?.code ?? anyErr?.response?.status;
    return status === 429 || status === 500 || status === 502 || status === 503 || status === 504;
  };

  const isModelNotFoundError = (err: unknown) => {
    const anyErr = err as any;
    const status = anyErr?.status ?? anyErr?.code ?? anyErr?.response?.status;
    const message = String(anyErr?.message ?? '');
    return status === 404 && message.includes('models/') && (message.includes('not found') || message.includes('NOT_FOUND'));
  };

  try {
    const primaryModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";
    const fallbackModel = process.env.GEMINI_FALLBACK_MODEL;

    const callModel = async (model: string) =>
      ai.models.generateContent({
        model,
        contents,
        config: { systemInstruction },
      });

    let result;
    try {
      result = await callModel(primaryModel);
    } catch (err) {
      if (isRetryableUpstreamError(err)) {
        await sleep(350 + Math.floor(Math.random() * 250));
        try {
          result = await callModel(primaryModel);
        } catch (err2) {
          if (fallbackModel && fallbackModel !== primaryModel && isRetryableUpstreamError(err2)) {
            result = await callModel(fallbackModel);
          } else {
            throw err2;
          }
        }
      } else {
        throw err;
      }
    }

    return res.status(200).json({ text: result.text });
  } catch (err) {
    console.error("/api/chat error", err);
    if (isRateLimitError(err)) {
      const retryAfter = getRetryAfterSeconds(err) ?? 60;
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again shortly.",
        retryAfterSeconds: retryAfter,
      });
    }
    if (isModelNotFoundError(err)) {
      return res.status(500).json({
        error:
          "Invalid Gemini model configured. Set GEMINI_MODEL (and optionally GEMINI_FALLBACK_MODEL) to a model that supports generateContent for the API version in use.",
      });
    }
    return res.status(502).json({ error: "Upstream model error" });
  }
}