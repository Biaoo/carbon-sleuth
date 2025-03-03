
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart2, FileText, Activity } from 'lucide-react';
import InferenceForm from '@/components/inference/InferenceForm';
import ProgressTracker from '@/components/inference/ProgressTracker';
import HistoryList, { HistoryItem } from '@/components/inference/HistoryList';

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
  
  return (
    <Tabs value={inferenceTab} onValueChange={setInferenceTab} className="w-full">
      <div className="border-b px-6 py-3">
        <TabsList>
          <TabsTrigger value="new-prediction" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            新建预测
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            历史记录
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            进行中
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="p-6">
        <TabsContent value="new-prediction" className="m-0">
          <InferenceForm 
            onStartPrediction={onStartPrediction}
            isLoading={isLoading}
          />
          
          <ProgressTracker 
            isLoading={isLoading}
            progress={progress}
            stage={stage}
          />
        </TabsContent>
        
        <TabsContent value="history" className="m-0">
          <HistoryList historyItems={historyItems} />
        </TabsContent>
        
        <TabsContent value="active" className="m-0">
          <div className="py-12 text-center">
            <p className="text-muted-foreground">当前没有进行中的预测任务</p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default WorkspaceInferenceContent;
