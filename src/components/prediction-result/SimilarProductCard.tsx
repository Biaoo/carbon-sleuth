
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SimilarProduct {
  id: string;
  name: string;
  supplier: string;
  carbonValue: number;
  unit: string;
  differencePercentage: number;
}

interface SimilarProductCardProps {
  product: SimilarProduct;
}

export const SimilarProductCard: React.FC<SimilarProductCardProps> = ({ product }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between">
        <div>
          <div className="font-medium">{product.name}</div>
          <div className="text-sm text-muted-foreground">{product.supplier}</div>
        </div>
        <div className="flex items-center">
          <span className="text-xl font-bold">{product.carbonValue}</span>
          <span className="ml-1 text-muted-foreground">{product.unit}</span>
          <Badge 
            className={`ml-3 ${
              product.differencePercentage < 0 
                ? 'bg-green-100 text-green-800 hover:bg-green-200 border-green-200' 
                : 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200'
            }`}
          >
            {product.differencePercentage > 0 ? '+' : ''}{product.differencePercentage}%
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
