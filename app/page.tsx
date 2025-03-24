'use client';

import { useEffect } from 'react';
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

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
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
      
      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid Background */}
        <div 
          className="grid-background absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: 'url("/grid.svg")',
            backgroundSize: '30px 30px',
            backgroundRepeat: 'repeat',
            backgroundPosition: '0% 0%',
          }}
        ></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyber-blue/10 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-cyber-pink/10 blur-3xl"
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1
            }}
          />
        </div>
        
        {/* Hero Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="hero-title text-6xl md:text-8xl font-orbitron text-cyber-blue mb-6">
            SYNERGY <span className="text-cyber-pink">2025</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
            The biggest technical festival of IIIT Bangalore. Join us for an immersive journey into technology, innovation, and creativity.
          </p>
          <div className="hero-button">
            <Button 
              title="Register Now" 
              containerClass="mx-auto bg-cyber-pink hover:bg-cyber-pink/80"
            />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="animate-section">
        <AboutSection />
      </div>
      
      <div className="animate-section">
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
      <footer className="bg-cyber-dark py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <AnimatedTitle 
            title="Syner<b>g</b>y 2025" 
            containerClass="mb-6 !text-4xl"
          />
          <p className="text-gray-400 mb-8">
            © {new Date().getFullYear()} Synergy - IIIT Bangalore. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
} 