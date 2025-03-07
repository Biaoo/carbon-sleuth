
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
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultOptimizationsProps {
  improvementSuggestions: ImprovementSuggestion[];
}

const PredictionResultOptimizations: React.FC<PredictionResultOptimizationsProps> = ({
  improvementSuggestions
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">{t('emission_reduction_suggestions')}</CardTitle>
        <CardDescription>{t('carbon_reduction_suggestions_desc')}</CardDescription>
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
