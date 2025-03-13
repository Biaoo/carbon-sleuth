
import React from 'react';
import { Leaf, Home, Globe, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUserRole } from '@/contexts/UserRoleContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WorkspaceHeaderProps {
  navigateToHome: () => void;
}

export const WorkspaceDesktopHeader: React.FC<WorkspaceHeaderProps> = ({ navigateToHome }) => {
  const { t, language, setLanguage } = useLanguage();
  const { userRole, setUserRole } = useUserRole();
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'buyer': return t('role_buyer');
      case 'supplier': return t('role_supplier');
      case 'carbon-service': return t('role_carbon_service');
      default: return role;
    }
  };
  
  return (
    <div className="hidden md:flex items-center h-14 px-6 bg-background border-b border-border w-full fixed top-0 left-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-semibold">CarbonSleuth</span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              <UserCircle2 className="h-4 w-4 mr-1" />
              {getRoleLabel(userRole)}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setUserRole('buyer')}>
              {t('role_buyer')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole('supplier')}>
              {t('role_supplier')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole('carbon-service')}>
              {t('role_carbon_service')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm">
              <Globe className="h-4 w-4 mr-1" />
              {language === 'zh' ? '中文' : 'English'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('zh')}>
              中文
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={navigateToHome}
          className="flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          {t('return_to_home')}
        </Button>
      </div>
    </div>
  );
};

export const WorkspaceMobileHeader: React.FC<WorkspaceHeaderProps & { 
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}> = ({ navigateToHome, sidebarOpen, setSidebarOpen }) => {
  const { t, language, setLanguage } = useLanguage();
  const { userRole, setUserRole } = useUserRole();
  
  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'buyer': return t('role_buyer');
      case 'supplier': return t('role_supplier');
      case 'carbon-service': return t('role_carbon_service');
      default: return role;
    }
  };
  
  return (
    <div className="md:hidden flex items-center justify-between h-14 px-4 bg-background border-b border-border w-full fixed top-0 z-10">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
          <Leaf className="h-5 w-5 text-white" />
        </div>
        <span className="font-display text-lg font-semibold">CarbonSleuth</span>
      </div>
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm px-2">
              <UserCircle2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setUserRole('buyer')}>
              {t('role_buyer')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole('supplier')}>
              {t('role_supplier')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUserRole('carbon-service')}>
              {t('role_carbon_service')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="text-sm px-2">
              <Globe className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setLanguage('zh')}>
              中文
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              English
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={navigateToHome}
          className="flex items-center gap-1"
        >
          <Home className="h-4 w-4" />
          {t('return')}
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden"
        >
          {sidebarOpen ? t('close') : t('menu')}
        </Button>
      </div>
    </div>
  );
};
