
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AlertCircle, Copy, Share2, Download } from 'lucide-react';

interface PredictionResultHeaderProps {
  resultData: {
    productName: string;
    supplierName: string;
    date: string;
    id: string;
  };
  onCopyLink: () => void;
}

const PredictionResultHeader: React.FC<PredictionResultHeaderProps> = ({
  resultData,
  onCopyLink
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between md:items-center">
      <div>
        <div className="flex items-center mb-2">
          <h1 className="text-3xl font-bold">{resultData.productName}</h1>
          <Badge className="ml-3 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
            预测结果
          </Badge>
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-2 inline-flex items-center justify-center text-amber-600 hover:text-amber-700">
                <AlertCircle className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 text-sm">
              <p>本结果由企业已披露信息及相关统计数据推理得到，仅为预测结果，不能完全反映供应商实际生产水平。对于碳核算、认证场景，应使用企业实际数据，实际数据缺失时，将采用企业实际数据，实际数据缺失时，将采用已有行业均值数据作为缺省值。</p>
            </PopoverContent>
          </Popover>
        </div>
        <p className="text-muted-foreground">{resultData.supplierName}</p>
        <p className="text-sm text-muted-foreground mt-1">预测日期：{resultData.date} · ID: {resultData.id}</p>
      </div>
      
      <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
        <Button variant="outline" className="flex items-center" onClick={onCopyLink}>
          <Copy className="h-4 w-4 mr-2" />
          复制链接
        </Button>
        <Button variant="outline" className="flex items-center">
          <Share2 className="h-4 w-4 mr-2" />
          分享
        </Button>
        <Button variant="outline" className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          导出报告
        </Button>
      </div>
    </div>
  );
};

export default PredictionResultHeader;
