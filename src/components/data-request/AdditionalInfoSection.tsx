
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './SupplierProductSection';

type FormData = z.infer<typeof formSchema>;

interface AdditionalInfoSectionProps {
  form: UseFormReturn<FormData>;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="additionalInfo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>附加说明（选填）</FormLabel>
          <FormControl>
            <Textarea 
              placeholder="请输入任何需要补充的信息或特殊要求" 
              className="min-h-[120px]" 
              {...field} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AdditionalInfoSection;
