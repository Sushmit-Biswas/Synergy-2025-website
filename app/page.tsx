'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import EventsSection from '../components/EventsSection';
import TimelineSection from '../components/TimelineSection';
import ContactSection from '../components/ContactSection';
import ExploreSection from '../components/ExploreSection';
import AnimatedTitle from '../components/AnimatedTitle';
import Button from '../components/Button';
import RotatingText from '../components/RotatingText';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Predefined positions for footer data points to avoid hydration errors
const footerDataPoints = [
  { x: 12, y: 25 }, { x: 28, y: 18 }, { x: 42, y: 32 }, { x: 63, y: 15 },
  { x: 78, y: 28 }, { x: 88, y: 42 }, { x: 22, y: 55 }, { x: 52, y: 68 },
  { x: 33, y: 82 }, { x: 72, y: 75 }, { x: 93, y: 36 }, { x: 18, y: 38 },
  { x: 58, y: 48 }, { x: 68, y: 58 }, { x: 38, y: 67 }, { x: 97, y: 87 },
  { x: 48, y: 78 }, { x: 83, y: 92 }, { x: 8, y: 96 }, { x: 98, y: 8 },
  { x: 45, y: 15 }, { x: 77, y: 34 }, { x: 23, y: 72 }, { x: 62, y: 45 },
  { x: 85, y: 22 }, { x: 35, y: 91 }, { x: 53, y: 12 }, { x: 95, y: 54 },
  { x: 15, y: 62 }, { x: 67, y: 82 }
];

// Predefined positions for hero particles to avoid hydration errors
const heroParticlePositions = [
  { x: 66, y: 7 }, { x: 78, y: 4 }, { x: 92, y: 90 }, { x: 87, y: 81 },
  { x: 20, y: 16 }, { x: 27, y: 86 }, { x: 87, y: 77 }, { x: 89, y: 19 },
  { x: 66, y: 34 }, { x: 78, y: 91 }, { x: 4, y: 42 }, { x: 12, y: 67 },
  { x: 4, y: 92 }, { x: 10, y: 23 }, { x: 22, y: 20 }, { x: 8, y: 49 },
  { x: 21, y: 62 }, { x: 31, y: 22 }, { x: 7, y: 64 }, { x: 87, y: 89 },
  { x: 97, y: 67 }, { x: 80, y: 29 }, { x: 78, y: 66 }, { x: 4, y: 15 },
  { x: 4, y: 66 }, { x: 8, y: 31 }, { x: 14, y: 61 }, { x: 1, y: 25 },
  { x: 4, y: 14 }, { x: 17, y: 75 }, { x: 87, y: 48 }, { x: 67, y: 31 },
  { x: 54, y: 75 }, { x: 86, y: 56 }, { x: 18, y: 35 }, { x: 14, y: 82 },
  { x: 22, y: 32 }, { x: 52, y: 11 }, { x: 72, y: 68 }, { x: 57, y: 49 },
  { x: 4, y: 88 }, { x: 92, y: 2 }, { x: 8, y: 53 }, { x: 86, y: 64 },
  { x: 4, y: 93 }, { x: 86, y: 57 }, { x: 18, y: 7 }, { x: 87, y: 16 },
  { x: 29, y: 70 }, { x: 52, y: 34 }
];

export default function Home() {
  // Calculate time remaining until December 21, 2025
  const [timeRemaining, setTimeRemaining] = useState({
    days: '000',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });
  
  useEffect(() => {
    const targetDate = new Date('December 21, 2025 00:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeRemaining({
        days: days.toString().padStart(3, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0')
      });
    };
    
    // Update immediately and then set interval
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Set up GSAP animations
  useEffect(() => {
    // Create a timeline for the hero section animations
    const tl = gsap.timeline();
    
    tl.from(".hero-title", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power4.out",
    })
    .from(".hero-subtitle", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=0.6")
    .from(".hero-button", {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    }, "-=0.4");
    
    // Animate grid background
    gsap.to(".grid-background", {
      backgroundPosition: "0% 100%",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
    
    // Animate sections as they come into view
    gsap.utils.toArray(".animate-section").forEach((section: any) => {
      gsap.from(section, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 50%",
          toggleActions: "play none none reverse",
        },
      });
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Enhanced Design */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyber-dark to-cyber-dark/90 z-0"></div>
        
        {/* Animated circuit pattern */}
        <div 
          className="grid-background absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: 'url("/grid.svg")',
            backgroundSize: '30px 30px',
            backgroundRepeat: 'repeat',
            backgroundPosition: '0% 0%',
          }}
        ></div>
        
        {/* Animated particles with fixed positions */}
        <div className="absolute inset-0 z-0 opacity-90">
          {heroParticlePositions.map((point, i) => (
            <motion.div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-cyber-blue/90"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                boxShadow: '0 0 4px 1px rgba(0, 163, 255, 0.8)'
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.8, 1],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        {/* Animated glow elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyber-blue/15 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.6, 0.4],
              x: [0, 30, 0],
              y: [0, -30, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyber-pink/15 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-cyber-purple/15 blur-3xl"
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 25, 0],
              y: [0, 15, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 2
            }}
          />
        </div>
        
        {/* Hero Content with Enhanced Styling */}
        <div className="container mx-auto px-4 z-10 text-center relative">
          {/* Digital noise overlay for title */}
          <div className="relative inline-block mb-2">
            <motion.div
              className="absolute -inset-3 bg-cyber-dark/50 border border-cyber-blue/30 rounded-lg blur-sm"
              animate={{
                opacity: [0.5, 0.3, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            
            {/* Electric effects on both sides of the title */}
            <div className="relative flex justify-center items-center">
              {/* Left electricity */}
              <div className="absolute -left-14 md:-left-20 top-1/2 -translate-y-1/2 z-0">
                <motion.div 
                  className="w-10 md:w-16 h-28 md:h-40"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={`left-bolt-${i}`}
                      className="absolute h-full w-[2px] bg-cyber-blue"
                      style={{ 
                        left: `${i * 20}%`,
                        opacity: 0.6,
                        boxShadow: '0 0 8px 2px rgba(0, 163, 255, 0.8)'
                      }}
                      animate={{
                        height: ['0%', '100%', '0%'],
                        top: ['50%', '0%', '50%']
                      }}
                      transition={{
                        duration: 0.5 + (i * 0.1),
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    />
                  ))}
                  
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={`left-bolt-hor-${i}`}
                      className="absolute h-[2px] bg-cyber-pink"
                      style={{ 
                        width: '100%',
                        top: `${20 + i * 20}%`,
                        opacity: 0.7,
                        boxShadow: '0 0 8px 2px rgba(255, 0, 255, 0.8)'
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleX: [0, 1, 0],
                        x: ['0%', '0%', '100%']
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + (i * 0.1),
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              {/* Right electricity */}
              <div className="absolute -right-14 md:-right-20 top-1/2 -translate-y-1/2 z-0">
                <motion.div 
                  className="w-10 md:w-16 h-28 md:h-40"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                      key={`right-bolt-${i}`}
                      className="absolute h-full w-[2px] bg-cyber-pink"
                      style={{ 
                        left: `${i * 20}%`,
                        opacity: 0.6,
                        boxShadow: '0 0 8px 2px rgba(255, 0, 255, 0.8)'
                      }}
                      animate={{
                        height: ['0%', '100%', '0%'],
                        bottom: ['50%', '0%', '50%']
                      }}
                      transition={{
                        duration: 0.5 + (i * 0.1),
                        delay: i * 0.2,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    />
                  ))}
                  
                  {[...Array(4)].map((_, i) => (
                    <motion.div 
                      key={`right-bolt-hor-${i}`}
                      className="absolute h-[2px] bg-cyber-blue"
                      style={{ 
                        width: '100%',
                        top: `${20 + i * 20}%`,
                        opacity: 0.7,
                        boxShadow: '0 0 8px 2px rgba(0, 163, 255, 0.8)'
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scaleX: [0, 1, 0],
                        x: ['100%', '0%', '0%']
                      }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + (i * 0.1),
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    />
                  ))}
                </motion.div>
              </div>
              
              {/* Responsive title */}
              <h1 className="hero-title relative text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue via-white to-cyber-pink mb-2">
                <motion.span
                  animate={{
                    textShadow: ['0 0 7px #00a3ff', '0 0 10px #00a3ff', '0 0 21px #00a3ff', '0 0 42px #00a3ff'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  SYNERGY
                </motion.span>
                <motion.span
                  className="text-cyber-pink ml-1 md:ml-2"
                  animate={{
                    textShadow: ['0 0 7px #ff00ff', '0 0 10px #ff00ff', '0 0 21px #ff00ff', '0 0 42px #ff00ff'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5,
                  }}
                >
                  2025
                </motion.span>
          </h1>
            </div>
          </div>
          
          {/* Glitch line separator */}
          <motion.div
            className="w-36 md:w-48 h-[2px] mx-auto mb-6 md:mb-8 bg-gradient-to-r from-transparent via-cyber-blue to-transparent overflow-hidden"
            animate={{
              scaleX: [1, 1.2, 0.8, 1],
              opacity: [0.6, 1, 0.6],
              x: ["-5%", "5%", "-5%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <motion.div
              className="w-full h-full bg-cyber-pink"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
          
          <div className="hero-subtitle text-center">
            <p className="text-[24px] font-['IBM_Plex_Mono',monospace] font-semibold text-white mb-4">
              The Biggest Technical Festival of IIIT Bangalore
            </p>
            
            <div className="hidden md:flex justify-center items-center w-full mx-auto">
              <div className="w-full max-w-xl mx-auto">
                <RotatingText 
                  prefix="Join us for an immersive journey into"
                  words={[
                    { text: "\u00A0technology", className: "tech-color" },
                    { text: "\u00A0innovation", className: "innovation-color" },
                    { text: "\u00A0creativity", className: "creativity-color" }
                  ]}
                  delay={4000}
                />
              </div>
            </div>
          </div>
          
          <div className="hero-button">
            <Button 
              title="REGISTER NOW" 
              containerClass="mx-auto hover-effect-button"
            />
          </div>
        </div>
      </section>
      
      {/* Main Content Sections */}
      <div className="animate-section">
        <AboutSection />
      </div>
      
      <div className="animate-section" id="explore">
        <ExploreSection />
      </div>
      
      <div className="animate-section">
        <EventsSection />
      </div>
      
      <div className="animate-section">
        <TimelineSection />
      </div>
      
      <div className="animate-section">
        <ContactSection />
      </div>
      
      {/* Footer */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-cyber-dark via-cyber-blue/5 to-cyber-dark py-16 px-4">
        {/* Circuit board pattern background */}
        <div 
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: 'url("/grid.svg")',
            backgroundSize: '30px 30px',
            backgroundRepeat: 'repeat',
          }}
        ></div>
        
        {/* Animated circuits and data points */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Horizontal data lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div 
              key={`h-line-${i}`}
              className="absolute h-[1px] bg-gradient-to-r from-cyber-blue/0 via-cyber-blue/50 to-cyber-blue/0"
              style={{ top: `${15 + i * 20}%`, width: '100%' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ 
                duration: 2, 
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 5
              }}
            />
          ))}
          
          {/* Vertical data lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div 
              key={`v-line-${i}`}
              className="absolute w-[1px] bg-gradient-to-b from-cyber-pink/0 via-cyber-pink/30 to-cyber-pink/0"
              style={{ 
                left: `${10 + i * 12}%`, 
                height: '100%',
                top: 0
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ 
                duration: 1.5, 
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: 'loop',
                repeatDelay: 4
              }}
            />
          ))}
          
          {/* Data points with fixed positions */}
          {footerDataPoints.map((point, i) => (
            <motion.div
              key={`data-point-${i}`}
              className="absolute h-1 w-1 rounded-full bg-cyber-blue"
              style={{ 
                left: `${point.x}%`, 
                top: `${point.y}%` 
              }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 1 + (i % 5)
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Animated title with glow effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
          <AnimatedTitle 
            title="Syner<b>g</b>y 2025" 
              containerClass="mb-10 !text-4xl"
            />
            
            {/* Glowing line separator */}
            <div className="relative h-0.5 w-48 mx-auto mb-10 overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-cyber-blue via-cyber-pink to-cyber-blue"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
            
            {/* New Footer content - Technical Stats & Countdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Tech Stats */}
              <div className="cyber-card bg-cyber-dark/50">
                <h3 className="text-xl font-cyber text-cyber-blue mb-6">Synergy 2025 Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Attendees', value: '2500+', icon: '👥' },
                    { label: 'Events', value: '30+', icon: '🎮' },
                    { label: 'Workshops', value: '15+', icon: '🔧' },
                    { label: 'Prize Pool', value: '₹10L+', icon: '🏆' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="text-center p-3 rounded-lg bg-cyber-blue/5 border border-cyber-blue/20"
                    >
                      <div className="text-2xl mb-1">{stat.icon}</div>
                      <div className="font-cyber text-xl text-cyber-pink">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Dynamic Countdown Timer */}
              <div className="cyber-card bg-cyber-dark/50">
                <h3 className="text-xl font-cyber text-cyber-blue mb-6">Launching in</h3>
                <div className="flex justify-around">
                  {[
                    { label: 'Days', value: timeRemaining.days },
                    { label: 'Hours', value: timeRemaining.hours },
                    { label: 'Minutes', value: timeRemaining.minutes },
                    { label: 'Seconds', value: timeRemaining.seconds }
                  ].map((unit, i) => (
                    <motion.div 
                      key={unit.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="relative">
                        <div className="bg-cyber-blue/10 border border-cyber-blue/30 rounded-lg w-16 h-16 flex items-center justify-center">
                          <motion.span 
                            className="font-orbitron text-2xl text-cyber-blue"
                            animate={{
                              opacity: [0.7, 1, 0.7],
                              textShadow: [
                                '0 0 5px rgba(0, 163, 255, 0.5)',
                                '0 0 10px rgba(0, 163, 255, 0.8)',
                                '0 0 5px rgba(0, 163, 255, 0.5)'
                              ]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >
                            {unit.value}
                          </motion.span>
                        </div>
                        <motion.div 
                          className="absolute -bottom-1 left-0 h-[2px] bg-cyber-pink/70" 
                          initial={{ width: '0%' }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                        />
                      </div>
                      <div className="mt-2 text-sm text-gray-400">{unit.label}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Copyright with animated code - Updated text */}
            <div className="border-t border-cyber-blue/20 pt-6">
              <p className="text-gray-400">
            © {new Date().getFullYear()} Synergy - IIIT Bangalore. All rights reserved.
          </p>
              <motion.div
                className="mt-3 inline-block bg-cyber-dark/80 px-4 py-2 rounded-lg border border-cyber-blue/20 text-xs font-mono"
                animate={{ 
                  boxShadow: ['0 0 0px rgba(0,163,255,0)', '0 0 8px rgba(0,163,255,0.5)', '0 0 0px rgba(0,163,255,0)'],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
              >
                <motion.span
                  className="text-cyber-blue"
                  animate={{
                    opacity: [1, 1, 1, 0, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                  }}
                >
                  {'<'}
                </motion.span>
                <span className="text-cyber-pink">coded</span>
                <span className="text-gray-400"> with </span>
                <motion.span
                  className="text-red-500"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                >
                  ❤️
                </motion.span>
                <span className="text-gray-400"> by </span>
                <span className="text-cyber-blue">IIIT-B</span>
                <span className="text-gray-400"> tech team</span>
                <span className="text-cyber-pink"> led by Sushmit Biswas</span>
                <motion.span
                  className="text-cyber-blue"
                  animate={{
                    opacity: [1, 1, 1, 0, 1],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                    delay: 0.1,
                  }}
                >
                  {'>'}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}