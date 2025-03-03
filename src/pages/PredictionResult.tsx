
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
  Check
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
  ]
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
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
            <TabsTrigger value="overview">碳足迹概览</TabsTrigger>
            <TabsTrigger value="details">详细分析</TabsTrigger>
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
          
          <TabsContent value="details" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>预测方法说明</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">数据来源</h3>
                  <p className="text-sm text-muted-foreground">
                    本预测分析基于以下数据源生成：
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
                    <li>行业碳足迹基准数据库</li>
                    <li>产品类别平均排放因子</li>
                    <li>供应商历史碳足迹数据（如有）</li>
                    <li>制造工艺碳足迹估算模型</li>
                    <li>材料组成碳足迹计算参数</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">预测模型</h3>
                  <p className="text-sm text-muted-foreground">
                    碳足迹预测采用多级混合LCA方法，结合了过程分析法（Process-based LCA）和
                    投入产出分析法（IO-LCA）的优势，通过机器学习模型对缺失数据进行补全和优化。
                    模型准确度在相似产品测试中可达到±15%。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">数据质量说明</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">数据完整性</h4>
                      <Progress value={85} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        关键产品参数覆盖率高，部分生产工艺细节数据缺失
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">时间代表性</h4>
                      <Progress value={90} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        使用的基准数据为近两年内更新
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">地理代表性</h4>
                      <Progress value={75} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        主要基于本地区数据，部分使用国家平均水平
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="text-sm font-medium mb-2">技术代表性</h4>
                      <Progress value={80} className="h-2 mb-2" />
                      <p className="text-xs text-muted-foreground">
                        与产品技术特征匹配度高，部分工艺参数为行业通用值
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">系统边界</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    本预测采用"摇篮到大门"（Cradle-to-Gate）系统边界，包含从原材料开采到产品出厂的全部过程。
                    具体包括以下阶段：
                  </p>
                  <div className="flex items-center overflow-x-auto pb-2">
                    <div className="flex-shrink-0 w-[150px] px-3 py-2 border-r text-center">
                      <p className="text-xs font-medium">原材料开采</p>
                    </div>
                    <div className="flex-shrink-0 w-[150px] px-3 py-2 border-r text-center">
                      <p className="text-xs font-medium">材料加工</p>
                    </div>
                    <div className="flex-shrink-0 w-[150px] px-3 py-2 border-r text-center">
                      <p className="text-xs font-medium">零部件制造</p>
                    </div>
                    <div className="flex-shrink-0 w-[150px] px-3 py-2 border-r text-center">
                      <p className="text-xs font-medium">产品组装</p>
                    </div>
                    <div className="flex-shrink-0 w-[150px] px-3 py-2 border-r text-center">
                      <p className="text-xs font-medium">包装</p>
                    </div>
                    <div className="flex-shrink-0 w-[150px] px-3 py-2 text-center">
                      <p className="text-xs font-medium">厂内运输</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <Info className="h-5 w-5 text-amber-500 mr-3 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    本预测结果应视为产品碳足迹的合理估计，但不能替代正式的产品碳足迹核算。
                    建议在重要决策前，获取供应商提供的实际碳足迹数据或进行第三方验证。
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>详细数据表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-sm">类别</th>
                        <th className="text-left py-2 font-medium text-sm">项目</th>
                        <th className="text-right py-2 font-medium text-sm">碳足迹值</th>
                        <th className="text-right py-2 font-medium text-sm">占比</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {resultData.components.map((component, index) => (
                        <tr key={`comp-${index}`} className="text-sm">
                          <td className="py-3 text-muted-foreground">{index === 0 ? '组件构成' : ''}</td>
                          <td className="py-3">{component.name}</td>
                          <td className="py-3 text-right">{component.value} {component.unit}</td>
                          <td className="py-3 text-right">{component.percentage}%</td>
                        </tr>
                      ))}
                      
                      {resultData.phases.map((phase, index) => (
                        <tr key={`phase-${index}`} className="text-sm">
                          <td className="py-3 text-muted-foreground">{index === 0 ? '生命周期阶段' : ''}</td>
                          <td className="py-3">{phase.name}</td>
                          <td className="py-3 text-right">{phase.value} {phase.unit}</td>
                          <td className="py-3 text-right">{phase.percentage}%</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="font-medium text-sm border-t">
                        <td colSpan={2} className="py-3">总计</td>
                        <td className="py-3 text-right">{resultData.carbonValue} {resultData.unit}</td>
                        <td className="py-3 text-right">100%</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    导出详细数据
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="suggestions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>碳足迹改进建议</CardTitle>
                <CardDescription>
                  针对预测结果的碳减排优化建议，可根据实际情况选择性实施
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resultData.improvementSuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className={`border rounded-lg overflow-hidden transition-all ${
                        expandedSuggestions.includes(suggestion.title) ? 'bg-muted/30' : ''
                      }`}
                    >
                      <div 
                        className="p-4 flex justify-between items-center cursor-pointer"
                        onClick={() => toggleSuggestion(suggestion.title)}
                      >
                        <div className="flex items-center">
                          {difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].icon}
                          <h3 className="ml-2 font-medium">{suggestion.title}</h3>
                        </div>
                        <div className="flex items-center">
                          <span className="text-green-600 text-sm font-medium mr-3">
                            减排 {suggestion.reduction} kg CO₂e
                          </span>
                          {expandedSuggestions.includes(suggestion.title) ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </div>
                      </div>
                      
                      {expandedSuggestions.includes(suggestion.title) && (
                        <div className="px-4 pb-4 pt-0">
                          <Separator className="mb-4" />
                          <p className="text-sm mb-4">
                            {suggestion.description}
                          </p>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">实施难度</p>
                              <div className="flex items-center">
                                {difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].icon}
                                <span className="ml-1.5">{difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].label}</span>
                              </div>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">实施周期</p>
                              <span>{suggestion.timeline}</span>
                            </div>
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">减排效果</p>
                              <span className="text-green-600">
                                {((suggestion.reduction / resultData.carbonValue) * 100).toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-muted/30 rounded-lg flex items-start">
                  <Info className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-2">总减排潜力</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      全部建议实施后的最大减排潜力约为 {resultData.reductionPotential} kg CO₂e
                      （{((resultData.reductionPotential / resultData.carbonValue) * 100).toFixed(1)}%）。
                      建议根据成本效益、技术可行性选择合适的改进措施。
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      获取详细改进方案
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={() => navigate('/inference')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回推理页面
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              生成数据请求
            </Button>
            <Button>
              <BarChart2 className="h-4 w-4 mr-2" />
              查看相似产品
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PredictionResult;
