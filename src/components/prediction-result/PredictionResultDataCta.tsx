
import React from 'react';
import { Database } from 'lucide-react';
import RequestDataButton from './RequestDataButton';

interface PredictionResultDataCtaProps {
  supplierName: string;
  productName: string;
  variant?: 'simple' | 'detailed';
}

const PredictionResultDataCta: React.FC<PredictionResultDataCtaProps> = ({
  supplierName,
  productName,
  variant = 'simple'
}) => {
  if (variant === 'detailed') {
    return (
      <div className="mt-10 mb-8 flex flex-col items-center text-center p-8 border border-dashed border-amber-200 rounded-lg bg-amber-50/50">
        <Database className="h-10 w-10 text-amber-500 mb-4" />
        <h3 className="text-xl font-medium mb-2">需要更准确的数据分析？</h3>
        <p className="text-muted-foreground max-w-2xl mb-6">
          通过获取供应商的实际生产数据，我们可以为您提供更精确的碳足迹分析和减排方案。向供应商发送数据请求，只需几分钟即可完成。
        </p>
        <RequestDataButton supplierName={supplierName} productName={productName} />
      </div>
    );
  }
  
  return (
    <div className="bg-amber-50 border border-amber-100 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="text-lg font-medium text-amber-900 mb-2">预测数据存在不确定性？</h3>
        <p className="text-amber-800">
          本页面显示的数据仅为预测结果，可能与实际情况存在差异。向供应商请求实际数据，获取更精准的碳足迹分析与减排建议。
        </p>
      </div>
      <RequestDataButton supplierName={supplierName} productName={productName} />
    </div>
  );
};

export default PredictionResultDataCta;
