import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const usePredictionSimulation = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  
  const handleStartPrediction = (productName: string, supplierName: string) => {
    setIsLoading(true);
    setProgress(0);
    setStage(t('stage_collecting_info'));
    
    const simulatePrediction = () => {
      const stages = [
        { progress: 10, text: t('stage_collecting_info') },
        { progress: 25, text: t('stage_analyzing_composition') },
        { progress: 40, text: t('stage_getting_tech_info') },
        { progress: 55, text: t('stage_identifying_competitors') },
        { progress: 70, text: t('stage_building_lca') },
        { progress: 85, text: t('stage_calculating_footprint') },
        { progress: 95, text: t('stage_generating_report') },
        { progress: 100, text: t('stage_prediction_complete') }
      ];
      
      let currentStage = 0;
      
      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setProgress(stages[currentStage].progress);
          setStage(stages[currentStage].text);
          currentStage++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
          }, 5000);
        }
      }, 2000);
    };
    
    setTimeout(simulatePrediction, 500);
  };
  
  return {
    isLoading,
    progress,
    stage,
    handleStartPrediction
  };
};
