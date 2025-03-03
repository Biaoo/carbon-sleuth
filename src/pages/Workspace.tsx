
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ConsoleLayout from '@/components/layout/ConsoleLayout';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

// Import workspace components
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import WorkspaceInferenceContent from '@/components/workspace/WorkspaceInferenceContent';
import WorkspaceDataRequestContent from '@/components/workspace/WorkspaceDataRequestContent';

// Import types
import { HistoryItem } from '@/components/inference/HistoryList';

// Mock historical predictions
const historyItems: HistoryItem[] = [
  {
    id: 101,
    productName: '可降解塑料餐具',
    supplierName: '绿环包装科技',
    date: '2023-06-20',
    status: 'completed',
    result: 3.7,
    unit: 'kg CO₂e/unit'
  },
  {
    id: 102,
    productName: '竹纤维床单',
    supplierName: '自然家居集团',
    date: '2023-06-15',
    status: 'completed',
    result: 2.1,
    unit: 'kg CO₂e/unit'
  },
  {
    id: 103,
    productName: '太阳能移动电源',
    supplierName: '绿能科技',
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
  
  // Inference states
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  
  // Update URL when module changes
  useEffect(() => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('tab', activeModule);
    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString()
    }, { replace: true });
  }, [activeModule, navigate, location.pathname, location.search]);
  
  // Handle changing the active module
  const handleChangeModule = (module: string) => {
    setActiveModule(module);
    setSidebarOpen(false); // Close mobile sidebar when module changes
  };
  
  // Handle starting a prediction
  const handleStartPrediction = (productName: string, supplierName: string) => {
    // Start prediction process
    setIsLoading(true);
    setProgress(0);
    setStage('正在收集产品基础信息...');
    
    // Simulate prediction process
    const simulatePrediction = () => {
      const stages = [
        { progress: 10, text: '正在收集产品基础信息...' },
        { progress: 25, text: '分析产品组成信息...' },
        { progress: 40, text: '获取生产技术信息...' },
        { progress: 55, text: '识别相关竞品供应商...' },
        { progress: 70, text: '构建LCA模型...' },
        { progress: 85, text: '计算碳足迹值...' },
        { progress: 95, text: '生成预测报告...' },
        { progress: 100, text: '预测完成！' }
      ];
      
      let currentStage = 0;
      
      const interval = setInterval(() => {
        if (currentStage < stages.length) {
          setProgress(stages[currentStage].progress);
          setStage(stages[currentStage].text);
          currentStage++;
        } else {
          clearInterval(interval);
          // Navigate to result page after short delay
          setTimeout(() => {
            setIsLoading(false);
            navigate('/prediction-result');
          }, 500);
        }
      }, 800);
    };
    
    // Start simulation after short delay
    setTimeout(simulatePrediction, 500);
  };
  
  // Navigate to home function for data request
  const navigateToHome = () => {
    navigate('/');
  };
  
  return (
    <ConsoleLayout>
      <div className="flex h-screen bg-secondary/10">
        {/* App branding header - only visible on desktop */}
        <div className="hidden md:flex items-center h-14 px-6 bg-background border-b border-border w-64 fixed top-0 left-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold">CarbonSleuth</span>
          </div>
        </div>
        
        {/* Mobile toolbar */}
        <div className="md:hidden flex items-center justify-between h-14 px-4 bg-background border-b border-border w-full fixed top-0 z-10">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-semibold">CarbonSleuth</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            {sidebarOpen ? "关闭" : "菜单"}
          </Button>
        </div>
        
        {/* Desktop sidebar */}
        <div className="hidden md:block fixed left-0 top-14 bottom-0 w-64">
          <WorkspaceSidebar 
            activeModule={activeModule}
            onChangeModule={handleChangeModule}
            isMobile={false}
          />
        </div>
        
        {/* Mobile sidebar (overlay) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs">
              <WorkspaceSidebar 
                activeModule={activeModule}
                onChangeModule={handleChangeModule}
                isMobile={true}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}
        
        {/* Main content area */}
        <div className="flex-1 md:ml-64 pt-14 h-full overflow-auto">
          {activeModule === 'inference' ? (
            <WorkspaceInferenceContent 
              onStartPrediction={handleStartPrediction}
              isLoading={isLoading}
              progress={progress}
              stage={stage}
              historyItems={historyItems}
            />
          ) : (
            <WorkspaceDataRequestContent
              navigateToHome={navigateToHome}
            />
          )}
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default Workspace;
