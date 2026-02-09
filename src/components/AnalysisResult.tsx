'use client'

import React from 'react';
import { Copy, Share2, Download } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisResultProps {
  result: {
    imageUrl: string;
    description: string;
  };
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.description);
    toast.success('Description copied to clipboard');
  };

  const sections = result.description.split('# ').filter(Boolean).map(section => {
    const [title, ...content] = section.split(':');
    return {
      title: title.trim(),
      content: content.join(':').trim()
    };
  });

  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto h-full">
          <img 
            src={result.imageUrl} 
            alt="Analyzed" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-primary/30">
              AI Vision Analysis
            </span>
          </div>
        </div>

        <div className="flex flex-col p-8 bg-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-glow tracking-tight">Image Narrative</h3>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all active:scale-95"
                title="Copy Description"
              >
                <Copy className="h-5 w-5" />
              </button>
              <button className="p-2.5 rounded-xl glass hover:bg-white/10 transition-all active:scale-95">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 space-y-8 overflow-auto custom-scrollbar pr-2">
            {sections.length > 0 ? sections.map((section, idx) => (
              <div key={idx} className="space-y-3 animate-slide-up" style={{ animationDelay: `${idx * 150}ms` }}>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-primary/80">
                  {section.title}
                </h4>
                <p className="text-white/90 font-light leading-relaxed tracking-wide">
                  {section.content}
                </p>
              </div>
            )) : (
              <p className="whitespace-pre-wrap text-lg leading-relaxed text-white/90 font-light">
                {result.description}
              </p>
            )}
          </div>

          <button 
            className="mt-8 flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-[1.01] active:scale-95 transition-all"
          >
            <Download className="h-5 w-5" />
            Export Aesthetic Profile
          </button>
        </div>
      </div>
    </div>
  );
};