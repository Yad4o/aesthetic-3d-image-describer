'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropzone } from './Dropzone';
import { AnalysisResult } from './AnalysisResult';
import { HistoryList } from './HistoryList';
import { analyzeImage } from '@/lib/analyzer';
import { toast } from 'sonner';
import { BlinkUser } from '@blinkdotnew/sdk';
import { blink } from '@/lib/blink';

interface DashboardProps {
  user: BlinkUser;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{ imageUrl: string; description: string } | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await (blink.db as any).history.list({
        orderBy: { createdAt: 'desc' },
        limit: 10
      });
      setHistory(data);
    } catch (error) {
      console.error('History load failed:', error);
    }
  };

  const handleFileSelect = async (file: File) => {
    setAnalyzing(true);
    setResult(null);
    
    try {
      const res = await analyzeImage(file, user.id);
      setResult(res);
      toast.success('Analysis complete!');
      loadHistory();
    } catch (error: any) {
      toast.error(error.message || 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10 max-w-7xl mx-auto">
      <div className="lg:col-span-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl p-8 border border-white/5 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <div className="h-24 w-24 rounded-full border-4 border-primary animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-glow tracking-tight">Vision Scanner</h2>
          <p className="text-muted-foreground mb-8 text-sm tracking-wide uppercase">AI Image Decomposition Engine</p>
          <Dropzone onFileSelect={handleFileSelect} disabled={analyzing} />
        </motion.div>

        <AnimatePresence mode="wait">
          {analyzing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="glass-card rounded-3xl p-16 flex flex-col items-center justify-center gap-8 border border-primary/20 shadow-[0_0_50px_rgba(14,165,233,0.1)]"
            >
              <div className="relative h-24 w-24">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-0 animate-pulse rounded-full border border-primary/40 scale-125" />
                <div className="h-24 w-24 animate-spin rounded-full border-b-2 border-primary shadow-[0_0_20px_hsl(var(--primary))]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Decoding Aesthetics</h3>
                <p className="text-muted-foreground max-w-xs mx-auto text-sm">Translating visual frequencies into poetic narratives via Gemini Vision</p>
              </div>
            </motion.div>
          )}

          {result && !analyzing && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            >
              <AnalysisResult result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="lg:col-span-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-3xl p-8 h-full sticky top-28 border border-white/5"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold tracking-tight">Archives</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-white/5 px-2 py-1 rounded">History</span>
          </div>
          <HistoryList history={history} onSelect={setResult} />
        </motion.div>
      </div>
    </div>
  );
};
