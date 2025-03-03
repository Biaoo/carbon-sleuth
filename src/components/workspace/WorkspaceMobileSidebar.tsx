
import React from 'react';
import WorkspaceSidebar from './WorkspaceSidebar';

interface WorkspaceMobileSidebarProps {
  sidebarOpen: boolean;
  activeModule: string;
  onChangeModule: (module: string) => void;
  onClose: () => void;
}

const WorkspaceMobileSidebar: React.FC<WorkspaceMobileSidebarProps> = ({
  sidebarOpen,
  activeModule,
  onChangeModule,
  onClose
}) => {
  if (!sidebarOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs">
        <WorkspaceSidebar 
          activeModule={activeModule}
          onChangeModule={onChangeModule}
          isMobile={true}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default WorkspaceMobileSidebar;
