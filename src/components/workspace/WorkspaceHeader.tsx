
import React from 'react';
import { Leaf, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkspaceHeaderProps {
  navigateToHome: () => void;
}

export const WorkspaceDesktopHeader: React.FC<WorkspaceHeaderProps> = ({ navigateToHome }) => {
  return (
    <div className="hidden md:flex items-center h-14 px-6 bg-background border-b border-border w-full fixed top-0 left-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-semibold">CarbonSleuth</span>
      </div>
      <div className="ml-auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={navigateToHome}
          className="flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          返回主页
        </Button>
      </div>
    </div>
  );
};

export const WorkspaceMobileHeader: React.FC<WorkspaceHeaderProps & { 
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ navigateToHome, sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="md:hidden flex items-center justify-between h-14 px-4 bg-background border-b border-border w-full fixed top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-semibold">CarbonSleuth</span>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={navigateToHome}
          className="flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          返回
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          {sidebarOpen ? "关闭" : "菜单"}
        </Button>
      </div>
    </div>
  );
};
