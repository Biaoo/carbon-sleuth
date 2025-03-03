
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart2, FileText, X } from 'lucide-react';

interface WorkspaceSidebarProps {
  activeModule: string;
  onChangeModule: (module: string) => void;
  isMobile: boolean;
  onClose?: () => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({ 
  activeModule, 
  onChangeModule, 
  isMobile, 
  onClose 
}) => {
  return (
    <div className={`h-full flex flex-col bg-secondary/5 border-r border-border ${isMobile ? 'w-full' : 'w-64'}`}>
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-medium">工作台模块</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <div className="p-3">
        <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">
          功能模块
        </h3>
        
        <nav className="space-y-1">
          <Button
            variant={activeModule === 'inference' ? 'secondary' : 'ghost'}
            className={`w-full justify-start text-sm h-11 ${
              activeModule === 'inference' ? 'bg-secondary/80' : ''
            }`}
            onClick={() => onChangeModule('inference')}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            碳足迹预测
          </Button>
          
          <Button
            variant={activeModule === 'data-request' ? 'secondary' : 'ghost'}
            className={`w-full justify-start text-sm h-11 ${
              activeModule === 'data-request' ? 'bg-secondary/80' : ''
            }`}
            onClick={() => onChangeModule('data-request')}
          >
            <FileText className="h-4 w-4 mr-2" />
            数据请求
          </Button>
        </nav>
      </div>
      
      <div className="mt-auto p-4 border-t border-border">
        <div className="bg-primary/5 rounded-lg p-3 text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-1">专业版功能</p>
          <p>使用专业版解锁更多高级功能与数据分析</p>
          <Button size="sm" className="w-full mt-2">升级专业版</Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
