import React, { useState } from 'react';
import type { FC } from 'react';
import { INVOCATIONS } from '../constants';
import type { Invocation } from '../types';
import InvocationModal from './InvocationModal';
import { SearchIcon } from './icons/SearchIcon';

const InvocationsView: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvocation, setSelectedInvocation] = useState<Invocation | null>(null);

  const filteredInvocations = INVOCATIONS.filter(
    (invocation) =>
      invocation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invocation.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectInvocation = (invocation: Invocation) => {
    setSelectedInvocation(invocation);
  };

  const handleCloseModal = () => {
    setSelectedInvocation(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center font-cinzel text-red-500">Book of Invocations</h2>
      
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search invocations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
          <SearchIcon />
        </div>
      </div>

      <div className="space-y-3">
        {filteredInvocations.length > 0 ? (
            filteredInvocations.map((invocation) => (
            <button
                key={invocation.title}
                onClick={() => handleSelectInvocation(invocation)}
                className="w-full text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700 hover:border-red-700 transition-all duration-200"
            >
                <h3 className="font-bold font-cinzel text-red-400">{invocation.title}</h3>
            </button>
            ))
        ) : (
          <p className="text-center text-gray-500 pt-8">No invocations found matching your search.</p>
        )}
      </div>

      {selectedInvocation && (
        <InvocationModal
          invocation={selectedInvocation}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default InvocationsView;
