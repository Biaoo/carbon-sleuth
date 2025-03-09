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

// 模拟数据 - 低碳供应商
const mockSuppliers = [
  {
    id: 'sup-001',
    name: '上海绿能科技有限公司',
    industry: '可再生能源',
    category: '太阳能',
    rating: 4.8,
    highlights: ['使用100%可再生能源', '零废水排放', '碳中和认证'],
    products: ['太阳能电池板', '逆变器', '储能系统'],
    carbonScore: 85,
    industryAvg: 60,
    region: '华东',
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-002',
    name: '江苏新材料科技股份有限公司',
    industry: '材料科学',
    category: '复合材料',
    rating: 4.5,
    highlights: ['闭环生产系统', '可回收材料占比95%', '低碳供应链认证'],
    products: ['生物基复合材料', '可降解塑料', '轻量化材料'],
    carbonScore: 78,
    industryAvg: 55,
    region: '华东',
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-003',
    name: '广东高效能源有限公司',
    industry: '储能技术',
    category: '电池技术',
    rating: 4.6,
    highlights: ['能源密度提升30%', '使用回收原材料', '低碳生产工艺'],
    products: ['锂电池组件', '储能系统', '电池管理系统'],
    carbonScore: 80,
    industryAvg: 58,
    region: '华南',
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-004',
    name: '北京清洁能源技术有限公司',
    industry: '可再生能源',
    category: '风能',
    rating: 4.7,
    highlights: ['节能生产线', '生物基材料应用', '碳足迹全程追踪'],
    products: ['风力发电机叶片', '风电控制系统', '微电网方案'],
    carbonScore: 82,
    industryAvg: 60,
    region: '华北',
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-005',
    name: '深圳智能制造有限公司',
    industry: '电子制造',
    category: '智能硬件',
    rating: 4.4,
    highlights: ['智能生产线优化', '低能耗生产工艺', '本地化供应链'],
    products: ['智能传感器', '控制器', 'IoT设备'],
    carbonScore: 75,
    industryAvg: 52,
    region: '华南',
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'sup-006',
    name: '安徽绿色建材有限公司',
    industry: '建筑材料',
    category: '绿色建材',
    rating: 4.3,
    highlights: ['可再生原料使用', '低碳水泥技术', '能源自给自足工厂'],
    products: ['低碳水泥', '绿色混凝土', '隔热材料'],
    carbonScore: 73,
    industryAvg: 50,
    region: '华中',
    image: 'https://placehold.co/100x100',
  },
];

// 模拟数据 - 低碳产品
const mockProducts = [
  {
    id: 'prod-001',
    name: '高效太阳能电池板 SE-500',
    supplier: '上海绿能科技有限公司',
    category: '可再生能源',
    carbonValue: 25.3,
    unit: 'kgCO2e/Unit',
    dataType: 'verified',
    highlights: ['转换效率提升15%', '生产过程零碳排放', '可回收率99%'],
    reduction: 35,
    industryAvg: 40.1,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-002',
    name: '生物基复合材料 BioComp-X',
    supplier: '江苏新材料科技股份有限公司',
    category: '材料科学',
    carbonValue: 12.8,
    unit: 'kgCO2e/kg',
    dataType: 'verified',
    highlights: ['生物基含量>80%', '生产能耗降低45%', '可全部生物降解'],
    reduction: 42,
    industryAvg: 22.5,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-003',
    name: '高密度锂电池 HD-1000',
    supplier: '广东高效能源有限公司',
    category: '储能技术',
    carbonValue: 56.7,
    unit: 'kgCO2e/kWh',
    dataType: 'predicted',
    highlights: ['能量密度提升30%', '使用回收钴镍', '寿命周期延长50%'],
    reduction: 28,
    industryAvg: 78.2,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-004',
    name: '轻量化风电叶片 WB-120',
    supplier: '北京清洁能源技术有限公司',
    category: '可再生能源',
    carbonValue: 15.6,
    unit: 'tCO2e/套',
    dataType: 'verified',
    highlights: ['重量减轻35%', '耐用性提高40%', '使用再生复合材料'],
    reduction: 38,
    industryAvg: 25.3,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-005',
    name: '智能能源管理系统 EMS-200',
    supplier: '深圳智能制造有限公司',
    category: '智能硬件',
    carbonValue: 8.9,
    unit: 'kgCO2e/Unit',
    dataType: 'predicted',
    highlights: ['能耗监控优化', '低功耗设计', '模块化架构'],
    reduction: 32,
    industryAvg: 13.2,
    image: 'https://placehold.co/100x100',
  },
  {
    id: 'prod-006',
    name: '低碳绝热材料 ThermLow',
    supplier: '安徽绿色建材有限公司',
    category: '绿色建材',
    carbonValue: 5.2,
    unit: 'kgCO2e/m²',
    dataType: 'verified',
    highlights: ['废弃材料再利用', '无有害物质', '隔热性能提升25%'],
    reduction: 45,
    industryAvg: 9.5,
    image: 'https://placehold.co/100x100',
  },
];

// 模拟数据 - 最佳实践
const mockPractices = [
  {
    id: 'prac-001',
    title: '闭环生产系统优化',
    company: '江苏新材料科技股份有限公司',
    description: '通过建立闭环生产系统，实现废料100%回收再利用，同时优化工艺流程，减少能源消耗。',
    results: ['碳排放降低32%', '废弃物减少95%', '能源效率提升28%'],
    industries: ['材料科学', '制造业', '化工'],
    image: 'https://placehold.co/300x200',
  },
  {
    id: 'prac-002',
    title: '供应链本地化战略',
    company: '深圳智能制造有限公司',
    description: '重构供应链网络，优先选择本地供应商，减少运输距离和碳足迹，同时提高供应链弹性。',
    results: ['运输碳排放降低45%', '供应链成本降低18%', '交付时间缩短35%'],
    industries: ['电子制造', '消费品', '汽车'],
    image: 'https://placehold.co/300x200',
  },
  {
    id: 'prac-003',
    title: '可再生能源全覆盖计划',
    company: '上海绿能科技有限公司',
    description: '通过屋顶光伏、微型风电和储能系统的组合，实现工厂100%可再生能源使用，同时出售多余电力。',
    results: ['能源碳足迹降至零', '年节约能源成本220万元', '能源自给率达到115%'],
    industries: ['可再生能源', '制造业', '技术硬件'],
    image: 'https://placehold.co/300x200',
  },
];

// 供应商卡片组件
const SupplierCard = ({ supplier }: { supplier: any }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{supplier.name}</CardTitle>
            <CardDescription className="mt-1">
              {supplier.industry} | {supplier.category}
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
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/80 to-primary rounded-full" 
                style={{ width: `${supplier.carbonScore}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{t('carbon_performance')} {supplier.carbonScore}/100</span>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{t('low_carbon_highlights')}</p>
            <div className="flex flex-wrap gap-1">
              {supplier.highlights.map((highlight: string, index: number) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{t('product_coverage')}</p>
            <p className="text-sm">{supplier.products.join(', ')}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          <Factory className="h-3 w-3 mr-1" />
          <span>{supplier.region}</span>
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
const ProductCard = ({ product }: { product: any }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <CardDescription className="mt-1">
              {product.supplier}
            </CardDescription>
          </div>
          <Badge variant={product.dataType === 'verified' ? 'default' : 'outline'}>
            {product.dataType === 'verified' ? t('measured_data') : t('predicted_data')}
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
              {product.highlights.map((highlight: string, index: number) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-1.5 mt-0.5" />
                  <p className="text-xs">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <div className="flex items-center text-xs text-muted-foreground">
          <Leaf className="h-3 w-3 mr-1" />
          <span>{product.category}</span>
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
const PracticeCard = ({ practice }: { practice: any }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-40 bg-gray-100 relative">
        <img 
          src={practice.image} 
          alt={practice.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <h3 className="text-white font-medium p-4">{practice.title}</h3>
        </div>
      </div>
      <CardContent className="pt-4 flex-grow">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          {practice.company}
        </p>
        <p className="text-sm mb-4 line-clamp-3">
          {practice.description}
        </p>
        <div className="space-y-2">
          <p className="text-xs font-medium">{t('implementation_results')}</p>
          <div className="space-y-1">
            {practice.results.map((result: string, index: number) => (
              <div key={index} className="flex items-start">
                <CheckCircle className="h-3.5 w-3.5 text-green-600 mr-1.5 mt-0.5" />
                <p className="text-xs">{result}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-wrap gap-1">
            {practice.industries.slice(0, 2).map((industry: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs font-normal">
                {industry}
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
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const Recommendation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('suppliers');
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">{t('low_carbon_recommendation')}</h1>
            <p className="text-muted-foreground mt-2">
              {t('recommendation_description')}
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t('search_recommendations')} 
                className="pl-9 w-full"
              />
            </div>
            <Button>{t('filter')}</Button>
          </div>
        </div>
        
        <Tabs defaultValue="suppliers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="suppliers">{t('low_carbon_suppliers')}</TabsTrigger>
            <TabsTrigger value="products">{t('low_carbon_products')}</TabsTrigger>
            <TabsTrigger value="practices">{t('carbon_reduction_best_practices')}</TabsTrigger>
          </TabsList>
          
          {/* 筛选区域 */}
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {activeTab === 'suppliers' && (
              <>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder={t('all_industries')} />
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
                    <SelectValue placeholder={t('all_categories')} />
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
                    <SelectValue placeholder={t('all_regions')} />
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
                    <SelectValue placeholder={t('sort_by')} />
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
                    <SelectValue placeholder={t('all_categories')} />
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
                    <SelectValue placeholder={t('all_data')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_data')}</SelectItem>
                    <SelectItem value="verified">{t('measured_data')}</SelectItem>
                    <SelectItem value="predicted">{t('predicted_data')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder={t('carbon_reduction_level')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_periods')}</SelectItem>
                    <SelectItem value="high">{t('significant_reduction')}</SelectItem>
                    <SelectItem value="medium">{t('medium_reduction')}</SelectItem>
                    <SelectItem value="low">{t('slight_reduction')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="reduction">
                  <SelectTrigger>
                    <SelectValue placeholder={t('sort_by')} />
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
                    <SelectValue placeholder={t('industry_applicability')} />
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
                    <SelectValue placeholder={t('implementation_difficulty')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('all_periods')}</SelectItem>
                    <SelectItem value="easy">{t('easy_to_implement')}</SelectItem>
                    <SelectItem value="medium">{t('medium_difficulty')}</SelectItem>
                    <SelectItem value="hard">{t('high_difficulty')}</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder={t('return_on_investment_period')} />
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
                    <SelectValue placeholder={t('sort_by')} />
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
