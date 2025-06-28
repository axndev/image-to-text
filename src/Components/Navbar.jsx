import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../Components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to close menu when clicking a link
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <img src="/logo.png" className="max-w-10" alt="Logo" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ProImageToText
            </h1>
          </Link>
          <div className="hidden md:flex space-x-10 items-center">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Home</Link>
            <Link to="/blog" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Blog</Link>
            <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">About</Link>
            <Link to="/privacy-policy" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Privacy</Link>
            <Link to="/terms" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Terms</Link>
            <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Contact</Link>
          </div>
          <div className="flex md:hidden items-center">
            <Button variant="ghost" onClick={() => setIsOpen(!isOpen)} className="!shadow-none">
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pb-3 space-y-1">
          <Link to="/" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Home</Link>
          <Link to="/blog"  onClick={handleLinkClick}className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Blog</Link>
          <Link to="/about" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">About</Link>
          <Link to="/privacy-policy" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Privacy</Link>
          <Link to="/terms" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Terms</Link>
          <Link to="/contact" onClick={handleLinkClick} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Contact</Link>
        </div>
      )}
    </nav>
  );
}
