import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

const _inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const _jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' })

export const metadata: Metadata = {
  title: 'LeadReply AI - Intelligent Auto-Reply Dashboard',
  description: 'AI-powered auto-reply tool for managing leads, composing intelligent responses, and tracking engagement analytics.',
}

export const viewport: Viewport = {
  themeColor: '#0f1117',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${_inter.variable} ${_jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
