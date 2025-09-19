import React from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';
import { View } from '../types';
import { ChatIcon } from './icons/ChatIcon';
import { BookIcon } from './icons/BookIcon';
import { HistoryIcon } from './icons/HistoryIcon';

interface NavBarProps {
  currentView: View;
  setCurrentView: Dispatch<SetStateAction<View>>;
}

const NavBar: FC<NavBarProps> = ({ currentView, setCurrentView }) => {
  const navItems = [
    { view: View.Oracle, label: 'Oracle', icon: <ChatIcon /> },
    { view: View.Invocations, label: 'Invocations', icon: <BookIcon /> },
    { view: View.History, label: 'History', icon: <HistoryIcon /> },
  ];

  return (
    <nav className="flex justify-around p-2">
      {navItems.map((item) => {
        const isActive = currentView === item.view;
        const activeClasses = 'bg-red-800 text-white';
        const inactiveClasses = 'text-gray-400 hover:bg-gray-700 hover:text-white';
        
        return (
          <button
            key={item.label}
            onClick={() => setCurrentView(item.view)}
            className={`flex flex-col items-center justify-center w-1/3 py-2 px-4 rounded-lg transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavBar;