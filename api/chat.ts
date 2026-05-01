import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end();

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

  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: { systemInstruction },
    });

    return res.json({ text: result.text });
  } catch (err) {
    console.error("/api/chat error", err);
    return res.status(502).json({ error: "Upstream model error" });
  }
}