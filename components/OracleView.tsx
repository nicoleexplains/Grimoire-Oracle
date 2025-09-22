
import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { FC, FormEvent } from 'react';
import type { ChatMessage } from '../types';
import { getOracleStream } from '../services/geminiService';
import { loadChatHistory, saveChatHistory } from '../services/historyService';
import { SendIcon } from './icons/SendIcon';
import { UserIcon } from './icons/UserIcon';
import { OracleIcon } from './icons/OracleIcon';
import { BackIcon } from './icons/BackIcon';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';
import { MicrophoneIcon } from './icons/MicrophoneIcon';
import { StopIcon } from './icons/StopIcon';

// FIX: Define a minimal interface for the browser's SpeechRecognition API
// to resolve the TypeScript error. This API is not standard and may not
// be in the default TS DOM type definitions.
interface SpeechRecognition {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: () => void;
  onresult: (event: any) => void;
  onspeechend: () => void;
  onend: () => void;
  onerror: (event: any) => void;
  start: () => void;
  stop: () => void;
}

interface OracleViewProps {
  systemPrompt: string;
  oracleName: string;
  onBack: () => void;
}

const OracleView: FC<OracleViewProps> = ({ systemPrompt, oracleName, onBack }) => {
  const [history, setHistory] = useState<ChatMessage[]>(() => loadChatHistory(oracleName));
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const hasSpeechRecognition = !!SpeechRecognitionAPI;

  const historyRef = useRef(history);
  useEffect(() => {
      historyRef.current = history;
  }, [history]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: ChatMessage = { role: 'user', parts: [{ text: userInput }] };
    setHistory(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const stream = await getOracleStream(systemPrompt, [...historyRef.current, newUserMessage]);
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
      saveChatHistory(oracleName, historyRef.current);
    }
  }, [userInput, isLoading, systemPrompt, oracleName]);
  
  const handleMicClick = () => {
    if (!hasSpeechRecognition) {
      alert("Voice recognition is not supported by your browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognitionAPI();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsRecording(true);
    };

    recognition.onresult = (event: any) => {
      const speechResult = event.results[0][0].transcript;
      setUserInput(prev => (prev ? `${prev.trim()} ${speechResult}` : speechResult));
    };

    recognition.onspeechend = () => {
      recognition.stop();
    };

    recognition.onend = () => {
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.onerror = (event: any) => {
      console.error(`Speech recognition error: ${event.error}`);
      alert(`An error occurred during voice recognition: ${event.error}`);
      setIsRecording(false);
      recognitionRef.current = null;
    };

    recognition.start();
  };


  const handleCopyChat = async () => {
    if (history.length === 0) return;

    const formattedHistory = `Consultation with ${oracleName}\n\n` +
      history.map(msg => {
          const prefix = msg.role === 'user' ? 'You' : oracleName;
          return `${prefix}: ${msg.parts[0].text}`;
      }).join('\n\n');

    try {
        await navigator.clipboard.writeText(formattedHistory);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
        console.error('Failed to copy chat history:', err);
    }
  };

  const handleCopyMessage = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageIndex(index);
      setTimeout(() => setCopiedMessageIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };


  return (
    <div className="flex flex-col h-full">
       <div className="flex items-center justify-between pb-3 border-b border-gray-700 mb-3">
        <button
            onClick={onBack}
            className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
            title="Change Oracle"
            aria-label="Change Oracle"
        >
            <BackIcon />
        </button>
        <h2 className="text-lg font-cinzel text-red-500 font-bold">{oracleName}</h2>
        <button
            onClick={handleCopyChat}
            disabled={history.length === 0 || isCopied}
            className="p-2 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white transition-colors disabled:text-green-400 disabled:cursor-default disabled:hover:bg-transparent"
            aria-label={isCopied ? "Copied!" : "Copy chat"}
            title={isCopied ? "Copied!" : "Copy chat"}
        >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
       </div>

      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {history.length === 0 && (
           <div className="text-center text-gray-500 p-8">
             <p className="font-cinzel text-lg">The Veil is Thin</p>
             <p>Ask, and the Spirit Oracle may answer.</p>
           </div>
        )}
        {history.map((msg, index) => (
          <div key={index} className={`group flex items-center gap-2 ${msg.role === 'user' ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
              {/* Avatar */}
              <div className="flex-shrink-0">
                  {msg.role === 'model' ? <OracleIcon /> : <UserIcon />}
              </div>

              {/* Bubble */}
              <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-red-800 text-white' : 'bg-gray-700'}`}>
                  <p className="whitespace-pre-wrap">{msg.parts[0].text}</p>
              </div>

              {/* Copy Button */}
              <div className="w-8 flex-shrink-0 flex items-center justify-center">
                  <button
                      onClick={() => handleCopyMessage(msg.parts[0].text, index)}
                      className="p-1 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white disabled:text-green-400"
                      aria-label={copiedMessageIndex === index ? 'Copied' : 'Copy message'}
                      disabled={copiedMessageIndex === index}
                  >
                      {copiedMessageIndex === index ? <CheckIcon /> : <CopyIcon />}
                  </button>
              </div>
          </div>
        ))}
        {isLoading && history[history.length -1]?.role !== 'model' && (
           <div className="flex items-start gap-3">
             <OracleIcon />
             <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-gray-700">
                <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse [animation-delay:0.1s]"></div>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                </div>
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
          placeholder={isRecording ? "Listening..." : "Speak to the Oracle..."}
          className="flex-grow p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={isLoading}
        />
        {hasSpeechRecognition && (
          <button
            type="button"
            onClick={handleMicClick}
            disabled={isLoading}
            className={`flex-shrink-0 p-3 rounded-lg transition-colors duration-200 ${
              isRecording
                ? 'bg-yellow-500 text-white animate-pulse'
                : 'bg-gray-700 text-white hover:bg-gray-600'
            } disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed`}
            aria-label={isRecording ? 'Stop recording' : 'Start voice input'}
            title={isRecording ? 'Stop recording' : 'Start voice input'}
          >
            {isRecording ? <StopIcon /> : <MicrophoneIcon />}
          </button>
        )}
        <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-red-700 text-white p-3 rounded-lg disabled:bg-gray-600 hover:bg-red-600 transition-colors">
          <SendIcon />
        </button>
      </form>
    </div>
  );
};

export default OracleView;
