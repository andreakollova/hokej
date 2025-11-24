import { GoogleGenAI } from "@google/genai";
import { Match } from "../types";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    console.warn("API_KEY is not set.");
    return null;
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateMatchRecap = async (match: Match): Promise<string> => {
  const ai = getAIClient();
  if (!ai) return "Chýba API kľúč. Nie je možné vygenerovať súhrn.";

  const prompt = `
    Napíš vášnivý, 2-odstavcový športový súhrn (cca 100 slov) v slovenskom jazyku pre zápas v pozemnom hokeji medzi tímami ${match.homeTeam.name} a ${match.awayTeam.name}.
    
    Detaily:
    - Skóre: ${match.scoreHome} - ${match.scoreAway}
    - Stav: ${match.status}
    - Súťaž: ${match.competition}
    - Miesto: ${match.venue}
    
    Ak je zápas LIVE, popíš napätie a aktuálnu situáciu.
    Ak je FINAL (skončený), vyzdvihni výsledok a kľúčovú atmosféru.
    Použi oficiálny, novinársky, ale vlastenecký tón (ak hralo Slovensko), alebo neutrálny, ak nie. Text musí byť v slovenčine.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Súhrn nebol vygenerovaný.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Momentálne nie je možné vygenerovať súhrn pre technické problémy.";
  }
};