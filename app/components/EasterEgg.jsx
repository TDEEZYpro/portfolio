'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EasterEgg = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [konamiCode, setKonamiCode] = useState([])
  const correctSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

  useEffect(() => {
    const handleKeyPress = (e) => {
      const key = e.key.toLowerCase()
      const newSequence = [...konamiCode, key].slice(-10)
      setKonamiCode(newSequence)

      if (JSON.stringify(newSequence) === JSON.stringify(correctSequence)) {
        setShowEasterEgg(true)
        setKonamiCode([])
        
        // Auto-hide after 10 seconds
        setTimeout(() => setShowEasterEgg(false), 10000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [konamiCode])

  const achievements = [
    { icon: '🏆', title: 'Code Master', desc: 'You found the secret!' },
    { icon: '🚀', title: 'Easter Egg Hunter', desc: '+100 Developer Points' },
    { icon: '🎮', title: 'Konami Legend', desc: 'Achievement Unlocked!' },
    { icon: '💎', title: 'Hidden Gem', desc: 'Welcome to the club!' },
  ]

  return (
    <AnimatePresence>
      {showEasterEgg && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={() => setShowEasterEgg(false)}
          />

          {/* Easter Egg Content */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', damping: 15 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="pointer-events-auto">
              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-3xl opacity-50 animate-pulse"></div>
              
              <motion.div
                className="relative glass p-8 rounded-2xl max-w-md text-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 217, 255, 0.5)',
                    '0 0 40px rgba(189, 0, 255, 0.5)',
                    '0 0 20px rgba(255, 0, 110, 0.5)',
                    '0 0 20px rgba(0, 217, 255, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.h2
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-4xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_auto]"
                >
                  KONAMI CODE ACTIVATED!
                </motion.h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-gray-800/50 rounded-lg border border-gray-700"
                    >
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="text-sm font-bold text-primary">{achievement.title}</div>
                      <div className="text-xs text-gray-400">{achievement.desc}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6"
                >
                  <div className="text-6xl">🎉</div>
                </motion.div>

                <p className="text-gray-300 mb-4">
                  Congratulations! You&apos;ve discovered the secret easter egg. 
                  You&apos;re clearly someone who pays attention to details!
                </p>

                <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                  <span>Try also:</span>
                  <code className="px-2 py-1 bg-gray-800 rounded font-mono text-xs">sudo hire me</code>
                  <span>in the terminal</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowEasterEgg(false)}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full font-mono text-sm"
                >
                  Continue Exploring
                </motion.button>
              </motion.div>
            </div>
          </motion.div>

          {/* Confetti Effect */}
          <div className="fixed inset-0 z-50 pointer-events-none">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  rotate: 0,
                  scale: 0
                }}
                animate={{ 
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                  scale: [0, 1, 1, 0]
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  delay: Math.random() * 0.5,
                  ease: 'linear'
                }}
                className="absolute w-3 h-3"
                style={{
                  backgroundColor: ['#00D9FF', '#BD00FF', '#FF006E', '#39FF14'][Math.floor(Math.random() * 4)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                }}
              />
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EasterEgg