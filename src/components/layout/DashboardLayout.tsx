
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { BarChart2, FileText, Home, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  description
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes('/inference')) return 'inference';
    if (path.includes('/data-request')) return 'data-request';
    return 'home';
  };

  return (
    <Layout>
      <div className="bg-secondary/10 min-h-[calc(100vh-5rem)]">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {/* Dashboard Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{title}</h1>
                {description && (
                  <p className="text-muted-foreground mt-1">{description}</p>
                )}
              </div>
              
              {/* Navigation Tabs */}
              <Tabs value={getActiveTab()} className="w-full md:w-auto">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger 
                    value="home" 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2"
                  >
                    <Home className="h-4 w-4" />
                    <span className="hidden sm:inline">主页</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="inference" 
                    onClick={() => navigate('/inference')}
                    className="flex items-center gap-2"
                  >
                    <BarChart2 className="h-4 w-4" />
                    <span className="hidden sm:inline">碳足迹预测</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="data-request" 
                    onClick={() => navigate('/data-request')}
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="hidden sm:inline">数据请求</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Dashboard Content */}
            <div className="bg-background rounded-xl shadow-md">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardLayout;
