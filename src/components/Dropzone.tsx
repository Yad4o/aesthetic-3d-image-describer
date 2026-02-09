import React, { useCallback, useState } from 'react';
import { Upload, ImageIcon, X } from 'lucide-react';
import { cn } from '../lib/utils';

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
        "relative group cursor-pointer transition-all duration-300",
        "aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4",
        isDragActive ? "border-primary bg-primary/10" : "border-white/10 bg-white/5",
        disabled && "opacity-50 cursor-not-allowed",
        "hover:border-primary/50 hover:bg-white/10"
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

      {preview ? (
        <div className="relative h-full w-full p-4">
          <img src={preview} alt="Preview" className="h-full w-full rounded-lg object-contain" />
          <button
            onClick={clear}
            className="absolute top-6 right-6 rounded-full bg-black/50 p-2 text-white hover:bg-black transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <>
          <div className="rounded-2xl bg-white/5 p-6 transition-transform group-hover:scale-110">
            <Upload className="h-10 w-10 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-xl font-bold">Drop your image here</p>
            <p className="text-muted-foreground">or click to browse files</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full">
            <ImageIcon className="h-3 w-3" />
            <span>JPG, PNG, WebP supported</span>
          </div>
        </>
      )}
    </div>
  );
};
