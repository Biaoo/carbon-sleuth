
export interface PredictionResultData {
  id: string;
  productName: string | BilingualText;
  supplierName: string | BilingualText;
  date: string;
  carbonValue: number;
  unit: string;
  confidenceLevel: string | BilingualText;
  industryAvg: number;
  reductionPotential: number;
  dataQuality: number;
  components: ProductComponent[];
  phases: LifecyclePhase[];
  improvementSuggestions: ImprovementSuggestion[];
  similarProducts: SimilarProduct[];
  inferenceData: InferenceData;
  explanatoryInfo: ExplanatoryInfo;
  comparativeAnalysis: ComparativeAnalysis;
}

export interface InferenceData {
  productBasicInfo: ProductInfo;
  productComposition: ProductInfo;
  productionTechnology: ProductInfo;
  competitorsInfo: CompetitorsInfo;
  lcaModel: LcaModel;
  carbonFootprintResult: CarbonFootprintResult;
}

export interface ProductInfo {
  title: string | BilingualText;
  icon: any; // Changed from unknown to any to allow for Lucide icons
  markdownContent: string | BilingualText;
  citations?: Citation[];
}

export interface CompetitorsInfo {
  title: string | BilingualText;
  icon: any; // Changed from unknown to any
  data: CompetitorData[];
}

export interface CompetitorData {
  name: string | BilingualText;
  product: string | BilingualText;
}

export interface LcaModel {
  title: string | BilingualText;
  icon: unknown;
  modelName: string | BilingualText;
  description: string | BilingualText;
  parameters: LcaParameter[];
  flowchart: FlowchartNode[];
}

export interface LcaParameter {
  name: string | BilingualText;
  value: string | BilingualText;
}

export interface FlowchartNode {
  id: string;
  text: string | BilingualText;
  type: string;
  next: string[];
}

export interface CarbonFootprintResult {
  title: string | BilingualText;
  icon: unknown;
  totalValue: number;
  unit: string;
  breakdown: BreakdownItem[];
  uncertaintyRange: string;
  confidenceLevel: string | BilingualText;
}

export interface BreakdownItem {
  name: string | BilingualText;
  value: number;
  percentage: number;
}

export interface ExplanatoryInfo {
  references: References;
  technicalBasis: TechnicalBasis;
}

export interface References {
  title: string | BilingualText;
  icon: unknown;
  sources: ReferenceSource[];
}

export interface ReferenceSource {
  id: string;
  name: string | BilingualText;
  type: string | BilingualText;
  url: string;
}

export interface TechnicalBasis {
  title: string | BilingualText;
  icon: unknown;
  methods: TechnicalMethod[];
}

export interface TechnicalMethod {
  name: string | BilingualText;
  description: string | BilingualText;
}

export interface ComparativeAnalysis {
  industryBenchmark: IndustryBenchmark;
  competitorsComparison: CompetitorsComparison;
  chartData: ChartData[];
}

export interface IndustryBenchmark {
  title: string | BilingualText;
  description: string | BilingualText;
  data: IndustryBenchmarkData[];
}

export interface IndustryBenchmarkData {
  category: string | BilingualText;
  value: number;
  unit: string;
  difference: number;
  error: number;
}

export interface CompetitorsComparison {
  title: string | BilingualText;
  description: string | BilingualText;
  competitorData: CompetitorDataPoint[];
  keyDifferentiators: string[];
}

export interface CompetitorDataPoint {
  name: string | BilingualText;
  value: number;
  unit: string;
  highlight?: boolean;
  difference?: string;
  error: number;
}

export interface ChartData {
  name: string | BilingualText;
  value: number;
  error: number;
  highlight?: boolean;
  fill?: string;
  itemType: 'current' | 'competitor' | 'industry' | 'other';
}

export interface Reference {
  id: string;
  text?: string | BilingualText;
  name?: string | BilingualText;
  type?: string | BilingualText;
  url?: string;
}

export interface Citation {
  id: number;
  text: string | BilingualText;
}

export interface BilingualText {
  zh: string;
  en: string;
}

export interface SimilarProduct {
  id: string;
  name: string | BilingualText;
  supplier: string | BilingualText;
  carbonValue: number;
  unit: string;
  differencePercentage: number;
}

export interface ImprovementSuggestion {
  title: string | BilingualText;
  description: string | BilingualText;
  reduction: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeline: string | BilingualText;
}

export interface ProductComponent {
  name: string | BilingualText;
  value: number;
  percentage: number;
  unit: string;
}

export interface LifecyclePhase {
  name: string | BilingualText;
  value: number;
  percentage: number;
  unit: string;
}

export interface Competitor {
  name: string | BilingualText;
  product: string | BilingualText;
}

export interface ChartDataItem {
  name: string | BilingualText;
  value: number;
  error?: number;
  fill?: string;
  highlight?: boolean;
  id?: string;
  itemType?: 'current' | 'competitor' | 'industry' | 'other';
}

export interface DataRequestPreviewData {
  supplier: string;
  product: string;
  dataItems: string[];
  competitorsData: {
    name: string;
    carbonValue: number;
    unit: string;
    difference: string;
  }[];
  industryBenchmarks: {
    name: string;
    value: number;
    unit: string;
  }[];
  reportLinks: {
    name: string;
    url: string;
    type: "prediction" | "ilcd" | "other";
  }[];
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  deadline: string;
  subject: string;
  content: string;
  dataSubmissionLink: string;
  currentProductPrediction: {
    carbonValue: number;
    unit: string;
    confidenceLevel: string;
    uncertaintyRange: string;
    mainContributors: string[];
  };
}
