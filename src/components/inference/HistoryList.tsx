
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Search, History } from 'lucide-react';

// History item type
export interface HistoryItem {
  id: number;
  productName: string;
  supplierName: string;
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
  
  return (
    <div className="bg-white rounded-xl border border-border shadow-subtle">
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <History className="h-5 w-5 mr-2 text-primary" />
          历史预测记录
        </h2>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" className="text-primary">
            查看全部
          </Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="divide-y divide-border">
        {historyItems.map((item) => (
          <div key={item.id} className="p-6 hover:bg-secondary/30 transition-colors">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <h3 className="font-semibold mb-1">{item.productName}</h3>
                <p className="text-sm text-muted-foreground mb-2">{item.supplierName}</p>
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
                  查看报告
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
