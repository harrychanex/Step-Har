import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateWeddingWish = async (name: string, relationship: string, style: 'funny' | 'heartfelt' | 'poetic'): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    return "Wishing you a lifetime of love and happiness! (API Key missing)";
  }

  try {
    const prompt = `
      Write a short, ${style} wedding wish (max 40 words) for a couple named Stephanie and Harry.
      The wish is from ${name}, who is their ${relationship}.
      Do not include quotes around the output.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "Best wishes on your special day!";
  } catch (error) {
    console.error("Error generating wish:", error);
    return "May your love grow stronger each and every day.";
  }
};