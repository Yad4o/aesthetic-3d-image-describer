'use client'

import { BlinkProvider as BaseYad4oProvider, BlinkAuthProvider as Yad4oAuthProvider } from '@blinkdotnew/react'

export function Yad4oProvider({ children }: { children: React.ReactNode }) {
  // Use public env vars for client-side
  const projectId = process.env.NEXT_PUBLIC_BLINK_PROJECT_ID || 'demo-project'
  const publishableKey = process.env.NEXT_PUBLIC_BLINK_PUBLISHABLE_KEY

  return (
    <BaseYad4oProvider 
      projectId={projectId}
      publishableKey={publishableKey}
    >
      <Yad4oAuthProvider>
        {children}
      </Yad4oAuthProvider>
    </BaseYad4oProvider>
  )
}