import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#264887] text-white p-4 shadow-inner mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Disease Detector by Srijon. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
