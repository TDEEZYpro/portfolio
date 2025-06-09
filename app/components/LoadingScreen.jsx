'use client'

import { motion } from 'framer-motion'

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-dark z-50 flex items-center justify-center"
    >
      <div className="relative">
        <div className="w-32 h-32 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-mono text-xl font-bold">NM</span>
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 text-gray-400 font-mono text-sm"
      >
        Initializing Portfolio...
      </motion.p>
    </motion.div>
  )
}

export default LoadingScreen