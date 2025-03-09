import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from './SupplierProductSection';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactInfoSectionProps {
  form: UseFormReturn<FormData>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ form }) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('contact_info')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact_name')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact_name_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact_email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact_email_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('contact_phone')}</FormLabel>
              <FormControl>
                <Input placeholder={t('contact_phone_placeholder')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ContactInfoSection;
