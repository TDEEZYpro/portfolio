import { Orbitron, Fira_Code } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
})

const firaCode = Fira_Code({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

export const metadata = {
  title: 'Nkosinathi Mnguni | Full Stack Developer & Team Leader',
  description: 'Tech lead and developer who loves building things that matter. Passionate about clean code, modern tech stacks, and creating exceptional user experiences.',
  keywords: ['Nkosinathi Mnguni', 'Full Stack Developer', 'React Developer', 'Node.js', 'Team Leader', 'Software Engineer', 'Johannesburg'],
  authors: [{ name: 'Nkosinathi Mnguni' }],
  creator: 'Nkosinathi Mnguni',
  publisher: 'Nkosinathi Mnguni',
  metadataBase: new URL('https://mnguni.dev'),
  openGraph: {
    title: 'Nkosinathi Mnguni - Full Stack Developer',
    description: 'Tech lead and developer who loves building things that matter. Passionate about clean code and modern tech stacks.',
    url: 'https://mnguni.dev',
    siteName: 'Nkosinathi Mnguni Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nkosinathi Mnguni - Full Stack Developer',
    description: 'Tech lead and developer who loves building things that matter.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${firaCode.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Console Easter Egg
              console.log('%c👋 Hey there, fellow developer!', 'font-size: 24px; font-weight: bold; color: #00D9FF;');
              console.log('%cLooking for the source code? You can find me on GitHub!', 'font-size: 14px; color: #BD00FF;');
              console.log('%chttps://github.com/nkosinathi-mnguni', 'font-size: 12px; color: #FF006E;');
              console.log('%c💡 Pro tip: Try the Konami code on the website! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #39FF14;');
            `,
          }}
        />
      </head>
      <body className="font-mono bg-dark text-white">
        {children}
      </body>
    </html>
  )
}