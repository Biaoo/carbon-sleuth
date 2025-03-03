
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Import form schema from the parent component
export const formSchema = z.object({
  supplierName: z.string().min(2, { message: "供应商名称至少2个字符" }),
  productName: z.string().min(2, { message: "产品名称至少2个字符" }),
  contactName: z.string().min(2, { message: "联系人姓名至少2个字符" }),
  contactEmail: z.string().email({ message: "请输入有效的邮箱地址" }),
  contactPhone: z.string().optional(),
  requestItems: z.array(z.string()).min(1, { message: "至少选择一项请求数据" }),
  deadline: z.date({ required_error: "请选择截止日期" }),
  urgency: z.enum(["low", "medium", "high"]),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface SupplierProductSectionProps {
  form: UseFormReturn<FormData>;
}

const SupplierProductSection: React.FC<SupplierProductSectionProps> = ({ form }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">供应商与产品信息</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="supplierName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>供应商名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入供应商名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>产品名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入产品名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default SupplierProductSection;
