import React from 'react';

export const NewspaperHeader: React.FC = () => {
  return (
    <div className="w-full text-center border-b-4 border-double border-paper-border mb-8 pb-2 pt-4 px-4">
      <div className="flex justify-between items-end border-b border-paper-border pb-1 mb-2">
        <span className="text-xs md:text-sm font-body tracking-wider italic">SPECIAL EDITION</span>
        <span className="text-xs md:text-sm font-body tracking-wider uppercase">Saturday, August 1, 2026</span>
      </div>
      <h1 className="font-classic text-4xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-ink mt-2">
        The Wedding Post
      </h1>
      <div className="mt-2 flex items-center justify-center space-x-4">
        <div className="h-[1px] bg-paper-border w-12 md:w-32"></div>
        <div className="text-center font-script text-2xl md:text-3xl text-accent">Love is in the air</div>
        <div className="h-[1px] bg-paper-border w-12 md:w-32"></div>
      </div>
    </div>
  );
};