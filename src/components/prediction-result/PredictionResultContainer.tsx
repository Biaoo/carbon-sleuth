
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

// Import components
import PredictionResultHeader from './PredictionResultHeader';
import PredictionResultDataCta from './PredictionResultDataCta';
import PredictionResultOverview from './PredictionResultOverview';
import PredictionResultPhaseAnalysis from './PredictionResultPhaseAnalysis';
import PredictionResultTechnicalInfo from './PredictionResultTechnicalInfo';
import PredictionResultOptimizations from './PredictionResultOptimizations';
import PredictionResultSimilarProducts from './PredictionResultSimilarProducts';
import ProductInfoSection from './ProductInfoSection';
import RequestDataButton from './RequestDataButton';
import { ArrowLeft } from 'lucide-react';

// Import mock data (this should be replaced with API call in production)
import { mockResultData } from './mockData';
import { BilingualText } from './types';

const PredictionResultContainer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // In a real app, you would fetch data based on the ID
  // For now, we'll use mock data
  const resultData = mockResultData;
  
  // Helper function to get localized text
  const getLocalizedText = (text: string | BilingualText): string => {
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: t('link_copied'),
      description: t('link_copied_desc'),
    });
  };
  
  // Convert to the format expected by the header component
  const headerData = {
    productName: getLocalizedText(resultData.productName),
    supplierName: getLocalizedText(resultData.supplierName),
    date: resultData.date,
    id: resultData.id
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
            {t('return_button')}
          </button>
          
          <PredictionResultHeader 
            resultData={headerData} 
            onCopyLink={handleCopyLink} 
          />
        </div>
        
        {/* Main data request call-to-action */}
        <PredictionResultDataCta 
          supplierName={getLocalizedText(resultData.supplierName)} 
          productName={getLocalizedText(resultData.productName)} 
        />

        {/* Overview section with carbon footprint and components */}
        <PredictionResultOverview resultData={resultData} />
        
        {/* Phase analysis */}
        <PredictionResultPhaseAnalysis phases={resultData.phases} />
        
        {/* Product information section */}
        <ProductInfoSection 
          inferenceData={resultData.inferenceData}
          references={resultData.explanatoryInfo.references.sources}
          referencesTitle={getLocalizedText(resultData.explanatoryInfo.references.title)}
        />
        
        {/* Technical information section */}
        <PredictionResultTechnicalInfo 
          lcaModel={{
            title: getLocalizedText(resultData.inferenceData.lcaModel.title),
            description: getLocalizedText(resultData.inferenceData.lcaModel.description),
            parameters: resultData.inferenceData.lcaModel.parameters.map(p => ({
              name: getLocalizedText(p.name),
              value: getLocalizedText(p.value)
            })),
            flowchart: resultData.inferenceData.lcaModel.flowchart.map(f => ({
              id: f.id,
              text: getLocalizedText(f.text),
              type: f.type,
              next: f.next
            }))
          }}
          carbonFootprintResult={{
            title: getLocalizedText(resultData.inferenceData.carbonFootprintResult.title),
            totalValue: resultData.inferenceData.carbonFootprintResult.totalValue,
            unit: resultData.inferenceData.carbonFootprintResult.unit,
            uncertaintyRange: resultData.inferenceData.carbonFootprintResult.uncertaintyRange,
            breakdown: resultData.inferenceData.carbonFootprintResult.breakdown.map(b => ({
              name: getLocalizedText(b.name),
              value: b.value,
              percentage: b.percentage
            }))
          }}
          technicalBasis={{
            title: getLocalizedText(resultData.explanatoryInfo.technicalBasis.title),
            methods: resultData.explanatoryInfo.technicalBasis.methods.map(m => ({
              name: getLocalizedText(m.name),
              description: getLocalizedText(m.description)
            }))
          }}
        />
        
        {/* Mid-page data request call-to-action */}
        <PredictionResultDataCta 
          supplierName={getLocalizedText(resultData.supplierName)} 
          productName={getLocalizedText(resultData.productName)} 
          variant="detailed"
        />
        
        {/* Improvement suggestions */}
        <PredictionResultOptimizations 
          improvementSuggestions={resultData.improvementSuggestions} 
        />
        
        {/* Similar products comparison */}
        <PredictionResultSimilarProducts 
          similarProducts={resultData.similarProducts} 
        />
        
        {/* Final call-to-action at the bottom */}
        <div className="flex justify-center mt-12 mb-8">
          <RequestDataButton 
            supplierName={getLocalizedText(resultData.supplierName)} 
            productName={getLocalizedText(resultData.productName)} 
          />
        </div>
      </div>
    </Layout>
  );
};

export default PredictionResultContainer;
