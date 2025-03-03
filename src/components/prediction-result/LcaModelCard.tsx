
import React from 'react';
import { BarChart } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import LcaFlowchart from './LcaFlowchart';

interface LcaParameter {
  name: string;
  value: string;
}

interface FlowchartNode {
  id: string;
  text: string;
  type: string;
  next: string[];
}

interface LcaModelCardProps {
  title: string;
  description: string;
  parameters: LcaParameter[];
  flowchart: FlowchartNode[];
}

export const LcaModelCard: React.FC<LcaModelCardProps> = ({
  title,
  description,
  parameters,
  flowchart
}) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle className="text-xl flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-muted-foreground" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {parameters.map((param, index) => (
            <div key={index} className="p-2 bg-muted/30 rounded-lg">
              <div className="text-xs text-muted-foreground">{param.name}</div>
              <div className="text-sm font-medium">{param.value}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-3">LCA模型流程图</h4>
          <LcaFlowchart nodes={flowchart} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LcaModelCard;
