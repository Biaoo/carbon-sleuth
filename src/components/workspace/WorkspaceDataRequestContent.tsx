
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, FormData } from '@/components/data-request/SupplierProductSection';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Import refactored components
import DataRequestForm from '@/components/workspace/dataRequest/DataRequestForm';
import { useDataRequestPreviewHandler } from '@/components/workspace/dataRequest/DataRequestPreviewHandler';
import DataRequestPreview from '@/components/data-request/DataRequestPreview';

interface WorkspaceDataRequestContentProps {
  navigateToHome: () => void;
}

interface LocationState {
  supplierName?: string;
  productName?: string;
  fromPrediction?: boolean;
}

const WorkspaceDataRequestContent: React.FC<WorkspaceDataRequestContentProps> = ({
  navigateToHome
}) => {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const { t, language } = useLanguage();
  
  // Set up the form with validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      productName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      requestItems: [],
      urgency: "medium" as const,
      additionalInfo: "",
      deadline: undefined
    },
  });
  
  // Pre-fill form with data from PredictionResult if available
  useEffect(() => {
    if (state?.fromPrediction) {
      if (state.supplierName) {
        form.setValue('supplierName', state.supplierName);
      }
      if (state.productName) {
        form.setValue('productName', state.productName);
      }
      
      // Pre-select some common data items
      form.setValue('requestItems', [
        'materials',
        'energy',
        'process',
        'transport'
      ]);
      
      // Set a default message based on language
      if (language === 'zh') {
        form.setValue('additionalInfo', 
          `我们平台已经对${state.productName || "该产品"}的碳足迹进行了初步预测，` + 
          `现在需要更精确的数据来完善分析。提供实际生产数据将帮助您获得更准确的碳足迹评估和更有针对性的减排建议。`
        );
      } else {
        form.setValue('additionalInfo', 
          `Our platform has made a preliminary prediction of the carbon footprint of ${state.productName || "this product"}, ` +
          `and now we need more accurate data to refine the analysis. Providing actual production data will help you get a more accurate carbon footprint assessment and more targeted emission reduction suggestions.`
        );
      }
    }
  }, [state, form, language]);
  
  // Get preview handling logic from our custom hook
  const {
    previewOpen,
    setPreviewOpen,
    previewData,
    handlePreview,
    handleConfirmSubmit
  } = useDataRequestPreviewHandler({ form, navigateToHome });
  
  // Handle form submission - only for valid form
  const onSubmit = () => {
    // Use the handlePreview function which now handles both valid and invalid forms
    handlePreview();
  };
  
  return (
    <div className="p-6">
      {state?.fromPrediction && (
        <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-500 rounded">
          <h2 className="text-lg font-medium mb-2">{t('redirect_from_prediction')}</h2>
          <p className="text-muted-foreground">
            {t('creating_data_request')} <span className="font-medium">{state.supplierName}</span> {t('of_supplier')} 
            <span className="font-medium"> {state.productName}</span>{t('creating_data_request_2')}
            {t('prefilled_info')}
          </p>
        </div>
      )}
      
      <DataRequestForm 
        form={form}
        onSubmit={onSubmit}
        onPreview={handlePreview}
      />
      
      {/* Preview Dialog */}
      {previewData && (
        <DataRequestPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          data={previewData}
          onConfirm={handleConfirmSubmit}
        />
      )}
    </div>
  );
};

export default WorkspaceDataRequestContent;
