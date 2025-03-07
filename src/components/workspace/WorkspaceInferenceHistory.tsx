
import React from 'react';
import { Button } from '@/components/ui/button';
import { HistoryItem } from '@/components/inference/HistoryList';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface WorkspaceInferenceHistoryProps {
  historyItems: HistoryItem[];
}

const WorkspaceInferenceHistory: React.FC<WorkspaceInferenceHistoryProps> = ({ historyItems }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Function to handle viewing details
  const handleViewDetails = (id: number) => {
    navigate('/prediction-result');
  };

  // Function to return to home
  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{t('prediction_history')}</h2>
        <Button variant="outline" size="sm" onClick={handleReturnHome} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          {t('return_to_home')}
        </Button>
      </div>
      <div className="bg-card rounded-lg shadow-sm border border-border">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-medium">{t('history_prediction_list')}</h3>
        </div>
        <div className="divide-y divide-border">
          {historyItems.map(item => (
            <div key={item.id} className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{item.productName}</h4>
                  <p className="text-sm text-muted-foreground">{item.supplierName}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">{t('prediction_date')}: {item.date}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium text-green-600">{item.result} {item.unit}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewDetails(item.id)}
                >
                  {t('view_details')}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInferenceHistory;
