
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

const PredictionResultContainer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  // In a real app, you would fetch data based on the ID
  // For now, we'll use mock data
  const resultData = mockResultData;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: t('link_copied'),
      description: t('link_copied_desc'),
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
            {t('return_button')}
          </button>
          
          <PredictionResultHeader 
            resultData={resultData} 
            onCopyLink={handleCopyLink} 
          />
        </div>
        
        {/* Main data request call-to-action */}
        <PredictionResultDataCta 
          supplierName={resultData.supplierName} 
          productName={resultData.productName} 
        />

        {/* Overview section with carbon footprint and components */}
        <PredictionResultOverview resultData={resultData} />
        
        {/* Phase analysis */}
        <PredictionResultPhaseAnalysis phases={resultData.phases} />
        
        {/* Product information section */}
        <ProductInfoSection 
          inferenceData={resultData.inferenceData}
          references={resultData.explanatoryInfo.references.sources}
          referencesTitle={resultData.explanatoryInfo.references.title}
        />
        
        {/* Technical information section */}
        <PredictionResultTechnicalInfo 
          lcaModel={resultData.inferenceData.lcaModel}
          carbonFootprintResult={resultData.inferenceData.carbonFootprintResult}
          technicalBasis={resultData.explanatoryInfo.technicalBasis}
        />
        
        {/* Mid-page data request call-to-action */}
        <PredictionResultDataCta 
          supplierName={resultData.supplierName} 
          productName={resultData.productName} 
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
          <RequestDataButton supplierName={resultData.supplierName} productName={resultData.productName} />
        </div>
      </div>
    </Layout>
  );
};

export default PredictionResultContainer;
