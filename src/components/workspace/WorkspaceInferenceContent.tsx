
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart2, FileText, Activity } from 'lucide-react';
import InferenceForm from '@/components/inference/InferenceForm';
import ProgressTracker from '@/components/inference/ProgressTracker';
import HistoryList, { HistoryItem } from '@/components/inference/HistoryList';
import { useLanguage } from '@/contexts/LanguageContext';
import StreamingOutput from '@/components/inference/StreamingOutput';

interface WorkspaceInferenceContentProps {
  onStartPrediction: (productName: string, supplierName: string) => void;
  isLoading: boolean;
  progress: number;
  stage: string;
  historyItems: HistoryItem[];
}

const WorkspaceInferenceContent: React.FC<WorkspaceInferenceContentProps> = ({
  onStartPrediction,
  isLoading,
  progress,
  stage,
  historyItems
}) => {
  const [inferenceTab, setInferenceTab] = useState('new-prediction');
  const { t } = useLanguage();
  
  return (
    <Tabs value={inferenceTab} onValueChange={setInferenceTab} className="w-full">
      <div className="border-b px-6 py-3">
        <TabsList>
          <TabsTrigger value="new-prediction" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            {t('new_prediction')}
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t('history_records')}
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            {t('in_progress')}
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="p-6">
        <TabsContent value="new-prediction" className="m-0">
          <div className="relative">
            {!isLoading && (
              <InferenceForm 
                onStartPrediction={onStartPrediction}
                isLoading={isLoading}
              />
            )}
            
            {isLoading && (
              <div className="animate-fade-in">
                <ProgressTracker 
                  isLoading={isLoading}
                  progress={progress}
                  stage={stage}
                />
                
                <StreamingOutput 
                  progress={progress} 
                  stage={stage} 
                />
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="m-0">
          <HistoryList historyItems={historyItems} />
        </TabsContent>
        
        <TabsContent value="active" className="m-0">
          <div className="py-12 text-center">
            <p className="text-muted-foreground">{t('no_active_predictions')}</p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default WorkspaceInferenceContent;
