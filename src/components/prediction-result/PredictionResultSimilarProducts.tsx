
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import SimilarProductCard from './SimilarProductCard';
import { SimilarProduct } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultSimilarProductsProps {
  similarProducts: SimilarProduct[];
}

const PredictionResultSimilarProducts: React.FC<PredictionResultSimilarProductsProps> = ({
  similarProducts
}) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{t('similar_products_comparison')}</CardTitle>
        <CardDescription>{t('similar_products_comparison_desc')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {similarProducts.map((product, index) => (
            <SimilarProductCard key={index} product={product} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResultSimilarProducts;
