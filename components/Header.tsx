
import React from 'react';

interface HeaderProps {
  onPlayGame: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onPlayGame, isMuted, onToggleMute }) => {
  return (
    <header className="bg-yellow-100/80 backdrop-blur-sm p-4 sm:p-6 shadow-lg border-b border-yellow-300/60 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-left">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
            Dự báo Sạt lở đất
          </h1>
          <p className="mt-1 text-sm text-slate-600">Tỉnh Lạng Sơn</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={onPlayGame}
            className="text-sm sm:text-base bg-indigo-500/20 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-500/30 transition-colors duration-200 flex items-center gap-2"
            aria-label="Chơi game giáo dục"
          >
            <span role="img" aria-label="game controller icon">🎮</span>
            <span className="hidden sm:inline">Chơi game</span>
          </button>
           <button 
            onClick={onToggleMute}
            className="text-xl sm:text-2xl bg-yellow-200/70 text-slate-700 w-10 h-10 rounded-full hover:bg-yellow-300/80 transition-colors duration-200 flex items-center justify-center"
            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
           >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </div>
    </header>
  );
};