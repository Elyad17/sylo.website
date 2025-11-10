'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full bg-white z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-semibold">Sylo</div>
        <nav className="hidden md:flex space-x-8">
          <a href="#services" className="hover:text-teal-600 transition-colors">
            Services
          </a>
          <a href="#process" className="hover:text-teal-600 transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-teal-600 transition-colors">
            Contact
          </a>
        </nav>
        <button
          className="md:hidden flex flex-col space-y-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-transform ${
              open ? 'rotate-45 translate-y-1.5' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-800 ${open ? 'opacity-0' : ''}`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-gray-800 transition-transform ${
              open ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          ></span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <ul className="flex flex-col p-4 space-y-4">
              <li>
                <a
                  href="#services"
                  onClick={() => setOpen(false)}
                  className="block text-gray-800 hover:text-teal-600"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={() => setOpen(false)}
                  className="block text-gray-800 hover:text-teal-600"
                >
                  Process
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block text-gray-800 hover:text-teal-600"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
