
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './SupplierProductSection';

type FormData = z.infer<typeof formSchema>;

interface ContactInfoSectionProps {
  form: UseFormReturn<FormData>;
}

const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ form }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">联系信息</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>联系人姓名</FormLabel>
              <FormControl>
                <Input placeholder="请输入联系人姓名" {...field} />
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
              <FormLabel>联系邮箱</FormLabel>
              <FormControl>
                <Input placeholder="请输入联系邮箱" {...field} />
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
              <FormLabel>联系电话（选填）</FormLabel>
              <FormControl>
                <Input placeholder="请输入联系电话" {...field} />
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
