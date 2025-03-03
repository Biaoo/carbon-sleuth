
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface Competitor {
  name: string;
  product: string;
}

interface CompetitorsListProps {
  title: string;
  icon: LucideIcon;
  competitors: Competitor[];
}

export const CompetitorsList: React.FC<CompetitorsListProps> = ({
  title,
  icon: Icon,
  competitors
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
        <div className="grid grid-cols-1 gap-2">
          {competitors.map((competitor, index) => (
            <div key={index} className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">{competitor.name}</div>
              <div className="text-sm text-muted-foreground">{competitor.product}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CompetitorsList;
