import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-12 h-12 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-300">Generating posts and images...</p>
      <p className="text-sm text-gray-500">The AI is crafting content and visuals. This may take a moment.</p>
    </div>
  );
};