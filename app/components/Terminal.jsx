'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Terminal = ({ onMatrixToggle }) => {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Nkosi v2.0.25' },
    { type: 'system', content: 'Type "help" for available commands' },
  ])
  const inputRef = useRef(null)
  const terminalRef = useRef(null)
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true })

  const commands = {
    help: () => [
      { type: 'output', content: 'Available commands:' },
      { type: 'output', content: '  about     - Display bio information' },
      { type: 'output', content: '  skills    - List technical skills' },
      { type: 'output', content: '  education - Show education history' },
      { type: 'output', content: '  contact   - Display contact information' },
      { type: 'output', content: '  projects  - View recent projects' },
      { type: 'output', content: '  matrix    - Toggle matrix rain effect' },
      { type: 'output', content: '  clear     - Clear terminal' },
      { type: 'output', content: '  sudo hire me - Special command ;)' },
    ],
    about: () => [
      { type: 'output', content: 'Loading profile...' },
      { type: 'output', content: '─────────────────────────────────────' },
      { type: 'output', content: 'Name: Nkosinathi Gift Mnguni' },
      { type: 'output', content: 'Role: Team Leader & Full Stack Developer' },
      { type: 'output', content: 'Location: Johannesburg, South Africa' },
      { type: 'output', content: 'Experience: 2+ years' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Bio: Tech lead who went from writing code to leading teams that deliver applications to thousands of users. Passionate about clean code, modern frameworks, and solving complex problems.' },
    ],
    skills: () => [
      { type: 'output', content: 'Technical Skills:' },
      { type: 'output', content: '─────────────────────────────────────' },
      { type: 'output', content: 'Frontend:  React.js, Next.js, React Native, Tailwind CSS' },
      { type: 'output', content: 'Backend:   Node.js, RESTful APIs, Firebase' },
      { type: 'output', content: 'Database:  Firebase, SQL, Oracle, MySQL' },
      { type: 'output', content: 'Tools:     Git, Jira, VS Code, npm' },
      { type: 'output', content: 'Cloud:     Google Cloud, Vercel' },
      { type: 'output', content: 'Languages: JavaScript, Java, C++' },
    ],
    education: () => [
      { type: 'output', content: 'Education History:' },
      { type: 'output', content: '─────────────────────────────────────' },
      { type: 'output', content: '2019-2022: Diploma in Information Technology' },
      { type: 'output', content: '           Tshwane University of Technology' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Awards:' },
      { type: 'output', content: '• Top Junior Leadership Program (2021-2022)' },
      { type: 'output', content: '• Most Resourceful Junior Award' },
    ],
    contact: () => [
      { type: 'output', content: 'Contact Information:' },
      { type: 'output', content: '─────────────────────────────────────' },
      { type: 'output', content: 'Email:    nkosinathi@mnguni.dev' },
      { type: 'output', content: 'Phone:    076 075 3866' },
      { type: 'output', content: 'LinkedIn: /in/nkosinathi-mnguni' },
      { type: 'output', content: 'GitHub:   /nkosinathi-mnguni' },
    ],
    projects: () => [
      { type: 'output', content: 'Recent Projects:' },
      { type: 'output', content: '─────────────────────────────────────' },
      { type: 'output', content: '1. Med-Mobi Chatbot - AI healthcare assistant' },
      { type: 'output', content: '2. GBV Emergency App - Crisis response system' },
      { type: 'output', content: '3. FIXIT - Campus maintenance platform' },
      { type: 'output', content: '4. Ticketing System - Event management solution' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Type "cd projects" to view in detail' },
    ],
    matrix: () => {
      onMatrixToggle()
      return [{ type: 'output', content: 'Matrix rain effect toggled!' }]
    },
    clear: () => {
      setHistory([
        { type: 'system', content: 'Terminal cleared.' },
        { type: 'system', content: 'Type "help" for available commands' },
      ])
      return []
    },
    'sudo hire me': () => [
      { type: 'output', content: '[sudo] password for recruiter: ********' },
      { type: 'success', content: 'Access granted!' },
      { type: 'output', content: '' },
      { type: 'output', content: '🎉 Congratulations! You\'ve unlocked:' },
      { type: 'output', content: '• A passionate full-stack developer' },
      { type: 'output', content: '• Proven team leadership skills' },
      { type: 'output', content: '• Strong problem-solving abilities' },
      { type: 'output', content: '• Commitment to clean, scalable code' },
      { type: 'output', content: '' },
      { type: 'output', content: 'Ready to build something amazing together?' },
    ],
  }

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    const newHistory = [...history, { type: 'input', content: `$ ${cmd}` }]

    if (commands[trimmedCmd]) {
      setHistory([...newHistory, ...commands[trimmedCmd]()])
    } else if (trimmedCmd === '') {
      setHistory(newHistory)
    } else {
      setHistory([
        ...newHistory,
        { type: 'error', content: `Command not found: ${cmd}` },
        { type: 'output', content: 'Type "help" for available commands' },
      ])
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  return (
    <section id="about" className="py-20 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-display font-bold text-center mb-12">
            <span className="gradient-text">About Me</span>
          </h2>

          <div className="glass rounded-lg p-6 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-gray-400 font-mono">terminal@nkosinathi</span>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              className="h-96 overflow-y-auto font-mono text-sm"
              onClick={() => inputRef.current?.focus()}
            >
              {history.map((item, index) => (
                <div key={index} className="mb-2">
                  {item.type === 'input' && (
                    <div className="text-primary">{item.content}</div>
                  )}
                  {item.type === 'output' && (
                    <div className="text-gray-300">{item.content}</div>
                  )}
                  {item.type === 'system' && (
                    <div className="text-green-400">{item.content}</div>
                  )}
                  {item.type === 'error' && (
                    <div className="text-red-400">{item.content}</div>
                  )}
                  {item.type === 'success' && (
                    <div className="text-green-400 font-bold">{item.content}</div>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-primary mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-100"
                  autoFocus
                />
                <span className="terminal-cursor ml-1"></span>
              </form>
            </div>
          </div>

          <div className="text-center mt-6 text-sm text-gray-400">
            <p>Interactive terminal - Try typing commands!</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Terminal