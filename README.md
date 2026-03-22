# Vision3D | Aesthetic AI Image Decomposition

![Vision3D Banner](https://cdn.blink.new/screenshots/ai-image-describer-tg7nyf4s.sites.blink.new-1770603777887.webp)

**Vision3D** is a futuristic, immersive web application that translates visual frequencies into poetic narratives. Developed by **Yad4o**, this platform combines high-performance 3D graphics with state-of-the-art AI Vision to provide an unparalleled aesthetic analysis of your media.

## ✨ Features

- **Immersive 3D Canvas**: Experience an infinite starfield and floating nebulas powered by `Three.js` and `@react-three/fiber`.
- **Aesthetic AI Intelligence**: Utilizing Gemini 1.5 Flash Vision to decode composition, lighting, and mood into evocative prose.
- **Secure Architecture**: Next.js App Router with server-side API routes ensures that visual intelligence is processed securely.
- **Personal Archives**: Persistent history tracking allows you to revisit your aesthetic journeys at any time.
- **Glassmorphic Interface**: A high-fidelity, high-contrast UI designed for the modern web.

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Framer Motion
- **3D Engine**: Three.js, React Three Fiber, Drei
- **Backend Infrastructure**: Next.js API Routes, Yad4o (Blink) SDK
- **Database & Auth**: Yad4o (Blink) Realtime Database & Authentication
- **AI Engine**: Google Gemini 3 Flash (via Secure Proxy)

## 🛠️ Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (Recommended) or Node.js
- Yad4o (Blink) Project Credentials

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Yad4o/aesthetic-3d-image-describer.git
   cd aesthetic-3d-image-describer
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables:
   Create a `.env.local` file based on `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

## 🔒 Security

Vision3D is built with a **Security-First** mindset:
- **Zero Client Exposure**: AI keys and sensitive processing logic are restricted to the server-side Next.js environment.
- **Row-Level Security (RLS)**: User data is protected at the database level, ensuring that archives are strictly personal.
- **Secure Media Pipeline**: Images are uploaded to encrypted storage before analysis.

## 🌐 Deployment

This project is optimized for deployment on **Vercel**. 

1. Push your changes to GitHub.
2. Connect your repository to Vercel.
3. Add the following environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_BLINK_PROJECT_ID`
   - `NEXT_PUBLIC_BLINK_PUBLISHABLE_KEY`
   - `BLINK_SECRET_KEY`

---

Built with passion by **Yad4o**.
