
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
import { z } from 'zod';
import { formSchema } from './SupplierProductSection';

// Data items that can be requested
const dataItems = [
  { id: "product_specs", label: "产品规格参数" },
  { id: "material_composition", label: "材料组成情况" },
  { id: "manufacturing_process", label: "制造工艺流程" },
  { id: "energy_consumption", label: "能源消耗数据" },
  { id: "transportation_logistics", label: "运输物流信息" },
  { id: "certifications", label: "相关认证文件" },
  { id: "test_reports", label: "检测报告数据" },
  { id: "packaging_details", label: "包装材料详情" },
  { id: "suppliers_info", label: "上游供应商信息" },
  { id: "waste_data", label: "废弃物处理数据" },
];

type FormData = z.infer<typeof formSchema>;

interface RequestDetailsSectionProps {
  form: UseFormReturn<FormData>;
}

const RequestDetailsSection: React.FC<RequestDetailsSectionProps> = ({ form }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">请求详情</h2>
      
      <FormField
        control={form.control}
        name="requestItems"
        render={() => (
          <FormItem>
            <div className="mb-2">
              <FormLabel>请求数据项</FormLabel>
              <FormDescription>
                请选择需要供应商提供的数据类型
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
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
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
                                  )
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>截止日期</FormLabel>
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
                        format(field.value, "yyyy年MM月dd日", { locale: zhCN })
                      ) : (
                        <span>请选择日期</span>
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
                    initialFocus
                    disabled={(date) => date < new Date()}
                    locale={zhCN}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="urgency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>优先级</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择优先级" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">低 - 一般信息请求</SelectItem>
                  <SelectItem value="medium">中 - 标准数据请求</SelectItem>
                  <SelectItem value="high">高 - 紧急数据需求</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default RequestDetailsSection;
