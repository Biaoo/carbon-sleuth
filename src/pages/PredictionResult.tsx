<lov-code>
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useToast } from '@/hooks/use-toast';
import { 
  BarChart2, 
  Download, 
  FileText, 
  Share2, 
  ArrowLeft,
  Info,
  Leaf,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle,
  BookOpen,
  Database,
  Layers,
  Cog,
  Users,
  BarChart,
  LineChart,
  Library
} from 'lucide-react';

// 模拟数据
const mockResultData = {
  id: 'pred-123456',
  productName: '太阳能电池板 Model-SE300',
  supplierName: '上海绿能科技有限公司',
  date: '2023-11-20',
  carbonValue: 42.8,
  unit: 'kg CO₂e/件',
  confidenceLevel: 'high', // high, medium, low
  industryAvg: 65.2,
  reductionPotential: 22.4,
  dataQuality: 85,
  components: [
    { name: '光伏板', value: 18.5, percentage: 43.2, unit: 'kg CO₂e' },
    { name: '铝合金框架', value: 12.3, percentage: 28.7, unit: 'kg CO₂e' },
    { name: '背板', value: 5.6, percentage: 13.1, unit: 'kg CO₂e' },
    { name: '接线盒', value: 4.2, percentage: 9.8, unit: 'kg CO₂e' },
    { name: '封装材料', value: 2.2, percentage: 5.2, unit: 'kg CO₂e' }
  ],
  phases: [
    { name: '原材料获取', value: 22.6, percentage: 52.8, unit: 'kg CO₂e' },
    { name: '制造过程', value: 12.4, percentage: 29.0, unit: 'kg CO₂e' },
    { name: '包装运输', value: 5.2, percentage: 12.1, unit: 'kg CO₂e' },
    { name: '使用与维护', value: 1.8, percentage: 4.2, unit: 'kg CO₂e' },
    { name: '回收处理', value: 0.8, percentage: 1.9, unit: 'kg CO₂e' }
  ],
  improvementSuggestions: [
    { 
      title: '使用再生铝材',
      description: '采用再生铝材替代原生铝可显著降低铝合金框架的碳足迹，潜在减排比例约15-20%',
      reduction: 2.5,
      difficulty: 'medium',
      timeline: '短期'
    },
    { 
      title: '优化制造工艺能效',
      description: '提升电池板生产工艺能效，包括改进烧结工艺和引入智能能源管理系统',
      reduction: 3.2,
      difficulty: 'medium',
      timeline: '中期'
    },
    { 
      title: '使用低碳电力',
      description: '生产过程使用可再生能源电力，如自建光伏系统或采购绿色电力证书',
      reduction: 8.6,
      difficulty: 'hard',
      timeline: '中期'
    },
    { 
      title: '优化物流运输',
      description: '改进物流规划，提高装载效率，选择低碳运输方式',
      reduction: 1.5,
      difficulty: 'easy',
      timeline: '短期'
    },
    { 
      title: '延长产品寿命',
      description: '提升产品耐久性，延长使用寿命，改善维护方案',
      reduction: 4.8,
      difficulty: 'medium',
      timeline: '长期'
    }
  ],
  similarProducts: [
    {
      id: 'prod-001',
      name: '高效太阳能电池板 SE-500',
      supplier: '上海绿能科技有限公司',
      carbonValue: 25.3,
      unit: 'kg CO₂e/件',
      differencePercentage: -41
    },
    {
      id: 'prod-002',
      name: '光伏板 PV-320',
      supplier: '江苏新材料科技股份有限公司',
      carbonValue: 48.5,
      unit: 'kg CO₂e/件',
      differencePercentage: +13
    },
    {
      id: 'prod-003',
      name: '薄膜光伏组件 TF-230',
      supplier: '广东高效能源有限公司',
      carbonValue: 35.2,
      unit: 'kg CO₂e/件',
      differencePercentage: -18
    }
  ],
  // 新增：推理过程数据
  inferenceData: {
    productBasicInfo: {
      title: "产品基础信息",
      icon: BookOpen,
      data: [
        { name: "产品类别", value: "可再生能源设备" },
        { name: "产品规格", value: "300W 单晶硅光伏板" },
        { name: "产品尺寸", value: "1650mm × 992mm × 35mm" },
        { name: "产品重量", value: "18.5kg" },
        { name: "产品寿命", value: "25年" }
      ]
    },
    productComposition: {
      title: "产品组成信息",
      icon: Layers,
      data: [
        { name: "单晶硅电池", value: "60片", percentage: 48 },
        { name: "钢化玻璃", value: "3.2mm厚", percentage: 25 },
        { name: "EVA封装膜", value: "0.5mm×2层", percentage: 8 },
        { name: "铝合金边框", value: "35mm厚", percentage: 15 },
        { name: "背板", value: "复合材料", percentage: 4 }
      ]
    },
    productionTechnology: {
      title: "生产技术信息",
      icon: Cog,
      data: [
        { name: "电池制备工艺", value: "PERC技术" },
        { name: "组件层压工艺", value: "全自动层压" },
        { name: "焊接技术", value: "多主栅技术" },
        { name: "生产能耗", value: "低于行业平均15%" },
        { name: "质量控制", value: "自动化检测系统" }
      ]
    },
    competitorsInfo: {
      title: "相关竞品供应商",
      icon: Users,
      data: [
        { name: "江苏新能源科技有限公司", product: "单晶硅光伏板 NS-310" },
        { name: "浙江太阳能技术股份有限公司", product: "高效光伏组件 HE-305" },
        { name: "广东光能科技有限公司", product: "双面光伏板 BF-290" },
        { name: "德国SolarTech GmbH", product: "Premium Solar Panel SP-320" }
      ]
    },
    lcaModel: {
      title: "LCA模型",
      icon: BarChart,
      modelName: "光伏产品全生命周期评估模型 v3.2",
      description: "该模型基于ISO 14040/14044标准，采用「摇篮到大门」边界，综合考虑原材料获取、生产制造、包装运输等阶段的环境影响。",
      parameters: [
        { name: "功能单位", value: "1件标准产品" },
        { name: "参考流", value: "1块300W光伏板" },
        { name: "地理边界", value: "中国生产系统" },
        { name: "时间范围", value: "2022-2023年数据" },
        { name: "技术覆盖", value: "当前主流生产技术" }
      ]
    },
    carbonFootprintResult: {
      title: "碳足迹预测结果",
      icon: BarChart2,
      totalValue: 42.8,
      unit: "kg CO₂e/件",
      breakdown: [
        { name: "原材料获取", value: 22.6, percentage: 52.8 },
        { name: "制造加工", value: 12.4, percentage: 29.0 },
        { name: "包装运输", value: 5.2, percentage: 12.1 },
        { name: "其他过程", value: 2.6, percentage: 6.1 }
      ],
      uncertaintyRange: "±15%",
      confidenceLevel: "高"
    }
  },
  // 新增：可解释性信息
  explanatoryInfo: {
    references: {
      title: "参考来源",
      icon: Library,
      sources: [
        { name: "中国光伏行业协会碳足迹数据库 (2023)", type: "行业数据" },
        { name: "光伏产品生命周期评价指南 GB/T 34664-2021", type: "标准文献" },
        { name: "类似产品实测碳足迹案例集 (n=24)", type: "案例研究" },
        { name: "国际能源署太阳能光伏系统项目组报告", type: "国际报告" },
        { name: "材料碳排放因子数据库 CLCD-China-ECER", type: "排放因子" }
      ]
    },
    technicalBasis: {
      title: "技术依据",
      icon: Info,
      methods: [
        { 
          name: "混合LCA方法", 
          description: "结合过程分析法和投入产出法的优势，对关键过程使用详细流程数据，对次要过程使用投入产出数据" 
        },
        { 
          name: "机器学习数据填补", 
          description: "使用梯度提升树模型对缺失数据进行智能填补，基于同类产品的已知参数" 
        },
        { 
          name: "蒙特卡洛不确定性分析", 
          description: "通过10,000次模拟评估结果的稳健性和不确定度" 
        },
        { 
          name: "敏感性分析", 
          description: "识别影响结果的关键参数，确定改进的优先领域" 
        }
      ]
    }
  },
  // 新增：行业对比分析
  comparativeAnalysis: {
    industryBenchmark: {
      title: "行业基准对比",
      description: "与光伏产品行业基准相比，本产品碳足迹表现优异",
      data: [
        { category: "行业领先水平", value: 35.0, unit: "kg CO₂e/件", difference: -7.8 },
        { category: "行业平均水平", value: 65.2, unit: "kg CO₂e/件", difference: 22.4 },
        { category: "行业基准线", value: 80.0, unit: "kg CO₂e/件", difference: 37.2 }
      ]
    },
    competitorsComparison: {
      title: "竞品对比分析",
      description: "与市场上主要竞争产品的碳足迹对比",
      competitorData: [
        { name: "本产品", value: 42.8, unit: "kg CO₂e/件", highlight: true },
        { name: "竞品A - NS-310", value: 47.5, unit: "kg CO₂e/件", difference: "+11.0%" },
        { name: "竞品B - HE-305", value: 51.2, unit: "kg CO₂e/件", difference: "+19.6%" },
        { name: "竞品C - BF-290", value: 49.8, unit: "kg CO₂e/件", difference: "+16.4%" },
        { name: "竞品D - SP-320", value: 39.5, unit: "kg CO₂e/件", difference: "-7.7%" }
      ],
      keyDifferentiators: [
        "采用先进PERC技术，提高能源转换效率",
        "优化铝合金框架设计，减少材料使用",
        "制造过程采用部分可再生能源电力",
        "供应链本地化程度高，减少运输碳排放"
      ]
    },
    performanceByCategory: [
      { category: "原材料使用", performance: "良好", industryPosition: "前30%" },
      { category: "生产能效", performance: "优秀", industryPosition: "前20%" },
      { category: "再生材料占比", performance: "一般", industryPosition: "行业平均" },
      { category: "产品寿命", performance: "优秀", industryPosition: "前15%" },
      { category: "可回收性", performance: "良好", industryPosition: "前25%" }
    ]
  }
};

// 难度图标映射
const difficultyIcons = {
  easy: { icon: <Leaf className="h-4 w-4 text-green-500" />, label: '容易' },
  medium: { icon: <TrendingDown className="h-4 w-4 text-amber-500" />, label: '中等' },
  hard: { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, label: '困难' },
};

const PredictionResult: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSuggestions, setExpandedSuggestions] = useState<string[]>([]);
  
  // 使用ID获取数据，这里使用模拟数据
  const resultData = mockResultData;
  
  // 切换改进建议的展开/折叠状态
  const toggleSuggestion = (title: string) => {
    setExpandedSuggestions(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };
  
  // 复制结果链接
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "链接已复制",
      description: "预测结果链接已复制到剪贴板",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            返回
          </button>
          
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-3xl font-bold">{resultData.productName}</h1>
                <Badge className="ml-3 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                  预测结果
                </Badge>
              </div>
              <p className="text-muted-foreground">{resultData.supplierName}</p>
              <p className="text-sm text-muted-foreground mt-1">预测日期：{resultData.date} · ID: {resultData.id}</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
              <Button variant="outline" className="flex items-center" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                复制链接
              </Button>
              <Button variant="outline" className="flex items-center">
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="h-4 w-4 mr-2" />
                导出报告
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>碳足迹预测结果</CardTitle>
              <CardDescription>基于LCA模型和产业数据预测的碳足迹值</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">预测碳足迹值</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{resultData.carbonValue}</span>
                    <span className="text-lg ml-2 text-muted-foreground">{resultData.unit}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">行业平均值</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-medium">{resultData.industryAvg}</span>
                    <span className="text-base ml-2 text-muted-foreground">{resultData.unit}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">低于行业平均</p>
                  <div className="flex items-baseline text-green-600">
                    <span className="text-2xl font-medium">
                      {((resultData.industryAvg - resultData.carbonValue) / resultData.industryAvg * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">减排潜力</p>
                  <div className="flex items-baseline text-amber-600">
                    <span className="text-2xl font-medium">
                      {resultData.reductionPotential}
                    </span>
                    <span className="text-base ml-2 text-muted-foreground">kg CO₂e</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-1">
                <div className="flex justify-between text-sm mb-1">
                  <span>与行业平均值对比</span>
                  <span className="text-green-600">-{((resultData.industryAvg - resultData.carbonValue) / resultData.industryAvg * 100).toFixed(1)}%</span>
                </div>
                <div className="relative h-4 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex items-center">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${(resultData.carbonValue / resultData.industryAvg) * 100}%` }}
                    ></div>
                  </div>
                  <div 
                    className="absolute h-full w-px bg-muted-foreground" 
                    style={{ left: '100%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>行业平均线</span>
                  <span>{Math.round(resultData.industryAvg * 1.5)} {resultData.unit}</span>
                </div>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-6 md:gap-12">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">可信度评级</h3>
                    <Badge variant={resultData.confidenceLevel === 'high' ? 'default' : 'outline'} className="font-normal">
                      {resultData.confidenceLevel === 'high' ? '高' : resultData.confidenceLevel === 'medium' ? '中' : '低'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    基于输入数据质量和预测模型确定性的综合评级
                  </p>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>数据质量评分</span>
                      <span>{resultData.dataQuality}/100</span>
                    </div>
                    <Progress value={resultData.dataQuality} className="h-2" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium mb-2">数据说明</h3>
                  <p className="text-sm text-muted-foreground">
                    本预测结果基于产品类别特征、供应商行业基准数据和碳足迹预测模型生成。结果仅供参考，建议获取供应商实际数据进行验证。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>改进建议摘要</CardTitle>
              <CardDescription>针对产品碳足迹的优化建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resultData.improvementSuggestions.slice(0, 3).map((suggestion, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-start">
                      {difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].icon}
                      <div className="ml-2 flex-1">
                        <h4 className="font-medium text-sm">{suggestion.title}</h4>
                        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                          {suggestion.description}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-green-600 font-medium">
                            减排 {suggestion.reduction} kg CO₂e
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {suggestion.timeline}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full text-sm" 
                  onClick={() => setActiveTab('suggestions')}
                >
                  查看全部改进建议
                  <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full max-w-md grid-cols-5 mb-8">
            <TabsTrigger value="overview">碳足迹概览</TabsTrigger>
            <TabsTrigger value="inference">推理过程</TabsTrigger>
            <TabsTrigger value="details">详细分析</TabsTrigger>
            <TabsTrigger value="explanation">依据说明</TabsTrigger>
            <TabsTrigger value="suggestions">改进建议</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>碳足迹构成分析</CardTitle>
                <CardDescription>
                  产品主要组件的碳足迹贡献及占比
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resultData.components.map((component, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{component.name}</span>
                        <div className="text-sm">
                          <span>{component.value} {component.unit}</span>
                          <span className="text-muted-foreground ml-2">({component.percentage}%)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${component.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">生命周期阶段碳足迹</h3>
                  <div className="space-y-4">
                    {resultData.phases.map((phase, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{phase.name}</span>
                          <div className="text-sm">
                            <span>{phase.value} {phase.unit}</span>
                            <span className="text-muted-foreground ml-2">({phase.percentage}%)</span>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${phase.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>同类产品对比</CardTitle>
                <CardDescription>
                  与数据库中同类产品的碳足迹对比
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resultData.similarProducts.map((product, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">{product.supplier}</p>
                        </div>
                        <Badge 
                          className={product.differencePercentage < 0 ? 
                            'bg-green-500/10 text-green-600 hover:bg-green-500/20' : 
                            'bg-red-500/10 text-red-600 hover:bg-red-500/20'}
                        >
                          {product.differencePercentage < 0 ? '' : '+'}
                          {product.differencePercentage}%
                        </Badge>
                      </div>
                      
                      <div className="mt-3 flex items-center">
                        <span className="text-lg font-medium">{product.carbonValue}</span>
                        <span className="text-sm ml-1 text-muted-foreground">{product.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 新增：推理过程选项卡 */}
          <TabsContent value="inference" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>推理过程信息</CardTitle>
                <CardDescription>
                  AI预测过程中收集和分析的产品数据
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 产品基础信息 */}
                <div className="p-5 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">{resultData.inferenceData.productBasicInfo.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultData.inferenceData.productBasicInfo.data.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 产品组成信息 */}
                <div className="p-5 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <Layers className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">{resultData.inferenceData.productComposition.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {resultData.inferenceData.productComposition.data.map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{item.name}</span>
                          <div className="text-sm">
                            <span>{item.value}</span>
                            <span className="text-muted-foreground ml-2">({item.percentage}%)</span>
                          </div>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 生产技术信息 */}
                <div className="p-5 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <Cog className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">{resultData.inferenceData.productionTechnology.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {resultData.inferenceData.productionTechnology.data.map((item, index) => (
                      <div key={index} className="flex flex-col">
                        <span className="text-sm text-muted-foreground">{item.name}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 相关竞品供应商 */}
                <div className="p-5 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <Users className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">{resultData.inferenceData.competitorsInfo.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {resultData.inferenceData.competitorsInfo.data.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 hover:bg-muted/50 rounded-lg">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.product}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LCA模型 */}
                <div className="p-5 border rounded-lg">
                  <div className="flex items-center mb-3">
                    <BarChart className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">{resultData.inferenceData.lcaModel.title}</h3>
                  </div>
                  <p className="text-base font-medium mb-2">{resultData.inferenceData.lcaModel.modelName}</p>
                  <p className="text-sm text-muted-foreground mb-4">{resultData.inferenceData.lcaModel.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {resultData.inferenceData.lcaModel.parameters.map((param, index) => (
                      <div key={index} className="p-3 bg-secondary/30 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">{param.name}</p>
                        <p className="text-sm font-medium">{param.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 碳足迹预测结果 */}
                <div className="p-5 border rounded-lg">
                  <div className="flex items-center mb-4">
                    <BarChart2 className="h-5 w-5 text-primary mr-2" />
                    <h3 className="text-lg font-medium">{resultData.inferenceData.carbonFootprintResult.title}</h3>
                  </div>
                  <div className="flex items-center mb-5">
                    <div className="text-3xl font-bold mr-2">
                      {resultData.inferenceData.carbonFootprintResult.totalValue}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {resultData.inferenceData.carbonFootprintResult.unit}
                    </div>
                    <Badge className="ml-4">{resultData.inferenceData.carbonFootprintResult.uncertaintyRange}</Badge>
                    <Badge variant="outline" className="ml-2">
                      可信度：{resultData.inferenceData.carbonFootprintResult.confidenceLevel}
                    </Badge>
                  </div>
                  <div className="
