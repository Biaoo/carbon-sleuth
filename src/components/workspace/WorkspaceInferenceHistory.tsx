
import React from 'react';
import { Button } from '@/components/ui/button';
import { HistoryItem } from '@/components/inference/HistoryList';

interface WorkspaceInferenceHistoryProps {
  historyItems: HistoryItem[];
}

const WorkspaceInferenceHistory: React.FC<WorkspaceInferenceHistoryProps> = ({ historyItems }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">预测历史记录</h2>
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
                <Button size="sm" variant="outline">查看详情</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceInferenceHistory;
