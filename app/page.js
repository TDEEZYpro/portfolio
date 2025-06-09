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
  const [loading, setLoading] = useState(true)
  const [showMatrix, setShowMatrix] = useState(false)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

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
            <EasterEgg />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}