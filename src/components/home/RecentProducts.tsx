
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, ExternalLink } from 'lucide-react';

// Mock data for recent products
const recentProducts = [
  {
    id: 1,
    name: '高性能锂电池',
    supplier: '绿能科技有限公司',
    category: '电子元件',
    carbonFootprint: 12.5,
    unit: 'kg CO₂e/unit',
    dataType: '实际数据',
    date: '2023-05-15',
    image: 'https://images.unsplash.com/photo-1602920068685-a05c7e8ccb2d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    name: '有机棉T恤',
    supplier: '可持续时装集团',
    category: '纺织品',
    carbonFootprint: 3.2,
    unit: 'kg CO₂e/unit',
    dataType: '预测结果',
    date: '2023-06-02',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    name: '可回收纸质包装',
    supplier: '绿色包装技术公司',
    category: '包装材料',
    carbonFootprint: 0.8,
    unit: 'kg CO₂e/unit',
    dataType: '实际数据',
    date: '2023-06-10',
    image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    name: '太阳能充电宝',
    supplier: '新能源科技有限公司',
    category: '电子产品',
    carbonFootprint: 5.6,
    unit: 'kg CO₂e/unit',
    dataType: '预测结果',
    date: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1594549181032-e8923e7d74d5?q=80&w=500&auto=format&fit=crop'
  }
];

const RecentProducts = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">最新产品碳足迹</h2>
            <p className="text-foreground/70 max-w-xl">
              浏览最新添加的产品碳足迹数据，掌握行业绿色发展动态
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0"
            onClick={() => navigate('/search')}
          >
            查看全部
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <div 
              key={product.id}
              className="bg-white border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <Badge 
                  className={`absolute top-3 right-3 ${
                    product.dataType === '实际数据' 
                      ? 'bg-eco-green text-white' 
                      : 'bg-data-blue text-white'
                  }`}
                >
                  {product.dataType}
                </Badge>
              </div>
              
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {product.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {product.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.supplier}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {product.carbonFootprint}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        {product.unit}
                      </span>
                    </p>
                  </div>
                  
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="text-primary"
                    onClick={() => navigate(`/search/${product.id}`)}
                  >
                    详情
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
