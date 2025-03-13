
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const WorkspaceSupplierDataEntry: React.FC = () => {
  const { t } = useLanguage();
  const form = useForm({
    defaultValues: {
      productName: '',
      productCategory: '',
      materialType: '',
      productionProcess: '',
      energyConsumption: '',
      additionalInfo: ''
    }
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle data submission
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">{t('data_entry')}</h2>
      
      <div className="bg-card rounded-lg shadow-sm border border-border">
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-medium">{t('product_data_entry')}</h3>
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('product_name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('enter_product_name')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('product_category')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('select_category')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">{t('electronics')}</SelectItem>
                          <SelectItem value="clothing">{t('clothing')}</SelectItem>
                          <SelectItem value="food">{t('food')}</SelectItem>
                          <SelectItem value="furniture">{t('furniture')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="materialType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('material_type')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('enter_material_type')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="productionProcess"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('production_process')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('select_process')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="assembly">{t('assembly')}</SelectItem>
                          <SelectItem value="manufacturing">{t('manufacturing')}</SelectItem>
                          <SelectItem value="3d_printing">{t('3d_printing')}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="energyConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('energy_consumption')} (kWh)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormDescription>
                      {t('energy_consumption_desc')}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('additional_info')}</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder={t('additional_info_placeholder')} 
                        className="min-h-24"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button type="submit">{t('submit_data')}</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSupplierDataEntry;
