import { motion } from 'framer-motion';
import Timeline from './Timeline';
import { timelineEvents } from '../constants/data';

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-4 bg-cyber-dark/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron text-cyber-blue mb-4">
            Event Timeline
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Follow the journey of Synergy 2025 through our detailed timeline
          </p>
        </motion.div>

        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-blue/5 to-transparent" />

          {/* Timeline Component */}
          <div className="relative z-10">
            <Timeline events={timelineEvents} />
          </div>
        </div>
      </div>
    </section>
  );
} 