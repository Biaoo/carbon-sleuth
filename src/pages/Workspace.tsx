
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConsoleLayout from '@/components/layout/ConsoleLayout';

// Import workspace components
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import WorkspaceModuleRenderer from '@/components/workspace/WorkspaceModuleRenderer';
import WorkspaceMobileSidebar from '@/components/workspace/WorkspaceMobileSidebar';
import { WorkspaceDesktopHeader, WorkspaceMobileHeader } from '@/components/workspace/WorkspaceHeader';
import { usePredictionSimulation } from '@/components/workspace/usePredictionSimulation';

// Import types
import { HistoryItem } from '@/components/inference/HistoryList';
import { BilingualText } from '@/components/prediction-result/types';

const bilingual = (zh: string, en: string) => ({ zh, en });

// Mock historical predictions
const historyItems: HistoryItem[] = [
  {
    id: 101,
    productName: bilingual('可降解塑料餐具', 'Biodegradable Plastic Utensils'),
    supplierName: bilingual('绿环包装科技', 'Green Loop Packaging Technology'),
    date: '2023-06-20',
    status: 'completed',
    result: 3.7,
    unit: 'kg CO₂e/unit'
  },
  {
    id: 102,
    productName: bilingual('竹纤维床单', 'Bamboo Fiber Bedsheet'),
    supplierName: bilingual('自然家居集团', 'Natural Home Group'),
    date: '2023-06-15',
    status: 'completed',
    result: 2.1,
    unit: 'kg CO₂e/unit'
  },
  {
    id: 103,
    productName: bilingual('太阳能移动电源', 'Solar Mobile Power Bank'),
    supplierName: bilingual('绿能科技', 'Green Energy Technology'),
    date: '2023-06-10',
    status: 'completed',
    result: 8.5,
    unit: 'kg CO₂e/unit'
  }
];

const Workspace = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get module from URL search params
  const searchParams = new URLSearchParams(location.search);
  const moduleParam = searchParams.get('tab');
  
  // State for active module
  const [activeModule, setActiveModule] = useState<string>(moduleParam || 'inference');
  
  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Get prediction simulation hooks
  const { isLoading, progress, stage, handleStartPrediction } = usePredictionSimulation();
  
  // Update URL when module changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('tab', activeModule);
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
  }, [activeModule, navigate, location.pathname, location.search]);

  // Handle state from location
  useEffect(() => {
    // Check for data in location state that might have been passed from other components
    if (location.state) {
      // If coming from prediction result with a request to open data-request tab
      if (location.state.fromPrediction && moduleParam !== 'data-request') {
        setActiveModule('data-request');
      }
    }
  }, [location.state, moduleParam]);
  
  // Handle changing the active module
  const handleChangeModule = (module: string) => {
    setActiveModule(module);
    setSidebarOpen(false); // Close mobile sidebar when module changes
  };
  
  // Navigate to home function for data request
  const navigateToHome = () => {
    navigate('/');
  };
  
  return (
    <ConsoleLayout>
      <div className="flex h-screen bg-secondary/10">
        {/* App branding header - only visible on desktop */}
        <WorkspaceDesktopHeader navigateToHome={navigateToHome} />
        
        {/* Mobile toolbar */}
        <WorkspaceMobileHeader 
          navigateToHome={navigateToHome} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen} 
        />
        
        {/* Desktop sidebar */}
        <div className="hidden md:block fixed left-0 top-14 bottom-0">
          <WorkspaceSidebar 
            activeModule={activeModule}
            onChangeModule={handleChangeModule}
            isMobile={false}
          />
        </div>
        
        {/* Mobile sidebar (overlay) */}
        <WorkspaceMobileSidebar 
          sidebarOpen={sidebarOpen}
          activeModule={activeModule}
          onChangeModule={handleChangeModule}
          onClose={() => setSidebarOpen(false)}
        />
        
        {/* Main content area */}
        <div className="flex-1 md:ml-64 pt-14 h-full overflow-auto transition-all duration-300" id="main-content">
          <WorkspaceModuleRenderer 
            activeModule={activeModule}
            handleStartPrediction={handleStartPrediction}
            isLoading={isLoading}
            progress={progress}
            stage={stage}
            navigateToHome={navigateToHome}
            historyItems={historyItems}
          />
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default Workspace;
