
import React from 'react';
import { Library, Link } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ReferenceSource, BilingualText } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface UnifiedReferenceSidebarProps {
  references: ReferenceSource[];
  title?: string | BilingualText;
}

export const UnifiedReferenceSidebar: React.FC<UnifiedReferenceSidebarProps> = ({ 
  references,
  title = "参考来源"
}) => {
  const { language } = useLanguage();
  
  // Helper function to get localized text
  const getLocalizedText = (text: string | BilingualText | undefined): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center">
            <Library className="h-5 w-5 mr-2 text-muted-foreground" />
            {getLocalizedText(title)}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-2">
          {references.map((source) => (
            <div key={source.id} className="p-3 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium text-sm">
                    {getLocalizedText(source.name)}
                  </div>
                  {source.type && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {getLocalizedText(source.type)}
                    </div>
                  )}
                </div>
                {source.url && (
                  <a href={source.url} className="text-primary hover:text-primary/80">
                    <Link className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UnifiedReferenceSidebar;
