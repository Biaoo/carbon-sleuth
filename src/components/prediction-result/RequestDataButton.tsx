
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Database, ArrowRight } from 'lucide-react';

interface RequestDataButtonProps {
  supplierName: string;
  productName: string;
}

const RequestDataButton: React.FC<RequestDataButtonProps> = ({
  supplierName,
  productName
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Navigate to data request page with supplier and product info
    navigate('/workspace?module=data-request', { 
      state: { 
        supplierName,
        productName,
        fromPrediction: true 
      } 
    });
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            onClick={handleClick}
            size="lg" 
            className="gap-2 bg-amber-500 hover:bg-amber-600 text-white"
          >
            <Database className="h-4 w-4" />
            <span>请求供应商实际数据</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>预测数据只是基于现有信息的估算。请求供应商提供实际数据，以获得更准确的碳足迹分析。</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default RequestDataButton;
