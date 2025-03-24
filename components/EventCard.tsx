import { motion } from 'framer-motion';
import Image from 'next/image';

interface EventCardProps {
  title: string;
  description: string;
  date: string;
  venue: string;
  image: string;
  category: string;
}

export default function EventCard({
  title,
  description,
  date,
  venue,
  image,
  category,
}: EventCardProps) {
  return (
    <motion.div
      className="cyber-card group"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 text-sm bg-cyber-blue/20 text-cyber-blue rounded-full">
            {category}
          </span>
        </div>
      </div>

      <h3 className="text-xl font-cyber text-cyber-blue mb-2">{title}</h3>
      <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>
      
      <div className="flex flex-col space-y-2 text-sm text-gray-400">
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-cyber-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {date}
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-2 text-cyber-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {venue}
        </div>
      </div>
    </motion.div>
  );
} 