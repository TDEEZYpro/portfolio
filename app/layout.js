import { Orbitron, Fira_Code } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const metadata = {
  title: "Nkosinathi Mnguni | Full Stack Developer & Team Leader",
  description:
    "Full Stack developer who loves building things that matter. In three years, I've gone from writing code to have recently leading a team that delivered marketing and applications to thousands of users. Passionate about clean code, new tech, and solving tough problems.",
  keywords: [
    "Nkosinathi Mnguni",
    "Full Stack Developer",
    "React Developer",
    "Node.js",
    "Team Leader",
    "Software Engineer",
    "Johannesburg",
  ],
  authors: [{ name: "Nkosinathi Mnguni" }],
  creator: "Nkosinathi Mnguni",
  publisher: "Nkosinathi Mnguni",
  metadataBase: new URL("https://mnguni.dev"),
  openGraph: {
    title: "Nkosinathi Mnguni - Full Stack Developer",
    description:
      "Full Stack developer who loves building things that matter. In three years, I've gone from writing code to have recently leading a team that delivered marketing and applications to thousands of users.",
    url: "https://mnguni.dev",
    siteName: "Nkosinathi Mnguni Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nkosinathi Mnguni - Full Stack Developer",
    description:
      "Full Stack developer who loves building things that matter. In three years, I've gone from writing code to have recently leading a team that delivered marketing and applications to thousands of users.",
    images: ["/nm-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/nm-logo.png", type: "image/png" },
    ],
    apple: "/nm-logo.png",
  },
};

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
              console.log('%chttps://github.com/TDEEZYpro/portfolio', 'font-size: 12px; color: #FF006E;');
              console.log('%c💡 Pro tip: Try the Konami code on the website! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA', 'font-size: 12px; color: #39FF14;');
            `,
          }}
        />
      </head>
      <body className="font-mono bg-dark text-white">{children}</body>
    </html>
  );
}
