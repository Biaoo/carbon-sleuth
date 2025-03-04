
import React from 'react';
import { 
  Card
} from '@/components/ui/card';
import LcaModelCard from './LcaModelCard';
import CarbonFootprintResultCard from './CarbonFootprintResultCard';
import TechnicalBasisCard from './TechnicalBasisCard';

interface PredictionResultTechnicalInfoProps {
  lcaModel: {
    title: string;
    description: string;
    parameters: Array<{name: string; value: string}>;
    flowchart: Array<{id: string; text: string; type: string; next: string[]}>;
  };
  carbonFootprintResult: {
    title: string;
    totalValue: number;
    unit: string;
    uncertaintyRange: string;
    breakdown: Array<{name: string; value: number; percentage: number}>;
  };
  technicalBasis: {
    title: string;
    methods: Array<{name: string; description: string}>;
  };
}

const PredictionResultTechnicalInfo: React.FC<PredictionResultTechnicalInfoProps> = ({
  lcaModel,
  carbonFootprintResult,
  technicalBasis
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <LcaModelCard 
          title={lcaModel.title}
          description={lcaModel.description}
          parameters={lcaModel.parameters}
          flowchart={lcaModel.flowchart}
        />
        
        <CarbonFootprintResultCard 
          title={carbonFootprintResult.title}
          totalValue={carbonFootprintResult.totalValue}
          unit={carbonFootprintResult.unit}
          uncertaintyRange={carbonFootprintResult.uncertaintyRange}
          breakdown={carbonFootprintResult.breakdown}
        />
      </div>
      
      <TechnicalBasisCard 
        title={technicalBasis.title}
        methods={technicalBasis.methods}
      />
    </div>
  );
};

export default PredictionResultTechnicalInfo;
