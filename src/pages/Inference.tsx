
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart2, 
  Clock, 
  Save, 
  RotateCcw,
  Search,
  Sparkles,
  History
} from 'lucide-react';

// Mock historical predictions
const historyItems = [
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
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !supplierName) {
      // Show error
      console.error('Please provide both product name and supplier name');
      return;
    }
    
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
  
  const handleSaveDraft = () => {
    console.log('Draft saved');
    // Implement draft saving logic
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
            
            <div className="bg-gradient-to-br from-white to-secondary/40 backdrop-blur-sm rounded-xl border border-primary/10 shadow-lg p-8 mb-10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent/5 rounded-full blur-xl"></div>
              
              <h2 className="text-xl font-semibold mb-6 flex items-center relative z-10">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                产品碳足迹预测
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mb-8">
                  <div className="group">
                    <label className="block text-sm font-medium mb-2">
                      产品名称 <span className="text-destructive">*</span>
                    </label>
                    <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                      <Input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="输入产品名称（如：有机棉T恤、太阳能充电宝等）"
                        className="h-12 border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all pl-4"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium mb-2">
                      供应商名称 <span className="text-destructive">*</span>
                    </label>
                    <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                      <Input
                        type="text"
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                        placeholder="输入供应商名称（如：绿能科技有限公司、可持续时装集团等）"
                        className="h-12 border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all pl-4"
                        disabled={isLoading}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="mb-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stage}</span>
                      <span className="text-sm text-muted-foreground">{progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground bg-white/50 p-2 rounded-lg border border-secondary/30">
                      <Clock className="h-4 w-4 mr-2 text-primary/70" />
                      <span>预计完成时间: 40-60秒</span>
                    </div>
                  </div>
                ) : null}
                
                <div className="flex flex-col sm:flex-row gap-3 justify-end relative z-10">
                  {isLoading ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancel}
                      className="bg-white/50 backdrop-blur-sm hover:bg-white/80"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      取消预测
                    </Button>
                  ) : (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handleSaveDraft}
                        className="bg-white/50 backdrop-blur-sm hover:bg-white/80"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        保存草稿
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/20"
                      >
                        <BarChart2 className="h-4 w-4 mr-2" />
                        开始预测
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </div>
            
            {/* Historical predictions */}
            <div className="bg-white rounded-xl border border-border shadow-subtle">
              <div className="p-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center">
                  <History className="h-5 w-5 mr-2 text-primary" />
                  历史预测记录
                </h2>
                <div className="flex items-center">
                  <Button variant="ghost" size="sm" className="text-primary">
                    查看全部
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="divide-y divide-border">
                {historyItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-secondary/30 transition-colors">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div>
                        <h3 className="font-semibold mb-1">{item.productName}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{item.supplierName}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{item.date}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold text-foreground">
                          {item.result}
                          <span className="text-sm font-normal text-muted-foreground ml-1">
                            {item.unit}
                          </span>
                        </div>
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => navigate(`/prediction-result/${item.id}`)}
                        >
                          <Search className="h-3 w-3 mr-1" />
                          查看报告
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Inference;
