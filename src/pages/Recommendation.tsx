
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
                className="absolute top-0 left-0 h-full bg-primary rounded-full" 
                style={{ width: `${supplier.carbonScore}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">碳绩效 {supplier.carbonScore}/100</span>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">低碳亮点</p>
            <div className="flex flex-wrap gap-1">
              {supplier.highlights.map((highlight: string, index: number) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">产品覆盖</p>
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
          查看详情
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// 产品卡片组件
const ProductCard = ({ product }: { product: any }) => {
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
            {product.dataType === 'verified' ? '实测数据' : '预测数据'}
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
            <span>行业平均: {product.industryAvg} {product.unit}</span>
          </p>
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">减碳亮点</p>
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
          查看详情
          <ExternalLink className="h-3 w-3 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

// 最佳实践卡片组件
const PracticeCard = ({ practice }: { practice: any }) => {
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
          <p className="text-xs font-medium">实施成果</p>
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
            查看详情
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const Recommendation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('suppliers');
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">低碳推荐</h1>
            <p className="text-muted-foreground mt-2">
              发现优秀的低碳供应商、产品和最佳实践，加速您的可持续发展之旅
            </p>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-auto flex space-x-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="搜索推荐..." 
                className="pl-9 w-full"
              />
            </div>
            <Button>筛选</Button>
          </div>
        </div>
        
        <Tabs defaultValue="suppliers" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="suppliers">低碳供应商</TabsTrigger>
            <TabsTrigger value="products">低碳产品</TabsTrigger>
            <TabsTrigger value="practices">减碳最佳实践</TabsTrigger>
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
                    <SelectItem value="all">全部行业</SelectItem>
                    <SelectItem value="energy">可再生能源</SelectItem>
                    <SelectItem value="material">材料科学</SelectItem>
                    <SelectItem value="storage">储能技术</SelectItem>
                    <SelectItem value="electronics">电子制造</SelectItem>
                    <SelectItem value="building">建筑材料</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="产品类别" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部类别</SelectItem>
                    <SelectItem value="solar">太阳能</SelectItem>
                    <SelectItem value="wind">风能</SelectItem>
                    <SelectItem value="battery">电池技术</SelectItem>
                    <SelectItem value="material">复合材料</SelectItem>
                    <SelectItem value="smart">智能硬件</SelectItem>
                    <SelectItem value="green">绿色建材</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="地区" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部地区</SelectItem>
                    <SelectItem value="east">华东</SelectItem>
                    <SelectItem value="south">华南</SelectItem>
                    <SelectItem value="north">华北</SelectItem>
                    <SelectItem value="central">华中</SelectItem>
                    <SelectItem value="west">西部</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="score">
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">碳绩效得分</SelectItem>
                    <SelectItem value="rating">综合评分</SelectItem>
                    <SelectItem value="latest">最新添加</SelectItem>
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
                    <SelectItem value="all">全部类别</SelectItem>
                    <SelectItem value="energy">可再生能源</SelectItem>
                    <SelectItem value="material">材料科学</SelectItem>
                    <SelectItem value="storage">储能技术</SelectItem>
                    <SelectItem value="electronics">智能硬件</SelectItem>
                    <SelectItem value="building">绿色建材</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="数据类型" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部数据</SelectItem>
                    <SelectItem value="verified">实测数据</SelectItem>
                    <SelectItem value="predicted">预测数据</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="降碳水平" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="high">显著降碳 ({'>'}40%)</SelectItem>
                    <SelectItem value="medium">中等降碳 (20-40%)</SelectItem>
                    <SelectItem value="low">轻微降碳 ({'<'}20%)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="reduction">
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="reduction">降碳幅度</SelectItem>
                    <SelectItem value="carbon">碳足迹值</SelectItem>
                    <SelectItem value="latest">最新添加</SelectItem>
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
                    <SelectItem value="all">全部行业</SelectItem>
                    <SelectItem value="manufacturing">制造业</SelectItem>
                    <SelectItem value="energy">能源行业</SelectItem>
                    <SelectItem value="chemical">化工行业</SelectItem>
                    <SelectItem value="electronics">电子行业</SelectItem>
                    <SelectItem value="automotive">汽车行业</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="实施难度" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部难度</SelectItem>
                    <SelectItem value="easy">容易实施</SelectItem>
                    <SelectItem value="medium">中等难度</SelectItem>
                    <SelectItem value="hard">高难度</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="投资回报期" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="short">短期 ({'<'}1年)</SelectItem>
                    <SelectItem value="medium">中期 (1-3年)</SelectItem>
                    <SelectItem value="long">长期 ({'>'}3年)</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select defaultValue="impact">
                  <SelectTrigger>
                    <SelectValue placeholder="排序方式" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="impact">减碳效果</SelectItem>
                    <SelectItem value="roi">投资回报</SelectItem>
                    <SelectItem value="latest">最新添加</SelectItem>
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
              <Button variant="outline">加载更多</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">加载更多</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="practices" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPractices.map((practice) => (
                <PracticeCard key={practice.id} practice={practice} />
              ))}
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button variant="outline">加载更多</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Recommendation;
