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
      <div className="space-y-4">
        {oracles.map((oracle) => (
          <button
            key={oracle.name}
            onClick={() => onSelectOracle(oracle)}
            className="w-full text-left p-4 bg-gray-800 rounded-lg hover:bg-gray-700 border border-gray-700 hover:border-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <h3 className="font-bold font-cinzel text-lg text-red-400">{oracle.name}</h3>
            <p className="text-gray-400 text-sm mt-1">{oracle.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OracleSelectionView;
