
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressItemProps {
  name: string;
  value: number;
  percentage: number;
  unit?: string;
}

export const ProgressItem: React.FC<ProgressItemProps> = ({
  name,
  value,
  percentage,
  unit = 'kg CO₂e'
}) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="font-medium text-sm">{name}</div>
        <div className="text-sm text-muted-foreground">
          {value} {unit} ({percentage}%)
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default ProgressItem;
