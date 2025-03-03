
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DataRequestPreview from '@/components/data-request/DataRequestPreview';
import { DataRequestPreviewData } from '@/components/prediction-result/types';
import { Form } from '@/components/ui/form';

// Import refactored sections
import SupplierProductSection, { formSchema } from '@/components/data-request/SupplierProductSection';
import ContactInfoSection from '@/components/data-request/ContactInfoSection';
import RequestDetailsSection from '@/components/data-request/RequestDetailsSection';
import AdditionalInfoSection from '@/components/data-request/AdditionalInfoSection';

// Import mock data
import { 
  mockCompetitorsData,
  mockIndustryBenchmarks,
  mockReportLinks,
  dataItems
} from '@/components/data-request/mockData';

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
  
  // Handle preview button click - modified to allow incomplete form
  const handlePreview = () => {
    // Get current form values regardless of validation
    const values = form.getValues();
    
    // Prepare preview data with fallbacks for empty values
    const selectedItems = values.requestItems && values.requestItems.length > 0
      ? values.requestItems.map(
          itemId => dataItems.find(item => item.id === itemId)?.label || ""
        ).filter(Boolean)
      : ["未选择数据项"];
    
    // Generate email subject and content based on form values with fallbacks
    const subject = `数据请求：${values.productName || "未指定产品"} - ${values.supplierName || "未指定供应商"}`;
    const urgencyText = values.urgency ? {
      low: "低优先级",
      medium: "普通优先级",
      high: "高优先级"
    }[values.urgency] : "普通优先级";
    
    // Include industry benchmarking data in the email content
    const competitorsSection = `
市场对比数据：
${mockCompetitorsData.map(comp => `- ${comp.name}: ${comp.carbonValue} ${comp.unit} (${comp.difference})`).join('\n')}

行业基准数据：
${mockIndustryBenchmarks.map(bench => `- ${bench.name}: ${bench.value} ${bench.unit}`).join('\n')}`;

    const reportsSection = `
相关报告链接：
${mockReportLinks.map(link => `- ${link.name}: ${window.location.origin}${link.url}`).join('\n')}`;
    
    const content = `尊敬的${values.supplierName || "供应商"}：

我们正在进行产品碳足迹评估分析，需要贵公司提供${values.productName || "相关产品"}的数据信息。

请求数据项：
${selectedItems.map(item => `- ${item}`).join('\n')}

${values.deadline ? `请在${format(values.deadline, 'yyyy年MM月dd日')}前提供上述信息。` : '请尽快提供上述信息。'}
此请求${urgencyText}。

${competitorsSection}

${reportsSection}

${values.additionalInfo ? `附加说明：\n${values.additionalInfo}` : ''}

感谢您的配合！`;
    
    setPreviewData({
      supplier: values.supplierName || "未指定供应商",
      product: values.productName || "未指定产品",
      dataItems: selectedItems,
      competitorsData: mockCompetitorsData,
      industryBenchmarks: mockIndustryBenchmarks,
      reportLinks: mockReportLinks,
      contact: {
        name: values.contactName || "未指定联系人",
        email: values.contactEmail || "未指定邮箱",
        phone: values.contactPhone || ""
      },
      deadline: values.deadline ? format(values.deadline, 'yyyy年MM月dd日') : "尽快",
      subject,
      content,
    });
    
    setPreviewOpen(true);
  };
  
  // Handle form submission - only for valid form
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Use the handlePreview function which now handles both valid and invalid forms
    handlePreview();
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
              <SupplierProductSection form={form} />
              
              {/* Contact Information */}
              <ContactInfoSection form={form} />
              
              {/* Request Details */}
              <RequestDetailsSection form={form} />
              
              {/* Additional Information */}
              <AdditionalInfoSection form={form} />
              
              <div className="flex justify-between">
                {/* Added a Preview button that doesn't require form validation */}
                <Button type="button" variant="outline" onClick={handlePreview}>
                  预览请求（忽略验证）
                </Button>
                <Button type="submit">
                  验证并预览
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
