'use client';

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  audioSource: string;
}

const AudioPlayer = ({ audioSource }: AudioPlayerProps) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const audioElementRef = useRef<HTMLAudioElement>(null);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying && audioElementRef.current) {
      audioElementRef.current.play().catch((e) => {
        console.error("Audio playback error:", e);
        setIsAudioPlaying(false);
        setIsIndicatorActive(false);
      });
    } else if (audioElementRef.current) {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  return (
    <motion.button
      onClick={toggleAudioIndicator}
      className="flex items-center space-x-0.5 p-2 bg-cyber-dark/30 rounded-full backdrop-blur-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <audio
        ref={audioElementRef}
        className="hidden"
        src={audioSource}
        loop
      />
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          className={`h-1 w-px rounded-full bg-cyber-pink transition-all duration-200 ease-in-out ${
            isIndicatorActive ? "animate-soundwave" : ""
          }`}
          style={{
            animationDelay: `${bar * 0.1}s`,
            height: isIndicatorActive ? "16px" : "4px",
          }}
        />
      ))}
    </motion.button>
  );
};

export default AudioPlayer; 