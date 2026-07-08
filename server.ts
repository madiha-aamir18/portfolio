import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Shared Gemini client setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // 1. Optimize Bullet Point Endpoint
  app.post("/api/gemini/optimize-bullet", async (req, res) => {
    try {
      const { bulletText, industry, role } = req.body;
      if (!bulletText) {
        return res.status(400).json({ error: "bulletText is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured. Please add it to your secrets." 
        });
      }

      const prompt = `You are an expert resume writer and executive recruiter. 
Your task is to take a draft resume bullet point, and rewrite it into a highly professional, high-impact, action-oriented bullet point using the STAR (Situation, Task, Action, Result) method. 

Draft bullet point: "${bulletText}"
Target Role/Title: "${role || 'Professional'}"
Industry: "${industry || 'General'}"

Instructions:
1. Formulate a single, concise, powerful bullet point. 
2. Start with a strong action verb.
3. Quantify impact and results (if exact numbers aren't provided, suggest realistic metrics in brackets, e.g., "[X%]" or "[$Y]").
4. Provide a very brief (1-2 sentences) explanation of why this rewrite is stronger.

Return your response strictly in the following JSON format:
{
  "optimizedText": "Improved bullet point text...",
  "explanation": "Brief explanation of changes..."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              optimizedText: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["optimizedText", "explanation"]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error("No response content from Gemini.");
      }

      const data = JSON.parse(resultText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Error in /api/gemini/optimize-bullet:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // 2. Tailor Summary Endpoint
  app.post("/api/gemini/tailor-summary", async (req, res) => {
    try {
      const { profile, jobDescription } = req.body;
      if (!jobDescription) {
        return res.status(400).json({ error: "jobDescription is required" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured. Please add it to your secrets." 
        });
      }

      const profileString = JSON.stringify(profile);
      const prompt = `You are a career consultant. Analyze the following candidate profile and a target job description. Generate a tailored professional summary for the candidate's CV, identify 5 crucial high-impact keywords/skills that are highly relevant to the job, and provide 2 bullet points of advice on how to align the rest of the resume with this role.

Candidate Profile:
${profileString}

Target Job Description:
"${jobDescription}"

Instructions:
- The summary should be elegant, professional, 3-4 sentences long, and directly highlight relevant experiences.
- Keep the tone highly professional, modern, and engaging.

Return your response strictly in the following JSON format:
{
  "tailoredSummary": "Highly polished 3-4 sentence professional summary tailored to the target role...",
  "keywordsSuggested": ["Keyword 1", "Keyword 2", "Keyword 3", "Keyword 4", "Keyword 5"],
  "alignmentTips": "Bullet point advice on aligning the resume..."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tailoredSummary: { type: Type.STRING },
              keywordsSuggested: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              alignmentTips: { type: Type.STRING }
            },
            required: ["tailoredSummary", "keywordsSuggested", "alignmentTips"]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error("No response content from Gemini.");
      }

      const data = JSON.parse(resultText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Error in /api/gemini/tailor-summary:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // 3. Suggest Skills Endpoint
  app.post("/api/gemini/suggest-skills", async (req, res) => {
    try {
      const { industry, role, currentSkills } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured. Please add it to your secrets." 
        });
      }

      const prompt = `Identify 8 highly relevant, modern professional skills or technologies for a "${role || 'Professional'}" working in the "${industry || 'General'}" industry.
Excluding or complementing these current skills: ${JSON.stringify(currentSkills || [])}.

Return your response strictly in the following JSON format:
{
  "recommendedSkills": ["Skill A", "Skill B", "Skill C", "Skill D", "Skill E", "Skill F", "Skill G", "Skill H"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedSkills: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["recommendedSkills"]
          }
        }
      });

      const resultText = response.text;
      if (!resultText) {
        throw new Error("No response content from Gemini.");
      }

      const data = JSON.parse(resultText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Error in /api/gemini/suggest-skills:", error);
      res.status(500).json({ error: error.message || "Internal Server Error" });
    }
  });

  // Serve Vite assets in development, static build in production
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
