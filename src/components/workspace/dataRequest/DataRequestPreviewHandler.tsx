import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { DataRequestPreviewData } from '@/components/prediction-result/types';
import { UseFormReturn } from 'react-hook-form';
import { FormData } from '@/components/data-request/SupplierProductSection';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  mockCompetitorsData,
  mockIndustryBenchmarks,
  mockReportLinks,
  dataItems
} from '@/components/data-request/mockData';

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

interface UseDataRequestPreviewHandlerProps {
  form: UseFormReturn<FormData>;
  navigateToHome: () => void;
}

// Hook with updated types
export const useDataRequestPreviewHandler = ({
  form,
  navigateToHome
}: UseDataRequestPreviewHandlerProps) => {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<DataRequestPreviewData | null>(null);

  // Generate a data submission link for each supplier/product combination
  const generateDataSubmissionLink = (supplier: string, product: string) => {
    const timestamp = Date.now();
    const encodedSupplier = encodeURIComponent(supplier || "unknown");
    const encodedProduct = encodeURIComponent(product || "unknown");
    return `${window.location.origin}/data-submission/${encodedSupplier}/${encodedProduct}/${timestamp}`;
  };

  // Handle preview button click - modified to allow incomplete form
  const handlePreview = () => {
    // Get current form values regardless of validation
    const values = form.getValues();
    
    // Generate a data submission link for this specific request
    const dataSubmissionLink = generateDataSubmissionLink(values.supplierName, values.productName);
    
    // Prepare preview data with fallbacks for empty values
    const selectedItems = values.requestItems && values.requestItems.length > 0
      ? values.requestItems.map(
          itemId => {
            const item = dataItems.find(item => item.id === itemId);
            return item ? t(item.label) : "";
          }
        ).filter(Boolean)
      : [t('no_items_selected')];
    
    // Get urgency text based on current language
    const urgencyText = values.urgency ? {
      low: t('urgency_text_low'),
      medium: t('urgency_text_medium'),
      high: t('urgency_text_high')
    }[values.urgency as 'low' | 'medium' | 'high'] : t('urgency_text_medium');
    
    // Format the deadline based on current language
    const formattedDeadline = values.deadline 
      ? format(values.deadline, 'PPP', { locale: language === 'zh' ? zhCN : undefined })
      : t('asap');
    
    // Generate email subject based on template
    const subject = t('email_subject_template')
      .replace('{product}', values.productName || t('unspecified_product'))
      .replace('{supplier}', values.supplierName || t('unspecified_supplier'));
    
    // Build email content sections
    const greeting = t('email_greeting').replace('{supplier}', values.supplierName || t('unspecified_supplier'));
    const hello = t('email_hello');
    
    const intro = values.contactName 
      ? t('email_intro_with_name').replace('{name}', values.contactName)
      : t('email_intro_without_name');
    
    const purpose = t('email_purpose').replace('{product}', values.productName || t('unspecified_product'));
    
    // Current product prediction section
    const currentProductPredictionTitle = t('current_prediction_title');
    const currentProductPredictionIntro = t('current_prediction_intro')
      .replace('{product}', values.productName || t('unspecified_product'));
    
    const currentProductPredictionValue = t('current_prediction_value')
      .replace('{value}', mockCurrentProductPrediction.carbonValue.toString())
      .replace('{unit}', mockCurrentProductPrediction.unit);
    
    const currentProductPredictionConfidence = t('current_prediction_confidence')
      .replace('{level}', mockCurrentProductPrediction.confidenceLevel);
    
    const currentProductPredictionUncertainty = t('current_prediction_uncertainty')
      .replace('{range}', mockCurrentProductPrediction.uncertaintyRange);
    
    const currentProductPredictionContributors = t('current_prediction_contributors')
      .replace('{contributors}', mockCurrentProductPrediction.mainContributors.join('、'));
    
    const currentProductPredictionDisclaimer = t('current_prediction_disclaimer');
    
    const currentProductPredictionSection = `
${currentProductPredictionTitle}
${currentProductPredictionIntro}
${currentProductPredictionValue}
${currentProductPredictionConfidence}
${currentProductPredictionUncertainty}
${currentProductPredictionContributors}

${currentProductPredictionDisclaimer}`;

    // Requested items section
    const requestedItemsIntro = t('requested_items_intro');
    const requestedItemsList = selectedItems.map(item => `• ${item}`).join('\n');
    
    // Market comparison section
    const marketComparisonTitle = t('market_comparison_title');
    const marketComparisonData = mockCompetitorsData.map(comp => 
      `• ${comp.name}: ${comp.carbonValue} ${comp.unit} (${comp.difference})`
    ).join('\n');
    
    const competitorsSection = `
${marketComparisonTitle}
${marketComparisonData}

${t('industry_benchmark_title')}
${mockIndustryBenchmarks.map(bench => `• ${bench.name}: ${bench.value} ${bench.unit}`).join('\n')}`;

    // Platform prediction section
    const platformPredictionSection = `
${t('platform_prediction_title')}
${t('platform_prediction_desc')}
${t('platform_prediction_point1')}
${t('platform_prediction_point2')}
${t('platform_prediction_point3')}
${t('platform_prediction_point4')}`;

    // Reports section
    const reportsSection = `
${t('reports_intro')}
${mockReportLinks.map(link => `• ${link.name}: ${window.location.origin}${link.url}`).join('\n')}`;

    // Data submission section
    const dataSubmissionSection = `
${t('data_submission_title')}
${t('data_submission_desc')}
${dataSubmissionLink}

${t('data_submission_security')}`;
    
    // Closing section
    const closingSection = values.deadline 
      ? t('closing_with_deadline')
          .replace('{product}', values.productName || t('unspecified_product'))
          .replace('{deadline}', formattedDeadline)
          .replace('{urgency}', urgencyText)
      : t('closing_without_deadline')
          .replace('{product}', values.productName || t('unspecified_product'))
          .replace('{urgency}', urgencyText);
    
    // Additional info section (if provided)
    const additionalInfoSection = values.additionalInfo 
      ? t('additional_info_section').replace('{info}', values.additionalInfo) + '\n\n'
      : '';
    
    // Thanks and closing
    const thanksAndClosing = `${t('email_thanks')}\n\n${t('email_closing')}`;
    
    // Signature
    const signature = t('email_signature')
      .replace('{name}', values.contactName || t('unspecified_contact'))
      .replace('{email}', values.contactEmail ? values.contactEmail : t('unspecified_email'))
      .replace('{phone}', values.contactPhone ? values.contactPhone : '');
    
    // Combine all sections to create the complete email content
    const content = `${greeting}

${hello}

${intro.replace('{product}', values.productName || t('unspecified_product'))}

${purpose}

${currentProductPredictionSection}

${requestedItemsIntro}
${requestedItemsList}

${competitorsSection}

${platformPredictionSection}

${reportsSection}

${dataSubmissionSection}

${closingSection}

${additionalInfoSection}${thanksAndClosing}

${signature}`;
    
    setPreviewData({
      supplier: values.supplierName || t('unspecified_supplier'),
      product: values.productName || t('unspecified_product'),
      dataItems: selectedItems,
      competitorsData: mockCompetitorsData,
      industryBenchmarks: mockIndustryBenchmarks,
      reportLinks: mockReportLinks,
      contact: {
        name: values.contactName || t('unspecified_contact'),
        email: values.contactEmail || t('unspecified_email'),
        phone: values.contactPhone || ""
      },
      deadline: formattedDeadline,
      subject,
      content,
      dataSubmissionLink,
      currentProductPrediction: mockCurrentProductPrediction
    });
    
    setPreviewOpen(true);
  };

  // Handle final submission
  const handleConfirmSubmit = () => {
    setPreviewOpen(false);
    
    // Here you would typically send the data to an API
    toast({
      title: language === 'zh' ? "数据请求已发送" : "Data request sent",
      description: language === 'zh' ? "已成功发送数据请求邮件" : "Data request email has been sent successfully",
    });
    
    // Navigate back or to a confirmation page
    navigateToHome();
  };

  return {
    previewOpen,
    setPreviewOpen,
    previewData,
    handlePreview,
    handleConfirmSubmit
  };
};
