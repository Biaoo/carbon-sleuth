
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import ImprovementSuggestionCard from './ImprovementSuggestionCard';
import { ImprovementSuggestion } from './types';

interface PredictionResultOptimizationsProps {
  improvementSuggestions: ImprovementSuggestion[];
}

const PredictionResultOptimizations: React.FC<PredictionResultOptimizationsProps> = ({
  improvementSuggestions
}) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">减排优化建议</CardTitle>
        <CardDescription>基于产品特性和行业最佳实践的碳减排建议</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {improvementSuggestions.map((suggestion, index) => (
            <ImprovementSuggestionCard key={index} suggestion={suggestion} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResultOptimizations;
