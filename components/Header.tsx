import React from 'react';
import { Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-gray-800 bg-panelBg/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute -inset-1 bg-neonBlue rounded-full blur opacity-75 animate-pulse"></div>
            <div className="relative bg-black p-2 rounded-full border border-neonBlue">
              <Zap className="w-6 h-6 text-neonBlue" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple brand-font">
            Jubayer Image Generator AI
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-sm text-gray-400">
          <span>Powered by Gemini</span>
          <span className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-xs">v2.0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;