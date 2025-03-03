
import React from 'react';
import { HistoryItem } from '@/components/inference/HistoryList';
import WorkspaceInferenceContent from '@/components/workspace/WorkspaceInferenceContent';
import WorkspaceDataRequestContent from '@/components/workspace/WorkspaceDataRequestContent';
import WorkspaceInferenceHistory from '@/components/workspace/WorkspaceInferenceHistory';
import WorkspaceDataCollections from '@/components/workspace/WorkspaceDataCollections';
import WorkspaceRequestManagementContent from '@/components/workspace/WorkspaceRequestManagementContent';

interface WorkspaceModuleRendererProps {
  activeModule: string;
  handleStartPrediction: (productName: string, supplierName: string) => void;
  isLoading: boolean;
  progress: number;
  stage: string;
  navigateToHome: () => void;
  historyItems: HistoryItem[];
}

const WorkspaceModuleRenderer: React.FC<WorkspaceModuleRendererProps> = ({
  activeModule,
  handleStartPrediction,
  isLoading,
  progress,
  stage,
  navigateToHome,
  historyItems
}) => {
  switch (activeModule) {
    case 'inference':
      return (
        <WorkspaceInferenceContent 
          onStartPrediction={handleStartPrediction}
          isLoading={isLoading}
          progress={progress}
          stage={stage}
          historyItems={historyItems}
        />
      );
    case 'inference-history':
      return (
        <WorkspaceInferenceHistory historyItems={historyItems} />
      );
    case 'data-request':
      return (
        <WorkspaceDataRequestContent
          navigateToHome={navigateToHome}
        />
      );
    case 'data-collections':
      return (
        <WorkspaceDataCollections />
      );
    case 'request-management':
      return <WorkspaceRequestManagementContent />;
    default:
      return <div>未知模块</div>;
  }
};

export default WorkspaceModuleRenderer;
