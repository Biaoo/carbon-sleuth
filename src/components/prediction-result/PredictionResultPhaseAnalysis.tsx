
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import ProgressItem from './ProgressItem';
import PhaseAnalysisChart from './PhaseAnalysisChart';
import { LifecyclePhase, BilingualText } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultPhaseAnalysisProps {
  phases: LifecyclePhase[];
}

const PredictionResultPhaseAnalysis: React.FC<PredictionResultPhaseAnalysisProps> = ({
  phases
}) => {
  const { t, language } = useLanguage();
  
  // Helper function to get localized text
  const getLocalizedText = (text: string | BilingualText): string => {
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-xl">{t('lifecycle_phase_analysis')}</CardTitle>
        <CardDescription>{t('carbon_footprint_distribution')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            {phases.map((phase, index) => (
              <ProgressItem 
                key={index} 
                name={getLocalizedText(phase.name)} 
                value={phase.value} 
                percentage={phase.percentage} 
                unit={phase.unit || 'kg CO₂e'} 
              />
            ))}
          </div>
          
          <div className="h-60 md:h-auto">
            <PhaseAnalysisChart data={phases} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResultPhaseAnalysis;
