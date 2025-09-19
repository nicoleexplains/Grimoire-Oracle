import type { ChatMessage } from '../types';

const HISTORY_STORAGE_KEY = 'grimoire-chat-history';

// Helper function to get all histories from localStorage
function getAllHistories(): Record<string, ChatMessage[]> {
  try {
    const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
    return storedHistory ? JSON.parse(storedHistory) : {};
  } catch (error) {
    console.error("Failed to parse chat history from localStorage", error);
    return {};
  }
}

// Helper function to save all histories to localStorage
function saveAllHistories(allHistories: Record<string, ChatMessage[]>): void {
  try {
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(allHistories));
  } catch (error)
    {
    console.error("Failed to save chat history to localStorage", error);
  }
}

/**
 * Loads the chat history for a specific oracle.
 * @param oracleName - The name of the oracle.
 * @returns An array of ChatMessage objects, or an empty array if no history is found.
 */
export function loadChatHistory(oracleName: string): ChatMessage[] {
  const allHistories = getAllHistories();
  return allHistories[oracleName] || [];
}

/**
 * Saves the chat history for a specific oracle.
 * @param oracleName - The name of the oracle.
 * @param history - The chat history to save.
 */
export function saveChatHistory(oracleName: string, history: ChatMessage[]): void {
  if (!history || history.length === 0) {
    // If history is empty, we might want to remove the entry
    const allHistories = getAllHistories();
    delete allHistories[oracleName];
    saveAllHistories(allHistories);
    return;
  }
  const allHistories = getAllHistories();
  allHistories[oracleName] = history;
  saveAllHistories(allHistories);
}


/**
 * Loads all saved chat histories.
 * @returns An object where keys are oracle names and values are their chat histories.
 */
export function loadAllChatHistories(): Record<string, ChatMessage[]> {
  return getAllHistories();
}

/**
 * Clears all chat histories from localStorage.
 */
export function clearAllChatHistories(): void {
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear chat history from localStorage", error);
  }
}