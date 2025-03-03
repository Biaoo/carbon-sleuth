
export const mockCompetitorsData = [
  { name: "竞品A - NS-310", carbonValue: 47.5, unit: "kg CO₂e/件", difference: "+11.0%" },
  { name: "竞品B - HE-305", carbonValue: 51.2, unit: "kg CO₂e/件", difference: "+19.6%" },
  { name: "竞品C - BF-290", carbonValue: 49.8, unit: "kg CO₂e/件", difference: "+16.4%" },
  { name: "竞品D - SP-320", carbonValue: 39.5, unit: "kg CO₂e/件", difference: "-7.7%" }
];

export const mockIndustryBenchmarks = [
  { name: "行业领先水平", value: 35.0, unit: "kg CO₂e/件" },
  { name: "行业平均水平", value: 65.2, unit: "kg CO₂e/件" },
  { name: "行业基准线", value: 80.0, unit: "kg CO₂e/件" }
];

export const mockReportLinks = [
  { name: "太阳能电池板碳足迹预测报告", url: "/prediction-result/pred-123456", type: "prediction" as const },
  { name: "太阳能电池板ILCD格式数据包", url: "#", type: "ilcd" as const },
  { name: "产品生命周期分析技术文档", url: "#", type: "other" as const }
];

// Data items that can be requested
export const dataItems = [
  { id: "product_specs", label: "产品规格参数" },
  { id: "material_composition", label: "材料组成情况" },
  { id: "manufacturing_process", label: "制造工艺流程" },
  { id: "energy_consumption", label: "能源消耗数据" },
  { id: "transportation_logistics", label: "运输物流信息" },
  { id: "certifications", label: "相关认证文件" },
  { id: "test_reports", label: "检测报告数据" },
  { id: "packaging_details", label: "包装材料详情" },
  { id: "suppliers_info", label: "上游供应商信息" },
  { id: "waste_data", label: "废弃物处理数据" },
];
