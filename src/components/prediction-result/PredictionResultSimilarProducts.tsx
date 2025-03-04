
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

interface PredictionResultSimilarProductsProps {
  similarProducts: SimilarProduct[];
}

const PredictionResultSimilarProducts: React.FC<PredictionResultSimilarProductsProps> = ({
  similarProducts
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">相似产品对比</CardTitle>
        <CardDescription>与市场上同类产品的碳足迹对比</CardDescription>
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
