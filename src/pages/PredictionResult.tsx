import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useToast } from '@/hooks/use-toast';
import {
  BarChart2, 
  Download, 
  FileText, 
  Share2, 
  ArrowLeft,
  Copy,
  BookOpen,
  Database,
  Layers,
  Cog,
  Users,
  Library,
  Info,
  Link
} from 'lucide-react';

import ProgressItem from '@/components/prediction-result/ProgressItem';
import ComparisonChart from '@/components/prediction-result/ComparisonChart';
import PhaseAnalysisChart from '@/components/prediction-result/PhaseAnalysisChart';
import CompetitorsList from '@/components/prediction-result/CompetitorsList';
import LcaModelCard from '@/components/prediction-result/LcaModelCard';
import CarbonFootprintResultCard from '@/components/prediction-result/CarbonFootprintResultCard';
import TechnicalBasisCard from '@/components/prediction-result/TechnicalBasisCard';
import ImprovementSuggestionCard from '@/components/prediction-result/ImprovementSuggestionCard';
import SimilarProductCard from '@/components/prediction-result/SimilarProductCard';
import { PredictionResultData } from '@/components/prediction-result/types';
import ProductInfoSection from '@/components/prediction-result/ProductInfoSection';

const mockResultData: PredictionResultData = {
  id: 'pred-123456',
  productName: '太阳能电池板 Model-SE300',
  supplierName: '上海绿能科技有限公司',
  date: '2023-11-20',
  carbonValue: 42.8,
  unit: 'kg CO₂e/件',
  confidenceLevel: 'high',
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
  inferenceData: {
    productBasicInfo: {
      title: "产品基础信息",
      icon: BookOpen,
      markdownContent: `
## 产品基本特性

太阳能电池板 Model-SE300 是一款高效单晶硅光伏板，采用PERC技术，具有较高的能源转换效率和较长的使用寿命。

- **产品类别**: 可再生能源设备
- **产品规格**: 300W 单晶硅光伏板
- **产品尺寸**: 1650mm × 992mm × 35mm
- **产品重量**: 18.5kg
- **产品寿命**: 25年

该产品符合IEC 61215、IEC 61730标准认证，具有良好的抗PID性能和可靠性。根据[1]的研究，此类高效单晶硅光伏产品在全生命周期内的能源回收期约为1.5-2年。

## 产品应用场景

适用于家庭屋顶系统、商业建筑、地面电站等多种应用场景。根据[2]的市场分析，此类产品在分布式光伏系统中应用广泛，平均每千瓦装机可年发电量约1200-1500度（因地区而异）。
      `,
      citations: [
        { id: 1, text: "张明等, 《光伏产品生命周期碳足迹评价研究》, 可再生能源学报, 2022." },
        { id: 2, text: "中国光伏行业协会, 《2023年光伏产品市场分析报告》, 2023." }
      ]
    },
    productComposition: {
      title: "产品组成信息",
      icon: Layers,
      markdownContent: `
## 材料组成

Model-SE300太阳能电池板主要由以下几部分组成：

1. **单晶硅电池** (60片，总重约8.9kg)
   - 采用P型单晶硅材料
   - 电池片尺寸：156.75mm × 156.75mm
   - 平均厚度：180μm

2. **钢化玻璃** (3.2mm厚，约4.6kg)
   - 低铁超白钢化玻璃
   - 透光率>91%
   - 表面采用防反射涂层处理

3. **EVA封装膜** (0.5mm×2层，约1.5kg)
   - 高透明度、高交联度EVA材料
   - 紫外线老化稳定性优良

4. **铝合金边框** (35mm厚，约2.8kg)
   - 阳极氧化铝合金材料
   - 采用镀膜防腐处理
   - 带有预装配排水孔

5. **背板** (复合材料，约0.7kg)
   - 三层结构复合材料背板
   - 防水耐候性能优良

材料占比分析显示，单晶硅电池在整个组件中占约48%的重量，钢化玻璃占约25%，铝合金边框占约15%，这与[3]中的行业标准组成比例基本一致。根据[4]的材料分析，这种组成结构在严苛气候条件下具有良好的耐久性。
      `,
      citations: [
        { id: 3, text: "刘强, 《光伏组件结构设计与优化》, 太阳能技术, 2021." },
        { id: 4, text: "国际太阳能技术委员会, 《光伏组件材料耐久性研究报告》, 2023." }
      ]
    },
    productionTechnology: {
      title: "生产技术信息",
      icon: Cog,
      markdownContent: `
## 制造工艺与技术特点

太阳能电池板 Model-SE300 采用先进的制造工艺，主要包括以下关键技术环节：

### 电池制备工艺
- **PERC技术**: 采用钝化发射极和背面接触技术，提高光电转换效率
- **多主栅技术**: 使用9主栅设计，降低电阻损失，提高电流收集效率
- **选择性发射极**: 优化电池正面金属化区域掺杂，降低接触电阻

### 组件封装技术
- **全自动层压**: 采用精确控��的全自动层压工艺，确保无气泡
- **智能EL检测**: 100%EL检测，排除微裂纹和隐裂隐患
- **自动化串焊**: 高精度串焊技术，焊带对准精度<±0.2mm

### 质量控制技术
- **智能检测系统**: 采用AI视觉检测系统，缺陷识别率>99.5%
- **高压绝缘测试**: 每片组件进行3000V高压测试
- **热斑测试**: 组件通过红外成像热斑检测

根据[5]的研究，该产品的制造能耗比行业平均水平低约15%，主要得益于生产线自动化水平高和工艺优化。[6]的调研表明，PERC技术结合多主栅技术可使电池效率提升1.5-2.0%。
      `,
      citations: [
        { id: 5, text: "王刚等, 《光伏制造业能源消耗分析与节能潜力》, 能源研究与利用, 2022." },
        { id: 6, text: "Global PV Tech, 《Advanced Cell Technologies Efficiency Report》, 2023." }
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
      icon: Database,
      modelName: "光伏产品全生命周期评估模型 v3.2",
      description: "该模型基于ISO 14040/14044标准，采用「摇篮到大门」边界，综合考虑原材料获取、生产制造、包装运输等阶段的环境影响。",
      parameters: [
        { name: "功能单位", value: "1件标准产品" },
        { name: "参考流", value: "1块300W光伏板" },
        { name: "地理边界", value: "中国生产系统" },
        { name: "时间范围", value: "2022-2023年数据" },
        { name: "技术覆盖", value: "当前主流生产技术" }
      ],
      flowchart: [
        { id: 'raw', text: '原材料获取', type: 'input', next: ['man1', 'man2'] },
        { id: 'man1', text: '硅料制备', type: 'process', next: ['man3'] },
        { id: 'man2', text: '辅材制备', type: 'process', next: ['man4'] },
        { id: 'man3', text: '电池片生产', type: 'process', next: ['man4'] },
        { id: 'man4', text: '组件封装', type: 'process', next: ['pack'] },
        { id: 'pack', text: '包装运输', type: 'process', next: ['use'] },
        { id: 'use', text: '使用阶段', type: 'process', next: ['eol'] },
        { id: 'eol', text: '回收处理', type: 'output', next: [] }
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
  explanatoryInfo: {
    references: {
      title: "参考来源",
      icon: Library,
      sources: [
        { id: "ref1", name: "中国光伏行业协会碳足迹数据库 (2023)", type: "行业数据", url: "#" },
        { id: "ref2", name: "光伏产品生命周期评价指南 GB/T 34664-2021", type: "标准文献", url: "#" },
        { id: "ref3", name: "类似产品实测碳足迹案例集 (n=24)", type: "案例研究", url: "#" },
        { id: "ref4", name: "国际能源署太阳能光伏系统项目组报告", type: "国际报告", url: "#" },
        { id: "ref5", name: "材料碳排放因子数据库 CLCD-China-ECER", type: "排放因子", url: "#" },
        { id: "ref6", name: "张明等, 《光伏产品生命周期碳足迹评价研究》, 可再生能源学报, 2022", type: "学术文献", url: "#" },
        { id: "ref7", name: "中国光伏行业协会, 《2023年光伏产品市场分析报告》, 2023", type: "行业报告", url: "#" },
        { id: "ref8", name: "刘强, 《光伏组件结构设计与优化》, 太阳能技术, 2021", type: "学术文献", url: "#" },
        { id: "ref9", name: "国际太阳能技术委员会, 《光伏组件材料耐久性研究报告》, 2023", type: "国际报告", url: "#" },
        { id: "ref10", name: "王刚等, 《光伏制造业能源消耗分析与节能潜力》, 能源研究与利用, 2022", type: "学术文献", url: "#" },
        { id: "ref11", name: "Global PV Tech, 《Advanced Cell Technologies Efficiency Report》, 2023", type: "技术报告", url: "#" }
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
  comparativeAnalysis: {
    industryBenchmark: {
      title: "行业基准对比",
      description: "与光伏产品行业基准相比，本产品碳足迹表现优异",
      data: [
        { category: "行业领先水平", value: 35.0, unit: "kg CO₂e/件", difference: -7.8, error: 3.5 },
        { category: "行业平均水平", value: 65.2, unit: "kg CO₂e/件", difference: 22.4, error: 6.5 },
        { category: "行业基准线", value: 80.0, unit: "kg CO₂e/件", difference: 37.2, error: 8.0 }
      ]
    },
    competitorsComparison: {
      title: "竞品对比分析",
      description: "与市场上主要竞争产品的碳足迹对比",
      competitorData: [
        { name: "本产品", value: 42.8, unit: "kg CO₂e/件", highlight: true, error: 6.4 },
        { name: "竞品A - NS-310", value: 47.5, unit: "kg CO₂e/件", difference: "+11.0%", error: 7.1 },
        { name: "竞品B - HE-305", value: 51.2, unit: "kg CO₂e/件", difference: "+19.6%", error: 7.7 },
        { name: "竞品C - BF-290", value: 49.8, unit: "kg CO₂e/件", difference: "+16.4%", error: 7.5 },
        { name: "竞品D - SP-320", value: 39.5, unit: "kg CO₂e/件", difference: "-7.7%", error: 5.9 }
      ],
      keyDifferentiators: [
        "采用先进PERC技术，提高能源转换效率",
        "优化铝合金框架设计，减少材料使用",
        "制造过程采用部分可再生能源电力",
        "供应链本地化程度高，减少运输碳排放"
      ]
    },
    chartData: [
      { name: "本产品", value: 42.8, error: 6.4, highlight: true, fill: "#ef4444" },
      { name: "竞品A", value: 47.5, error: 7.1, fill: "#64748b" },
      { name: "竞品B", value: 51.2, error: 7.7, fill: "#64748b" },
      { name: "竞品C", value: 49.8, error: 7.5, fill: "#64748b" },
      { name: "竞品D", value: 39.5, error: 5.9, fill: "#22c55e" },
      { name: "行业领先", value: 35.0, error: 3.5, fill: "#64748b" },
      { name: "行业平均", value: 65.2, error: 6.5, fill: "#64748b" },
      { name: "行业基准", value: 80.0, error: 8.0, fill: "#64748b" }
    ]
  }
};

const PredictionResult: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const resultData = mockResultData;
  
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
        
        <div className="lg:col-span-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <BarChart2 className="h-5 w-5 mr-2 text-muted-foreground" />
                  碳足迹预测结果
                </CardTitle>
                <CardDescription>产品碳足迹值与行业对比分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-2">
                  <span className="text-4xl font-bold">{resultData.carbonValue}</span>
                  <span className="ml-2 text-muted-foreground">{resultData.unit}</span>
                </div>
                
                <div className="mt-6">
                  <p className="mb-2 font-medium text-sm">行业对比分析</p>
                  <div className="h-72">
                    <ComparisonChart data={resultData.comparativeAnalysis.chartData} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">主要组成分析</CardTitle>
                <CardDescription>碳足迹主要来源组成</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {resultData.components.map((component, index) => (
                    <ProgressItem 
                      key={index} 
                      name={component.name} 
                      value={component.value} 
                      percentage={component.percentage} 
                      unit={component.unit} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl">生命周期阶段分析</CardTitle>
              <CardDescription>产品全生命周期各阶段碳足迹分布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5">
                  {resultData.phases.map((phase, index) => (
                    <ProgressItem 
                      key={index} 
                      name={phase.name} 
                      value={phase.value} 
                      percentage={phase.percentage} 
                      unit={phase.unit} 
                    />
                  ))}
                </div>
                
                <div className="h-60 md:h-auto">
                  <PhaseAnalysisChart data={resultData.phases} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <ProductInfoSection 
            inferenceData={resultData.inferenceData}
            references={resultData.explanatoryInfo.references.sources}
            referencesTitle={resultData.explanatoryInfo.references.title}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <LcaModelCard 
              title={resultData.inferenceData.lcaModel.title}
              description={resultData.inferenceData.lcaModel.description}
              parameters={resultData.inferenceData.lcaModel.parameters}
              flowchart={resultData.inferenceData.lcaModel.flowchart}
            />
            
            <CarbonFootprintResultCard 
              title={resultData.inferenceData.carbonFootprintResult.title}
              totalValue={resultData.inferenceData.carbonFootprintResult.totalValue}
              unit={resultData.inferenceData.carbonFootprintResult.unit}
              uncertaintyRange={resultData.inferenceData.carbonFootprintResult.uncertaintyRange}
              breakdown={resultData.inferenceData.carbonFootprintResult.breakdown}
            />
          </div>
          
          <TechnicalBasisCard 
            title={resultData.explanatoryInfo.technicalBasis.title}
            methods={resultData.explanatoryInfo.technicalBasis.methods}
          />
          
          <Card className="mb-8 mt-8">
            <CardHeader>
              <CardTitle className="text-xl">减排优化建议</CardTitle>
              <CardDescription>基于产品特性和行业最佳实践的碳减排建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resultData.improvementSuggestions.map((suggestion, index) => (
                  <ImprovementSuggestionCard key={index} suggestion={suggestion} />
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">相似产品对比</CardTitle>
              <CardDescription>与市场上同类产品的碳足迹对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {resultData.similarProducts.map((product, index) => (
                  <SimilarProductCard key={index} product={product} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PredictionResult;
