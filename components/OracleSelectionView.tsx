import React from 'react';
import type { FC } from 'react';
import type { Oracle } from '../types';

interface OracleSelectionViewProps {
  oracles: Oracle[];
  onSelectOracle: (oracle: Oracle) => void;
}

const OracleSelectionView: FC<OracleSelectionViewProps> = ({ oracles, onSelectOracle }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center font-cinzel text-red-500">Choose an Oracle to Consult</h2>
      <div className="grid grid-cols-2 gap-4">
        {oracles.map((oracle) => (
          <button
            key={oracle.name}
            onClick={() => onSelectOracle(oracle)}
            className="w-full bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-red-600 hover:shadow-lg hover:shadow-red-900/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 group flex flex-col"
          >
            <div className="overflow-hidden p-4">
              <img 
                src={oracle.imageUrl} 
                alt={`Image of ${oracle.name}`} 
                className="w-full aspect-square object-cover transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
              />
            </div>
            <div className="p-3 pt-0 text-center flex-grow flex flex-col justify-center">
              <h3 className="font-bold font-cinzel text-base text-red-400 group-hover:text-red-300 transition-colors duration-300">{oracle.name}</h3>
              <p className="text-gray-400 text-xs mt-1">{oracle.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OracleSelectionView;