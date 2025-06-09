'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Experience = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const experiences = [
    {
      role: 'Team Leader & Intermediate Software Developer',
      company: 'Land and Sea Shipping',
      period: 'October 2024 - Present',
      description: 'Leading development teams and architecting full-stack solutions',
      achievements: [
        'Architected full-stack applications handling thousands of users',
        'Led migration from micro-services to monolithic architecture',
        'Mentored junior developers in modern JavaScript patterns',
        'Managed third-party integrations (Rocketseed, Yaxxa)',
        'Developed end-to-end ticketing and donation system'
      ],
      tech: ['React.js', 'Node.js', 'React Native', 'Next.js', 'Firebase'],
      color: 'from-primary to-blue-500',
    },
    {
      role: 'Intermediate Software Engineer',
      company: 'Land and Sea Shipping',
      period: 'April 2024 - October 2024',
      description: 'Spearheaded development of key platform features',
      achievements: [
        'Implemented robust error handling and logging systems',
        'Improved application architecture for scaling',
        'Delivered critical solutions independently',
        'Optimized database queries and API endpoints',
        'Identified and resolved security vulnerabilities'
      ],
      tech: ['React.js', 'Node.js', 'RESTful APIs', 'Database Optimization'],
      color: 'from-secondary to-purple-500',
    },
    {
      role: 'Full Stack Developer (Junior)',
      company: 'Land and Sea Shipping',
      period: 'August 2023 - April 2024',
      description: 'Built and maintained full-stack web and mobile applications',
      achievements: [
        'Developed responsive user interfaces with React Native',
        'Implemented RESTful APIs for client-server communication',
        'Created cross-platform mobile applications',
        'Contributed to database design using Firebase',
        'Participated in Agile development processes'
      ],
      tech: ['React Native', 'Firebase', 'Expo', 'Jira', 'CSS'],
      color: 'from-accent to-pink-500',
    },
  ]

  const stats = [
    { value: '2+', label: 'Years Experience' },
    { value: '3000+', label: 'Users Served' },
    { value: '4+', label: 'Projects Delivered' },
    { value: '4+', label: 'Team Members Led' },
  ]

  return (
    <section id="experience" className="py-20 px-6 overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            <span className="gradient-text">Work Experience</span>
          </h2>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                className="glass p-6 rounded-lg text-center hover-lift"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="text-3xl font-bold text-primary mb-2"
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="glass p-8 rounded-xl hover-lift"
                >
                  {/* Accent Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${exp.color} rounded-l-xl`}></div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold mb-2">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm">
                        <span className="text-primary font-mono">{exp.company}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{exp.period}</span>
                      </div>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, achieveIndex) => (
                          <motion.li
                            key={achieveIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.4, delay: index * 0.2 + achieveIndex * 0.05 }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">▸</span>
                            <span className="text-gray-300 text-sm">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:text-right">
                      <h4 className="text-sm font-mono text-gray-400 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {exp.tech.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1 }}
                            className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono hover:border-primary transition-colors"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Connection Line */}
                {index < experiences.length - 1 && (
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary to-transparent"></div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Growth Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-8">
              <span className="gradient-text">Career Growth</span>
            </h3>
            <div className="flex items-center justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 glass rounded-full text-sm font-mono"
              >
                Junior Developer
              </motion.div>
              <span className="text-primary">→</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 glass rounded-full text-sm font-mono"
              >
                Intermediate Engineer
              </motion.div>
              <span className="text-primary">→</span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 glass rounded-full text-sm font-mono border border-primary"
              >
                Team Leader
              </motion.div>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Rapid progression through dedication and continuous learning
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience