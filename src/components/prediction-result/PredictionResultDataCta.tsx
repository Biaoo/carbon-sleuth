
import React from 'react';
import { Database } from 'lucide-react';
import RequestDataButton from './RequestDataButton';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultDataCtaProps {
  supplierName: string;
  productName: string;
  variant?: 'simple' | 'detailed';
}

const PredictionResultDataCta: React.FC<PredictionResultDataCtaProps> = ({
  supplierName,
  productName,
  variant = 'simple'
}) => {
  const { t } = useLanguage();
  
  if (variant === 'detailed') {
    return (
      <div className="mt-10 mb-8 flex flex-col items-center text-center p-8 border border-dashed border-amber-200 rounded-lg bg-amber-50/50">
        <Database className="h-10 w-10 text-amber-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">{t('need_more_accurate_data')}</h3>
        <p className="text-muted-foreground max-w-2xl mb-6">
          {t('accurate_data_desc')}
        </p>
        <RequestDataButton supplierName={supplierName} productName={productName} />
      </div>
    );
  }
  
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-amber-900 mb-2">{t('prediction_needs_accuracy')}</h3>
        <p className="text-amber-800">
          {t('prediction_accuracy_desc')}
        </p>
      </div>
      <RequestDataButton supplierName={supplierName} productName={productName} />
    </div>
  );
};

export default PredictionResultDataCta;
