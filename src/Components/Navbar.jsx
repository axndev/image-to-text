import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../Components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
          <img src="/logo.png" className='max-w-10' alt="" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
               ProImageToText
            </h1>
          </div>
          <div className="hidden md:flex space-x-4 items-center">
            <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Home</a>
            <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">About</a>
            <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-[#A8DFE9]">Contact</a>
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
          <a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">Home</a>
          <a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">About</a>
          <a href="/contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
}
