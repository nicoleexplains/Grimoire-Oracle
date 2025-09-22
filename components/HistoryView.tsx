
import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import type { Oracle, ChatMessage } from '../types';
import { loadAllChatHistories, clearAllChatHistories, loadChatHistory } from '../services/historyService';
import { ORACLES } from '../constants';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface HistoryViewProps {
  onSelectConversation: (oracle: Oracle) => void;
}

interface ConversationSummary {
    oracle: Oracle;
    lastMessage: string;
}

const HistoryView: FC<HistoryViewProps> = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [copiedOracleName, setCopiedOracleName] = useState<string | null>(null);

  useEffect(() => {
    const allHistories = loadAllChatHistories();
    const summaries: ConversationSummary[] = Object.entries(allHistories)
      .map(([oracleName, history]) => {
        const oracle = ORACLES.find(o => o.name === oracleName);
        if (!oracle || history.length === 0) {
          return null;
        }
        const lastMessage = history[history.length - 1];
        const lastMessageText = lastMessage?.parts[0]?.text || '';
        return {
          oracle,
          lastMessage: lastMessageText.length > 70 ? `${lastMessageText.substring(0, 70)}...` : lastMessageText,
        };
      })
      .filter((summary): summary is ConversationSummary => summary !== null);
      
    setConversations(summaries);
  }, []);

  const handleClearHistory = () => {
    const isConfirmed = window.confirm("Are you sure you want to erase all recorded communications? This action cannot be undone.");
    if (isConfirmed) {
      clearAllChatHistories();
      setConversations([]);
    }
  };

  const handleCopyConversation = async (oracleName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const history = loadChatHistory(oracleName);
    if (!history || history.length === 0) return;

    const formattedHistory = `Consultation with ${oracleName}\n\n` +
      history.map(msg => {
        const prefix = msg.role === 'user' ? 'You' : oracleName;
        return `${prefix}: ${msg.parts[0].text}`;
      }).join('\n\n');

    try {
      await navigator.clipboard.writeText(formattedHistory);
      setCopiedOracleName(oracleName);
      setTimeout(() => setCopiedOracleName(null), 2000);
    } catch (err) {
      console.error('Failed to copy chat history:', err);
    }
  };


  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center font-cinzel text-red-500">Recorded Communications</h2>
      {conversations.length > 0 ? (
        <div className="space-y-4">
          {conversations.map(({ oracle, lastMessage }) => (
            <div key={oracle.name} className="flex items-center gap-2">
              <button
                onClick={() => onSelectConversation(oracle)}
                className="flex-grow text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700 hover:border-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-4"
              >
                <img src={oracle.imageUrl} alt={`Image of ${oracle.name}`} className="w-16 h-16 rounded-md object-cover flex-shrink-0 border-2 border-gray-700" />
                <div className="flex-grow">
                  <h3 className="font-bold font-cinzel text-lg text-red-400">{oracle.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 italic">"{lastMessage}"</p>
                </div>
              </button>
              <button
                onClick={(e) => handleCopyConversation(oracle.name, e)}
                disabled={copiedOracleName === oracle.name}
                className="p-3 self-stretch rounded-md text-gray-400 bg-gray-800 border border-gray-700 hover:bg-gray-700 hover:text-white transition-colors disabled:text-green-400"
                aria-label={copiedOracleName === oracle.name ? 'Copied!' : 'Copy conversation'}
                title={copiedOracleName === oracle.name ? 'Copied!' : 'Copy conversation'}
              >
                {copiedOracleName === oracle.name ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          ))}
          <div className="pt-6 text-center">
            <button
              onClick={handleClearHistory}
              className="px-4 py-2 border border-red-700 text-red-400 rounded-lg hover:bg-red-700 hover:text-white transition-colors duration-200"
            >
              Clear All History
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 p-8">
          <p className="font-cinzel text-lg">The Archives are Empty</p>
          <p>No communications with the spirits have been recorded yet.</p>
        </div>
      )}
    </div>
  );
};

export default HistoryView;
