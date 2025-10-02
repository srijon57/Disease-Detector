import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-zinc-900 to-neutral-800 text-neutral-100 p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Disease Detector</h1>
        <nav>
          <a href="/" className="text-sm hover:text-stone-400 transition-colors duration-200">Home</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;