
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Info, Star } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { BilingualText } from '@/components/prediction-result/types';

const bilingual = (zh: string, en: string) => ({ zh, en });


interface ServiceProvider {
  id: number;
  name: BilingualText;
  rating: number;
  reviewCount: number;
  serviceName: BilingualText;
  serviceTypes: BilingualText[];
  description: BilingualText;
  price: string;
  features: BilingualText[];
  recommended?: boolean;
}

const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: bilingual('易碳数科', 'E-C Digit'),
    rating: 4.8,
    reviewCount: 156,
    serviceName: bilingual('产品碳足迹评估', 'Product Carbon Footprint Assessment'),
    serviceTypes: [bilingual('碳足迹核算', 'Carbon Footprint Calculation'), bilingual('组织碳核算', 'Organizational Carbon Footprint Calculation')],
    description: bilingual('提供完整的产品生命周期碳足迹评估，符合ISO 14067标准，包含数据收集、计算与分析报告', 'Provide a comprehensive product life cycle carbon footprint assessment, compliant with ISO 14067 standards, including data collection, calculation, and analysis reports'),
    price: '¥10,000',
    features: [bilingual('产品生命周期分析', 'Product Life Cycle Analysis'), bilingual('ISO 14067合规', 'ISO 14067 Compliance'), bilingual('基础数据收集', 'Basic Data Collection'), bilingual('评估报告', 'Assessment Report'), bilingual('碳减排建议', 'Carbon Reduction Recommendations')],
    recommended: true
  },
  {
    id: 2,
    name: bilingual('海科数据', 'HiQLCD'),
    rating: 4.6,
    reviewCount: 98,
    serviceName: bilingual('LCA碳数据服务', 'LCA Carbon Data Service'),
    serviceTypes: [bilingual('高质量碳数据服务', 'High-Quality LCA Database Service'), bilingual('碳足迹核算', 'Carbon Footprint Calculation')],
    description: bilingual('提供高质量的LCA碳数据服务，包括碳足迹核算、碳标签设计、碳减排方案设计等', 'Provide high-quality LCA carbon data services, including carbon footprint calculation, carbon label design, and carbon reduction solution design'),
    price: '¥10,000',
    features: [bilingual('高质量LCA数据库服务', 'High-Quality LCA Database Service'), bilingual('碳足迹核算', 'Carbon Footprint Calculation'), bilingual('碳标签设计', 'Carbon Label Design'), bilingual('碳减排方案设计', 'Carbon Reduction Solution Design'), bilingual('碳管理数字平台', 'Carbon Management Digital Platform')],
    recommended: true
  },
  {
    id: 3,
    name: bilingual('SGS', 'SGS'),
    rating: 4.3,
    reviewCount: 217,
    serviceName: bilingual('国际碳足迹认证服务', 'International Carbon Footprint Certification Service'),
    serviceTypes: [bilingual('碳足迹认证', 'Carbon Footprint Certification'), bilingual('国际标准认证', 'International Standard Certification')],
    description: bilingual('国际权威认证机构提供的碳足迹验证与认证服务，符合多国碳标签要求', 'International certification body provides carbon footprint verification and certification services, compliant with multiple carbon label requirements'),
    price: '¥15,000',
    features: [bilingual('国际认可认证', 'International Recognized Certification'), bilingual('PAS 2050标准', 'PAS 2050 Standard'), bilingual('碳标签设计', 'Carbon Label Design'), bilingual('市场推广支持', 'Market Promotion Support'), bilingual('年度复审服务', 'Annual Renewal Service')],
  },
  {
    id: 4,
    name: bilingual('莱茵TÜV', 'TÜV Rheinland'),
    rating: 4.4,
    reviewCount: 185,
    serviceName: bilingual('全面碳足迹验证与认证', 'Comprehensive Carbon Footprint Verification and Certification'),
    serviceTypes: [bilingual('碳足迹认证', 'Carbon Footprint Certification'), bilingual('碳标签服务', 'Carbon Label Service'), bilingual('国际标准认证', 'International Standard Certification')],
    description: bilingual('德国莱茵集团提供的全面碳足迹验证与认证服务，国际认可度高', 'German TÜV provides comprehensive carbon footprint verification and certification services, with high international recognition'),
    price: '¥18,000',
    features: [bilingual('全生命周期评估', 'Full Life Cycle Assessment'), bilingual('欧盟市场认可', 'EU Market Recognition'), bilingual('碳中和咨询', 'Carbon Neutral Consulting'), bilingual('可持续发展路径规划', 'Sustainable Development Path Planning'), bilingual('国际标准合规', 'International Standard Compliance')],
  },
  {
    id: 5,
    name: bilingual('碳阻迹', 'Carbon Stop'),
    rating: 4.2,
    reviewCount: 132,
    serviceName: bilingual('产品碳足迹评估专业版', 'Product Carbon Footprint Assessment Professional Edition'),
    serviceTypes: [bilingual('碳足迹核算', 'Carbon Footprint Calculation'), bilingual('减排方案设计', 'Carbon Reduction Solution Design')],
    description: bilingual('专注于产品碳足迹评估和减排方案设计的专业服务，提供定制化解决方案', '专注于产品碳足迹评估和减排方案设计的专业服务，提供定制化解决方案'),
    price: '¥12,000',
    features: [bilingual('深度数据分析', 'Deep Data Analysis'), bilingual('同行业对标', 'Industry Benchmarking'), bilingual('减排优化建议', 'Carbon Reduction Optimization Suggestions'), bilingual('碳标签设计', 'Carbon Label Design'), bilingual('技术咨询支持', 'Technical Consulting Support')],
  }
];

const WorkspaceSupplierServiceSelection: React.FC = () => {
  const { t,language } = useLanguage();
  
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
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/6">{t('service_provider')}</TableHead>
              <TableHead className="w-1/6">{t('service_name')}</TableHead>
              <TableHead className="w-1/6">{t('service_type')}</TableHead>
              <TableHead className="text-center">{t('rating')}</TableHead>
              <TableHead className="text-right">{t('price')}</TableHead>
              <TableHead className="text-right">{t('action')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serviceProviders.map((provider) => (
              <TableRow key={provider.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {language === 'zh' ? provider.name.zh : provider.name.en}
                    {provider.recommended && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{t('recommended_provider')}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-1">
                    <span>{language === 'zh' ? provider.serviceName.zh : provider.serviceName.en}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-60">{language === 'zh' ? provider.description.zh : provider.description.en}</p>
                          <ul className="mt-2 space-y-1">
                            {provider.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-xs">
                                <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{language === 'zh' ? feature.zh : feature.en}</span>
                              </li>
                            ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {provider.serviceTypes.map((type, index) => (
                      <Badge key={index} variant="secondary" className="font-normal text-xs">
                        {language === 'zh' ? type.zh : type.en}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <div className="flex mr-1">
                      {renderRatingStars(provider.rating)}
                    </div>
                    <span className="text-sm">{provider.rating}</span>
                    <span className="text-xs text-muted-foreground ml-1">({provider.reviewCount})</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">{provider.price}</TableCell>
                <TableCell className="text-right">
                  <Button>{t('select_service')}</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WorkspaceSupplierServiceSelection;
