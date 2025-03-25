import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-cyber text-cyber-blue mb-4">
            About Synergy
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            The biggest technical festival of IIIT Bangalore
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-lg overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60"
              alt="Synergy 2025"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent" />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="cyber-card">
              <h3 className="text-2xl font-cyber text-cyber-blue mb-4">
                What is Synergy?
              </h3>
              <p className="text-gray-300">
                Synergy is the annual technical festival of IIIT Bangalore, bringing together
                the brightest minds in technology, innovation, and creativity. It's a platform
                where students showcase their talents, learn from industry experts, and
                participate in cutting-edge competitions.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-cyber text-cyber-blue mb-4">
                Our Vision
              </h3>
              <p className="text-gray-300">
                To create an ecosystem that fosters innovation, collaboration, and learning
                in technology. We aim to bridge the gap between academia and industry while
                providing students with opportunities to explore and excel in their areas of
                interest.
              </p>
            </div>

            <div className="cyber-card">
              <h3 className="text-2xl font-cyber text-cyber-blue mb-4">
                Why Participate?
              </h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-center">
                  <span className="text-cyber-pink mr-2">•</span>
                  Network with industry professionals
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-pink mr-2">•</span>
                  Showcase your skills and projects
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-pink mr-2">•</span>
                  Learn from expert workshops
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-pink mr-2">•</span>
                  Win exciting prizes and recognition
                </li>
                <li className="flex items-center">
                  <span className="text-cyber-pink mr-2">•</span>
                  Be part of the tech community
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 