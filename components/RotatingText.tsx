'use client';
import React, { useEffect, useRef, useState } from 'react';

interface RotatingTextProps {
  prefix: string;
  words: {
    text: string;
    className: string;
  }[];
  delay?: number;
}

const RotatingText: React.FC<RotatingTextProps> = ({ prefix, words, delay = 4000 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if we're on a mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Get all word elements
    const wordElements = containerRef.current.querySelectorAll(".word");
    const maxWordIndex = wordElements.length - 1;
    let currentWordIndex = 0;
    
    // Make first word visible
    (wordElements[currentWordIndex] as HTMLElement).style.opacity = "1";
    
    // Split words into letters
    wordElements.forEach(word => {
      const letters = word.textContent!.split("");
      word.textContent = "";
      letters.forEach(letter => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.appendChild(span);
      });
    });
    
    // Rotate text function
    const rotateText = () => {
      const currentWord = wordElements[currentWordIndex];
      const nextWord = currentWordIndex === maxWordIndex ? 
        wordElements[0] : 
        wordElements[currentWordIndex + 1];
      
      // Rotate out letters of current word
      Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
          letter.className = "letter out";
        }, i * 80);
      });
      
      // Reveal and rotate in letters of next word
      (nextWord as HTMLElement).style.opacity = "1";
      Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
          letter.className = "letter in";
        }, 340 + i * 80);
      });
      
      // Update current word index
      currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };
    
    // Initial rotation
    rotateText();
    
    // Set interval for rotation
    const interval = setInterval(rotateText, delay);
    
    return () => {
      clearInterval(interval);
    };
  }, [delay]);
  
  return (
    <div ref={containerRef} className="rotating-text">
      <p>{prefix}</p>
      <p>
        {words.map((word, i) => (
          <span key={i} className={`word ${word.className}`}>
            {word.text}
          </span>
        ))}
      </p>
    </div>
  );
};

export default RotatingText;