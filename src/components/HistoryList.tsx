'use client'

import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface HistoryListProps {
  history: any[];
  onSelect: (item: any) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <Clock className="h-12 w-12 mb-4 opacity-20" />
        <p>No analysis history yet</p>
        <p className="text-sm">Your journeys will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="group w-full flex items-center gap-4 p-3 rounded-2xl glass hover:bg-white/10 transition-all text-left"
        >
          <div className="h-16 w-16 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
            <img src={item.imageUrl} alt="History" className="h-full w-full object-cover transition-transform group-hover:scale-110" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold truncate pr-4">
              {item.description.split('\n')[0] || 'Image Analysis'}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-white/20 group-hover:text-primary transition-colors" />
        </button>
      ))}
    </div>
  );
};
