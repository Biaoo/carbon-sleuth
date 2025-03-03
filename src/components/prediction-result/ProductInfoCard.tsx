
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import MarkdownContent from './MarkdownContent';
import ReferenceSidebar from './ReferenceSidebar';

interface Citation {
  id: number;
  text: string;
}

interface ProductInfoCardProps {
  title: string;
  icon: LucideIcon;
  markdownContent: string;
  citations: Citation[];
}

export const ProductInfoCard: React.FC<ProductInfoCardProps> = ({
  title,
  icon: Icon,
  markdownContent,
  citations
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <MarkdownContent content={markdownContent} />
          </div>
          <div className="lg:col-span-4">
            <ReferenceSidebar references={citations} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductInfoCard;
