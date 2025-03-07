
import React from 'react';
import { HistoryItem } from '@/components/inference/HistoryList';
import WorkspaceInferenceContent from '@/components/workspace/WorkspaceInferenceContent';
import WorkspaceDataRequestContent from '@/components/workspace/WorkspaceDataRequestContent';
import WorkspaceInferenceHistory from '@/components/workspace/WorkspaceInferenceHistory';
import WorkspaceDataCollections from '@/components/workspace/WorkspaceDataCollections';
import WorkspaceRequestManagementContent from '@/components/workspace/WorkspaceRequestManagementContent';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  
  // Get any state passed by navigation
  const locationState = location.state || {};
  
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
          supplierName={locationState.supplierName}
          productName={locationState.productName}
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
