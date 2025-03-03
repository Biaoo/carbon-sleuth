
import React from 'react';
import { Library } from 'lucide-react';
import { Reference } from './types';

interface ReferenceSidebarProps {
  references: Reference[];
  title?: string;
}

export const ReferenceSidebar: React.FC<ReferenceSidebarProps> = ({ 
  references, 
  title = "引用依据" 
}) => {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Library className="h-4 w-4 mr-1.5" />
        {title}
      </h3>
      <div className="space-y-2">
        {references.map(ref => (
          <div key={ref.id} className="text-xs flex">
            <span className="font-medium mr-1.5">[{ref.id}]</span>
            <span className="text-muted-foreground">{ref.text || ref.name}</span>
            {ref.url && (
              <a href={ref.url} className="ml-1 text-primary hover:underline">
                链接
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferenceSidebar;
