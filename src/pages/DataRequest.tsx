
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { z } from 'zod'; // Added missing import
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
  
  // Mock data for current product prediction result
  const mockCurrentProductPrediction = {
    carbonValue: 42.8,
    unit: "kg CO₂e",
    confidenceLevel: "中等",
    uncertaintyRange: "±15%",
    mainContributors: [
      "原材料生产 (58%)",
      "制造工艺 (27%)",
      "运输 (12%)"
    ]
  };
  
  // Mock data submission link - a unique URL for each supplier/product combination
  const generateDataSubmissionLink = (supplier: string, product: string) => {
    const timestamp = Date.now();
    const encodedSupplier = encodeURIComponent(supplier || "unknown");
    const encodedProduct = encodeURIComponent(product || "unknown");
    return `${window.location.origin}/data-submission/${encodedSupplier}/${encodedProduct}/${timestamp}`;
  };
  
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
    
    // Generate a data submission link for this specific request
    const dataSubmissionLink = generateDataSubmissionLink(values.supplierName, values.productName);
    
    // Prepare preview data with fallbacks for empty values
    const selectedItems = values.requestItems && values.requestItems.length > 0
      ? values.requestItems.map(
          itemId => dataItems.find(item => item.id === itemId)?.label || ""
        ).filter(Boolean)
      : ["未选择数据项"];
    
    // Generate email subject and content based on form values with fallbacks
    const subject = `关于${values.productName || "产品"}碳足迹数据收集 - ${values.supplierName || "供应商"}`;
    const urgencyText = values.urgency ? {
      low: "低优先级",
      medium: "常规优先级",
      high: "高优先级"
    }[values.urgency] : "常规优先级";
    
    // Include industry benchmarking data in the email content
    const competitorsSection = `
我们最近对市场上类似产品进行了碳足迹评估分析，现分享部分结果供您参考：

【市场对比数据】
${mockCompetitorsData.map(comp => `• ${comp.name}: ${comp.carbonValue} ${comp.unit} (${comp.difference})`).join('\n')}

【行业基准数据】
${mockIndustryBenchmarks.map(bench => `• ${bench.name}: ${bench.value} ${bench.unit}`).join('\n')}`;

    const reportsSection = `
以下是我们整理的相关行业报告，您可能会感兴趣：
${mockReportLinks.map(link => `• ${link.name}: ${window.location.origin}${link.url}`).join('\n')}`;

    // Add section about the platform's prediction data
    const platformPredictionSection = `
【关于平台预测数据说明】
请注意，我们平台提供的碳足迹预测数据具有以下特点：
• 预测结果主要基于公开披露的行业数据及AI推理技术
• 预测数据存在一定程度的不确定性（通常在±15%范围内）
• 预测结果可能无法完全反映实际生产情况或特定工艺差异
• 获取您的实际数据将帮助我们提高预测准确性，并为您提供更有针对性的减碳建议`;

    // Add section about current product prediction
    const currentProductPredictionSection = `
【当前产品预测结果】
根据我们平台对${values.productName || "该产品"}的初步碳足迹预测：
• 预计碳足迹值：${mockCurrentProductPrediction.carbonValue} ${mockCurrentProductPrediction.unit}
• 置信水平：${mockCurrentProductPrediction.confidenceLevel}
• 不确定性范围：${mockCurrentProductPrediction.uncertaintyRange}
• 主要贡献因素：${mockCurrentProductPrediction.mainContributors.join('、')}

以上预测结果可能与实际情况存在差异，我们希望通过获取更准确的数据来优化此预测结果。`;

    // Add data submission link section to the email
    const dataSubmissionSection = `
【数据填报链接】
为了方便您提交相关数据，我们创建了一个专属数据填报页面，您可以通过以下链接进行填报：
${dataSubmissionLink}

该链接是为贵公司专门生成的安全链接，无需注册即可直接填报数据。链接有效期为30天。`;
    
    const content = `尊敬的${values.supplierName || "供应商"}团队：

您好！

我们是${values.contactName ? values.contactName + "，" : ""}${values.contactName ? "来自" : ""}碳知源环保科技有限公司的采购团队。我们最近一直在关注贵公司的${values.productName || "相关产品"}，对其性能和环保特性非常感兴趣。

作为一家重视可持续发展的企业，我们正在对所有供应链产品进行碳足迹评估，以期打造更加环保的产品线。在浏览贵公司产品资料的过程中，我们注意到${values.productName || "您的产品"}在行业内具有竞争力，因此希望能获取更详细的产品碳足迹数据，以便我们做出更全面的评估。

${currentProductPredictionSection}

具体来说，我们希望获取以下信息：
${selectedItems.map(item => `• ${item}`).join('\n')}

${competitorsSection}

${platformPredictionSection}

${reportsSection}

${dataSubmissionSection}

如果贵公司能够提供这些数据，将极大地帮助我们评估${values.productName || "该产品"}在我们供应链中的环保表现，并为后续可能的合作奠定基础。${values.deadline ? `由于项目进度安排，希望能在${format(values.deadline, 'yyyy年MM月dd日')}前收到相关信息。` : '希望能尽快收到您的回复。'}此请求为${urgencyText}。

${values.additionalInfo ? `补充说明：\n${values.additionalInfo}\n\n` : ''}感谢您的关注与支持！期待与贵公司进一步合作。

祝商祺！

${values.contactName || "采购团队"}
${values.contactEmail ? values.contactEmail : ""}
${values.contactPhone ? values.contactPhone : ""}
碳知源环保科技有限公司`;
    
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
      dataSubmissionLink, // Include the data submission link in the preview data
      currentProductPrediction: mockCurrentProductPrediction
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
    <DashboardLayout
      title="数据请求工作台"
      description="快速创建并发送产品碳足迹数据收集请求"
    >
      <div className="p-6">
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
    </DashboardLayout>
  );
};

export default DataRequest;
