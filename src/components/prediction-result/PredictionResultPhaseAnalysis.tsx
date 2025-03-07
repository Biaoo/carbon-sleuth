
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
import { PhaseData } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultPhaseAnalysisProps {
  phases: PhaseData[];
}

const PredictionResultPhaseAnalysis: React.FC<PredictionResultPhaseAnalysisProps> = ({
  phases
}) => {
  const { t } = useLanguage();
  
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
                name={phase.name} 
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
