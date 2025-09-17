import { GoogleGenAI, Chat } from "@google/genai";
import type { GenerateContentResponse } from "@google/genai";
import type { ChatMessage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Creates a streaming chat session with the Gemini API.
 * @param systemPrompt - The system instruction to define the oracle's persona.
 * @param history - The current chat history for this specific oracle session.
 * @returns An async generator that yields the streaming response.
 */
export async function getOracleStream(systemPrompt: string, history: ChatMessage[]): Promise<AsyncGenerator<GenerateContentResponse, any, unknown>> {
    // Creates a new chat instance with the specific system prompt and history.
    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: systemPrompt,
        },
        // The history should contain all messages except the latest user prompt.
        history: history.slice(0, -1), 
    });

    const lastMessage = history[history.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      throw new Error("Last message must be from the user to initiate a response.");
    }

    // Send the last user message to get the streaming response.
    const result = await chat.sendMessageStream({ message: lastMessage.parts[0].text });
    return result;
}
