
import React from 'react';
import { 
  CardTitle 
} from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import ProductInfoCard from './ProductInfoCard';
import UnifiedReferenceSidebar from './UnifiedReferenceSidebar';
import CompetitorsList from './CompetitorsList';
import { InferenceData, ReferenceSource, BilingualText } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductInfoSectionProps {
  inferenceData: InferenceData;
  references: ReferenceSource[];
  referencesTitle?: string | BilingualText;
}

const ProductInfoSection: React.FC<ProductInfoSectionProps> = ({
  inferenceData,
  references,
  referencesTitle
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="mb-8">
      <CardTitle className="text-2xl mb-6 flex items-center">
        <BookOpen className="h-6 w-6 mr-2 text-muted-foreground" />
        {t('product_info')}
      </CardTitle>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main product information cards */}
        <div className="lg:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Product Basic Info */}
            <ProductInfoCard 
              title={inferenceData.productBasicInfo.title}
              icon={inferenceData.productBasicInfo.icon}
              markdownContent={inferenceData.productBasicInfo.markdownContent}
            />
            
            {/* Product Composition Info */}
            <ProductInfoCard 
              title={inferenceData.productComposition.title}
              icon={inferenceData.productComposition.icon}
              markdownContent={inferenceData.productComposition.markdownContent}
            />
            
            {/* Production Technology Info */}
            <ProductInfoCard 
              title={inferenceData.productionTechnology.title}
              icon={inferenceData.productionTechnology.icon}
              markdownContent={inferenceData.productionTechnology.markdownContent}
            />
            
            {/* Competitors Info */}
            <CompetitorsList 
              title={inferenceData.competitorsInfo.title}
              icon={inferenceData.competitorsInfo.icon}
              competitors={inferenceData.competitorsInfo.data}
            />
          </div>
        </div>
        
        {/* Reference sidebar */}
        <div className="lg:col-span-3">
          <UnifiedReferenceSidebar 
            references={references}
            title={referencesTitle || t('reference_sources')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductInfoSection;
