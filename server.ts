import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const apiKey = process.env.GROQ_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "Server is missing GROQ_API_KEY. Add it to your .env and restart the server.",
        });
      }

      const body = req.body as {
        userMessage?: string;
        history?: Array<{ role: "user" | "assistant"; content: string }>;
        language?: "en" | "hi" | string;
      };

      const userMessage = (body.userMessage ?? "").trim();
      if (!userMessage) {
        return res.status(400).json({ error: "Missing userMessage" });
      }

      const language = body.language === "hi" ? "Hindi" : "English";
      const history = Array.isArray(body.history) ? body.history : [];

      const systemInstruction = `You are Electra, an expert nonpartisan civic education guide. Your mission is to clearly explain election processes, voter rights, and democratic institutions.

VISUALIZATION CAPABILITY:
If the user asks for data, statistics, or complex processes (like voter turnout, demographic trends, or the steps of a bill becoming law), you MUST provide a JSON visualization block at the end of your response in the format: [CHART_DATA: {"type": "bar" | "pie" | "line", "title": "Chart Title", "data": [{"name": "A", "value": 10}, ...] }].

You are authoritative but warm. You NEVER express political opinions. Format responses with clear structure. Keep responses under 200 words. RESPOND IN THE LANGUAGE OF THE USER REQUEST (Current app language preference is: ${language}).`;


      const messages = [
        { role: "system", content: systemInstruction },
        ...history
          .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
        { role: "user", content: userMessage },
      ];

      const primaryModel = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
      const fallbackModel = process.env.GROQ_FALLBACK_MODEL;
      const tryModels = fallbackModel && fallbackModel !== primaryModel ? [primaryModel, fallbackModel] : [primaryModel];

      let lastError: unknown;
      for (const model of tryModels) {
        try {
          const resp = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model,
              messages,
              temperature: 0.4,
              max_tokens: 300,
            }),
          });

          if (!resp.ok) {
            const txt = await resp.text();
            lastError = new Error(txt || `Upstream error (${resp.status})`);
            continue;
          }

          const data = (await resp.json()) as any;
          const text: string | undefined = data?.choices?.[0]?.message?.content;
          if (text) return res.json({ text, model });

          lastError = new Error("Empty model response");
        } catch (err) {
          lastError = err;
        }
      }

      console.error("/api/chat failed", lastError);
      return res.status(502).json({ error: "Upstream model error" });
    } catch (err) {
      console.error("/api/chat unexpected error", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
