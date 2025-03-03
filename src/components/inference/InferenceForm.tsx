
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  BarChart2, 
  Save, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  Box,
  Factory,
  Leaf,
  Info
} from 'lucide-react';
import { Form, FormField, FormItem, FormControl, FormDescription } from '@/components/ui/form';

interface InferenceFormProps {
  onStartPrediction: (productName: string, supplierName: string) => void;
  isLoading: boolean;
}

const InferenceForm = ({ onStartPrediction, isLoading }: InferenceFormProps) => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="group">
              <Label className="flex items-center text-sm font-medium mb-2">
                <Box className="h-4 w-4 mr-2 text-primary/70" />
                产品信息
                <span className="text-destructive ml-1">*</span>
              </Label>
              
              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg mb-4">
                <Input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="产品名称（如：有机棉T恤）"
                  className="h-12 border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all pl-4"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                <Input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="产品类别（如：纺织品、电子产品）"
                  className="h-12 border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all pl-4"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="group">
              <Label className="flex items-center text-sm font-medium mb-2">
                <Factory className="h-4 w-4 mr-2 text-primary/70" />
                供应商信息
                <span className="text-destructive ml-1">*</span>
              </Label>
              
              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                <Input
                  type="text"
                  value={supplierName}
                  onChange={(e) => setSupplierName(e.target.value)}
                  placeholder="供应商名称（如：绿能科技有限公司）"
                  className="h-12 border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all pl-4"
                  disabled={isLoading}
                  required
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="group">
              <Label className="flex items-center text-sm font-medium mb-2">
                <Info className="h-4 w-4 mr-2 text-primary/70" />
                产品描述（可选）
              </Label>
              
              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="简要描述产品特性、材料、制造工艺等信息，将有助于提高预测准确性"
                  className="h-[164px] w-full rounded-md border border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all p-4 text-base resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Environmental tips */}
        <div className="bg-accent/5 rounded-lg p-4 mb-8 border border-accent/20">
          <div className="flex items-start">
            <Leaf className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium mb-1">环保小贴士</h4>
              <p className="text-sm text-muted-foreground">
                提供详细的产品信息可以帮助我们更准确地预测碳足迹。如有产品技术文档，可在预测后上传以提高准确性。
              </p>
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
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default InferenceForm;
