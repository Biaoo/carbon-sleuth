
import React from 'react';
import { 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SimilarProduct } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface SimilarProductCardProps {
  product: SimilarProduct;
}

const SimilarProductCard = ({ product }: SimilarProductCardProps) => {
  const { language, t } = useLanguage();
  const isLower = product.differencePercentage < 0;
  
  // Extract the correct language string
  const getLocalizedText = (textObj: { zh: string; en: string }) => {
    return language === 'zh' ? textObj.zh : textObj.en;
  };
  
  return (
    <div className="border border-border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 p-4">
          <h3 className="font-medium text-lg mb-1">
            {getLocalizedText(product.name as any)}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {getLocalizedText(product.supplier as any)}
          </p>
          
          <div className="flex items-center">
            <span className="text-xl font-bold">
              {product.carbonValue}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              {product.unit}
            </span>
            
            <div 
              className={cn(
                "flex items-center ml-3 px-2 py-0.5 rounded text-sm",
                isLower ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              )}
            >
              {isLower ? (
                <>
                  <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                  {Math.abs(product.differencePercentage)}%
                </>
              ) : (
                <>
                  <ArrowUpRight className="h-3.5 w-3.5 mr-1" />
                  {product.differencePercentage}%
                </>
              )}
            </div>
          </div>
          
          <p className="text-sm mt-1">
            {isLower 
              ? <span className="text-green-600">{t('compared_to_current')}</span>
              : <span className="text-amber-600">{t('higher_than_current')}</span>
            }
          </p>
        </div>
        
        <div className="flex items-center justify-center p-4 bg-secondary/30 sm:w-20">
          <button 
            className="text-primary hover:text-primary/80 transition-colors"
            title={t('click_for_details')}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimilarProductCard;
