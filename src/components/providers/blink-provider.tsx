'use client'

import { BlinkProvider as BaseBlinkProvider, BlinkAuthProvider } from '@blinkdotnew/react'

export function BlinkProvider({ children }: { children: React.ReactNode }) {
  // Use public env vars for client-side
  const projectId = process.env.NEXT_PUBLIC_BLINK_PROJECT_ID || 'demo-project'
  const publishableKey = process.env.NEXT_PUBLIC_BLINK_PUBLISHABLE_KEY

  return (
    <BaseBlinkProvider 
      projectId={projectId}
      publishableKey={publishableKey}
    >
      <BlinkAuthProvider>
        {children}
      </BlinkAuthProvider>
    </BaseBlinkProvider>
  )
}
