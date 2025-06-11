'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Terminal from './components/Terminal'
import SkillsRadar from './components/SkillsRadar'
import ProjectTimeline from './components/ProjectTimeline'
import Experience from './components/Experience'
import Contact from './components/Contact'
import MatrixRain from './components/MatrixRain'
import EasterEgg from './components/EasterEgg'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
  const favicon = document.querySelector("link[rel='icon']");
  const frames = ['/favicon.ico'];
  let current = 0;
  
  setInterval(() => {
    current = (current + 1) % frames.length;
    favicon.href = frames[current];
  }, 1000);
}, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loader" />
        ) : (
          <>
            {showMatrix && <MatrixRain />}
            <Navigation />
            <main className="relative">
              <Hero />
              <Terminal onMatrixToggle={() => setShowMatrix(!showMatrix)} />
              <SkillsRadar />
              <ProjectTimeline />
              <Experience />
              <Contact />
            </main>
            <EasterEgg key="easter-egg" />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}