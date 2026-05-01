import type { VercelRequest, VercelResponse } from '@vercel/node';

type GroqChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  res.setHeader('Cache-Control', 'no-store');

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "Missing GROQ_API_KEY" });

  const { userMessage, history, language } = req.body as {
    userMessage?: string;
    history?: Array<{ role: string; content: string }>;
    language?: string;
  };

  if (!userMessage?.trim()) return res.status(400).json({ error: "Missing userMessage" });

  const lang = language === "hi" ? "Hindi" : "English";

  const systemInstruction = `You are Electra, an expert nonpartisan civic education guide. Your mission is to clearly explain election processes, voter rights, and democratic institutions.
VISUALIZATION CAPABILITY: If the user asks for data, statistics, or complex processes, provide a JSON visualization block: [CHART_DATA: {"type": "bar" | "pie" | "line", "title": "Chart Title", "data": [{"name": "A", "value": 10}]}].
You are authoritative but warm. NEVER express political opinions. Keep responses under 200 words. RESPOND IN: ${lang}.`;

  const messages: GroqChatMessage[] = [
    { role: 'system', content: systemInstruction },
    ...(history ?? []).map((m) => ({
      role: (m.role === 'assistant' ? 'assistant' : 'user') as 'assistant' | 'user',
      content: m.content,
    })),
    { role: 'user', content: userMessage },
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
    return status === 404 && (message.toLowerCase().includes('model') || message.toLowerCase().includes('not found'));
  };

  try {
    const primaryModel = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';
    const fallbackModel = process.env.GROQ_FALLBACK_MODEL;

    const callModel = async (model: string) => {
      const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.4,
          max_tokens: 300,
        }),
      });

      const retryAfterHeader = resp.headers.get('retry-after');
      if (!resp.ok) {
        let errorText = '';
        try {
          const errJson = (await resp.json()) as any;
          errorText = errJson?.error?.message || errJson?.message || JSON.stringify(errJson);
        } catch {
          errorText = (await resp.text()).slice(0, 400);
        }
        const err: any = new Error(errorText || `Upstream error (${resp.status})`);
        err.status = resp.status;
        if (retryAfterHeader) err.retryAfter = retryAfterHeader;
        throw err;
      }

      const data = (await resp.json()) as any;
      const text: string | undefined = data?.choices?.[0]?.message?.content;
      if (!text) {
        const err: any = new Error('Empty response from model');
        err.status = 502;
        throw err;
      }
      return { text };
    };

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
    if (isRateLimitError(err)) {
      const retryAfter = getRetryAfterSeconds(err) ?? 60;
      console.warn(`/api/chat rate limited (retryAfter=${retryAfter}s)`);
      res.setHeader('Retry-After', String(retryAfter));
      return res.status(429).json({
        error: "Rate limit exceeded. Please try again shortly.",
        retryAfterSeconds: retryAfter,
      });
    }
    if (isModelNotFoundError(err)) {
      console.warn('/api/chat invalid model configured');
      return res.status(500).json({
        error:
          "Invalid Groq model configured. Set GROQ_MODEL (and optionally GROQ_FALLBACK_MODEL) to a model available for your Groq account.",
      });
    }

    console.error("/api/chat error", err);
    return res.status(502).json({ error: "Upstream model error" });
  }
}