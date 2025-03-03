
import React from 'react';
import { Button } from '@/components/ui/button';

const WorkspaceDataCollections: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">数据集合</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg shadow-sm border border-border p-4">
          <h3 className="font-medium mb-3">产品碳足迹数据</h3>
          <p className="text-sm text-muted-foreground mb-4">包含50个不同产品的碳足迹数据</p>
          <div className="flex justify-between items-center">
            <span className="text-sm">最后更新: 2023-07-20</span>
            <Button size="sm" variant="outline">查看</Button>
          </div>
        </div>
        <div className="bg-card rounded-lg shadow-sm border border-border p-4">
          <h3 className="font-medium mb-3">生产工艺数据</h3>
          <p className="text-sm text-muted-foreground mb-4">包含30种不同生产工艺的能耗数据</p>
          <div className="flex justify-between items-center">
            <span className="text-sm">最后更新: 2023-07-15</span>
            <Button size="sm" variant="outline">查看</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDataCollections;
