import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Search, History } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText } from '../prediction-result/types';

// History item type
export interface HistoryItem {
  id: number;
  productName: string | BilingualText;
  supplierName: string | BilingualText;
  date: string;
  status: string;
  result: number;
  unit: string;
}

interface HistoryListProps {
  historyItems: HistoryItem[];
}

const HistoryList = ({ historyItems }: HistoryListProps) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  return (
    <div className="bg-white rounded-xl border border-border shadow-subtle">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <History className="h-5 w-5 mr-2 text-primary" />
          {t('prediction_history')}
        </h2>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-primary">
            {t('view_all')}
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="divide-y divide-border">
        {historyItems.map((item) => (
          <div key={item.id} className="p-6 hover:bg-secondary/30 transition-colors">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="font-semibold mb-1">
                  {typeof item.productName === 'string' ? item.productName : language === 'zh' ? item.productName.zh : item.productName.en}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {typeof item.supplierName === 'string' ? item.supplierName : language === 'zh' ? item.supplierName.zh : item.supplierName.en}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{item.date}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-foreground">
                  {item.result}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    {item.unit}
                  </span>
                </div>
                <Button
                  size="sm"
                  className="mt-2"
                  onClick={() => navigate(`/prediction-result/${item.id}`)}
                >
                  <Search className="h-3 w-3 mr-1" />
                  {t('view_report')}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
