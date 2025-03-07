
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText } from './types';

interface ProgressItemProps {
  name: string;
  value: number;
  percentage: number;
  unit?: string;
}

const ProgressItem: React.FC<ProgressItemProps> = ({
  name,
  value,
  percentage,
  unit = 'kg CO₂e'
}) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-sm font-medium">{name}</div>
        <div className="text-sm text-muted-foreground">
          {value} {unit} <span className="text-xs">({percentage}%)</span>
        </div>
      </div>
      <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary/80 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressItem;
