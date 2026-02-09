import { NextResponse } from 'next/server'
import { createClient } from '@blinkdotnew/sdk'

// Initialize Blink SDK with server-side secrets if available
// Note: Blink SDK automatically handles auth via project ID and secret key if provided
const blink = createClient({
  projectId: process.env.BLINK_PROJECT_ID || process.env.NEXT_PUBLIC_BLINK_PROJECT_ID || 'demo-project',
  secretKey: process.env.BLINK_SECRET_KEY, // Server-side only
})

export async function POST(request: Request) {
  try {
    const { imageUrl, userId } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Call Gemini Vision via Blink SDK (secure server-side call)
    const { text } = await blink.ai.generateText({
      model: 'google/gemini-3-flash',
      messages: [
        {
          role: 'system',
          content: `You are an expert aesthetic image describer. Your goal is to transform visual data into a poetic and immersive experience.
          
          Structure your response exactly as follows:
          
          # POETIC TITLE: [A short, evocative title]
          
          # AESTHETIC DESCRIPTION: [A detailed, sensory-rich paragraph describing the scene, textures, and lighting.]
          
          # MOOD & INTERPRETATION: [A brief analysis of the emotional resonance and visual style.]
          
          Avoid generic phrases. Use evocative language. Focus on atmosphere.`
        },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Provide a professional aesthetic analysis of this image.' },
            { type: 'image', image: imageUrl }
          ]
        }
      ]
    })

    // Save to database if userId is provided
    if (userId) {
      await (blink.db as any).history.create({
        userId,
        imageUrl,
        description: text,
        createdAt: new Date().toISOString()
      })
    }

    return NextResponse.json({ 
      imageUrl, 
      description: text 
    })
  } catch (error: any) {
    console.error('AI Analysis API failed:', error)
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 })
  }
}
