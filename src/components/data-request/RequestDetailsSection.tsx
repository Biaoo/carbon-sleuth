import React from 'react';
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormDescription, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from './SupplierProductSection';
import { useLanguage } from '@/contexts/LanguageContext';

// Data items that can be requested
const dataItems = [
  { id: "product_specs", label: "product_specs" },
  { id: "material_composition", label: "material_composition" },
  { id: "manufacturing_process", label: "manufacturing_process" },
  { id: "energy_consumption", label: "energy_consumption" },
  { id: "transportation_logistics", label: "transportation_logistics" },
  { id: "certifications", label: "certifications" },
  { id: "test_reports", label: "test_reports" },
  { id: "packaging_details", label: "packaging_details" },
  { id: "suppliers_info", label: "suppliers_info" },
  { id: "waste_data", label: "waste_data" },
];

interface RequestDetailsSectionProps {
  form: UseFormReturn<FormData>;
}

const RequestDetailsSection: React.FC<RequestDetailsSectionProps> = ({ form }) => {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{t('request_details')}</h2>
      
      {/* Request Data Items */}
      <FormField
        control={form.control}
        name="requestItems"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-base">{t('request_data_items')}</FormLabel>
              <FormDescription>
                {t('request_data_items_description')}
              </FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dataItems.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="requestItems"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t(item.label)}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {/* Urgency Level */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('urgency_level')}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择紧急程度" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">{t('urgency_low')}</SelectItem>
                  <SelectItem value="medium">{t('urgency_medium')}</SelectItem>
                  <SelectItem value="high">{t('urgency_high')}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Response Deadline */}
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t('response_deadline')}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: language === 'zh' ? zhCN : undefined })
                      ) : (
                        <span>{t('select_date')}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    locale={language === 'zh' ? zhCN : undefined}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RequestDetailsSection;
