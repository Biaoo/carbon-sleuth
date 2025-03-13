
import React from 'react';
import { HistoryItem } from '@/components/inference/HistoryList';
import WorkspaceInferenceContent from '@/components/workspace/WorkspaceInferenceContent';
import WorkspaceDataRequestContent from '@/components/workspace/WorkspaceDataRequestContent';
import WorkspaceInferenceHistory from '@/components/workspace/WorkspaceInferenceHistory';
import WorkspaceDataCollections from '@/components/workspace/WorkspaceDataCollections';
import WorkspaceRequestManagementContent from '@/components/workspace/WorkspaceRequestManagementContent';
import { useLocation } from 'react-router-dom';
import { useUserRole } from '@/contexts/UserRoleContext';

// Import supplier components
import WorkspaceSupplierDataEntry from '@/components/workspace/supplier/WorkspaceSupplierDataEntry';
import WorkspaceSupplierServiceSelection from '@/components/workspace/supplier/WorkspaceSupplierServiceSelection';

// Import carbon service provider components
import WorkspaceServiceOrderList from '@/components/workspace/carbon-service/WorkspaceServiceOrderList';
import WorkspaceOrderManagement from '@/components/workspace/carbon-service/WorkspaceOrderManagement';

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
  const { userRole } = useUserRole();
  
  // Get any state passed by navigation
  const locationState = location.state || {};
  
  // Render based on user role and active module
  if (userRole === 'buyer') {
    // Buyer role modules
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
  } else if (userRole === 'supplier') {
    // Supplier role modules
    switch (activeModule) {
      case 'inference':
      case 'data-entry':
        return <WorkspaceSupplierDataEntry />;
      case 'data-request':
      case 'service-selection':
        return <WorkspaceSupplierServiceSelection />;
      case 'data-collections':
        return <WorkspaceDataCollections />;
      case 'request-management':
        return <WorkspaceRequestManagementContent />;
      default:
        return <div>未知模块</div>;
    }
  } else if (userRole === 'carbon-service') {
    // Carbon service provider role modules
    switch (activeModule) {
      case 'inference':
      case 'service-orders':
        return <WorkspaceServiceOrderList />;
      case 'data-collections':
      case 'order-management':
        return <WorkspaceOrderManagement />;
      default:
        return <div>未知模块</div>;
    }
  }
  
  // Fallback for unknown role
  return <div>未知角色或模块</div>;
};

export default WorkspaceModuleRenderer;
