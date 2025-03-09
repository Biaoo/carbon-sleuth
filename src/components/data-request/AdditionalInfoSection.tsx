import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from './SupplierProductSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface AdditionalInfoSectionProps {
  form: UseFormReturn<FormData>;
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={form.control}
      name="additionalInfo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('additional_info')}</FormLabel>
          <FormControl>
            <Textarea 
              placeholder={t('additional_info_placeholder')} 
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
