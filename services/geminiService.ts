import { GoogleGenAI } from "@google/genai";
import { Transaction } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getFinancialAdvice = async (transactions: Transaction[]): Promise<string> => {
  try {
    // Filter for the last 30 days to keep context relevant
    const recentTransactions = transactions.slice(0, 50); 
    
    const transactionData = JSON.stringify(recentTransactions.map(t => ({
      date: t.date.split('T')[0],
      type: t.type,
      amount: `${t.amount} AED`,
      category: t.category,
      desc: t.description
    })));

    const prompt = `
      You are a savvy financial advisor specifically for a resident living in the UAE (United Arab Emirates).
      
      Here is a list of the user's recent transactions in AED (Dirhams):
      ${transactionData}

      Please provide a brief, actionable analysis (max 150 words). 
      1. Highlight where the most money is going.
      2. Suggest one specific way to save money in the UAE context (e.g., using specific apps like Entertainer, leveraging Metro vs Taxi, grocery tips).
      3. Keep the tone encouraging but professional.
      
      If there is no data, just give a generic tip for saving money in Dubai/Abu Dhabi.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Unable to generate advice at this time.";
  } catch (error) {
    console.error("Error fetching Gemini advice:", error);
    return "Sorry, I couldn't connect to the financial brain right now. Please try again later.";
  }
};