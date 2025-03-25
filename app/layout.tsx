import type { Metadata } from 'next'
import { Inter, Orbitron, Press_Start_2P } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' })
const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p'
})

export const metadata: Metadata = {
  title: 'Synergy 2025 - IIIT Bangalore TechFest',
  description: 'The biggest technical festival of IIIT Bangalore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} ${pressStart2P.variable}`}>
      <body suppressHydrationWarning className="bg-cyber-dark text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
} 