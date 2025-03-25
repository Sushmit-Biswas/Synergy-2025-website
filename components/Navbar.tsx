'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { navigation } from '../constants/data';
import AudioPlayer from './AudioPlayer';

// Predefined positions for data points to avoid hydration errors
const dataPoints = [
  { x: 10, y: 20 }, { x: 25, y: 15 }, { x: 40, y: 30 }, { x: 60, y: 10 },
  { x: 75, y: 25 }, { x: 85, y: 40 }, { x: 20, y: 50 }, { x: 50, y: 60 },
  { x: 30, y: 80 }, { x: 70, y: 70 }, { x: 90, y: 30 }, { x: 15, y: 35 },
  { x: 55, y: 45 }, { x: 65, y: 55 }, { x: 35, y: 65 }, { x: 95, y: 85 },
  { x: 45, y: 75 }, { x: 80, y: 90 }, { x: 5, y: 95 }, { x: 100, y: 5 }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Trigger glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-2 bg-gradient-to-r from-cyber-dark/90 via-cyber-blue/10 to-cyber-dark/90 backdrop-blur-md border-b border-cyber-blue/30' 
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="relative overflow-hidden">
        {/* Animated scanner line */}
        <motion.div 
          className="absolute h-[1px] w-full bg-cyber-blue/60"
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear",
            repeatDelay: 1
          }}
        />
        
        {/* Animated data points with fixed positions */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {dataPoints.map((point, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-cyber-blue/80"
              initial={{ 
                x: `${point.x}%`, 
                y: `${point.y}%` 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0] 
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.1,
                repeatDelay: 1 + (i % 3)
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative h-10 w-10 mr-2"
                whileHover={{ 
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.5 }
                }}
              >
                <Image src="/logo.svg" alt="Synergy Logo" fill className="object-contain" />
                <div className="absolute inset-0 bg-cyber-pink/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`text-xl font-cyber ${
                  glitchEffect ? 'animate-glitch' : ''
                }`}
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-pink">
                  SYNERGY
                </span>
                <span className="text-cyber-pink">2025</span>
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation with Enhanced Hover Effects */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                className="font-orbitron text-sm relative group overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                {/* Circular boundary on hover */}
                <motion.span 
                  className="absolute inset-0 rounded-full border border-cyber-blue/0 z-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1,
                    borderColor: 'rgba(0, 163, 255, 0.4)'
                  }}
                  transition={{ duration: 0.2 }}
                />
                
                {/* Glowing background on hover */}
                <motion.span 
                  className="absolute inset-0 bg-cyber-blue/0 rounded-full blur-sm z-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ 
                    opacity: 0.15,
                    boxShadow: '0 0 12px 2px rgba(0, 163, 255, 0.5)'
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                <span className="relative z-10 px-4 py-2 text-white transition-colors duration-300 block group-hover:text-cyber-blue">
                  {item.name}
                </span>
                
                {/* Top highlight on hover */}
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyber-blue to-cyber-pink origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Pulsing dots at corners on hover */}
                <motion.span 
                  className="absolute top-0 right-0 h-1 w-1 rounded-full bg-cyber-pink"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    transition: { 
                      repeat: Infinity, 
                      duration: 1.5 
                    }
                  }}
                />
                <motion.span 
                  className="absolute bottom-0 left-0 h-1 w-1 rounded-full bg-cyber-blue"
                  initial={{ opacity: 0, scale: 0 }}
                  whileHover={{ 
                    opacity: [0, 1, 0], 
                    scale: [0, 1, 0],
                    transition: { 
                      repeat: Infinity, 
                      duration: 1.5,
                      delay: 0.3
                    }
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Audio Player and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <AudioPlayer audioSource="/audio/loop.mp3" />
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center p-2 rounded-md text-cyber-blue hover:text-cyber-pink focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="sr-only">Open main menu</span>
              <div className="relative h-6 w-6">
                <span className={`absolute h-0.5 w-6 bg-gradient-to-r from-cyber-blue to-cyber-pink transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-2' : '-translate-y-1'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-gradient-to-r from-cyber-pink to-cyber-blue transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute h-0.5 w-6 bg-gradient-to-r from-cyber-blue to-cyber-pink transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 translate-y-2' : 'translate-y-2'}`}></span>
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu with Enhanced Hover Effects */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-b from-cyber-dark/90 to-cyber-blue/5 backdrop-blur-md border-b border-cyber-blue/20"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navigation.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="block px-3 py-2 rounded-md text-base font-orbitron text-white hover:bg-cyber-blue/10 border-l-2 border-transparent hover:border-cyber-blue transition-all relative group"
                  onClick={() => setMobileMenuOpen(false)}
                  whileHover={{ x: 5 }}
                >
                  {/* Circular boundary indicator on hover for mobile */}
                  <motion.span 
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-cyber-blue/0"
                    initial={{ opacity: 0 }}
                    whileHover={{ 
                      opacity: 1, 
                      backgroundColor: 'rgba(0, 163, 255, 0.5)',
                      boxShadow: '0 0 8px 2px rgba(0, 163, 255, 0.4)'
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cyber-blue hover:from-cyber-blue hover:to-cyber-pink">
                    {item.name}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar; 