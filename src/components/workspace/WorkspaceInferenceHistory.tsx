
import React from 'react';
import { Button } from '@/components/ui/button';
import { HistoryItem } from '@/components/inference/HistoryList';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface WorkspaceInferenceHistoryProps {
  historyItems: HistoryItem[];
}

const WorkspaceInferenceHistory: React.FC<WorkspaceInferenceHistoryProps> = ({ historyItems }) => {
  const navigate = useNavigate();

  // Function to handle viewing details
  const handleViewDetails = (id: number) => {
    navigate('/prediction-result');
  };

  // Function to return to home
  const handleReturnHome = () => {
    navigate('/');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">预测历史记录</h2>
        <Button variant="outline" size="sm" onClick={handleReturnHome} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          返回主页
        </Button>
      </div>
      <div className="bg-card rounded-lg shadow-sm border border-border">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-medium">历史预测列表</h3>
        </div>
        <div className="divide-y divide-border">
          {historyItems.map(item => (
            <div key={item.id} className="p-4 hover:bg-muted/20 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{item.productName}</h4>
                  <p className="text-sm text-muted-foreground">{item.supplierName}</p>
                  <div className="flex items-center mt-2 text-sm">
                    <span className="text-muted-foreground">预测日期: {item.date}</span>
                    <span className="mx-2">•</span>
                    <span className="font-medium text-green-600">{item.result} {item.unit}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => handleViewDetails(item.id)}
                >
                  查看详情
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInferenceHistory;
