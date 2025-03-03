
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

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
    <DashboardLayout
      title="碳足迹工作台"
      description="集成LCA模型推理与数据请求功能的一体化工作台"
    >
      <div className="flex h-[calc(100vh-12rem)]">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden p-4 border-b border-border">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-between"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <span className="flex items-center">
              <Menu className="h-4 w-4 mr-2" />
              {activeModule === 'inference' ? '碳足迹预测' : '数据请求'}
            </span>
            <span className="text-xs text-muted-foreground">
              切换模块
            </span>
          </Button>
        </div>
        
        {/* Desktop sidebar */}
        <div className="hidden md:block">
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
        <div className="flex-1 overflow-auto">
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
    </DashboardLayout>
  );
};

export default Workspace;
