
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
        AI Social Lead Generator
      </h1>
      <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
        Instantly create platform-optimized social media posts to boost your lead generation campaigns.
      </p>
    </header>
  );
};
