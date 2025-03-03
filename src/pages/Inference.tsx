
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import InferenceForm from '@/components/inference/InferenceForm';
import ProgressTracker from '@/components/inference/ProgressTracker';
import HistoryList, { HistoryItem } from '@/components/inference/HistoryList';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart2, History, Activity } from 'lucide-react';

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

const Inference = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [activeTab, setActiveTab] = useState('new-prediction');
  
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
  
  const handleCancel = () => {
    if (isLoading) {
      setIsLoading(false);
      setProgress(0);
      setStage('');
    }
  };
  
  return (
    <DashboardLayout 
      title="LCA模型推理工作台" 
      description="基于AI技术的产品碳足迹评估分析与预测"
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b px-6 py-2">
          <TabsList>
            <TabsTrigger value="new-prediction" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              新建预测
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
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
              onStartPrediction={handleStartPrediction}
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
    </DashboardLayout>
  );
};

export default Inference;
