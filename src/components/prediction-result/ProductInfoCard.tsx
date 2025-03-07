
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import MarkdownContent from './MarkdownContent';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductInfoCardProps {
  title: string | { zh: string; en: string };
  icon: LucideIcon;
  markdownContent: string | { zh: string; en: string };
}

export const ProductInfoCard: React.FC<ProductInfoCardProps> = ({
  title,
  icon: Icon,
  markdownContent,
}) => {
  const { language } = useLanguage();
  
  // Extract the correct language string
  const getLocalizedText = (textObj: { zh: string; en: string } | string): string => {
    if (typeof textObj === 'string') return textObj;
    return language === 'zh' ? textObj.zh : textObj.en;
  };
  
  const localizedTitle = getLocalizedText(title);
  const localizedContent = getLocalizedText(markdownContent);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center">
            <Icon className="h-5 w-5 mr-2 text-muted-foreground" />
            {localizedTitle}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <MarkdownContent content={localizedContent} />
      </CardContent>
    </Card>
  );
};

export default ProductInfoCard;
