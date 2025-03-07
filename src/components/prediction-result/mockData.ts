import { 
  PredictionResultData, BilingualText
} from '@/components/prediction-result/types';

// Helper function to create bilingual text objects
const bilingual = (zh: string, en: string): BilingualText => ({ zh, en });

// Mock data for the prediction result
export const mockResultData: PredictionResultData = {
  productName: bilingual("太阳能电池板", "Solar Panel"),
  supplierName: bilingual("绿能科技", "Green Energy Tech"),
  date: "2023-11-15",
  carbonValue: 45.6,
  unit: "kgCO2e/件",
  components: [
    { name: bilingual("硅片生产", "Silicon Wafer Production"), value: 15.2, percentage: 33.3, unit: "kgCO2e" },
    { name: bilingual("电池片制造", "Solar Cell Manufacturing"), value: 11.4, percentage: 25.0, unit: "kgCO2e" },
    { name: bilingual("组件组装", "Module Assembly"), value: 9.1, percentage: 20.0, unit: "kgCO2e" },
    { name: bilingual("运输", "Transportation"), value: 4.6, percentage: 10.0, unit: "kgCO2e" },
    { name: bilingual("其他", "Other"), value: 5.3, percentage: 11.7, unit: "kgCO2e" }
  ],
  phases: [
    { name: bilingual("原材料", "Raw Materials"), value: 18.2, percentage: 40 },
    { name: bilingual("生产制造", "Manufacturing"), value: 22.8, percentage: 50 },
    { name: bilingual("运输分销", "Distribution"), value: 4.6, percentage: 10 }
  ],
  comparativeAnalysis: {
    chartData: [
      { name: bilingual("本产品", "This Product"), value: 45.6, error: 2.3, highlight: true, fill: "#4338ca", itemType: "current" },
      { name: bilingual("行业基准", "Industry Benchmark"), value: 52.1, error: 3.1, highlight: false, fill: "#a8b3cf", itemType: "benchmark" },
      { name: bilingual("最低竞品", "Lowest Competitor"), value: 38.5, error: 1.9, highlight: false, fill: "#a8b3cf", itemType: "competitor" }
    ]
  },
  inferenceData: {
    lcaModel: {
      title: bilingual("生命周期评价模型", "Life Cycle Assessment Model"),
      description: bilingual("本模型基于ISO 14040标准，综合考虑了太阳能电池板生产的各个阶段，包括原材料获取、生产制造、运输分销和最终的回收处理。", "This model is based on the ISO 14040 standard and comprehensively considers all stages of solar panel production, including raw material acquisition, manufacturing, transportation, distribution, and final recycling."),
      parameters: [
        { name: bilingual("硅片纯度", "Silicon Wafer Purity"), value: "99.9999%" },
        { name: bilingual("电池转换效率", "Cell Conversion Efficiency"), value: "22.5%" },
        { name: bilingual("组件功率", "Module Power"), value: "300W" }
      ],
      flowchart: [
        { id: "1", text: bilingual("硅矿开采", "Silicon Mining"), type: "process", next: "2" },
        { id: "2", text: bilingual("硅提纯", "Silicon Purification"), type: "process", next: "3" },
        { id: "3", text: bilingual("硅片制造", "Wafer Manufacturing"), type: "process", next: "4" },
        { id: "4", text: bilingual("电池制造", "Cell Manufacturing"), type: "process", next: "5" },
        { id: "5", text: bilingual("组件组装", "Module Assembly"), type: "process", next: null }
      ]
    },
    carbonFootprintResult: {
      title: bilingual("碳足迹评估结果", "Carbon Footprint Assessment Result"),
      totalValue: 45.6,
      unit: "kgCO2e/件",
      uncertaintyRange: "±5%",
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
      potentialReduction: "10-15%"
    },
    {
      title: bilingual("提高电池转换效率", "Improve Cell Conversion Efficiency"),
      description: bilingual("通过改进电池片制造工艺，提高太阳能电池的转换效率，减少单位发电量的碳排放。", "Improve the conversion efficiency of solar cells by improving the cell manufacturing process, and reduce the carbon emissions per unit of power generation."),
      difficulty: "hard",
      potentialReduction: "5-10%"
    },
    {
      title: bilingual("使用可再生能源", "Use Renewable Energy"),
      description: bilingual("在生产过程中更多地使用可再生能源电力，如太阳能、风能等，以减少对化石能源的依赖。", "Use more renewable energy power, such as solar energy and wind energy, in the production process to reduce dependence on fossil energy."),
      difficulty: "easy",
      potentialReduction: "15-20%"
    }
  ],
  similarProducts: [
    {
      name: bilingual("高效单晶硅电池板", "High-Efficiency Monocrystalline Panel"),
      supplier: bilingual("晶澳太阳能", "JA Solar"),
      carbonValue: 42.3,
      unit: "kgCO2e/件",
      differencePercentage: -7.2
    },
    {
      name: bilingual("薄膜太阳能电池板", "Thin-Film Solar Panel"),
      supplier: bilingual("汉能", "Hanergy"),
      carbonValue: 51.2,
      unit: "kgCO2e/件",
      differencePercentage: 12.3
    }
  ],
  keyDifferentiators: [
    bilingual("采用先进PERC技术，提高能源转换效率", "Adopts advanced PERC technology to improve energy conversion efficiency"),
    bilingual("优化铝合金框架设计，减少材料使用", "Optimizes aluminum alloy frame design to reduce material usage"),
    bilingual("制造过程采用部分可再生能源电力", "Uses partially renewable energy electricity in the manufacturing process"),
    bilingual("供应链本地化程度高，减少运输碳排放", "High degree of supply chain localization to reduce transportation carbon emissions")
  ]
};
