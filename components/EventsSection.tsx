import { useState } from 'react';
import { motion } from 'framer-motion';
import EventCard from './EventCard';
import { events, categories } from '../constants/data';

export default function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredEvents = selectedCategory
    ? events.filter(event => event.category === selectedCategory)
    : events;

  return (
    <section id="events" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber text-cyber-blue mb-4">
            Events
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover a world of innovation, competition, and learning at Synergy 2025
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
              ${!selectedCategory
                ? 'bg-cyber-blue text-cyber-dark'
                : 'bg-transparent text-cyber-blue border border-cyber-blue hover:bg-cyber-blue/10'
              }`}
          >
            All Events
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category
                  ? 'bg-cyber-blue text-cyber-dark'
                  : 'bg-transparent text-cyber-blue border border-cyber-blue hover:bg-cyber-blue/10'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <EventCard {...event} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 