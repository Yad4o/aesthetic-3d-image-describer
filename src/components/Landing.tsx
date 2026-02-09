'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Camera } from 'lucide-react';

interface LandingProps {
  onLogin: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full glass border-white/10 px-4 py-1.5 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          <span>New: Hyper-detailed poetic descriptions</span>
        </div>
        
        <h1 className="mb-6 text-6xl font-black leading-tight sm:text-7xl">
          Descibe the <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Invisible</span>
        </h1>
        
        <p className="mb-10 text-xl text-muted-foreground leading-relaxed">
          Unlock aesthetic AI-powered descriptions of your images within an immersive 3D environment. 
          Experience art through words like never before.
        </p>

        <div className="flex items-center justify-center gap-6">
          <button
            onClick={onLogin}
            className="group relative rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            Start Journey
          </button>
          
          <button className="rounded-xl glass border-white/10 px-8 py-4 text-lg font-bold hover:bg-white/10 transition-colors">
            Learn More
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-3 w-full max-w-5xl"
      >
        <FeatureCard 
          icon={<Zap className="h-6 w-6" />}
          title="Instant Analysis"
          description="Powered by the latest Gemini 3 Flash vision models for rapid insights."
        />
        <FeatureCard 
          icon={<Camera className="h-6 w-6" />}
          title="Aesthetic Focus"
          description="AI trained to appreciate composition, color theory, and artistic mood."
        />
        <FeatureCard 
          icon={<Shield className="h-6 w-6" />}
          title="Secure History"
          description="Your analyzed images and poetic descriptions are saved securely to your profile."
        />
      </motion.div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="glass-card flex flex-col items-center p-8 rounded-2xl border-white/5 hover:border-white/20 transition-all hover:-translate-y-1">
    <div className="mb-4 rounded-xl bg-primary/10 p-3 text-primary">
      {icon}
    </div>
    <h3 className="mb-2 text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);