
import { LucideIcon } from 'lucide-react';

// Base types

export interface Reference {
  id: string | number;
  name?: string;
  text?: string;
  type?: string;
  url?: string;
}

export interface ChartDataItem {
  name: string;
  value: number;
  error?: number;
  fill?: string;
  highlight?: boolean;
}

export interface PhaseData {
  name: string;
  value: number;
  percentage: number;
  unit?: string;
}

export interface Component {
  name: string;
  value: number;
  percentage: number;
  unit: string;
}

export interface ImprovementSuggestion {
  title: string;
  description: string;
  reduction: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timeline: string;
}

export interface SimilarProduct {
  id: string;
  name: string;
  supplier: string;
  carbonValue: number;
  unit: string;
  differencePercentage: number;
}

export interface Method {
  name: string;
  description: string;
}

export interface LcaParameter {
  name: string;
  value: string;
}

export interface FlowchartNode {
  id: string;
  text: string;
  type: string;
  next: string[];
}

export interface Competitor {
  name: string;
  product: string;
}

export interface BreakdownItem {
  name: string;
  value: number;
  percentage: number;
}

// Inference data types
export interface ProductBasicInfo {
  title: string;
  icon: LucideIcon;
  markdownContent: string;
  citations: Reference[];
}

export interface ProductComposition {
  title: string;
  icon: LucideIcon;
  markdownContent: string;
  citations: Reference[];
}

export interface ProductionTechnology {
  title: string;
  icon: LucideIcon;
  markdownContent: string;
  citations: Reference[];
}

export interface CompetitorsInfo {
  title: string;
  icon: LucideIcon;
  data: Competitor[];
}

export interface LcaModel {
  title: string;
  icon: LucideIcon;
  modelName: string;
  description: string;
  parameters: LcaParameter[];
  flowchart: FlowchartNode[];
}

export interface CarbonFootprintResult {
  title: string;
  icon: LucideIcon;
  totalValue: number;
  unit: string;
  breakdown: BreakdownItem[];
  uncertaintyRange: string;
  confidenceLevel: string;
}

export interface InferenceData {
  productBasicInfo: ProductBasicInfo;
  productComposition: ProductComposition;
  productionTechnology: ProductionTechnology;
  competitorsInfo: CompetitorsInfo;
  lcaModel: LcaModel;
  carbonFootprintResult: CarbonFootprintResult;
}

export interface ExplanatoryInfo {
  references: {
    title: string;
    icon: LucideIcon;
    sources: Reference[];
  };
  technicalBasis: {
    title: string;
    icon: LucideIcon;
    methods: Method[];
  };
}

export interface ComparativeAnalysis {
  industryBenchmark: {
    title: string;
    description: string;
    data: Array<{
      category: string;
      value: number;
      unit: string;
      difference: number;
      error: number;
    }>;
  };
  competitorsComparison: {
    title: string;
    description: string;
    competitorData: Array<ChartDataItem & {
      unit: string;
      difference?: string;
    }>;
    keyDifferentiators: string[];
  };
  chartData: ChartDataItem[];
}

export interface PredictionResultData {
  id: string;
  productName: string;
  supplierName: string;
  date: string;
  carbonValue: number;
  unit: string;
  confidenceLevel: string;
  industryAvg: number;
  reductionPotential: number;
  dataQuality: number;
  components: Component[];
  phases: PhaseData[];
  improvementSuggestions: ImprovementSuggestion[];
  similarProducts: SimilarProduct[];
  inferenceData: InferenceData;
  explanatoryInfo: ExplanatoryInfo;
  comparativeAnalysis: ComparativeAnalysis;
}
