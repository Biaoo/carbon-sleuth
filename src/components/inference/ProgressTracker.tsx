
import React from 'react';
import { Clock } from 'lucide-react';

interface ProgressTrackerProps {
  isLoading: boolean;
  progress: number;
  stage: string;
}

const ProgressTracker = ({ isLoading, progress, stage }: ProgressTrackerProps) => {
  if (!isLoading) return null;
  
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{stage}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground bg-white/50 p-2 rounded-lg border border-secondary/30">
        <Clock className="h-4 w-4 mr-2 text-primary/70" />
        <span>预计完成时间: 40-60秒</span>
      </div>
    </div>
  );
};

export default ProgressTracker;
