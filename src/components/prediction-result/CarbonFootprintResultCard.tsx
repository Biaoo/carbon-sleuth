
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProgressItem from './ProgressItem';

interface BreakdownItem {
  name: string;
  value: number;
  percentage: number;
}

interface CarbonFootprintResultCardProps {
  title: string;
  totalValue: number;
  unit: string;
  uncertaintyRange: string;
  breakdown: BreakdownItem[];
}

export const CarbonFootprintResultCard: React.FC<CarbonFootprintResultCardProps> = ({
  title,
  totalValue,
  unit,
  uncertaintyRange,
  breakdown
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-muted-foreground" />
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="flex items-center mb-4">
          <span className="text-3xl font-bold">{totalValue}</span>
          <span className="ml-2 text-muted-foreground">{unit}</span>
          <Badge className="ml-3 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            不确定度：{uncertaintyRange}
          </Badge>
        </div>
        
        <div className="space-y-3 mt-4">
          <h4 className="text-sm font-medium">碳足迹组成明细</h4>
          <div className="space-y-3">
            {breakdown.map((item, index) => (
              <ProgressItem 
                key={index} 
                name={item.name} 
                value={item.value} 
                percentage={item.percentage} 
                unit="kg CO₂e"
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarbonFootprintResultCard;
