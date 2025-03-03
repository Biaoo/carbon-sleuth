
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
  BarChart as BarChartIcon,
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
  LineChart,
  Library,
  ArrowRight,
  Link
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ErrorBar } from 'recharts';

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
- **全自动层压**: 采用精确控温的全自动层压工艺，确保无气泡
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
      icon: BarChartIcon,
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
  // 新增：可解释性信息
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
  // 行业对比分析
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
    // 合并行业和竞品数据用于图表展示
    chartData: [
      { name: "本产品", value: 42.8, error: 6.4, fill: "#4f46e5" },
      { name: "竞品A", value: 47.5, error: 7.1, fill: "#64748b" },
      { name: "竞品B", value: 51.2, error: 7.7, fill: "#64748b" },
      { name: "竞品C", value: 49.8, error: 7.5, fill: "#64748b" },
      { name: "竞品D", value: 39.5, error: 5.9, fill: "#64748b" },
      { name: "行业领先", value: 35.0, error: 3.5, fill: "#22c55e" },
      { name: "行业平均", value: 65.2, error: 6.5, fill: "#f59e0b" },
      { name: "行业基准", value: 80.0, error: 8.0, fill: "#ef4444" }
    ]
  }
};

// 难度图标映射
const difficultyIcons = {
  easy: { icon: <Leaf className="h-4 w-4 text-green-500" />, label: '容易' },
  medium: { icon: <TrendingDown className="h-4 w-4 text-amber-500" />, label: '中等' },
  hard: { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, label: '困难' },
};

// LCA流程图节点类型样式
const nodeStyles = {
  input: "bg-blue-100 border-blue-500",
  process: "bg-gray-100 border-gray-500",
  output: "bg-green-100 border-green-500"
};

// Markdown 渲染组件
const MarkdownContent = ({ content }: { content: string }) => {
  // 简单的Markdown渲染，在实际项目中可以使用react-markdown等库
  const lines = content.split('\n');
  
  return (
    <div className="markdown-content prose prose-sm max-w-none">
      {lines.map((line, index) => {
        if (line.startsWith('## ')) {
          return <h2 key={index} className="text-lg font-semibold mt-4 mb-2">{line.replace('## ', '')}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={index} className="text-base font-medium mt-3 mb-1">{line.replace('### ', '')}</h3>;
        } else if (line.startsWith('- **')) {
          const parts = line.replace('- **', '').split('**:');
          return (
            <div key={index} className="flex mb-1">
              <span className="font-medium mr-2">{parts[0]}:</span>
              <span>{parts[1]}</span>
            </div>
          );
        } else if (line.startsWith('- ')) {
          return <p key={index} className="ml-4 flex items-start mb-1">
            <span className="mr-2 mt-1.5">•</span>
            <span>{line.replace('- ', '')}</span>
          </p>;
        } else if (line.startsWith('1. **')) {
          const parts = line.split('**');
          const title = parts[1];
          const rest = parts[2].replace(' (', '').replace(')', '');
          return (
            <div key={index} className="mb-2">
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{rest}</p>
            </div>
          );
        } else if (line.trim() === '') {
          return <div key={index} className="h-2"></div>;
        } else {
          return <p key={index} className="mb-2">{line}</p>;
        }
      })}
    </div>
  );
};

// 引用侧栏组件
const ReferenceSidebar = ({ references }: { references: {id: number, text: string}[] }) => {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <h3 className="text-sm font-medium mb-3 flex items-center">
        <Library className="h-4 w-4 mr-1.5" />
        引用依据
      </h3>
      <div className="space-y-2">
        {references.map(ref => (
          <div key={ref.id} className="text-xs flex">
            <span className="font-medium mr-1.5">[{ref.id}]</span>
            <span className="text-muted-foreground">{ref.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// LCA模型流程图组件
const LcaFlowchart = ({ nodes }: { nodes: Array<{id: string, text: string, type: string, next: string[]}> }) => {
  return (
    <div className="mt-4 relative">
      <div className="flex flex-col items-center space-y-5 relative">
        {nodes.map((node, index) => (
          <div key={node.id} className="relative w-full">
            <div className={`w-64 mx-auto p-3 rounded-lg border ${nodeStyles[node.type as keyof typeof nodeStyles]} relative z-10`}>
              <div className="text-center">{node.text}</div>
            </div>
            
            {/* 连接线 */}
            {node.next.length > 0 && (
              <div className="absolute left-1/2 top-full h-5 w-0.5 bg-gray-300 -translate-x-1/2 z-0"></div>
            )}
            
            {/* 分支连接线 */}
            {node.next.length > 1 && (
              <div className="absolute top-full pt-5 left-1/2 -translate-x-1/2 flex justify-center w-full">
                <div className="flex items-center justify-between" style={{width: `${(node.next.length-1) * 80 + 20}px`}}>
                  {node.next.map(nextId => (
                    <div key={nextId} className="h-5 w-0.5 bg-gray-300"></div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
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
        
        {/* 碳足迹总值和对比图表 */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>碳足迹评估结果与对比分析</CardTitle>
            <CardDescription>基于LCA模型和产业数据预测的碳足迹值及其行业对比</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="lg:col-span-1 flex flex-col justify-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">预测碳足迹值</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold">{resultData.carbonValue}</span>
                    <span className="text-lg ml-2 text-muted-foreground">{resultData.unit}</span>
                  </div>
                  <div className="mt-2 inline-flex items-center bg-muted/50 px-2 py-1 rounded-full">
                    <span className="text-xs text-muted-foreground">误差范围</span>
                    <Badge variant="outline" className="ml-1.5 text-xs">±15%</Badge>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">低于行业平均</p>
                    <div className="text-green-600 font-semibold">
                      {((resultData.industryAvg - resultData.carbonValue) / resultData.industryAvg * 100).toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">减排潜力</p>
                    <div className="text-amber-600 font-semibold">
                      {resultData.reductionPotential} <span className="text-xs font-normal text-muted-foreground">kg CO₂e</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={resultData.comparativeAnalysis.chartData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ angle: -45, textAnchor: 'end', fontSize: 12 }}
                      height={60}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      unit=" kg CO₂e"
                      width={80}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value} kg CO₂e`, '碳足迹值']}
                      contentStyle={{ borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="value" name="碳足迹值">
                      {resultData.comparativeAnalysis.chartData.map((entry, index) => (
                        <ErrorBar key={`error-${index}`} dataKey="error" width={4} strokeWidth={1} />
                      ))}
                      {resultData.comparativeAnalysis.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm">
              {resultData.comparativeAnalysis.competitorsComparison.keyDifferentiators.map((item, index) => (
                <div key={index} className="flex items-start p-2 bg-muted/30 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 shrink-0" />
                  <p className="text-xs">{item}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="composition" className="mt-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-4 mb-8">
            <TabsTrigger value="composition">碳足迹构成</TabsTrigger>
            <TabsTrigger value="product-info">产品与技术信息</TabsTrigger>
            <TabsTrigger value="lca-model">LCA模型与推理</TabsTrigger>
            <TabsTrigger value="suggestions">改进建议</TabsTrigger>
          </TabsList>
          
          {/* 碳足迹构成分析选项卡 */}
          <TabsContent value="composition" className="space-y-8">
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
          
          {/* 产品信息选项卡 */}
          <TabsContent value="product-info" className="space-y-8">
            {/* 产品基础信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-primary mr-2" />
                      <CardTitle>{resultData.inferenceData.productBasicInfo.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MarkdownContent content={resultData.inferenceData.productBasicInfo.markdownContent} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <ReferenceSidebar references={resultData.inferenceData.productBasicInfo.citations} />
              </div>
            </div>
            
            {/* 产品组成信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Layers className="h-5 w-5 text-primary mr-2" />
                      <CardTitle>{resultData.inferenceData.productComposition.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MarkdownContent content={resultData.inferenceData.productComposition.markdownContent} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <ReferenceSidebar references={resultData.inferenceData.productComposition.citations} />
              </div>
            </div>
            
            {/* 生产技术信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center">
                      <Cog className="h-5 w-5 text-primary mr-2" />
                      <CardTitle>{resultData.inferenceData.productionTechnology.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <MarkdownContent content={resultData.inferenceData.productionTechnology.markdownContent} />
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-1">
                <ReferenceSidebar references={resultData.inferenceData.productionTechnology.citations} />
                
                {/* 竞品供应商 */}
                <Card className="mt-6">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      <CardTitle className="text-base">{resultData.inferenceData.competitorsInfo.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      {resultData.inferenceData.competitorsInfo.data.map((item, index) => (
                        <div key={index} className="flex flex-col p-2 text-sm hover:bg-muted/30 rounded-md">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-xs text-muted-foreground">{item.product}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* LCA模型选项卡 */}
          <TabsContent value="lca-model" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <BarChartIcon className="h-5 w-5 text-primary mr-2" />
                  <CardTitle>{resultData.inferenceData.lcaModel.title}</CardTitle>
                </div>
                <CardDescription>{resultData.inferenceData.lcaModel.modelName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm">{resultData.inferenceData.lcaModel.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {resultData.inferenceData.lcaModel.parameters.map((param, index) => (
                    <div key={index} className="p-3 bg-secondary/30 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">{param.name}</p>
                      <p className="text-sm font-medium">{param.value}</p>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-base font-medium mb-4">LCA评估流程图</h3>
                  <LcaFlowchart nodes={resultData.inferenceData.lcaModel.flowchart} />
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="text-base font-medium mb-2">碳足迹计算明细</h3>
                  <div className="space-y-3 mt-4">
                    {resultData.inferenceData.carbonFootprintResult.breakdown.map((item, index) => (
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
              </CardContent>
            </Card>
            
            {/* 技术依据 */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-primary mr-2" />
                  <CardTitle>{resultData.explanatoryInfo.technicalBasis.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resultData.explanatoryInfo.technicalBasis.methods.map((method, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-1">{method.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {method.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 参考来源 */}
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Library className="h-5 w-5 text-primary mr-2" />
                  <CardTitle>{resultData.explanatoryInfo.references.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {resultData.explanatoryInfo.references.sources.map((source) => (
                    <div key={source.id} className="flex items-start p-2 hover:bg-muted/30 rounded-lg">
                      <Link className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm">{source.name}</p>
                        <Badge variant="outline" className="mt-1">{source.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* 改进建议选项卡 */}
          <TabsContent value="suggestions" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>改进建议详情</CardTitle>
                <CardDescription>
                  基于碳足迹分析提出的产品碳减排建议
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {resultData.improvementSuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className="border rounded-lg overflow-hidden"
                    >
                      <div 
                        className="p-4 bg-muted/50 flex items-start justify-between cursor-pointer"
                        onClick={() => toggleSuggestion(suggestion.title)}
                      >
                        <div className="flex items-start">
                          {difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].icon}
                          <div className="ml-2">
                            <h4 className="font-medium">{suggestion.title}</h4>
                            <div className="flex items-center mt-1">
                              <Badge className="mr-2" variant="outline">
                                {suggestion.timeline}
                              </Badge>
                              <span className="text-xs text-green-600 font-medium">
                                减排 {suggestion.reduction} kg CO₂e
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          {expandedSuggestions.includes(suggestion.title) ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                      </div>
                      
                      {expandedSuggestions.includes(suggestion.title) && (
                        <div className="p-4 border-t">
                          <p className="text-sm">{suggestion.description}</p>
                          
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">减排潜力</p>
                              <div className="flex items-baseline">
                                <span className="text-xl font-medium text-green-600">{suggestion.reduction}</span>
                                <span className="text-sm ml-1 text-muted-foreground">kg CO₂e</span>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">实施难度</p>
                              <div className="flex items-center">
                                {difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].icon}
                                <span className="ml-1">{difficultyIcons[suggestion.difficulty as keyof typeof difficultyIcons].label}</span>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-muted/50 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">建议实施时间</p>
                              <span>{suggestion.timeline}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PredictionResult;
