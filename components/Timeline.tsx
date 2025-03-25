'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  time: string;
  venue?: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="relative py-16" ref={ref}>
      {/* Enhanced Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
        {/* Main glowing line */}
        <div className="w-1 h-full bg-gradient-to-b from-cyber-blue/10 via-cyber-blue/60 to-cyber-blue/10 rounded-full overflow-hidden relative">
          {/* Animated pulse effect */}
    <motion.div
            className="absolute w-full h-[30%] bg-gradient-to-b from-transparent via-cyber-pink/60 to-transparent"
            initial={{ top: "-30%" }}
            animate={{ top: "100%" }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear",
              repeatDelay: 1
            }}
          />
        </div>
        
        {/* Data flow particles */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-8 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-cyber-pink shadow-[0_0_5px_#ff00ff]"
              style={{ left: '45%' }}
              initial={{ top: "-5%" }}
              animate={{ top: "105%" }}
              transition={{ 
                duration: 3 + (i % 3), 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
      </div>

      <div className="space-y-16">
      {events.map((event, index) => (
        <motion.div
          key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`relative flex items-center ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Enhanced Timeline Node */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center">
              {/* Outer ring with gradient */}
              <div className="absolute w-8 h-8 rounded-full bg-gradient-to-r from-cyber-blue to-cyber-pink opacity-20 animate-pulse" />
              
              {/* Middle ring with glow */}
              <div className="absolute w-6 h-6 rounded-full border-2 border-cyber-blue shadow-[0_0_10px_rgba(0,163,255,0.5)]" />
              
              {/* Inner dot with pulse */}
              <motion.div 
                className="w-3 h-3 rounded-full bg-cyber-pink shadow-[0_0_8px_rgba(255,0,255,0.8)]"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Content */}
            <div
              className={`w-1/2 ${
                index % 2 === 0 ? 'pr-10 text-right' : 'pl-10 text-left'
              }`}
            >
              <div className="cyber-card relative overflow-hidden group">
                {/* Animated border effect */}
                <div className="absolute inset-0 pointer-events-none">
                  <motion.div 
                    className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-pink to-transparent" 
                    animate={{
                      left: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                  <motion.div 
                    className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-blue to-transparent" 
                    animate={{
                      right: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      repeatDelay: 1,
                    }}
                  />
                </div>
                
                {/* Content header with date */}
                <div className="relative pl-3 py-1 mb-3 overflow-hidden">
                  <div className="absolute inset-0 bg-cyber-blue/10 skew-x-12" />
                  <div className="relative z-10 flex justify-between items-center">
                    <div className="text-cyber-pink font-glitch text-sm">
                      {event.date}
                    </div>
                    <div className="text-cyber-blue text-xs bg-cyber-dark/50 px-2 py-1 rounded">
                      {event.time}
                    </div>
                  </div>
                </div>
                
                {/* Event content */}
                <h3 className="text-xl font-cyber text-cyber-blue mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-300 mb-4">{event.description}</p>
                
                {/* Event details with icons */}
                {event.venue && (
            <div className="flex items-center mb-2">
                    <svg
                      className="w-4 h-4 mr-2 text-cyber-pink"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-sm text-gray-400">{event.venue}</span>
                  </div>
                )}
                
                {/* Interactive hover effect */}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-cyber-blue/20 to-transparent"
                  initial={{ height: 0 }}
                  whileHover={{ height: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
          </div>
        </motion.div>
      ))}
      </div>
    </div>
  );
} 