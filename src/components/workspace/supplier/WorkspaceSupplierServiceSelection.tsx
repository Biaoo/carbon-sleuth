
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, Info } from 'lucide-react';
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

interface ServiceProvider {
  id: number;
  name: string;
  serviceName: string;
  description: string;
  price: string;
  features: string[];
}

const serviceProviders: ServiceProvider[] = [
  {
    id: 1,
    name: '绿色碳链',
    serviceName: '产品碳足迹评估基础版',
    description: '基于产品生命周期分析的碳足迹评估服务，符合ISO 14067标准',
    price: '¥5,000',
    features: ['产品生命周期分析', 'ISO 14067合规', '基础数据收集', '评估报告']
  },
  {
    id: 2,
    name: '碳云科技',
    serviceName: '碳足迹认证专业版',
    description: '全面的产品碳足迹评估与认证，包含减排建议和优化方案',
    price: '¥12,000',
    features: ['深入数据分析', '减排优化建议', '碳标签设计', '认证支持']
  },
  {
    id: 3,
    name: '绿能数据',
    serviceName: '绿色供应链碳管理',
    description: '面向供应链的完整碳管理解决方案，助力企业实现低碳转型',
    price: '¥20,000',
    features: ['供应链碳足迹分析', '碳减排路径规划', '定期监测报告', '供应商培训']
  }
];

const WorkspaceSupplierServiceSelection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('select_carbon_service')}</h2>
      
      <div className="mb-6">
        <p className="text-muted-foreground">
          {t('service_selection_description')}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {serviceProviders.map((provider) => (
          <Card key={provider.id} className="border border-border">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{provider.serviceName}</span>
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
              </CardTitle>
              <CardDescription>{provider.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <span className="text-2xl font-bold">{provider.price}</span>
                <span className="text-sm text-muted-foreground ml-1">{t('per_product')}</span>
              </div>
              <ul className="space-y-2">
                {provider.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{t('select_service')}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceSupplierServiceSelection;
