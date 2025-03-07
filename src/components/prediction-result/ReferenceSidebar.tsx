
import React from 'react';
import { Library } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Reference, BilingualText } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ReferenceSidebarProps {
  references: Reference[];
  open: boolean;
  onClose: () => void;
}

const ReferenceSidebar: React.FC<ReferenceSidebarProps> = ({ references, open, onClose }) => {
  const { t, language } = useLanguage();
  
  // Helper function to get localized text
  const getLocalizedText = (text: string | BilingualText | undefined): string => {
    if (!text) return '';
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Library className="h-5 w-5 mr-2" />
            {t('reference_sources')}
          </SheetTitle>
          <SheetDescription>
            {t('reference_sources_desc')}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {references.map((reference, index) => (
            <div key={index} className="border-b pb-3">
              <div className="font-medium">
                {getLocalizedText(reference.name || reference.text || `Reference ${index + 1}`)}
              </div>
              {reference.type && (
                <Badge variant="outline" className="mt-1">
                  {getLocalizedText(reference.type)}
                </Badge>
              )}
              {reference.url && (
                <a
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline block mt-1"
                >
                  {t('visit_source')}
                </a>
              )}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReferenceSidebar;
