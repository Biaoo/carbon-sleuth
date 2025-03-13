
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Info, Star } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface ServiceProvider {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  serviceName: string;
  serviceTypes: string[];
  description: string;
  price: string;
  features: string[];
}

const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: '易碳数科',
    rating: 4.8,
    reviewCount: 156,
    serviceName: '产品碳足迹评估基础版',
    serviceTypes: ['碳足迹核算', '低碳认证'],
    description: '提供完整的产品生命周期碳足迹评估，符合ISO 14067标准，包含数据收集、计算与分析报告',
    price: '¥5,000',
    features: ['产品生命周期分析', 'ISO 14067合规', '基础数据收集', '评估报告', '碳减排建议']
  },
  {
    id: 2,
    name: '海科数据',
    rating: 4.6,
    reviewCount: 98,
    serviceName: '企业碳排放管理系统',
    serviceTypes: ['供应链碳管理', '碳足迹核算'],
    description: '提供完整的企业碳管理解决方案，包括碳盘查、碳核算和减排路径规划',
    price: '¥8,500',
    features: ['企业碳排放盘查', '多产品碳足迹核算', '供应链碳管理', '碳管理数字平台', '季度跟踪报告']
  },
  {
    id: 3,
    name: 'SGS',
    rating: 4.9,
    reviewCount: 217,
    serviceName: '国际碳足迹认证服务',
    serviceTypes: ['碳足迹认证', '国际标准认证'],
    description: '国际权威认证机构提供的碳足迹验证与认证服务，符合多国碳标签要求',
    price: '¥15,000',
    features: ['国际认可认证', 'PAS 2050标准', '碳标签设计', '市场推广支持', '年度复审服务']
  },
  {
    id: 4,
    name: '莱茵TÜV',
    rating: 4.7,
    reviewCount: 185,
    serviceName: '全面碳足迹验证与认证',
    serviceTypes: ['碳足迹认证', '碳标签服务', '国际标准认证'],
    description: '德国莱茵集团提供的全面碳足迹验证与认证服务，国际认可度高',
    price: '¥18,000',
    features: ['全生命周期评估', '欧盟市场认可', '碳中和咨询', '可持续发展路径规划', '国际标准合规']
  },
  {
    id: 5,
    name: '碳阻迹',
    rating: 4.5,
    reviewCount: 132,
    serviceName: '产品碳足迹评估专业版',
    serviceTypes: ['碳足迹核算', '减排方案设计'],
    description: '专注于产品碳足迹评估和减排方案设计的专业服务，提供定制化解决方案',
    price: '¥12,000',
    features: ['深度数据分析', '同行业对标', '减排优化建议', '碳标签设计', '技术咨询支持']
  }
];

const WorkspaceSupplierServiceSelection: React.FC = () => {
  const { t } = useLanguage();
  
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 fill-opacity-50" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    
    return stars;
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('select_carbon_service')}</h2>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          {t('service_selection_description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {serviceProviders.map((provider) => (
          <Card key={provider.id} className="border border-border h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <CardDescription className="mt-1">{provider.serviceName}</CardDescription>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-60">{provider.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex items-center mt-2">
                <div className="flex mr-2">
                  {renderRatingStars(provider.rating)}
                </div>
                <span className="text-sm font-medium">{provider.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({provider.reviewCount})</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {provider.serviceTypes.map((type, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <div className="mb-4">
                <span className="text-2xl font-bold">{provider.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{t('per_product')}</span>
              </div>
              <ul className="space-y-2">
                {provider.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="mt-auto">
              <Button className="w-full">{t('select_service')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSupplierServiceSelection;
