
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePredictionSimulation = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  
  const handleStartPrediction = (productName: string, supplierName: string) => {
    setIsLoading(true);
    setProgress(0);
    setStage('正在收集产品基础信息...');
    
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
          setTimeout(() => {
            setIsLoading(false);
            navigate('/prediction-result');
          }, 500);
        }
      }, 800);
    };
    
    setTimeout(simulatePrediction, 500);
  };
  
  return {
    isLoading,
    progress,
    stage,
    handleStartPrediction
  };
};
