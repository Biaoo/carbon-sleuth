import { 
  PredictionResultData, BilingualText
} from '@/components/prediction-result/types';
import { FileText, Activity, BarChart2, FlaskConical } from 'lucide-react';

// Helper function to create bilingual text objects
const bilingual = (zh: string, en: string): BilingualText => ({ zh, en });

// Mock data for the prediction result
export const mockResultData: PredictionResultData = {
  id: "pred-123456",
  productName: bilingual("太阳能电池板", "Solar Panel"),
  supplierName: bilingual("绿能科技", "Green Energy Tech"),
  date: "2023-11-15",
  carbonValue: 45.6,
  unit: "kgCO2e/件",
  confidenceLevel: "高",
  industryAvg: 65.2,
  reductionPotential: 15.3,
  dataQuality: 0.85,
  components: [
    { name: bilingual("硅片生产", "Silicon Wafer Production"), value: 15.2, percentage: 33.3, unit: "kgCO2e" },
    { name: bilingual("电池片制造", "Solar Cell Manufacturing"), value: 11.4, percentage: 25.0, unit: "kgCO2e" },
    { name: bilingual("组件组装", "Module Assembly"), value: 9.1, percentage: 20.0, unit: "kgCO2e" },
    { name: bilingual("运输", "Transportation"), value: 4.6, percentage: 10.0, unit: "kgCO2e" },
    { name: bilingual("其他", "Other"), value: 5.3, percentage: 11.7, unit: "kgCO2e" }
  ],
  phases: [
    { name: bilingual("原材料", "Raw Materials"), value: 18.2, percentage: 40, unit: "kgCO2e" },
    { name: bilingual("生产制造", "Manufacturing"), value: 22.8, percentage: 50, unit: "kgCO2e" },
    { name: bilingual("运输分销", "Distribution"), value: 4.6, percentage: 10, unit: "kgCO2e" }
  ],
  comparativeAnalysis: {
    chartData: [
      { name: bilingual("本产品", "This Product"), value: 45.6, error: 2.3, highlight: true, fill: "#4338ca", itemType: "current" },
      { name: bilingual("竞品A", "Lowest Competitor"), value: 38.5, error: 1.9, highlight: false, fill: "#a8b3cf", itemType: "competitor" },
      { name: bilingual("竞品B", "Lowest Competitor"), value: 38.5, error: 1.9, highlight: false, fill: "#a8b3cf", itemType: "competitor" },
      { name: bilingual("竞品C", "Lowest Competitor"), value: 38.5, error: 1.9, highlight: false, fill: "#a8b3cf", itemType: "competitor" },
      { name: bilingual("竞品D", "Lowest Competitor"), value: 38.5, error: 1.9, highlight: false, fill: "#a8b3cf", itemType: "competitor" },
      { name: bilingual("行业基准", "Industry Benchmark"), value: 52.1, error: 3.1, highlight: false, fill: "#a8b3cf", itemType: "industry" },
    ],
    industryBenchmark: {
      title: bilingual("行业基准对比", "Industry Benchmark Comparison"),
      description: bilingual("与行业标准相比的碳足迹表现", "Carbon footprint performance compared to industry standards"),
      data: []
    },
    competitorsComparison: {
      title: bilingual("竞争对手对比", "Competitors Comparison"),
      description: bilingual("与竞争产品的碳足迹比较", "Carbon footprint comparison with competing products"),
      competitorData: [],
      keyDifferentiators: [
        "采用先进PERC技术，提高能源转换效率",
        "优化铝合金框架设计，减少材料使用",
        "制造过程采用部分可再生能源电力",
        "供应链本地化程度高，减少运输碳排放"
      ]
    }
  },
  inferenceData: {
    productBasicInfo: {
      title: bilingual("产品基本信息", "Product Basic Information"),
      icon: FileText,
      markdownContent: bilingual("# 产品基本信息\n\n**产品名称**：太阳能电池板\n**规格型号**：SP-300W\n**制造商**：绿能科技", "# Product Basic Information\n\n**Product Name**: Solar Panel\n**Model**: SP-300W\n**Manufacturer**: Green Energy Tech")
    },
    productComposition: {
      title: bilingual("产品组成", "Product Composition"),
      icon: FileText,
      markdownContent: bilingual("# 产品组成\n\n- 钢化玻璃盖板\n- 乙烯-醋酸乙烯酯(EVA)封装材料\n- 单晶硅太阳能电池片\n- 背板\n- 铝合金边框\n- 接线盒", "# Product Composition\n\n- Tempered Glass Cover\n- Ethylene Vinyl Acetate (EVA) Encapsulation\n- Monocrystalline Silicon Solar Cells\n- Backsheet\n- Aluminum Alloy Frame\n- Junction Box")
    },
    productionTechnology: {
      title: bilingual("生产工艺", "Production Technology"),
      icon: Activity,
      markdownContent: bilingual("# 生产工艺\n\n1. 硅料制备\n2. 硅锭铸造\n3. 硅片切割\n4. 电池片制造\n5. 组件封装", "# Production Technology\n\n1. Silicon Material Preparation\n2. Silicon Ingot Casting\n3. Silicon Wafer Cutting\n4. Solar Cell Manufacturing\n5. Module Encapsulation")
    },
    competitorsInfo: {
      title: bilingual("竞争对手信息", "Competitors Information"),
      icon: BarChart2,
      data: [
        { name: bilingual("晶科能源", "JinkoSolar"), product: bilingual("单晶硅光伏组件", "Monocrystalline PV Module") },
        { name: bilingual("隆基绿能", "LONGi Green Energy"), product: bilingual("高效单晶组件", "High-efficiency Mono Module") }
      ]
    },
    lcaModel: {
      title: bilingual("生命周期评价模型", "Life Cycle Assessment Model"),
      icon: FlaskConical,
      modelName: bilingual("ISO 14040 LCA模型", "ISO 14040 LCA Model"),
      description: bilingual("本模型基于ISO 14040标准，综合考虑了太阳能电池板生产的各个阶段，包括原材料获取、生产制造、运输分销和最终的回收处理。", "This model is based on the ISO 14040 standard and comprehensively considers all stages of solar panel production, including raw material acquisition, manufacturing, transportation, distribution, and final recycling."),
      parameters: [
        { name: bilingual("硅片纯度", "Silicon Wafer Purity"), value: "99.9999%" },
        { name: bilingual("电池转换效率", "Cell Conversion Efficiency"), value: "22.5%" },
        { name: bilingual("组件功率", "Module Power"), value: "300W" }
      ],
      flowchart: [
        { id: "1", text: bilingual("硅矿开采", "Silicon Mining"), type: "process", next: ["2"] },
        { id: "2", text: bilingual("硅提纯", "Silicon Purification"), type: "process", next: ["3"] },
        { id: "3", text: bilingual("硅片制造", "Wafer Manufacturing"), type: "process", next: ["4"] },
        { id: "4", text: bilingual("电池制造", "Cell Manufacturing"), type: "process", next: ["5"] },
        { id: "5", text: bilingual("组件组装", "Module Assembly"), type: "process", next: [] }
      ]
    },
    carbonFootprintResult: {
      title: bilingual("碳足迹评估结果", "Carbon Footprint Assessment Result"),
      icon: BarChart2,
      totalValue: 45.6,
      unit: "kgCO2e/件",
      uncertaintyRange: "±5%",
      confidenceLevel: bilingual("高", "High"),
      breakdown: [
        { name: bilingual("硅片生产", "Silicon Wafer Production"), value: 15.2, percentage: 33.3 },
        { name: bilingual("电池片制造", "Solar Cell Manufacturing"), value: 11.4, percentage: 25.0 },
        { name: bilingual("组件组装", "Module Assembly"), value: 9.1, percentage: 20.0 },
        { name: bilingual("运输", "Transportation"), value: 4.6, percentage: 10.0 },
        { name: bilingual("其他", "Other"), value: 5.3, percentage: 11.7 }
      ]
    }
  },
  explanatoryInfo: {
    technicalBasis: {
      title: bilingual("技术依据", "Technical Basis"),
      icon: FileText,
      methods: [
        {
          name: bilingual("生命周期评价 (LCA)", "Life Cycle Assessment (LCA)"),
          description: bilingual("根据ISO 14040/14044标准，对产品从原材料获取到最终处置的全过程进行环境影响评估。", "According to ISO 14040/14044 standards, the environmental impact assessment is carried out for the entire process from raw material acquisition to final disposal.")
        },
        {
          name: bilingual("全球变暖潜势 (GWP)", "Global Warming Potential (GWP)"),
          description: bilingual("使用IPCC 2013评估报告中的GWP值，评估不同温室气体对全球变暖的贡献。", "Use GWP values from the IPCC 2013 assessment report to assess the contribution of different greenhouse gases to global warming.")
        }
      ]
    },
    references: {
      title: bilingual("参考来源", "Reference Sources"),
      icon: FileText,
      sources: [
        {
          id: "ref-001",
          name: bilingual("中国光伏行业协会 (CPIA)", "China Photovoltaic Industry Association (CPIA)"),
          type: bilingual("行业报告", "Industry Report"),
          url: "https://www.cpia.org.cn/"
        },
        {
          id: "ref-002",
          name: bilingual("国际能源署 (IEA)", "International Energy Agency (IEA)"),
          type: bilingual("能源统计", "Energy Statistics"),
          url: "https://www.iea.org/"
        }
      ]
    }
  },
  improvementSuggestions: [
    {
      title: bilingual("优化硅片生产工艺", "Optimize Silicon Wafer Production Process"),
      description: bilingual("采用更节能的硅片生产技术，如GCL法，以降低能耗。", "Use more energy-efficient silicon wafer production technologies, such as the GCL method, to reduce energy consumption."),
      difficulty: "medium",
      timeline: bilingual("6-12个月", "6-12 months"),
      reduction: 15
    },
    {
      title: bilingual("提高电池转换效率", "Improve Cell Conversion Efficiency"),
      description: bilingual("通过改进电池片制造工艺，提高太阳能电池的转换效率，减少单位发电量的碳排放。", "Improve the conversion efficiency of solar cells by improving the cell manufacturing process, and reduce the carbon emissions per unit of power generation."),
      difficulty: "hard",
      timeline: bilingual("12-24个月", "12-24 months"),
      reduction: 8
    },
    {
      title: bilingual("使用可再生能源", "Use Renewable Energy"),
      description: bilingual("在生产过程中更多地使用可再生能源电力，如太阳能、风能等，以减少对化石能源的依赖。", "Use more renewable energy power, such as solar energy and wind energy, in the production process to reduce dependence on fossil energy."),
      difficulty: "easy",
      timeline: bilingual("3-6个月", "3-6 months"),
      reduction: 18
    }
  ],
  similarProducts: [
    {
      id: "prod-001",
      name: bilingual("高效单晶硅电池板", "High-Efficiency Monocrystalline Panel"),
      supplier: bilingual("晶澳太阳能", "JA Solar"),
      carbonValue: 42.3,
      unit: "kgCO2e/件",
      differencePercentage: -7.2
    },
    {
      id: "prod-002",
      name: bilingual("薄膜太阳能电池板", "Thin-Film Solar Panel"),
      supplier: bilingual("汉能", "Hanergy"),
      carbonValue: 51.2,
      unit: "kgCO2e/件",
      differencePercentage: 12.3
    }
  ]
};

// Export these mock data arrays using the bilingual function already defined above
export const mockCompetitorsData = [
  { name: bilingual("竞品A - NS-310", "Competitor A - NS-310").zh, carbonValue: 47.5, unit: "kg CO₂e/件", difference: "+11.0%" },
  { name: bilingual("竞品B - HE-305", "Competitor B - HE-305").zh, carbonValue: 51.2, unit: "kg CO₂e/件", difference: "+19.6%" },
  { name: bilingual("竞品C - BF-290", "Competitor C - BF-290").zh, carbonValue: 49.8, unit: "kg CO₂e/件", difference: "+16.4%" },
  { name: bilingual("竞品D - SP-320", "Competitor D - SP-320").zh, carbonValue: 39.5, unit: "kg CO₂e/件", difference: "-7.7%" }
];

export const mockIndustryBenchmarks = [
  { name: bilingual("行业领先水平", "Industry Leading Level").zh, value: 35.0, unit: "kg CO₂e/件" },
  { name: bilingual("行业平均水平", "Industry Average Level").zh, value: 65.2, unit: "kg CO₂e/件" },
  { name: bilingual("行业基准线", "Industry Baseline").zh, value: 80.0, unit: "kg CO₂e/件" }
];

export const mockReportLinks = [
  { name: bilingual("太阳能电池板碳足迹预测报告", "Solar Panel Carbon Footprint Prediction Report").zh, url: "/prediction-result/pred-123456", type: "prediction" as const },
  { name: bilingual("太阳能电池板ILCD格式数据包", "Solar Panel ILCD Format Data Package").zh, url: "#", type: "ilcd" as const },
  { name: bilingual("产品生命周期分析技术文档", "Product Life Cycle Analysis Technical Document").zh, url: "#", type: "other" as const }
];

// Data items that can be requested
export const dataItems = [
  { id: "product_specs", label: bilingual("产品规格参数", "Product Specifications").zh },
  { id: "material_composition", label: bilingual("材料组成情况", "Material Composition").zh },
  { id: "manufacturing_process", label: bilingual("制造工艺流程", "Manufacturing Process").zh },
  { id: "energy_consumption", label: bilingual("能源消耗数据", "Energy Consumption Data").zh },
  { id: "transportation_logistics", label: bilingual("运输物流信息", "Transportation Logistics Information").zh },
  { id: "certifications", label: bilingual("相关认证文件", "Related Certification Documents").zh },
  { id: "test_reports", label: bilingual("检测报告数据", "Test Report Data").zh },
  { id: "packaging_details", label: bilingual("包装材料详情", "Packaging Material Details").zh },
  { id: "suppliers_info", label: bilingual("上游供应商信息", "Upstream Supplier Information").zh },
  { id: "waste_data", label: bilingual("废弃物处理数据", "Waste Treatment Data").zh },
];
