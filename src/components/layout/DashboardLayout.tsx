
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
              
              {/* Simple navigation */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                返回首页
              </Button>
            </div>
            
            {/* Dashboard Content */}
            <div className="bg-background rounded-xl shadow-md overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardLayout;
