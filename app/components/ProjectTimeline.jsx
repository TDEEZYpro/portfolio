'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const ProjectTimeline = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: 'Ticketing & Donation System',
      period: '2024',
      company: 'Land and Sea Shipping',
      description: 'End-to-end event management system with QR code validation and automated receipts',
      tech: ['React.js', 'Node.js', 'Firebase', 'QR Technology'],
      highlights: [
        'Handles thousands of concurrent users',
        'Real-time ticket validation',
        'Automated email receipt system',
        'Secure payment integration'
      ],
      color: 'from-primary to-blue-500',
    },
    {
      id: 2,
      title: 'Med-Mobi Chatbot',
      period: '2022 - 2023',
      company: 'University Project',
      description: 'AI-powered healthcare assistant for seamless appointment booking',
      tech: ['Python', 'React Native', 'NLTK', 'Machine Learning'],
      highlights: [
        'Natural language processing',
        'Personalized user experience',
        'Separate interfaces for patients and doctors',
        'Real-time database synchronization'
      ],
      color: 'from-secondary to-purple-500',
    },
    {
      id: 3,
      title: 'Emergency App for GBV Alert',
      period: '2022',
      company: 'Social Impact Project',
      description: 'Crisis response mobile application for gender-based violence reporting',
      tech: ['React Native', 'Firebase', 'GPS API', 'Emergency Services Integration'],
      highlights: [
        'One-tap emergency alerts',
        'Real-time location tracking',
        'Discreet UI for high-stress situations',
        'Direct emergency services integration'
      ],
      color: 'from-accent to-pink-500',
    },
    {
      id: 4,
      title: 'FIXIT Reporting System',
      period: '2022',
      company: 'Campus Solution',
      description: 'Comprehensive maintenance reporting and tracking system',
      tech: ['Android Studio', 'Java', 'Firebase', 'Push Notifications'],
      highlights: [
        'Automated maintenance team notifications',
        'Photo upload functionality',
        'Status tracking system',
        'Mobile-first design'
      ],
      color: 'from-green-400 to-teal-500',
    },
  ]

  return (
    <section id="projects" className="py-20 px-6 overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            <span className="gradient-text">Featured Projects</span>
          </h2>

          {/* Timeline */}
          <div className="relative">
            {/* Center Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>

            {/* Projects */}
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`mb-12 md:mb-16 flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div className="w-full md:w-5/12">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedProject(project)}
                    className="glass p-6 rounded-lg cursor-pointer hover-lift"
                  >
                    <div className={`text-sm font-mono mb-2 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                      {project.period}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.company}</p>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-r ${project.color} shadow-neon`}
                  />
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">
              Want to see more? Check out my GitHub for additional projects and contributions.
            </p>
            <motion.a
              href="https://github.com/TDEEZYpro"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary rounded-full font-mono hover:bg-primary hover:text-dark transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              View GitHub
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-w-2xl w-full p-8 rounded-xl"
            >
              <div className={`text-sm font-mono mb-2 bg-gradient-to-r ${selectedProject.color} bg-clip-text text-transparent`}>
                {selectedProject.period}
              </div>
              <h3 className="text-3xl font-bold mb-4">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-6">{selectedProject.description}</p>
              
              <h4 className="text-xl font-bold mb-3 text-primary">Key Features</h4>
              <ul className="space-y-2 mb-6">
                {selectedProject.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">▸</span>
                    <span className="text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2 bg-primary text-dark rounded-full font-mono font-medium hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default ProjectTimeline