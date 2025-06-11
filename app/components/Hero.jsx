'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Typed from 'typed.js'

const Hero = () => {
  const typedRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    // Typing animation
    const typed = new Typed(typedRef.current, {
      strings: [
        'Full Stack Developer',
        'Team Leader',
        'React Specialist',
        'Problem Solver',
        'Tech Innovator'
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: '_'
    })

    // Particle animation
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = []
    const particleCount = 100

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 2 - 1
        this.speedY = Math.random() * 2 - 1
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY
      }

      draw() {
        ctx.fillStyle = `rgba(0, 217, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const distance = Math.hypot(
            particle.x - otherParticle.x,
            particle.y - otherParticle.y
          )
          
          if (distance < 100) {
            ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      typed.destroy()
      window.removeEventListener('resize', handleResize)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        id="particle-canvas"
      />

      {/* Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 z-0" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6"
      >
        <motion.div variants={itemVariants} className="mb-4">
          <span className="text-primary font-mono text-sm md:text-base">Hello, World! I&apos;m</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-display font-bold mb-6"
        >
          <span className="gradient-text">Nkosinathi Mnguni</span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-2xl md:text-3xl font-mono mb-8 h-10"
        >
          <span ref={typedRef} className="text-primary"></span>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-gray-300 max-w-2xl mx-auto mb-12 text-sm md:text-base"
        >
          Tech lead and developer who loves building things that matter. 
          Passionate about clean code, modern tech stacks, and creating 
          exceptional user experiences.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-mono font-medium hover:shadow-neon transition-all"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border border-primary rounded-full font-mono hover:bg-primary hover:text-dark transition-all"
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute sm:bottom-[60px] bottom-[130px] left-[49%] transform -translate-x-[60%]"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-primary"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-primary opacity-20 text-6xl font-mono animate-float">
        {'</>'}
      </div>
      <div className="absolute bottom-20 right-10 text-secondary opacity-20 text-6xl font-mono animate-float" style={{ animationDelay: '1s' }}>
        {'{}'}
      </div>
    </section>
  )
}

export default Hero