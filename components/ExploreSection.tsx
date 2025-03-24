'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedTitle from './AnimatedTitle';
import ExploreCard from './ExploreCard';
import { staggerContainer } from '../utils/motion';

// Sample explore data - you could move this to constants/data.ts later
const exploreWorlds = [
  {
    id: 'event-1',
    imgUrl: 'https://images.unsplash.com/photo-1496327249223-c84a3c1db090?w=800&auto=format&fit=crop&q=60',
    title: 'Hackathon 2025',
  },
  {
    id: 'event-2',
    imgUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&auto=format&fit=crop&q=60',
    title: 'Tech Workshops',
  },
  {
    id: 'event-3',
    imgUrl: 'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=800&auto=format&fit=crop&q=60',
    title: 'Gaming Tournament',
  },
  {
    id: 'event-4',
    imgUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&auto=format&fit=crop&q=60',
    title: 'AI Conference',
  },
  {
    id: 'event-5',
    imgUrl: 'https://images.unsplash.com/photo-1457296898342-cdd24585d095?w=800&auto=format&fit=crop&q=60',
    title: 'Project Showcase',
  },
];

const ExploreSection = () => {
  const [active, setActive] = useState('event-2');

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-cyber-dark/80 z-0"></div>
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: 'url("/grid.svg")',
          backgroundSize: '30px 30px',
          backgroundRepeat: 'repeat',
        }}
      ></div>
      
      <motion.div
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="max-w-7xl mx-auto flex flex-col relative z-10"
      >
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <AnimatedTitle
              title="Expl<b>o</b>re <br /> Syner<b>g</b>y Events"
              containerClass="mt-5"
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-cyber-pink"></div>
          </div>
          <p className="mt-12 text-xl text-gray-300 max-w-2xl mx-auto">
            Discover the exciting events happening at Synergy 2025. Click on any event to learn more.
          </p>
        </div>

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ExploreSection; 