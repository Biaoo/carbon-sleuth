
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ChevronRight, ArrowUpRight, Check } from 'lucide-react';

// Mock data
const recommendedSuppliers = [
  {
    id: 1,
    name: '绿能科技有限公司',
    industry: '电子元件',
    rating: 4.8,
    highlights: [
      '使用100%可再生能源生产',
      '减少45%生产过程碳排放',
      '先进的闭环回收系统'
    ],
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: '可持续时装集团',
    industry: '纺织品',
    rating: 4.6,
    highlights: [
      '有机认证原材料采购',
      '零废水排放生产工艺',
      '碳中和运营承诺'
    ],
    image: 'https://images.unsplash.com/photo-1575440197392-77ace79f1818?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 3,
    name: '绿色包装技术公司',
    industry: '包装材料',
    rating: 4.9,
    highlights: [
      '100%可回收或可降解材料',
      '低碳物流配送网络',
      '生物基创新材料研发'
    ],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=200&auto=format&fit=crop'
  }
];

const LowCarbonRecommendations = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">优秀低碳供应商推荐</h2>
            <p className="text-foreground/70 max-w-xl">
              发现碳足迹表现卓越的供应商，助力绿色供应链建设
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/recommendation')}
          >
            查看全部推荐
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedSuppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="bg-white border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-40 overflow-hidden bg-tech-blue/5">
                <img 
                  src={supplier.image} 
                  alt={supplier.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <Badge variant="secondary" className="bg-white/20 border-white/30 text-white mb-2">
                    {supplier.industry}
                  </Badge>
                  <h3 className="text-xl font-semibold">{supplier.name}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center mb-4">
                  <div className="flex items-center bg-eco-green/10 text-eco-green px-2 py-1 rounded text-sm font-medium">
                    <Star className="h-4 w-4 mr-1 fill-eco-green" />
                    <span>{supplier.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">碳足迹评分</span>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">低碳亮点</h4>
                  <ul className="space-y-2">
                    {supplier.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-eco-green mr-2 mt-0.5 shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-primary"
                  onClick={() => navigate(`/recommendation/supplier/${supplier.id}`)}
                >
                  <span>查看供应商详情</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LowCarbonRecommendations;
