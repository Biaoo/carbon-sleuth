
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  const { t } = useLanguage();
  // Simple Markdown rendering, in a real project you might use react-markdown
  const lines = content.split('\n');
  
  return (
    <div className="markdown-content prose prose-sm max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-lg font-semibold mt-4 mb-2">{line.replace('## ', '')}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index} className="text-base font-medium mt-3 mb-1">{line.replace('### ', '')}</h3>;
        } else if (line.startsWith('- **')) {
          const parts = line.replace('- **', '').split('**:');
          return (
            <div key={index} className="flex mb-1">
              <span className="font-medium mr-2">{parts[0]}:</span>
              <span>{parts[1]}</span>
            </div>
          );
        } else if (line.startsWith('- ')) {
          return <p key={index} className="ml-4 flex items-start mb-1">
            <span className="mr-2 mt-1.5">•</span>
            <span>{line.replace('- ', '')}</span>
          </p>;
        } else if (line.startsWith('1. **')) {
          const parts = line.split('**');
          const title = parts[1];
          const rest = parts[2].replace(' (', '').replace(')', '');
          return (
            <div key={index} className="mb-2">
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{rest}</p>
            </div>
          );
        } else if (line.trim() === '') {
          return <div key={index} className="h-2"></div>;
        } else {
          return <p key={index} className="mb-2">{line}</p>;
        }
      })}
    </div>
  );
};

export default MarkdownContent;
