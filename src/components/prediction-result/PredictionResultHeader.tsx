
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertCircle, Copy, Share2, Download } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultHeaderProps {
  resultData: {
    productName: string;
    supplierName: string;
    date: string;
    id: string;
  };
  onCopyLink: () => void;
}

const PredictionResultHeader: React.FC<PredictionResultHeaderProps> = ({
  resultData,
  onCopyLink
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center">
      <div>
        <div className="flex items-center mb-2">
          <h1 className="text-3xl font-bold">{resultData.productName}</h1>
          <Badge className="ml-3 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            {t('prediction_result_badge')}
          </Badge>
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-2 inline-flex items-center justify-center text-amber-600 hover:text-amber-700">
                <AlertCircle className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 text-sm">
              <p>{t('prediction_disclaimer')}</p>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-muted-foreground">{resultData.supplierName}</p>
        <p className="text-sm text-muted-foreground mt-1">{t('prediction_date')}：{resultData.date} · ID: {resultData.id}</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
        <Button variant="outline" className="flex items-center" onClick={onCopyLink}>
          <Copy className="h-4 w-4 mr-2" />
          {t('copy_link')}
        </Button>
        <Button variant="outline" className="flex items-center">
          <Share2 className="h-4 w-4 mr-2" />
          {t('share')}
        </Button>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          {t('export_report')}
        </Button>
      </div>
    </div>
  );
};

export default PredictionResultHeader;
