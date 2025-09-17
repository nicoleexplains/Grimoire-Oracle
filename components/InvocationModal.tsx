
import React from 'react';
import type { FC } from 'react';
import type { Invocation } from '../types';

interface InvocationModalProps {
  invocation: Invocation;
  onClose: () => void;
}

const InvocationModal: FC<InvocationModalProps> = ({ invocation, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl max-w-lg w-full max-h-[80vh] flex flex-col border-2 border-red-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold font-cinzel text-red-500">{invocation.title}</h2>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-gray-300 whitespace-pre-wrap font-serif">{invocation.text}</p>
        </div>
        <div className="p-4 border-t border-gray-700 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvocationModal;
