import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const callGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "I'm having trouble finding the right words. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Softly, let's try that again later.";
  }
};