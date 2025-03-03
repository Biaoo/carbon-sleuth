
import React from 'react';
import { Info } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface Method {
  name: string;
  description: string;
}

interface TechnicalBasisCardProps {
  title: string;
  methods: Method[];
}

export const TechnicalBasisCard: React.FC<TechnicalBasisCardProps> = ({
  title,
  methods
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center">
            <Info className="h-5 w-5 mr-2 text-muted-foreground" />
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {methods.map((method, index) => (
            <div key={index} className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium text-sm">{method.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{method.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalBasisCard;
