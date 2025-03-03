import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { FormData } from '@/components/data-request/SupplierProductSection';

// Import refactored sections for data request
import SupplierProductSection from '@/components/data-request/SupplierProductSection';
import ContactInfoSection from '@/components/data-request/ContactInfoSection';
import RequestDetailsSection from '@/components/data-request/RequestDetailsSection';
import AdditionalInfoSection from '@/components/data-request/AdditionalInfoSection';

interface DataRequestFormProps {
  form: UseFormReturn<FormData>;
  onSubmit: () => void;
  onPreview: () => void;
}

const DataRequestForm: React.FC<DataRequestFormProps> = ({
  form,
  onSubmit,
  onPreview
}) => {
  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Supplier and Product Information */}
          <SupplierProductSection form={form} />
          
          {/* Contact Information */}
          <ContactInfoSection form={form} />
          
          {/* Request Details */}
          <RequestDetailsSection form={form} />
          
          {/* Additional Information */}
          <AdditionalInfoSection form={form} />
          
          <div className="flex justify-between">
            {/* Added a Preview button that doesn't require form validation */}
            <Button type="button" variant="outline" onClick={onPreview}>
              预览请求（忽略验证）
            </Button>
            <Button type="submit">
              验证并预览
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DataRequestForm;
