
// Helper function to create bilingual text objects
const bilingual = (zh: string, en: string) => ({ zh, en });

export const mockCompetitorsData = [
  { name: bilingual("竞品A - NS-310", "Competitor A - NS-310").zh, carbonValue: 47.5, unit: "kg CO₂e/Unit", difference: "+11.0%" },
  { name: bilingual("竞品B - HE-305", "Competitor B - HE-305").zh, carbonValue: 51.2, unit: "kg CO₂e/Unit", difference: "+19.6%" },
  { name: bilingual("竞品C - BF-290", "Competitor C - BF-290").zh, carbonValue: 49.8, unit: "kg CO₂e/Unit", difference: "+16.4%" },
  { name: bilingual("竞品D - SP-320", "Competitor D - SP-320").zh, carbonValue: 39.5, unit: "kg CO₂e/Unit", difference: "-7.7%" }
];

export const mockIndustryBenchmarks = [
  { name: bilingual("行业领先水平", "Industry Leading Level").zh, value: 35.0, unit: "kg CO₂e/Unit" },
  { name: bilingual("行业平均水平", "Industry Average Level").zh, value: 65.2, unit: "kg CO₂e/Unit" },
  { name: bilingual("行业基准线", "Industry Baseline").zh, value: 80.0, unit: "kg CO₂e/Unit" }
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
