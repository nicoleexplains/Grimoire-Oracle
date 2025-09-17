import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { FC, FormEvent } from 'react';
import type { ChatMessage } from '../types';
import { getOracleStream } from '../services/geminiService';
import { SendIcon } from './icons/SendIcon';
import { UserIcon } from './icons/UserIcon';
import { OracleIcon } from './icons/OracleIcon';
import { BackIcon } from './icons/BackIcon';

interface OracleViewProps {
  systemPrompt: string;
  oracleName: string;
  onBack: () => void;
}

const OracleView: FC<OracleViewProps> = ({ systemPrompt, oracleName, onBack }) => {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
    const currentHistory = [...history, newUserMessage];
    setHistory(currentHistory);
    setUserInput('');
    setIsLoading(true);

    try {
      const stream = await getOracleStream(systemPrompt, currentHistory);
      let newModelMessage: ChatMessage = { role: 'model', parts: [{ text: '' }] };
      setHistory(prev => [...prev, newModelMessage]);

      for await (const chunk of stream) {
        const text = chunk.text;
        setHistory(prev => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === 'model') {
            const updatedLastMessage = {
              ...lastMessage,
              parts: [{ text: lastMessage.parts[0].text + text }],
            };
            return [...prev.slice(0, -1), updatedLastMessage];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error contacting the oracle:', error);
      const errorMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: 'The ether is disturbed. I cannot answer at this moment.' }],
      };
      setHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [userInput, isLoading, history, systemPrompt]);

  return (
    <div className="flex flex-col h-[calc(100vh-160px)]">
       <div className="flex items-center justify-between pb-3 border-b border-gray-700 mb-3">
        <button onClick={onBack} className="flex items-center text-gray-400 hover:text-white transition-colors">
            <BackIcon />
            <span className="ml-2 text-sm">Change Oracle</span>
        </button>
        <h2 className="text-lg font-cinzel text-red-500 font-bold">{oracleName}</h2>
       </div>

      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {history.length === 0 && (
           <div className="text-center text-gray-500 p-8">
             <p className="font-cinzel text-lg">The Veil is Thin</p>
             <p>Ask, and the Spirit Oracle may answer.</p>
           </div>
        )}
        {history.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'model' && <OracleIcon />}
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-red-800 text-white' : 'bg-gray-700'}`}>
              <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
            </div>
             {msg.role === 'user' && <UserIcon />}
          </div>
        ))}
        {isLoading && history[history.length -1]?.role !== 'model' && (
           <div className="flex items-start gap-3">
             <OracleIcon />
             <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-gray-700">
               <span className="animate-pulse">...</span>
             </div>
           </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Speak to the Oracle..."
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className="bg-red-700 text-white p-3 rounded-lg disabled:bg-gray-600 hover:bg-red-600 transition-colors">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default OracleView;
