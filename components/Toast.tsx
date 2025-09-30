
import React from 'react';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
}

export const Toast: React.FC<ToastProps> = ({ message, type }) => {
  const baseClasses = "p-4 rounded-md shadow-lg flex items-center max-w-md mx-auto my-4";
  const typeClasses = {
    error: "bg-red-500/80 border border-red-700 text-white",
    success: "bg-green-500/80 border border-green-700 text-white",
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      <span className="mr-3">{type === 'error' ? '🚫' : '✅'}</span>
      <p>{message}</p>
    </div>
  );
};
