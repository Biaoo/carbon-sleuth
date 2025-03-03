
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            开始您的低碳供应链之旅
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
            立即使用我们的AI驱动碳足迹分析工具，挖掘减碳潜力，发现商业机遇，引领可持续发展。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 rounded-full px-7 h-12"
              onClick={() => navigate('/inference')}
            >
              开始碳足迹预测
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 rounded-full px-7 h-12"
              onClick={() => navigate('/search')}
            >
              搜索产品碳足迹
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
