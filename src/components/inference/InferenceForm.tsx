import React, { useState, useEffect, useRef } from 'react';
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
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface InferenceFormProps {
  onStartPrediction: (productName: string, supplierName: string) => void;
  isLoading: boolean;
}

const InferenceForm = ({ onStartPrediction, isLoading }: InferenceFormProps) => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  // 创建引用以访问输入元素
  const productNameInputRef = useRef<HTMLInputElement>(null);
  const supplierNameInputRef = useRef<HTMLInputElement>(null);
  
  // 当语言变化时更新自定义验证消息
  useEffect(() => {
    if (productNameInputRef.current) {
      productNameInputRef.current.setCustomValidity('');
    }
    if (supplierNameInputRef.current) {
      supplierNameInputRef.current.setCustomValidity('');
    }
  }, [language]);
  
  // 处理产品名称输入变化
  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
    if (e.target.validity.valueMissing && e.target.required) {
      e.target.setCustomValidity(t('product_name_required'));
    } else {
      e.target.setCustomValidity('');
    }
  };
  
  // 处理供应商名称输入变化
  const handleSupplierNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSupplierName(e.target.value);
    if (e.target.validity.valueMissing && e.target.required) {
      e.target.setCustomValidity(t('supplier_name_required'));
    } else {
      e.target.setCustomValidity('');
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!productName && !supplierName) {
      toast({
        title: t('validation_error'),
        description: t('required_fields_error'),
        variant: "destructive",
      });
      return;
    } else if (!productName) {
      toast({
        title: t('validation_error'),
        description: t('product_name_required'),
        variant: "destructive",
      });
      return;
    } else if (!supplierName) {
      toast({
        title: t('validation_error'),
        description: t('supplier_name_required'),
        variant: "destructive",
      });
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
        {t('carbon_footprint_prediction')}
      </h2>
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="group">
              <Label className="flex items-center text-sm font-medium mb-2">
                <Box className="h-4 w-4 mr-2 text-primary/70" />
                {t('product_info')}
                <span className="text-destructive ml-1">*</span>
              </Label>
              
              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg mb-4">
                <Input
                  ref={productNameInputRef}
                  type="text"
                  value={productName}
                  onChange={handleProductNameChange}
                  placeholder={t('product_name_placeholder')}
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
                  placeholder={t('product_category_placeholder')}
                  className="h-12 border-secondary/80 bg-white/80 backdrop-blur-sm focus:border-primary/40 transition-all pl-4"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="group">
              <Label className="flex items-center text-sm font-medium mb-2">
                <Factory className="h-4 w-4 mr-2 text-primary/70" />
                {t('supplier_info')}
                <span className="text-destructive ml-1">*</span>
              </Label>
              
              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                <Input
                  ref={supplierNameInputRef}
                  type="text"
                  value={supplierName}
                  onChange={handleSupplierNameChange}
                  placeholder={t('supplier_name_placeholder')}
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
                {t('product_description')}
              </Label>
              
              <div className="relative transition-all duration-300 focus-within:ring-1 focus-within:ring-primary/50 focus-within:shadow-md rounded-lg">
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder={t('product_description_placeholder')}
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
              <h4 className="text-sm font-medium mb-1">{t('environmental_tips')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('environmental_tips_desc')}
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
              {t('cancel_prediction')}
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
                {t('save_draft')}
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 transition-colors shadow-lg hover:shadow-primary/20"
              >
                <BarChart2 className="h-4 w-4 mr-2" />
                {t('start_prediction')}
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
