import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  BarChart, 
  Leaf, 
  TrendingDown, 
  Factory, 
  Award, 
  CheckCircle, 
  ExternalLink,
  Search 
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const bilingual = (zh: string, en: string) => ({ zh, en });

// Define interfaces for our data types
interface BilingualText {
  zh: string;
  en: string;
}

interface Supplier {
  id: string;
  name: BilingualText;
  industry: BilingualText;
  category: BilingualText;
  rating: number | string;
  carbonScore: number;
  highlights: BilingualText[];
  products: BilingualText[];
  region: BilingualText;
  image?: string;
}

interface Product {
  id: string;
  name: BilingualText;
  supplier: BilingualText;
  category: BilingualText;
  dataType: string;
  carbonScore?: number;
  carbonValue: number;
  unit: string;
  reduction: number;
  industryAvg: number;
  features?: BilingualText[];
  highlights: BilingualText[];
  certifications?: string[];
  image?: string;
}

interface Practice {
  id: string;
  title: BilingualText;
  category?: BilingualText;
  company: BilingualText;
  description: BilingualText;
  results: BilingualText[];
  industries: BilingualText[];
  impact?: string;
  difficulty?: string;
  image: string;
}

// 模拟数据 - 低碳供应商
const mockSuppliers = [
  {
    id: 'sup-001',
    name: bilingual('上海绿能科技有限公司', 'Shanghai Green Energy Technology Co., Ltd.'),
    industry: bilingual('可再生能源', 'Renewable Energy'),
    category: bilingual('太阳能', 'Solar Energy'),
    rating: 4.8,
    highlights: [bilingual('使用100%可再生能源', 'Using 100% Renewable Energy'), bilingual('零废水排放', 'Zero Waste Water Discharge'), bilingual('碳中和认证', 'Carbon Neutral Certification')],
    products: [bilingual('太阳能电池板', 'Solar Panels'), bilingual('逆变器', 'Inverters'), bilingual('储能系统', 'Energy Storage Systems')],
    carbonScore: 85,
    industryAvg: 60,
    region: bilingual('华东', 'East China'),
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-002',
    name: bilingual('江苏新材料科技股份有限公司', 'Jiangsu New Material Technology Co., Ltd.'),
    industry: bilingual('材料科学', 'Material Science'),
    category: bilingual('复合材料', 'Composite Materials'),
    rating: 4.5,
    highlights: [bilingual('闭环生产系统', 'Closed-Loop Production System'), bilingual('可回收材料占比95%', '95% Recyclable Material'), bilingual('低碳供应链认证', 'Low-Carbon Supply Chain Certification')],
    products: [bilingual('生物基复合材料', 'Bio-Based Composite Materials'), bilingual('可降解塑料', 'Degradable Plastics'), bilingual('轻量化材料', 'Lightweight Materials')],
    carbonScore: 78,
    industryAvg: 55,
    region: bilingual('华东', 'East China'),
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-003',
    name: bilingual('广东高效能源有限公司', 'Guangdong High Efficiency Energy Co., Ltd.'),
    industry: bilingual('储能技术', 'Energy Storage Technology'),
    category: bilingual('电池技术', 'Battery Technology'),
    rating: 4.6,
    highlights: [bilingual('能源密度提升30%', 'Energy Density Boost 30%'), bilingual('使用回收原材料', 'Using Recycled Materials'), bilingual('低碳生产工艺', 'Low-Carbon Production Process')],
    products: [bilingual('锂电池组件', 'Lithium Battery Components'), bilingual('储能系统', 'Energy Storage Systems'), bilingual('电池管理系统', 'Battery Management System')],
    carbonScore: 80,
    industryAvg: 58,
    region: bilingual('华南', 'South China'),
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-004',
    name: bilingual('北京清洁能源技术有限公司', 'Beijing Clean Energy Technology Co., Ltd.'),
    industry: bilingual('可再生能源', 'Renewable Energy'),
    category: bilingual('风能', 'Wind Energy'),
    rating: 4.7,
    highlights: [bilingual('节能生产线', 'Energy-Efficient Production Line'), bilingual('生物基材料应用', 'Biological-Based Material Application'), bilingual('碳足迹全程追踪', 'Carbon Footprint Tracking Throughout the Supply Chain')],
    products: [bilingual('风力发电机叶片', 'Wind Turbine Blade'), bilingual('风电控制系统', 'Wind Power Control System'), bilingual('微电网方案', 'Microgrid Solution')],
    carbonScore: 82,
    industryAvg: 60,
    region: bilingual('华北', 'North China'),
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-005',
    name: bilingual('深圳智能制造有限公司', 'Shenzhen Intelligent Manufacturing Co., Ltd.'),
    industry: bilingual('电子制造', 'Electronic Manufacturing'),
    category: bilingual('智能硬件', 'Intelligent Hardware'),
    rating: 4.4,
    highlights: [bilingual('智能生产线优化', 'Smart Production Line Optimization'), bilingual('低能耗生产工艺', 'Low-Energy Consumption Production Process'), bilingual('本地化供应链', 'Local Supply Chain')],
    products: [bilingual('智能传感器', 'Smart Sensors'), bilingual('控制器', 'Controllers'), bilingual('IoT设备', 'IoT Devices')],
    carbonScore: 75,
    industryAvg: 52,
    region: bilingual('华南', 'South China'),
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-006',
    name: bilingual('安徽绿色建材有限公司', 'Anhui Green Building Materials Co., Ltd.'),
    industry: bilingual('建筑材料', 'Building Materials'),
    category: bilingual('绿色建材', 'Green Building Materials'),
    rating: 4.3,
    highlights: [bilingual('可再生原料使用', 'Using Renewable Raw Materials'), bilingual('低碳水泥技术', 'Low-Carbon Cement Technology'), bilingual('能源自给自足工厂', 'Self-Sufficient Energy Factory')],
    products: [bilingual('低碳水泥', 'Low-Carbon Cement'), bilingual('绿色混凝土', 'Green Concrete'), bilingual('隔热材料', 'Insulation Materials')],
    carbonScore: 73,
    industryAvg: 50,
    region: bilingual('华中', 'Central China'),
    image: 'https://placehold.co/100x100',
  },
];

// 模拟数据 - 低碳产品
const mockProducts = [
  {
    id: 'prod-001',
    name: bilingual('高效太阳能电池板 SE-500', 'High-Efficiency Solar Panel SE-500'),
    supplier: bilingual('上海绿能科技有限公司', 'Shanghai Green Energy Technology Co., Ltd.'),
    category: bilingual('可再生能源', 'Renewable Energy'),
    carbonValue: 25.3,
    unit: 'kgCO2e/Unit',
    dataType: 'verified',
    highlights: [bilingual('转换效率提升15%', 'Efficiency Boost 15%'), bilingual('生产过程零碳排放', 'Zero Carbon Production Process'), bilingual('可回收率99%', '99% Recyclable Rate')],
    reduction: 35,
    industryAvg: 40.1,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-002',
    name: bilingual('生物基复合材料 BioComp-X', 'Bio-Based Composite Material BioComp-X'),
    supplier: bilingual('江苏新材料科技股份有限公司', 'Jiangsu New Material Technology Co., Ltd.'),
    category: bilingual('材料科学', 'Material Science'),
    carbonValue: 12.8,
    unit: 'kgCO2e/kg',
    dataType: 'verified',
    highlights: [bilingual('生物基含量>80%', 'Biological-Based Content >80%'), bilingual('生产能耗降低45%', 'Production Energy Consumption Reduction 45%'), bilingual('可全部生物降解', 'Fully Biodegradable')],
    reduction: 42,
    industryAvg: 22.5,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-003',
    name: bilingual('高密度锂电池 HD-1000', 'High-Density Lithium Battery HD-1000'),
    supplier: bilingual('广东高效能源有限公司', 'Guangdong High Efficiency Energy Co., Ltd.'),
    category: bilingual('储能技术', 'Energy Storage Technology'),
    carbonValue: 56.7,
    unit: 'kgCO2e/kWh',
    dataType: 'predicted',
    highlights: [bilingual('能量密度提升30%', 'Energy Density Boost 30%'), bilingual('使用回收钴镍', 'Using Recycled Cobalt-Nickel'), bilingual('寿命周期延长50%', 'Lifetime Extension 50%')],
    reduction: 28,
    industryAvg: 78.2,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-004',
    name: bilingual('轻量化风电叶片 WB-120', 'Lightweight Wind Turbine Blade WB-120'),
    supplier: bilingual('北京清洁能源技术有限公司', 'Beijing Clean Energy Technology Co., Ltd.'),
    category: bilingual('可再生能源', 'Renewable Energy'),
    carbonValue: 15.6,
    unit: 'tCO2e/套',
    dataType: 'verified',
    highlights: [bilingual('重量减轻35%', 'Weight Reduction 35%'), bilingual('耐用性提高40%', 'Durability Improvement 40%'), bilingual('使用再生复合材料', 'Using Recycled Composite Materials')],
    reduction: 38,
    industryAvg: 25.3,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-005',
    name: bilingual('智能能源管理系统 EMS-200', 'Smart Energy Management System EMS-200'),
    supplier: bilingual('深圳智能制造有限公司', 'Shenzhen Intelligent Manufacturing Co., Ltd.'),
    category: bilingual('智能硬件', 'Intelligent Hardware'),
    carbonValue: 8.9,
    unit: 'kgCO2e/Unit',
    dataType: 'predicted',
    highlights: [bilingual('能耗监控优化', 'Energy Consumption Monitoring Optimization'), bilingual('低功耗设计', 'Low-Power Design'), bilingual('模块化架构', 'Modular Architecture')],
    reduction: 32,
    industryAvg: 13.2,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-006',
    name: bilingual('低碳绝热材料 ThermLow', 'Low-Carbon Insulation Material ThermLow'),
    supplier: bilingual('安徽绿色建材有限公司', 'Anhui Green Building Materials Co., Ltd.'),
    category: bilingual('绿色建材', 'Green Building Materials'),
    carbonValue: 5.2,
    unit: 'kgCO2e/m²',
    dataType: 'verified',
    highlights: [bilingual('废弃材料再利用', 'Recycling of Waste Materials'), bilingual('无有害物质', 'No Harmful Substances'), bilingual('隔热性能提升25%', 'Insulation Performance Boost 25%')],
    reduction: 45,
    industryAvg: 9.5,
    image: 'https://placehold.co/100x100',
  },
];

// 模拟数据 - 最佳实践
const mockPractices = [
  {
    id: 'prac-001',
    title: bilingual('闭环生产系统优化', 'Closed-Loop Production System Optimization'),
    company: bilingual('江苏新材料科技股份有限公司', 'Jiangsu New Material Technology Co., Ltd.'),
    description: bilingual('通过建立闭环生产系统，实现废料100%回收再利用，同时优化工艺流程，减少能源消耗。', 'By establishing a closed-loop production system, we achieve 100% recycling of waste materials and optimize the production process to reduce energy consumption.'),
    results: [bilingual('碳排放降低32%', 'Carbon Emission Reduction 32%'), bilingual('废弃物减少95%', 'Waste Reduction 95%'), bilingual('能源效率提升28%', 'Energy Efficiency Improvement 28%')],
    industries: [bilingual('材料科学', 'Material Science'), bilingual('制造业', 'Manufacturing'), bilingual('化工', 'Chemical Industry')],
    image: 'https://placehold.co/300x200',
  },
  {
    id: 'prac-002',
    title: bilingual('供应链本地化战略', 'Supply Chain Localization Strategy'),
    company: bilingual('深圳智能制造有限公司', 'Shenzhen Intelligent Manufacturing Co., Ltd.'),
    description: bilingual('重构供应链网络，优先选择本地供应商，减少运输距离和碳足迹，同时提高供应链弹性。', 'Reconstruct the supply chain network, prioritize local suppliers, reduce transportation distance and carbon footprint, and improve supply chain resilience.'),
    results: [bilingual('运输碳排放降低45%', 'Transportation Carbon Emission Reduction 45%'), bilingual('供应链成本降低18%', 'Supply Chain Cost Reduction 18%'), bilingual('交付时间缩短35%', 'Delivery Time Reduction 35%')],
    industries: [bilingual('电子制造', 'Electronic Manufacturing'), bilingual('消费品', 'Consumer Goods'), bilingual('汽车', 'Automotive')],
    image: 'https://placehold.co/300x200',
  },
  {
    id: 'prac-003',
    title: bilingual('可再生能源全覆盖计划', '100% Renewable Energy Coverage Plan')   ,
    company: bilingual('上海绿能科技有限公司', 'Shanghai Green Energy Technology Co., Ltd.'),
    description: bilingual('通过屋顶光伏、微型风电和储能系统的组合，实现工厂100%可再生能源使用，同时出售多余电力。', 'By combining rooftop solar, micro wind turbines, and energy storage systems, we achieve 100% renewable energy use in the factory and sell excess electricity.'),
    results: [bilingual('能源碳足迹降至零', 'Energy Carbon Footprint降至零'), bilingual('年节约能源成本220万元', 'Annual Energy Cost Savings 2.2 million yuan'), bilingual('能源自给率达到115%', 'Energy Self-Sufficiency Rate 115%')],
    industries: [bilingual('可再生能源', 'Renewable Energy'), bilingual('制造业', 'Manufacturing'), bilingual('技术硬件', 'Technical Hardware')],
    image: 'https://placehold.co/300x200',
  },
];

// 供应商卡片组件
const SupplierCard = ({ supplier }: { supplier: Supplier }) => {
  const { t, language } = useLanguage();
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{language === 'zh' ? supplier.name.zh : supplier.name.en}</CardTitle>
            <CardDescription className="mt-1">
              {language === 'zh' ? supplier.industry.zh : supplier.industry.en} | {language === 'zh' ? supplier.category.zh : supplier.category.en}
            </CardDescription>
          </div>
          <div className="bg-primary/10 text-primary font-medium px-2 py-1 rounded-md flex items-center">
            <Award className="h-4 w-4 mr-1" />
            {supplier.rating}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="relative w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full" 
                style={{ width: `${supplier.carbonScore}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{t('carbon_performance')} {supplier.carbonScore}/100</span>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{t('low_carbon_highlights')}</p>
            <div className="flex flex-wrap gap-1">
              {supplier.highlights.map((highlight: { zh: string, en: string }, index: number) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {language === 'zh' ? highlight.zh : highlight.en}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{t('product_coverage')}</p>
            <p className="text-sm">{supplier.products.map(p => p.zh).join(', ')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          <Factory className="h-3 w-3 mr-1" />
          <span>{language === 'zh' ? supplier.region.zh : supplier.region.en}</span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          {t('view_details')}
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// 产品卡片组件
const ProductCard = ({ product }: { product: Product }) => {
  const { t, language } = useLanguage();
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{language === 'zh' ? product.name.zh : product.name.en}</CardTitle>
            <CardDescription className="mt-1">
              {language === 'zh' ? product.supplier.zh : product.supplier.en}
            </CardDescription>
          </div>
          <Badge variant={product.dataType === 'verified' ? 'default' : 'outline'}>
            {language === 'zh' ? product.dataType === 'verified' ? '实测数据' : '预测数据' : product.dataType === 'verified' ? 'Verified Data' : 'Predicted Data'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <BarChart className="h-4 w-4 text-primary mr-1.5" />
              <span className="font-medium">{product.carbonValue} {product.unit}</span>
            </div>
            <div className="flex items-center text-green-600 text-sm">
              <TrendingDown className="h-4 w-4 mr-1" />
              <span>-{product.reduction}%</span>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground flex items-center">
            <span>{t('industry_average')}: {product.industryAvg} {product.unit}</span>
          </p>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{t('carbon_reduction_highlights')}</p>
            <div className="space-y-1">
              {product.highlights.map((highlight: BilingualText, index: number) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1.5 mt-0.5" />
                  <span className="text-sm">{language === 'zh' ? highlight.zh : highlight.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          <Leaf className="h-3 w-3 mr-1" />
          <span>{language === 'zh' ? product.category.zh : product.category.en}</span>
        </div>
        <Button variant="ghost" size="sm" className="text-xs">
          {t('view_details')}
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// 最佳实践卡片组件
const PracticeCard = ({ practice }: { practice: Practice }) => {
  const { t, language } = useLanguage();
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-40 bg-gray-100 relative">
        <img 
          src={practice.image} 
          alt={language === "zh" ? practice.title.zh : practice.title.en} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white font-medium p-4">{language === 'zh' ? practice.title.zh : practice.title.en}</h3>
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          {language === 'zh' ? practice.company.zh : practice.company.en}
        </p>
        <p className="text-sm mb-4 line-clamp-3">
          {language === 'zh' ? practice.description.zh : practice.description.en}
        </p>
        <div className="space-y-2">
          <p className="text-xs font-medium">{t('implementation_results')}</p>
          <div className="space-y-1">
            {practice.results.map((result: BilingualText, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-1.5 mt-0.5" />
                <p className="text-xs">{language === 'zh' ? result.zh : result.en}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-2">
          <p className="text-xs text-muted-foreground mb-1">{t('industry_applicability')}</p>
          <div className="flex flex-wrap gap-1">
            {practice.industries.slice(0, 2).map((industry: BilingualText, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs font-normal">
                {language === 'zh' ? industry.zh : industry.en}
              </Badge>
            ))}
            {practice.industries.length > 2 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{practice.industries.length - 2}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {practice.industries.slice(0, 2).map((industry: BilingualText, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs font-normal">
                {language === 'zh' ? industry.zh : industry.en}
              </Badge>
            ))}
            {practice.industries.length > 2 && (
              <Badge variant="secondary" className="text-xs font-normal">
                +{practice.industries.length - 2}
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" className="text-xs">
            {t('view_details')}
            <ExternalLink className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const Recommendation: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('suppliers');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('low_carbon_recommendation')}</h1>
            <p className="text-muted-foreground mt-2">
              {t('low_carbon_suppliers_desc')}
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('search...')} 
                className="pl-9 w-full"
              />
            </div>
            <Button>{t('filter')}</Button>
          </div>
        </div>
        
        <Tabs defaultValue="suppliers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full md:max-w-3xl grid-cols-1 sm:grid-cols-3 gap-2 mb-8">
            <TabsTrigger value="suppliers" className="px-2 py-1.5 text-sm whitespace-normal text-center h-auto">
              {t('low_carbon_suppliers')}
            </TabsTrigger>
            <TabsTrigger value="products" className="px-2 py-1.5 text-sm whitespace-normal text-center h-auto">
              {t('low_carbon_products')}
            </TabsTrigger>
            <TabsTrigger value="practices" className="px-2 py-1.5 text-sm whitespace-normal text-center h-auto">
              {t('carbon_reduction_best_practices')}
            </TabsTrigger>
          </TabsList>
          
          {/* 筛选区域 */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {activeTab === 'suppliers' && (
              <>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="行业分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_industries')}</SelectItem>
                    <SelectItem value="energy">{t('renewable_energy')}</SelectItem>
                    <SelectItem value="material">{t('material_science')}</SelectItem>
                    <SelectItem value="storage">{t('energy_storage')}</SelectItem>
                    <SelectItem value="electronics">{t('electronics_manufacturing')}</SelectItem>
                    <SelectItem value="building">{t('building_materials')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="产品类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_categories')}</SelectItem>
                    <SelectItem value="solar">{t('solar_energy')}</SelectItem>
                    <SelectItem value="wind">{t('wind_energy')}</SelectItem>
                    <SelectItem value="battery">{t('battery_technology')}</SelectItem>
                    <SelectItem value="material">{t('composite_materials')}</SelectItem>
                    <SelectItem value="smart">{t('smart_hardware')}</SelectItem>
                    <SelectItem value="green">{t('green_building_materials')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_regions')}</SelectItem>
                    <SelectItem value="east">{t('east_china')}</SelectItem>
                    <SelectItem value="south">{t('south_china')}</SelectItem>
                    <SelectItem value="north">{t('north_china')}</SelectItem>
                    <SelectItem value="central">{t('central_china')}</SelectItem>
                    <SelectItem value="west">{t('west_china')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="score">
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">{t('carbon_performance_score')}</SelectItem>
                    <SelectItem value="rating">{t('overall_rating')}</SelectItem>
                    <SelectItem value="latest">{t('latest_added')}</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
            
            {activeTab === 'products' && (
              <>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="产品类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_categories')}</SelectItem>
                    <SelectItem value="energy">{t('renewable_energy')}</SelectItem>
                    <SelectItem value="material">{t('material_science')}</SelectItem>
                    <SelectItem value="storage">{t('energy_storage')}</SelectItem>
                    <SelectItem value="electronics">{t('smart_hardware')}</SelectItem>
                    <SelectItem value="building">{t('green_building_materials')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="数据类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_data')}</SelectItem>
                    <SelectItem value="verified">{t('measured_data')}</SelectItem>
                    <SelectItem value="predicted">{t('predicted_data')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="降碳水平" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_data')}</SelectItem>
                    <SelectItem value="high">{t('significant_reduction')}</SelectItem>
                    <SelectItem value="medium">{t('medium_reduction')}</SelectItem>
                    <SelectItem value="low">{t('slight_reduction')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="reduction">
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reduction">{t('reduction_magnitude')}</SelectItem>
                    <SelectItem value="carbon">{t('carbon_footprint_value')}</SelectItem>
                    <SelectItem value="latest">{t('latest_added')}</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
            
            {activeTab === 'practices' && (
              <>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="行业适用性" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_industries')}</SelectItem>
                    <SelectItem value="manufacturing">{t('manufacturing')}</SelectItem>
                    <SelectItem value="energy">{t('energy_industry')}</SelectItem>
                    <SelectItem value="chemical">{t('chemical_industry')}</SelectItem>
                    <SelectItem value="electronics">{t('electronics_industry')}</SelectItem>
                    <SelectItem value="automotive">{t('automotive_industry')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="实施难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('implementation_difficulty')}</SelectItem>
                    <SelectItem value="easy">{t('easy_to_implement')}</SelectItem>
                    <SelectItem value="medium">{t('medium_difficulty')}</SelectItem>
                    <SelectItem value="hard">{t('high_difficulty')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="投资回报期" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_periods')}</SelectItem>
                    <SelectItem value="short">{t('short_term')}</SelectItem>
                    <SelectItem value="medium">{t('medium_term')}</SelectItem>
                    <SelectItem value="long">{t('long_term')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="impact">
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="impact">{t('carbon_reduction_effect')}</SelectItem>
                    <SelectItem value="roi">{t('return_on_investment')}</SelectItem>
                    <SelectItem value="latest">{t('latest_added')}</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
          
          {/* 内容区域 */}
          <TabsContent value="suppliers" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockSuppliers.map((supplier) => (
                <SupplierCard key={supplier.id} supplier={supplier} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">{t('load_more')}</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">{t('load_more')}</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="practices" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPractices.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">{t('load_more')}</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Recommendation;

