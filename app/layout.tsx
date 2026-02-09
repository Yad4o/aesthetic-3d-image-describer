import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import { BlinkProvider } from '@/components/providers/blink-provider'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata_unused: Metadata = {
  title: 'Aesthetic 3D Image Describer',
  description: 'AI-powered poetic image descriptions in a stunning 3D environment',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <BlinkProvider>
          {children}
        </BlinkProvider>
      </body>
    </html>
  )
}
