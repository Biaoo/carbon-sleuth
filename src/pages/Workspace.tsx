
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

// Mock request management data
const requestHistoryItems = [
  {
    id: 201,
    supplierName: '绿环包装科技',
    productName: '可降解塑料餐具',
    requestDate: '2023-07-15',
    status: 'pending',
    requestType: '产品碳足迹数据'
  },
  {
    id: 202,
    supplierName: '自然家居集团',
    productName: '竹纤维床单',
    requestDate: '2023-07-10',
    status: 'completed',
    requestType: '生产过程数据'
  },
  {
    id: 203,
    supplierName: '绿能科技',
    productName: '太阳能移动电源',
    requestDate: '2023-07-05',
    status: 'in-progress',
    requestType: '材料构成数据'
  }
];

// Render specific module content based on active module
const renderModuleContent = (
  activeModule: string, 
  handleStartPrediction: (productName: string, supplierName: string) => void,
  isLoading: boolean,
  progress: number,
  stage: string,
  navigateToHome: () => void
) => {
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
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">预测历史记录</h2>
          <div className="bg-card rounded-lg shadow-sm border border-border">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-medium">历史预测列表</h3>
            </div>
            <div className="divide-y divide-border">
              {historyItems.map(item => (
                <div key={item.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">{item.supplierName}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-muted-foreground">预测日期: {item.date}</span>
                        <span className="mx-2">•</span>
                        <span className="font-medium text-green-600">{item.result} {item.unit}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">查看详情</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 'data-request':
      return (
        <WorkspaceDataRequestContent
          navigateToHome={navigateToHome}
        />
      );
    case 'data-collections':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">数据集合</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg shadow-sm border border-border p-4">
              <h3 className="font-medium mb-3">产品碳足迹数据</h3>
              <p className="text-sm text-muted-foreground mb-4">包含50个不同产品的碳足迹数据</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">最后更新: 2023-07-20</span>
                <Button size="sm" variant="outline">查看</Button>
              </div>
            </div>
            <div className="bg-card rounded-lg shadow-sm border border-border p-4">
              <h3 className="font-medium mb-3">生产工艺数据</h3>
              <p className="text-sm text-muted-foreground mb-4">包含30种不同生产工艺的能耗数据</p>
              <div className="flex justify-between items-center">
                <span className="text-sm">最后更新: 2023-07-15</span>
                <Button size="sm" variant="outline">查看</Button>
              </div>
            </div>
          </div>
        </div>
      );
    case 'request-management':
      return (
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">请求管理</h2>
          <div className="bg-card rounded-lg shadow-sm border border-border">
            <div className="p-4 border-b border-border bg-muted/30">
              <h3 className="font-medium">历史请求列表</h3>
            </div>
            <div className="divide-y divide-border">
              {requestHistoryItems.map(item => (
                <div key={item.id} className="p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{item.productName}</h4>
                      <p className="text-sm text-muted-foreground">{item.supplierName}</p>
                      <div className="flex items-center mt-2 text-sm">
                        <span className="text-muted-foreground">请求日期: {item.requestDate}</span>
                        <span className="mx-2">•</span>
                        <span className={`font-medium ${
                          item.status === 'completed' ? 'text-green-600' : 
                          item.status === 'pending' ? 'text-amber-600' : 'text-blue-600'
                        }`}>
                          {item.status === 'completed' ? '已完成' : 
                           item.status === 'pending' ? '等待处理' : '处理中'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        请求类型: {item.requestType}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">查看详情</Button>
                      {item.status === 'completed' && (
                        <Button size="sm" variant="default">下载数据</Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return <div>未知模块</div>;
  }
};

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
        <div className="hidden md:flex items-center h-14 px-6 bg-background border-b border-border w-full fixed top-0 left-0 z-10">
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
        <div className="hidden md:block fixed left-0 top-14 bottom-0">
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
        <div className="flex-1 md:ml-64 pt-14 h-full overflow-auto transition-all duration-300" id="main-content">
          {renderModuleContent(activeModule, handleStartPrediction, isLoading, progress, stage, navigateToHome)}
        </div>
      </div>
    </ConsoleLayout>
  );
};

export default Workspace;
