
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import InferenceForm from '@/components/inference/InferenceForm';
import ProgressTracker from '@/components/inference/ProgressTracker';
import HistoryList, { HistoryItem } from '@/components/inference/HistoryList';

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
    <Layout>
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">LCA模型推理</h1>
              <p className="text-foreground/70">
                输入产品和供应商信息，使用AI技术生成产品碳足迹预测分析。
              </p>
            </div>
            
            <InferenceForm 
              onStartPrediction={handleStartPrediction}
              isLoading={isLoading}
            />
            
            <ProgressTracker 
              isLoading={isLoading}
              progress={progress}
              stage={stage}
            />
            
            <HistoryList historyItems={historyItems} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inference;
