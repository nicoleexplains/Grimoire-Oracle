import React, { useState } from 'react';
import type { FC } from 'react';
import { View, Oracle } from './types';
import OracleView from './components/OracleView';
import InvocationsView from './components/InvocationsView';
import NavBar from './components/NavBar';
import OracleSelectionView from './components/OracleSelectionView';
import { ORACLES } from './constants';

const App: FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.Oracle);
  const [selectedOracle, setSelectedOracle] = useState<Oracle | null>(null);

  const handleSelectOracle = (oracle: Oracle) => {
    setSelectedOracle(oracle);
  };

  const handleReturnToSelection = () => {
    setSelectedOracle(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col max-w-lg mx-auto shadow-2xl shadow-red-900/20">
      <header className="p-4 bg-gray-800 border-b-2 border-red-800 text-center">
        <h1 className="text-3xl font-bold text-red-500 font-cinzel">Grimoire Oracle</h1>
        <p className="text-sm text-gray-400">Consult the Spirits of the Heptameron & The Magus</p>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        {currentView === View.Oracle && (
          !selectedOracle ? (
            <OracleSelectionView oracles={ORACLES} onSelectOracle={handleSelectOracle} />
          ) : (
            <OracleView 
              key={selectedOracle.name} 
              systemPrompt={selectedOracle.systemPrompt}
              oracleName={selectedOracle.name}
              onBack={handleReturnToSelection}
            />
          )
        )}
        {currentView === View.Invocations && <InvocationsView />}
      </main>
      
      <footer className="sticky bottom-0 bg-gray-800 border-t-2 border-red-800">
        <NavBar currentView={currentView} setCurrentView={setCurrentView} />
      </footer>
    </div>
  );
};

export default App;
