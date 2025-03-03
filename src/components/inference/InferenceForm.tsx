
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  Save, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface InferenceFormProps {
  onStartPrediction: (productName: string, supplierName: string) => void;
  isLoading: boolean;
}

const InferenceForm = ({ onStartPrediction, isLoading }: InferenceFormProps) => {
  const [productName, setProductName] = useState('');
  const [supplierName, setSupplierName] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!productName || !supplierName) {
      // Show error
      console.error('Please provide both product name and supplier name');
      return;
    }
    
    onStartPrediction(productName, supplierName);
  };
  
  const handleSaveDraft = () => {
    console.log('Draft saved');
    // Implement draft saving logic
  };

  return (
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
        
        <div className="flex flex-col sm:flex-row gap-3 justify-end relative z-10">
          {isLoading ? (
            <Button 
              type="button" 
              variant="outline" 
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
  );
};

export default InferenceForm;
