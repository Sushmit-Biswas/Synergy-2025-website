'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeIn } from '../utils/motion';

type TimelineEvent = {
  date: string;
  time: string;
  title: string;
  description: string;
};

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <motion.div
      variants={staggerContainer(0.1, 0.1)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="relative max-w-4xl mx-auto"
    >
      {/* Center Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cyber-blue/30" />

      {events.map((event, index) => (
        <motion.div
          key={index}
          variants={fadeIn(index % 2 === 0 ? 'right' : 'left', 'spring', index * 0.15, 0.75)}
          className={`relative flex ${
            index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          } mb-12 items-center`}
        >
          {/* Timeline Node */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-cyber-pink z-10 shadow-[0_0_15px_rgba(255,0,255,0.7)]" />
          
          {/* Content Box */}
          <div
            className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'} cyber-card`}
          >
            <div className="flex items-center mb-2">
              <div className="bg-cyber-pink/20 rounded-md px-2 py-1 text-xs text-cyber-pink mr-2 font-mono">
                {event.date}
              </div>
              <div className="text-gray-400 text-xs">{event.time}</div>
            </div>
            <h3 className="text-xl font-orbitron text-cyber-blue mb-2">{event.title}</h3>
            <p className="text-gray-300 text-sm">{event.description}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Timeline; 