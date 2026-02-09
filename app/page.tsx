'use client'

import React from 'react'
import { useBlinkAuth } from '@blinkdotnew/react'
import { blink } from '@/lib/blink'
import { ThreeBackground } from '@/components/ThreeBackground'
import { Navbar } from '@/components/Navbar'
import { Dashboard } from '@/components/Dashboard'
import { Landing } from '@/components/Landing'
import { Toaster } from 'sonner'

export default function Home() {
  const { isAuthenticated, isLoading, user } = useBlinkAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <ThreeBackground />
      <Navbar />
      
      <main className="container relative mx-auto px-4 py-8 z-10">
        {!isAuthenticated ? (
          <Landing onLogin={() => blink.auth.login(window.location.href)} />
        ) : (
          <Dashboard user={user!} />
        )}
      </main>

      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  )
}
