
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ArrowLeft,
  CalendarIcon
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DataRequestPreview from '@/components/data-request/DataRequestPreview';
import { DataRequestPreviewData } from '@/components/prediction-result/types';

// Mock data
const mockCompetitorsData = [
  { name: "竞品A - NS-310", carbonValue: 47.5, unit: "kg CO₂e/件", difference: "+11.0%" },
  { name: "竞品B - HE-305", carbonValue: 51.2, unit: "kg CO₂e/件", difference: "+19.6%" },
  { name: "竞品C - BF-290", carbonValue: 49.8, unit: "kg CO₂e/件", difference: "+16.4%" },
  { name: "竞品D - SP-320", carbonValue: 39.5, unit: "kg CO₂e/件", difference: "-7.7%" }
];

const mockIndustryBenchmarks = [
  { name: "行业领先水平", value: 35.0, unit: "kg CO₂e/件" },
  { name: "行业平均水平", value: 65.2, unit: "kg CO₂e/件" },
  { name: "行业基准线", value: 80.0, unit: "kg CO₂e/件" }
];

const mockReportLinks = [
  { name: "太阳能电池板碳足迹预测报告", url: "/prediction-result/pred-123456", type: "prediction" as const },
  { name: "太阳能电池板ILCD格式数据包", url: "#", type: "ilcd" as const },
  { name: "产品生命周期分析技术文档", url: "#", type: "other" as const }
];

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

// Form validation schema
const formSchema = z.object({
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

// Main component
const DataRequest: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<DataRequestPreviewData | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      supplierName: "",
      productName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      requestItems: [],
      urgency: "medium",
      additionalInfo: "",
    },
  });
  
  // Handle form submission
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Prepare preview data
    const selectedItems = values.requestItems.map(
      itemId => dataItems.find(item => item.id === itemId)?.label || ""
    ).filter(Boolean);
    
    // Generate email subject and content based on form values
    const subject = `数据请求：${values.productName} - ${values.supplierName}`;
    const urgencyText = {
      low: "低优先级",
      medium: "普通优先级",
      high: "高优先级"
    }[values.urgency];
    
    const content = `尊敬的${values.supplierName}：

我们正在进行产品碳足迹评估分析，需要贵公司提供${values.productName}的相关数据信息。

请求数据项：
${selectedItems.map(item => `- ${item}`).join('\n')}

请在${format(values.deadline, 'yyyy年MM月dd日')}前提供上述信息。
此请求${urgencyText}。

${values.additionalInfo ? `附加说明：\n${values.additionalInfo}` : ''}

感谢您的配合！`;
    
    setPreviewData({
      supplier: values.supplierName,
      product: values.productName,
      dataItems: selectedItems,
      competitorsData: mockCompetitorsData,
      industryBenchmarks: mockIndustryBenchmarks,
      reportLinks: mockReportLinks,
      contact: {
        name: values.contactName,
        email: values.contactEmail,
        phone: values.contactPhone
      },
      deadline: format(values.deadline, 'yyyy年MM月dd日'),
      subject,
      content,
    });
    
    setPreviewOpen(true);
  };
  
  // Handle final submission
  const handleConfirmSubmit = () => {
    setPreviewOpen(false);
    
    // Here you would typically send the data to an API
    toast({
      title: "数据请求已发送",
      description: "已成功发送数据请求邮件",
    });
    
    // Navigate back or to a confirmation page
    navigate("/");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-muted-foreground mb-6 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </button>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">数据请求</h1>
          <p className="text-muted-foreground mt-2">
            向供应商发起数据请求，获取产品碳足迹评估所需的详细信息
          </p>
        </div>
        
        <Separator className="my-6" />
        
        <div className="max-w-3xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Supplier and Product Information */}
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
              
              {/* Contact Information */}
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
              
              {/* Request Details */}
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
              
              {/* Additional Information */}
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
              
              <div className="flex justify-end">
                <Button type="submit">
                  预览请求
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      
      {/* Preview Dialog */}
      {previewData && (
        <DataRequestPreview
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          data={previewData}
          onConfirm={handleConfirmSubmit}
        />
      )}
    </Layout>
  );
};

export default DataRequest;
