/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00D9FF',
        secondary: '#BD00FF',
        accent: '#FF006E',
        dark: '#0A0A0F',
        'dark-light': '#1A1A2E',
        'neon-green': '#39FF14',
      },
      animation: {
        'text-glow': 'text-glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'matrix-rain': 'matrix-rain 20s linear infinite',
      },
      keyframes: {
        'text-glow': {
          'from': {
            'text-shadow': '0 0 10px #00D9FF, 0 0 20px #00D9FF, 0 0 30px #00D9FF, 0 0 40px #00D9FF',
          },
          'to': {
            'text-shadow': '0 0 20px #00D9FF, 0 0 30px #00D9FF, 0 0 40px #00D9FF, 0 0 50px #00D9FF',
          }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'matrix-rain': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': "linear-gradient(rgba(0, 217, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 217, 255, 0.1) 1px, transparent 1px)",
      },
      fontFamily: {
        'mono': ['var(--font-fira-code)', 'Consolas', 'Monaco', 'monospace'],
        'display': ['var(--font-orbitron)', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(189, 0, 255, 0.5), 0 0 40px rgba(189, 0, 255, 0.3)',
      }
    },
  },
  plugins: [],
}