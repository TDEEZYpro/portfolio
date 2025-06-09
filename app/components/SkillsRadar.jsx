'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const SkillsRadar = () => {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })
  const [animatedData, setAnimatedData] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const skills = {
    labels: ['React/Next.js', 'Node.js', 'React Native', 'Firebase', 'SQL/NoSQL', 'Team Leadership', 'System Design', 'API Development'],
    datasets: [
      {
        label: 'Skill Level',
        data: animatedData,
        backgroundColor: 'rgba(0, 217, 255, 0.2)',
        borderColor: 'rgba(0, 217, 255, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(0, 217, 255, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 217, 255, 1)',
      },
    ],
  }

  const targetData = [95, 85, 90, 88, 85, 92, 80, 90]

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setAnimatedData(current => 
          current.map((value, index) => {
            const target = targetData[index]
            const increment = target / 20
            return value < target ? Math.min(value + increment, target) : target
          })
        )
      }, 50)

      return () => clearInterval(interval)
    }
  }, [inView])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 46, 0.9)',
        titleColor: '#00D9FF',
        bodyColor: '#fff',
        borderColor: '#00D9FF',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context) => `Proficiency: ${context.parsed.r}%`,
        },
      },
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        pointLabels: {
          color: '#fff',
          font: {
            size: 12,
            family: 'Fira Code',
          },
        },
        ticks: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  }

  const skillCategories = [
    {
      title: 'Frontend',
      skills: ['React.js', 'Next.js', 'React Native', 'Tailwind CSS', 'HTML5/CSS3'],
      color: 'from-primary to-blue-500',
    },
    {
      title: 'Backend',
      skills: ['Node.js', 'RESTful APIs', 'Firebase', 'Java', 'C++'],
      color: 'from-secondary to-purple-500',
    },
    {
      title: 'Database',
      skills: ['Firebase', 'Oracle SQL', 'MySQL', 'NoSQL', 'MS Access'],
      color: 'from-accent to-pink-500',
    },
    {
      title: 'Tools & Other',
      skills: ['Git/GitHub', 'Jira', 'VS Code', 'Google Cloud', 'Agile'],
      color: 'from-green-400 to-teal-500',
    },
  ]

  return (
    <section id="skills" className="py-20 px-6 overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            <span className="gradient-text">Technical Skills</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Radar Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[400px] relative"
            >
              <Radar data={skills} options={options} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary">92%</div>
                  <div className="text-sm text-gray-400">Overall Proficiency</div>
                </div>
              </div>
            </motion.div>

            {/* Skill Categories */}
            <div className="space-y-6">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, x: 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass p-6 rounded-lg hover-lift"
                >
                  <h3 className={`text-xl font-bold mb-4 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: (index * 0.1) + (skillIndex * 0.05) }}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs font-mono hover:border-primary transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <h3 className="text-2xl font-bold mb-8 text-primary">Soft Skills</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Leadership', 'Communication', 'Problem Solving', 'Mentorship', 'Adaptability', 'Team Collaboration'].map((skill, index) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05, rotate: Math.random() * 10 - 5 }}
                  className="px-6 py-3 glass rounded-full border border-primary/30 hover:border-primary transition-colors"
                >
                  <span className="font-mono text-sm">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsRadar