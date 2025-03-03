
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import MarkdownContent from './MarkdownContent';

interface ProductInfoCardProps {
  title: string;
  icon: LucideIcon;
  markdownContent: string;
}

export const ProductInfoCard: React.FC<ProductInfoCardProps> = ({
  title,
  icon: Icon,
  markdownContent,
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center">
            <Icon className="h-5 w-5 mr-2 text-muted-foreground" />
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <MarkdownContent content={markdownContent} />
      </CardContent>
    </Card>
  );
};

export default ProductInfoCard;
