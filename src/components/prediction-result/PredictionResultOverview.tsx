
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import ComparisonChart from './ComparisonChart';
import ProgressItem from './ProgressItem';
import { PredictionResultData } from './types';

interface PredictionResultOverviewProps {
  resultData: PredictionResultData;
}

const PredictionResultOverview: React.FC<PredictionResultOverviewProps> = ({
  resultData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BarChart2 className="h-5 w-5 mr-2 text-muted-foreground" />
            碳足迹预测结果
          </CardTitle>
          <CardDescription>产品碳足迹值与行业对比分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <span className="text-4xl font-bold">{resultData.carbonValue}</span>
            <span className="ml-2 text-muted-foreground">{resultData.unit}</span>
          </div>
          
          <div className="mt-6">
            <p className="mb-2 font-medium text-sm">行业对比分析</p>
            <div className="h-72">
              <ComparisonChart data={resultData.comparativeAnalysis.chartData} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">主要组成分析</CardTitle>
          <CardDescription>碳足迹主要来源组成</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {resultData.components.map((component, index) => (
              <ProgressItem 
                key={index} 
                name={component.name} 
                value={component.value} 
                percentage={component.percentage} 
                unit={component.unit} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResultOverview;
