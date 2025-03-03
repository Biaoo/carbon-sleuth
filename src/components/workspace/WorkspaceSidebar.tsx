
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  BarChart2, 
  FileText, 
  X, 
  ChevronLeft, 
  ChevronRight,
  PlusCircle,
  History,
  Folder,
  Clock
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [collapsed, setCollapsed] = useState(false);
  const [inferenceExpanded, setInferenceExpanded] = useState(true);
  const [dataRequestExpanded, setDataRequestExpanded] = useState(true);

  return (
    <div className={`h-full flex flex-col bg-secondary/5 border-r border-border transition-all duration-300 ${isMobile ? 'w-full' : collapsed ? 'w-16' : 'w-64'}`}>
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-medium">工作台模块</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {!isMobile && (
        <div className="flex justify-end p-2 border-b border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCollapsed(!collapsed)} 
            className="p-1.5 h-8 w-8"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      )}
      
      <div className="p-3 flex-1 overflow-y-auto">
        {!collapsed && (
          <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">
            功能模块
          </h3>
        )}
        
        <nav className="space-y-1">
          <Collapsible
            open={inferenceExpanded}
            onOpenChange={setInferenceExpanded}
            disabled={collapsed}
          >
            <div className="flex items-center">
              <Button
                variant={activeModule === 'inference' ? 'secondary' : 'ghost'}
                className={`${collapsed ? 'justify-center w-10 p-0 mx-auto' : 'w-full justify-start'} text-sm h-11 ${
                  activeModule === 'inference' ? 'bg-secondary/80' : ''
                }`}
                onClick={() => onChangeModule('inference')}
              >
                <BarChart2 className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
                {!collapsed && <span>碳足迹预测</span>}
              </Button>
              
              {!collapsed && (
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-1.5 h-8 w-8 ml-1">
                    {inferenceExpanded ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
                  </Button>
                </CollapsibleTrigger>
              )}
            </div>
            
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm h-9"
                onClick={() => onChangeModule('inference')}
              >
                <PlusCircle className="h-3.5 w-3.5 mr-2" />
                新建预测
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-sm h-9"
                onClick={() => onChangeModule('inference-history')}
              >
                <History className="h-3.5 w-3.5 mr-2" />
                历史记录
              </Button>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible
            open={dataRequestExpanded}
            onOpenChange={setDataRequestExpanded}
            disabled={collapsed}
          >
            <div className="flex items-center">
              <Button
                variant={activeModule === 'data-request' || activeModule === 'request-management' ? 'secondary' : 'ghost'}
                className={`${collapsed ? 'justify-center w-10 p-0 mx-auto' : 'w-full justify-start'} text-sm h-11 ${
                  activeModule === 'data-request' || activeModule === 'request-management' ? 'bg-secondary/80' : ''
                }`}
                onClick={() => onChangeModule('data-request')}
              >
                <FileText className={`h-4 w-4 ${collapsed ? '' : 'mr-2'}`} />
                {!collapsed && <span>数据请求</span>}
              </Button>
              
              {!collapsed && (
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="px-1.5 h-8 w-8 ml-1">
                    {dataRequestExpanded ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
                  </Button>
                </CollapsibleTrigger>
              )}
            </div>
            
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              <Button
                variant="ghost"
                className="w-full justify-start text-sm h-9"
                onClick={() => onChangeModule('data-request')}
              >
                <PlusCircle className="h-3.5 w-3.5 mr-2" />
                新建请求
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-sm h-9"
                onClick={() => onChangeModule('data-collections')}
              >
                <Folder className="h-3.5 w-3.5 mr-2" />
                数据集合
              </Button>
              
              <Button
                variant="ghost"
                className="w-full justify-start text-sm h-9"
                onClick={() => onChangeModule('request-management')}
              >
                <Clock className="h-3.5 w-3.5 mr-2" />
                历史请求
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </div>
      
      {!collapsed && (
        <div className="mt-auto p-4 border-t border-border">
          <div className="bg-primary/5 rounded-lg p-3 text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">专业版功能</p>
            <p>使用专业版解锁更多高级功能与数据分析</p>
            <Button size="sm" className="w-full mt-2">升级专业版</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceSidebar;
