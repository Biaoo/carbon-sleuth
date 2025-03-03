
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema } from '@/components/data-request/SupplierProductSection';

// Import refactored components
import DataRequestForm from '@/components/workspace/dataRequest/DataRequestForm';
import { useDataRequestPreviewHandler } from '@/components/workspace/dataRequest/DataRequestPreviewHandler';
import DataRequestPreview from '@/components/data-request/DataRequestPreview';

interface WorkspaceDataRequestContentProps {
  navigateToHome: () => void;
}

const WorkspaceDataRequestContent: React.FC<WorkspaceDataRequestContentProps> = ({
  navigateToHome
}) => {
  // Set up the form with validation
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      productName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      requestItems: [],
      urgency: "medium" as "low" | "medium" | "high",
      additionalInfo: "",
      deadline: undefined
    },
  });
  
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
