'use client'

import React, { useCallback, useState } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, disabled }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (disabled) return;
    
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  }, [disabled]);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    onFileSelect(file);
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragActive(true); }}
      onDragLeave={() => setIsDragActive(false)}
      onDrop={onDrop}
      className={cn(
        "relative flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed rounded-2xl transition-all duration-300 cursor-pointer group overflow-hidden",
        isDragActive ? "border-primary bg-primary/10 scale-[0.99]" : "border-white/10 hover:border-primary/50 hover:bg-white/5",
        disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
      )}
      onClick={() => !disabled && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        disabled={disabled}
      />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
        <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-primary" />
        <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-primary" />
        <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-primary" />
        <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-primary" />
      </div>

      {preview ? (
        <div className="relative h-full w-full p-4 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in">
          <img src={preview} alt="Preview" className="max-h-[260px] w-auto rounded-lg object-contain shadow-2xl" />
          <button
            onClick={clear}
            className="absolute top-6 right-6 rounded-full bg-black/60 p-2.5 text-white hover:bg-red-500/80 hover:scale-110 active:scale-95 transition-all backdrop-blur-md border border-white/10"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <span className="px-4 py-1.5 rounded-full bg-primary/80 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg animate-pulse">
              Ready for Scanning
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-primary/10 group-hover:bg-primary/20" />
            <div className="relative h-20 w-20 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors">
              <Upload className={cn(
                "h-10 w-10 transition-all duration-500",
                isDragActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
              )} />
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-xl font-bold tracking-tight">
              {isDragActive ? "Release to Initiate Scan" : "Deploy Media for Analysis"}
            </p>
            <p className="text-sm text-muted-foreground font-light max-w-xs uppercase tracking-widest">
              Drag & Drop or click to browse
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <span className="text-[10px] font-bold text-muted-foreground border border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">PNG</span>
            <span className="text-[10px] font-bold text-muted-foreground border border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">JPG</span>
            <span className="text-[10px] font-bold text-muted-foreground border border-white/10 px-2 py-1 rounded-md uppercase tracking-wider">WEBP</span>
          </div>
        </div>
      )}
    </div>
  );
};
