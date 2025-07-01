import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../Components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // A helper to make active class easy to reuse
  const linkClass = ({ isActive }) =>
    `hover:text-[#A8DFE9] ${
      isActive ? 'text-[#A8DFE9] font-semibold' : 'text-gray-700 dark:text-gray-300'
    }`;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-3">
            <img src="/logo.png" className="max-w-10" alt="Logo" />
            <h1 className="!text-2xl font-bold text-gray-900 dark:text-white">
              ProImageToText
            </h1>
          </NavLink>

          <div className="hidden md:flex space-x-10 items-center">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/blog" className={linkClass}>Blog</NavLink>
            <NavLink to="/about" className={linkClass}>About</NavLink>
            <NavLink to="/privacy-policy" className={linkClass}>Privacy</NavLink>
            <NavLink to="/terms" className={linkClass}>Terms</NavLink>
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </div>

          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="!shadow-none !bg-transparent"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-2 pb-3 space-y-1">
          <NavLink to="/" onClick={handleLinkClick} className={linkClass}>Home</NavLink>
          <NavLink to="/blog" onClick={handleLinkClick} className={linkClass}>Blog</NavLink>
          <NavLink to="/about" onClick={handleLinkClick} className={linkClass}>About</NavLink>
          <NavLink to="/privacy-policy" onClick={handleLinkClick} className={linkClass}>Privacy</NavLink>
          <NavLink to="/terms" onClick={handleLinkClick} className={linkClass}>Terms</NavLink>
          <NavLink to="/contact" onClick={handleLinkClick} className={linkClass}>Contact</NavLink>
        </div>
      )}
    </nav>
  );
}
