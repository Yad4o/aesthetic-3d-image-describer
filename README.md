# Aesthetic 3D Image Describer

A high-performance, production-ready AI Image Description Generator built with Next.js, Three.js, and Gemini Vision.

## Features
- **Next.js App Router**: Optimized performance and SEO.
- **Secure Backend**: All AI calls are processed server-side via API routes.
- **Immersive 3D Experience**: Dynamic Starfield and Floating Spheres using `@react-three/fiber`.
- **Aesthetic AI Vision**: Detailed, poetic, and mood-aware image descriptions.
- **Glassmorphic UI**: Futuristic, high-contrast cyber aesthetic.
- **History Persistence**: Automatic analysis history stored in SQLite.

## Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **3D Engine**: Three.js, React Three Fiber, Drei
- **Backend**: Next.js API Routes, Blink SDK (Auth, DB, AI)
- **AI Model**: Gemini 1.5 Flash (via Blink AI)

## Getting Started

1. **Environment Variables**:
   Copy `.env.example` to `.env.local` and add your project keys.
   ```bash
   cp .env.example .env.local
   ```

2. **Installation**:
   ```bash
   bun install
   ```

3. **Development**:
   ```bash
   bun dev
   ```

4. **Production Build**:
   ```bash
   bun build
   bun start
   ```

## Security
- **AI Keys**: Never exposed to the client. Managed via `BLINK_SECRET_KEY` on the server.
- **Authentication**: Managed via Blink Auth for secure user sessions.
- **Database**: SQLite with RLS (Row Level Security) ensuring users only see their own history.

## Deployment
Ready for deployment on **Vercel**. Simply connect your repository and add the environment variables.
