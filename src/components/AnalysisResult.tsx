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

  return (
    <div className="glass-card rounded-3xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto">
          <img 
            src={result.imageUrl} 
            alt="Analyzed" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="flex flex-col p-8 bg-nebula">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-glow">AI Description</h3>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                title="Copy Description"
              >
                <Copy className="h-5 w-5" />
              </button>
              <button className="p-2 rounded-lg glass hover:bg-white/10 transition-colors">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto prose prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-white/90 font-light">
              {result.description}
            </p>
          </div>

          <button 
            className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Download className="h-5 w-5" />
            Download Summary
          </button>
        </div>
      </div>
    </div>
  );
};
