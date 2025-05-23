
import React from 'react';
import PredictionResultContainer from '@/components/prediction-result/PredictionResultContainer';
import { useLanguage } from '@/contexts/LanguageContext';

const PredictionResult: React.FC = () => {
  const { t } = useLanguage();
  
  return <PredictionResultContainer />;
};

export default PredictionResult;
