
import { 
  PredictionResultData, BilingualText
} from '@/components/prediction-result/types';
import {
  BookOpen,
  Layers,
  Cog,
  Users,
  Database,
  BarChart2,
  Library,
  Info
} from 'lucide-react';

// Helper function to create bilingual text objects
const bilingual = (zh: string, en: string): BilingualText => ({ zh, en });

export const mockResultData: PredictionResultData = {
  id: 'pred-123456',
  productName: bilingual('太阳能电池板 Model-SE300', 'Solar Panel Model-SE300'),
  supplierName: bilingual('上海绿能科技有限公司', 'Shanghai Green Energy Technology Co., Ltd.'),
  date: '2023-11-20',
  carbonValue: 42.8,
  unit: 'kg CO₂e/件',
  confidenceLevel: 'high',
  industryAvg: 65.2,
  reductionPotential: 22.4,
  dataQuality: 85,
  components: [
    { name: bilingual('光伏板', 'PV Panel'), value: 18.5, percentage: 43.2, unit: 'kg CO₂e' },
    { name: bilingual('铝合金框架', 'Aluminum Frame'), value: 12.3, percentage: 28.7, unit: 'kg CO₂e' },
    { name: bilingual('背板', 'Backsheet'), value: 5.6, percentage: 13.1, unit: 'kg CO₂e' },
    { name: bilingual('接线盒', 'Junction Box'), value: 4.2, percentage: 9.8, unit: 'kg CO₂e' },
    { name: bilingual('封装材料', 'Encapsulation Materials'), value: 2.2, percentage: 5.2, unit: 'kg CO₂e' }
  ],
  phases: [
    { name: bilingual('原材料获取', 'Raw Materials'), value: 22.6, percentage: 52.8, unit: 'kg CO₂e' },
    { name: bilingual('制造过程', 'Manufacturing'), value: 12.4, percentage: 29.0, unit: 'kg CO₂e' },
    { name: bilingual('包装运输', 'Packaging & Transport'), value: 5.2, percentage: 12.1, unit: 'kg CO₂e' },
    { name: bilingual('使用与维护', 'Use & Maintenance'), value: 1.8, percentage: 4.2, unit: 'kg CO₂e' },
    { name: bilingual('回收处理', 'End-of-Life'), value: 0.8, percentage: 1.9, unit: 'kg CO₂e' }
  ],
  improvementSuggestions: [
    { 
      title: bilingual('使用再生铝材', 'Use Recycled Aluminum'),
      description: bilingual('采用再生铝材替代原生铝可显著降低铝合金框架的碳足迹，潜在减排比例约15-20%', 'Using recycled aluminum instead of primary aluminum can significantly reduce the carbon footprint of aluminum frames, with potential reduction of 15-20%'),
      reduction: 2.5,
      difficulty: 'medium',
      timeline: bilingual('短期', 'Short-term')
    },
    { 
      title: bilingual('优化制造工艺能效', 'Optimize Manufacturing Energy Efficiency'),
      description: bilingual('提升电池板生产工艺能效，包括改进烧结工艺和引入智能能源管理系统', 'Improve energy efficiency of panel production processes, including improved sintering process and introduction of smart energy management systems'),
      reduction: 3.2,
      difficulty: 'medium',
      timeline: bilingual('中期', 'Medium-term')
    },
    { 
      title: bilingual('使用低碳电力', 'Use Low-carbon Electricity'),
      description: bilingual('生产过程使用可再生能源电力，如自建光伏系统或采购绿色电力证书', 'Use renewable energy in manufacturing processes, such as self-built PV systems or purchasing green electricity certificates'),
      reduction: 8.6,
      difficulty: 'hard',
      timeline: bilingual('中期', 'Medium-term')
    },
    { 
      title: bilingual('优化物流运输', 'Optimize Logistics'),
      description: bilingual('改进物流规划，提高装载效率，选择低碳运输方式', 'Improve logistics planning, increase loading efficiency, and choose low-carbon transportation methods'),
      reduction: 1.5,
      difficulty: 'easy',
      timeline: bilingual('短期', 'Short-term')
    },
    { 
      title: bilingual('延长产品寿命', 'Extend Product Lifespan'),
      description: bilingual('提升产品耐久性，延长使用寿命，改善维护方案', 'Enhance product durability, extend service life, and improve maintenance plans'),
      reduction: 4.8,
      difficulty: 'medium',
      timeline: bilingual('长期', 'Long-term')
    }
  ],
  similarProducts: [
    {
      id: 'prod-001',
      name: bilingual('高效太阳能电池板 SE-500', 'High-efficiency Solar Panel SE-500'),
      supplier: bilingual('上海绿能科技有限公司', 'Shanghai Green Energy Technology Co., Ltd.'),
      carbonValue: 25.3,
      unit: 'kg CO₂e/Unit',
      differencePercentage: -41
    },
    {
      id: 'prod-002',
      name: bilingual('光伏板 PV-320', 'PV Panel PV-320'),
      supplier: bilingual('江苏新材料科技股份有限公司', 'Jiangsu New Materials Technology Co., Ltd.'),
      carbonValue: 48.5,
      unit: 'kg CO₂e/Unit',
      differencePercentage: +13
    },
    {
      id: 'prod-003',
      name: bilingual('薄膜光伏组件 TF-230', 'Thin-film PV Module TF-230'),
      supplier: bilingual('广东高效能源有限公司', 'Guangdong High Efficiency Energy Co., Ltd.'),
      carbonValue: 35.2,
      unit: 'kg CO₂e/Unit',
      differencePercentage: -18
    }
  ],
  inferenceData: {
    productBasicInfo: {
      title: bilingual("产品基础信息", "Product Basic Information"),
      icon: BookOpen,
      markdownContent: bilingual(
        `
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
        `
## Product Basic Features

Solar Panel Model-SE300 is a high-efficiency monocrystalline silicon photovoltaic panel using PERC technology, with high energy conversion efficiency and long service life.

- **Product Category**: Renewable Energy Equipment
- **Product Specifications**: 300W Monocrystalline Silicon PV Panel
- **Product Dimensions**: 1650mm × 992mm × 35mm
- **Product Weight**: 18.5kg
- **Product Lifespan**: 25 years

This product complies with IEC 61215 and IEC 61730 standard certifications, with good anti-PID performance and reliability. According to research [1], this type of high-efficiency monocrystalline silicon photovoltaic product has an energy payback period of approximately 1.5-2 years throughout its lifecycle.

## Product Application Scenarios

Suitable for various application scenarios such as residential rooftop systems, commercial buildings, and ground-mounted power stations. According to market analysis [2], such products are widely used in distributed photovoltaic systems, with an average annual power generation of approximately 1200-1500 kWh per kilowatt installed (varying by region).
        `
      ),
      citations: [
        { id: 1, text: bilingual("张明等, 《光伏产品生命周期碳足迹评价研究》, 可再生能源学报, 2022.", "Zhang Ming et al., 'Research on Carbon Footprint Evaluation of Photovoltaic Products Life Cycle', Journal of Renewable Energy, 2022.") },
        { id: 2, text: bilingual("中国光伏行业协会, 《2023年光伏产品市场分析报告》, 2023.", "China Photovoltaic Industry Association, 'Market Analysis Report of Photovoltaic Products 2023', 2023.") }
      ]
    },
    productComposition: {
      title: bilingual("产品组成信息", "Product Composition Information"),
      icon: Layers,
      markdownContent: bilingual(
        `
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
        `
## Material Composition

The Model-SE300 solar panel consists mainly of the following parts:

1. **Monocrystalline Silicon Cells** (60 pieces, total weight approx. 8.9kg)
   - Uses P-type monocrystalline silicon material
   - Cell dimensions: 156.75mm × 156.75mm
   - Average thickness: 180μm

2. **Tempered Glass** (3.2mm thick, approx. 4.6kg)
   - Low-iron ultra-white tempered glass
   - Light transmittance >91%
   - Surface treated with anti-reflective coating

3. **EVA Encapsulation Film** (0.5mm×2 layers, approx. 1.5kg)
   - High transparency, high cross-linking EVA material
   - Excellent UV aging stability

4. **Aluminum Alloy Frame** (35mm thick, approx. 2.8kg)
   - Anodized aluminum alloy material
   - Film coating for corrosion protection
   - With pre-assembled drainage holes

5. **Backsheet** (composite material, approx. 0.7kg)
   - Three-layer structure composite material backsheet
   - Excellent waterproof and weather resistance

Material proportion analysis shows that monocrystalline silicon cells account for about 48% of the weight in the entire module, tempered glass accounts for about 25%, and aluminum alloy frame accounts for about 15%, which is basically consistent with the industry standard composition ratio in [3]. According to the material analysis in [4], this composition structure has good durability under harsh climate conditions.
        `
      ),
      citations: [
        { id: 3, text: bilingual("刘强, 《光伏组件结构设计与优化》, 太阳能技术, 2021.", "Liu Qiang, 'Structural Design and Optimization of Photovoltaic Modules', Solar Energy Technology, 2021.") },
        { id: 4, text: bilingual("国际太阳能技术委员会, 《光伏组件材料耐久性研究报告》, 2023.", "International Solar Technology Committee, 'Research Report on Durability of Photovoltaic Module Materials', 2023.") }
      ]
    },
    productionTechnology: {
      title: bilingual("生产技术信息", "Production Technology Information"),
      icon: Cog,
      markdownContent: bilingual(
        `
## 制造工艺与技术特点

太阳能电池板 Model-SE300 采用先进的制造工艺，主要包括以下关键技术环节：

### 电池制备工艺
- **PERC技术**: 采用钝化发射极和背面接触技术，提高光电转换效率
- **多主栅技术**: 使用9主栅设计，降低电阻损失，提高电流收集效率
- **选择性发射极**: 优化电池正面金属化区域掺杂，降低接触电阻

### 组件封装技术
- **全自动层压**: 采用精确控制的全自动层压工艺，确保无气泡
- **智能EL检测**: 100%EL检测，排除微裂纹和隐裂隐患
- **自动化串焊**: 高精度串焊技术，焊带对准精度<±0.2mm

### 质量控制技术
- **智能检测系统**: 采用AI视觉检测系统，缺陷识别率>99.5%
- **高压绝缘测试**: 每片组件进行3000V高压测试
- **热斑测试**: 组件通过红外成像热斑检测

根据[5]的研究，该产品的制造能耗比行业平均水平低约15%，主要得益于生产线自动化水平高和工艺优化。[6]的调研表明，PERC技术结合多主栅技术可使电池效率提升1.5-2.0%。
        `,
        `
## Manufacturing Process and Technical Features

Solar Panel Model-SE300 uses advanced manufacturing processes, including the following key technical aspects:

### Cell Preparation Process
- **PERC Technology**: Uses Passivated Emitter and Rear Contact technology to improve photoelectric conversion efficiency
- **Multi-busbar Technology**: Uses 9-busbar design to reduce resistance loss and improve current collection efficiency
- **Selective Emitter**: Optimizes doping in the front metal contact areas to reduce contact resistance

### Module Packaging Technology
- **Fully Automatic Lamination**: Uses precisely controlled fully automatic lamination process to ensure no bubbles
- **Intelligent EL Detection**: 100% EL detection to eliminate micro-cracks and hidden crack risks
- **Automated String Soldering**: High-precision string soldering technology with ribbon alignment accuracy <±0.2mm

### Quality Control Technology
- **Intelligent Inspection System**: Uses AI visual inspection system with defect identification rate >99.5%
- **High Voltage Insulation Test**: Each module undergoes 3000V high voltage testing
- **Hot Spot Test**: Modules undergo infrared imaging hot spot detection

According to research [5], the energy consumption of this product's manufacturing is about 15% lower than the industry average, mainly due to high automation level and process optimization. Research [6] shows that PERC technology combined with multi-busbar technology can improve cell efficiency by 1.5-2.0%.
        `
      ),
      citations: [
        { id: 5, text: bilingual("王刚等, 《光伏制造业能源消耗分析与节能潜力》, 能源研究与利用, 2022.", "Wang Gang et al., 'Energy Consumption Analysis and Energy Saving Potential in Photovoltaic Manufacturing Industry', Energy Research and Utilization, 2022.") },
        { id: 6, text: bilingual("Global PV Tech, 《Advanced Cell Technologies Efficiency Report》, 2023.", "Global PV Tech, 'Advanced Cell Technologies Efficiency Report', 2023.") }
      ]
    },
    competitorsInfo: {
      title: bilingual("相关竞品供应商", "Related Competitor Suppliers"),
      icon: Users,
      data: [
        { name: bilingual("江苏新能源科技有限公司", "Jiangsu New Energy Technology Co., Ltd."), product: bilingual("单晶硅光伏板 NS-310", "Monocrystalline Silicon PV Panel NS-310") },
        { name: bilingual("浙江太阳能技术股份有限公司", "Zhejiang Solar Technology Co., Ltd."), product: bilingual("高效光伏组件 HE-305", "High-efficiency PV Module HE-305") },
        { name: bilingual("广东光能科技有限公司", "Guangdong Light Energy Technology Co., Ltd."), product: bilingual("双面光伏板 BF-290", "Bifacial PV Panel BF-290") },
        { name: bilingual("德国SolarTech GmbH", "SolarTech GmbH Germany"), product: bilingual("Premium Solar Panel SP-320", "Premium Solar Panel SP-320") }
      ]
    },
    lcaModel: {
      title: bilingual("LCA模型", "LCA Model"),
      icon: Database,
      modelName: bilingual("光伏产品全生命周期评估模型 v3.2", "Photovoltaic Product Life Cycle Assessment Model v3.2"),
      description: bilingual("该模型基于ISO 14040/14044标准，采用「摇篮到大门」边界，综合考虑原材料获取、生产制造、包装运输等阶段的环境影响。", "This model is based on ISO 14040/14044 standards, using a 'cradle-to-gate' boundary, comprehensively considering the environmental impacts of raw material acquisition, production manufacturing, packaging transportation and other stages."),
      parameters: [
        { name: bilingual("功能单位", "Functional Unit"), value: bilingual("1件标准产品", "1 standard product") },
        { name: bilingual("参考流", "Reference Flow"), value: bilingual("1块300W光伏板", "1 300W PV panel") },
        { name: bilingual("地理边界", "Geographic Boundary"), value: bilingual("中国生产系统", "Chinese production system") },
        { name: bilingual("时间范围", "Time Range"), value: bilingual("2022-2023年数据", "2022-2023 data") },
        { name: bilingual("技术覆盖", "Technology Coverage"), value: bilingual("当前主流生产技术", "Current mainstream production technology") }
      ],
      flowchart: [
        { id: 'raw', text: bilingual('原材料获取', 'Raw Material Acquisition'), type: 'input', next: ['man1', 'man2'] },
        { id: 'man1', text: bilingual('硅料制备', 'Silicon Preparation'), type: 'process', next: ['man3'] },
        { id: 'man2', text: bilingual('辅材制备', 'Auxiliary Material Preparation'), type: 'process', next: ['man4'] },
        { id: 'man3', text: bilingual('电池片生产', 'Cell Production'), type: 'process', next: ['man4'] },
        { id: 'man4', text: bilingual('组件封装', 'Module Packaging'), type: 'process', next: ['pack'] },
        { id: 'pack', text: bilingual('包装运输', 'Packaging & Transport'), type: 'process', next: ['use'] },
        { id: 'use', text: bilingual('使用阶段', 'Use Phase'), type: 'process', next: ['eol'] },
        { id: 'eol', text: bilingual('回收处理', 'End-of-Life'), type: 'output', next: [] }
      ]
    },
    carbonFootprintResult: {
      title: bilingual("碳足迹预测结果", "Carbon Footprint Prediction Result"),
      icon: BarChart2,
      totalValue: 42.8,
      unit: "kg CO₂e/Unit",
      breakdown: [
        { name: bilingual("原材料获取", "Raw Material Acquisition"), value: 22.6, percentage: 52.8 },
        { name: bilingual("制造加工", "Manufacturing"), value: 12.4, percentage: 29.0 },
        { name: bilingual("包装运输", "Packaging & Transport"), value: 5.2, percentage: 12.1 },
        { name: bilingual("其他过程", "Other Processes"), value: 2.6, percentage: 6.1 }
      ],
      uncertaintyRange: "±15%",
      confidenceLevel: bilingual("高", "High")
    }
  },
  explanatoryInfo: {
    references: {
      title: bilingual("参考来源", "Reference Sources"),
      icon: Library,
      sources: [
        { id: "ref1", name: bilingual("中国光伏行业协会碳足迹数据库 (2023)", "China Photovoltaic Industry Association Carbon Footprint Database (2023)"), type: bilingual("行业数据", "Industry Data"), url: "#" },
        { id: "ref2", name: bilingual("光伏产品生命周期评价指南 GB/T 34664-2021", "Photovoltaic Product Life Cycle Assessment Guide GB/T 34664-2021"), type: bilingual("标准文献", "Standard Literature"), url: "#" },
        { id: "ref3", name: bilingual("类似产品实测碳足迹案例集 (n=24)", "Similar Product Measured Carbon Footprint Case Collection (n=24)"), type: bilingual("案例研究", "Case Study"), url: "#" },
        { id: "ref4", name: bilingual("国际能源署太阳能光伏系统项目组报告", "International Energy Agency Solar PV Systems Task Force Report"), type: bilingual("国际报告", "International Report"), url: "#" },
        { id: "ref5", name: bilingual("材料碳排放因子数据库 CLCD-China-ECER", "Material Carbon Emission Factor Database CLCD-China-ECER"), type: bilingual("排放因子", "Emission Factors"), url: "#" },
        { id: "ref6", name: bilingual("张明等, 《光伏产品生命周期碳足迹评价研究》, 可再生能源学报, 2022", "Zhang Ming et al., 'Research on Carbon Footprint Evaluation of Photovoltaic Products Life Cycle', Journal of Renewable Energy, 2022"), type: bilingual("学术文献", "Academic Literature"), url: "#" },
        { id: "ref7", name: bilingual("中国光伏行业协会, 《2023年光伏产品市场分析报告》, 2023", "China Photovoltaic Industry Association, 'Market Analysis Report of Photovoltaic Products 2023', 2023"), type: bilingual("行业报告", "Industry Report"), url: "#" },
        { id: "ref8", name: bilingual("刘强, 《光伏组件结构设计与优化》, 太阳能技术, 2021", "Liu Qiang, 'Structural Design and Optimization of Photovoltaic Modules', Solar Energy Technology, 2021"), type: bilingual("学术文献", "Academic Literature"), url: "#" },
        { id: "ref9", name: bilingual("国际太阳能技术委员会, 《光伏组件材料耐久性研究报告》, 2023", "International Solar Technology Committee, 'Research Report on Durability of Photovoltaic Module Materials', 2023"), type: bilingual("国际报告", "International Report"), url: "#" },
        { id: "ref10", name: bilingual("王刚等, 《光伏制造业能源消耗分析与节能潜力》, 能源研究与利用, 2022", "Wang Gang et al., 'Energy Consumption Analysis and Energy Saving Potential in Photovoltaic Manufacturing Industry', Energy Research and Utilization, 2022"), type: bilingual("学术文献", "Academic Literature"), url: "#" },
        { id: "ref11", name: bilingual("Global PV Tech, 《Advanced Cell Technologies Efficiency Report》, 2023", "Global PV Tech, 'Advanced Cell Technologies Efficiency Report', 2023"), type: bilingual("技术报告", "Technical Report"), url: "#" }
      ]
    },
    technicalBasis: {
      title: bilingual("技术依据", "Technical Basis"),
      icon: Info,
      methods: [
        { 
          name: bilingual("混合LCA方法", "Hybrid LCA Method"), 
          description: bilingual("结合过程分析法和投入产出法的优势，对关键过程使用详细流程数据，对次要过程使用投入产出数据", "Combines the advantages of process analysis and input-output methods, using detailed process data for key processes and input-output data for secondary processes") 
        },
        { 
          name: bilingual("机器学习数据填补", "Machine Learning Data Filling"), 
          description: bilingual("使用梯度提升树模型对缺失数据进行智能填补，基于同类产品的已知参数", "Uses gradient boosting tree models to intelligently fill missing data, based on known parameters of similar products") 
        },
        { 
          name: bilingual("蒙特卡洛不确定性分析", "Monte Carlo Uncertainty Analysis"), 
          description: bilingual("通过10,000次模拟评估结果的稳健性和不确定度", "Evaluates the robustness and uncertainty of results through 10,000 simulations") 
        },
        { 
          name: bilingual("敏感性分析", "Sensitivity Analysis"), 
          description: bilingual("识别影响结果的关键参数，确定改进的优先领域", "Identifies key parameters affecting results and determines priority areas for improvement") 
        }
      ]
    }
  },
  comparativeAnalysis: {
    industryBenchmark: {
      title: bilingual("行业基准对比", "Industry Benchmark Comparison"),
      description: bilingual("与光伏产品行业基准相比，本产品碳足迹表现优异", "Compared to the photovoltaic product industry benchmark, this product's carbon footprint performance is excellent"),
      data: [
        { category: bilingual("行业基准线", "Industry Benchmark"), value: 65.2, unit: "kg CO₂e/件", difference: 22.4, error: 6.5 }
      ]
    },
    competitorsComparison: {
      title: bilingual("竞品对比分析", "Competitor Comparison Analysis"),
      description: bilingual("与市场上主要竞争产品的碳足迹对比", "Carbon footprint comparison with major competing products in the market"),
      competitorData: [
        { name: bilingual("本产品", "This Product"), value: 42.8, unit: "kg CO₂e/Unit", highlight: true, error: 6.4 },
        { name: bilingual("竞品A - NS-310", "Competitor A - NS-310"), value: 47.5, unit: "kg CO₂e/Unit", difference: "+11.0%", error: 7.1 },
        { name: bilingual("竞品B - HE-305", "Competitor B - HE-305"), value: 51.2, unit: "kg CO₂e/Unit", difference: "+19.6%", error: 7.7 },
        { name: bilingual("竞品C - BF-290", "Competitor C - BF-290"), value: 49.8, unit: "kg CO₂e/Unit", difference: "+16.4%", error: 7.5 },
        { name: bilingual("竞品D - SP-320", "Competitor D - SP-320"), value: 39.5, unit: "kg CO₂e/Unit", difference: "-7.7%", error: 5.9 }
      ],
      keyDifferentiators: [
        bilingual("采用先进PERC技术，提高能源转换效率", "Adopts advanced PERC technology to improve energy conversion efficiency").zh,
        bilingual("优化铝合金框架设计，减少材料使用", "Optimizes aluminum alloy frame design to reduce material usage").zh,
        bilingual("制造过程采用部分可再生能源电力", "Uses partially renewable energy electricity in the manufacturing process").zh,
        bilingual("供应链本地化程度高，减少运输碳排放", "High degree of supply chain localization to reduce transportation carbon emissions").zh
      ]
    },
    chartData: [
      { name: bilingual("本产品", "This Product"), value: 42.8, error: 6.4, highlight: true, fill: "#ea384c", itemType: 'current' },
      { name: bilingual("竞品A", "Competitor A"), value: 47.5, error: 7.1, itemType: 'competitor' },
      { name: bilingual("竞品B", "Competitor B"), value: 43.2, error: 7.7, itemType: 'competitor' },
      { name: bilingual("竞品C", "Competitor C"), value: 37.8, error: 7.5, itemType: 'competitor' },
      { name: bilingual("竞品D", "Competitor D"), value: 29.5, error: 5.9, itemType: 'competitor' },
      { name: bilingual("行业基准", "Industry Benchmark"), value: 45.2, error: 6.5, itemType: 'industry' }
    ]
  }
};
