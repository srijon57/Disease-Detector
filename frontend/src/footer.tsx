import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-zinc-900 to-neutral-900 text-neutral-100 p-6 shadow-inner">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Disease Detector by Srijon. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="text-sm hover:text-stone-400 transition-colors duration-200">Privacy Policy</a>
          <a href="#" className="text-sm hover:text-stone-400 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;