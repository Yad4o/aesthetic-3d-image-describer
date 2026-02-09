import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropzone } from './Dropzone';
import { AnalysisResult } from './AnalysisResult';
import { HistoryList } from './HistoryList';
import { analyzeImage } from '../lib/analyzer';
import { toast } from 'sonner';
import { BlinkUser } from '@blinkdotnew/sdk';
import { blink } from '../lib/blink';

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
      const data = await blink.db.history.list({
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
      <div className="lg:col-span-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-3xl p-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-glow">Analyze New Image</h2>
          <Dropzone onFileSelect={handleFileSelect} disabled={analyzing} />
        </motion.div>

        <AnimatePresence mode="wait">
          {analyzing && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card rounded-3xl p-12 flex flex-col items-center justify-center gap-6"
            >
              <div className="relative h-20 w-20">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-[0_0_15px_hsl(var(--primary))]" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">Analyzing Image...</h3>
                <p className="text-muted-foreground">Consulting the AI aesthetic engine</p>
              </div>
            </motion.div>
          )}

          {result && !analyzing && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
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
          className="glass-card rounded-3xl p-8 h-full sticky top-28"
        >
          <h2 className="text-2xl font-bold mb-6">Recent History</h2>
          <HistoryList history={history} onSelect={setResult} />
        </motion.div>
      </div>
    </div>
  );
};
