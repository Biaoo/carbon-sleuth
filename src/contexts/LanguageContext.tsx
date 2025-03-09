
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Define language type
type Language = 'en' | 'zh';

// Define translations type
interface Translations {
  [key: string]: {
    en: string;
    zh: string;
  };
}

// Interface for the context value
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create translations object
const translations: Translations = {
  // Navigation
  app_name: {
    en: 'Carbon Footprint Platform',
    zh: '碳足迹平台'
  },
  home: {
    en: 'Home',
    zh: '首页'
  },
  search: {
    en: 'Search',
    zh: '搜索'
  },
  inference: {
    en: 'Prediction',
    zh: '预测'
  },
  data_request: {
    en: 'Data Request',
    zh: '数据请求'
  },
  recommendation: {
    en: 'Recommendation',
    zh: '推荐'
  },
  workspace: {
    en: 'Workspace',
    zh: '工作台'
  },
  login: {
    en: 'Login',
    zh: '登录'
  },
  
  // Home page
  hero_title: {
    en: 'Predict and Optimize Product Carbon Footprint',
    zh: '预测和优化产品碳足迹'
  },
  hero_subtitle: {
    en: 'Leverage AI to understand, measure, and reduce the environmental impact of your products across the entire lifecycle',
    zh: '利用人工智能理解、测量和减少产品全生命周期的环境影响'
  },
  get_started: {
    en: 'Get Started',
    zh: '开始使用'
  },
  learn_more: {
    en: 'Learn More',
    zh: '了解更多'
  },
  cta_title: {
    en: 'Ready to Reduce Your Product\'s Carbon Footprint?',
    zh: '准备好减少您产品的碳足迹了吗？'
  },
  cta_description: {
    en: 'Start with our AI-powered carbon footprint prediction tool to identify hotspots and receive tailored optimization recommendations.',
    zh: '使用我们由AI驱动的碳足迹预测工具，识别热点并获取定制化的优化建议。'
  },
  start_prediction: {
    en: 'Start Prediction',
    zh: '开始预测'
  },
  search_products: {
    en: 'Search Products',
    zh: '搜索产品'
  },
  core_features: {
    en: 'Core Features',
    zh: '核心功能'
  },
  features_description: {
    en: 'Our platform offers a comprehensive suite of tools to help you manage and reduce the carbon footprint of your products.',
    zh: '我们的平台提供全面的工具套件，帮助您管理和减少产品的碳足迹。'
  },
  feature_search_title: {
    en: 'Product Database Search',
    zh: '产品数据库搜索'
  },
  feature_search_desc: {
    en: 'Access our extensive database of products with verified carbon footprint data for benchmarking.',
    zh: '访问我们广泛的产品数据库，获取经过验证的碳足迹数据进行基准比较。'
  },
  feature_prediction_title: {
    en: 'AI-Powered Prediction',
    zh: 'AI驱动的预测'
  },
  feature_prediction_desc: {
    en: 'Quickly estimate your product\'s carbon footprint using our advanced machine learning models.',
    zh: '使用我们的高级机器学习模型快速估算您的产品碳足迹。'
  },
  feature_comparison_title: {
    en: 'Competitive Analysis',
    zh: '竞争分析'
  },
  feature_comparison_desc: {
    en: 'Compare your product\'s environmental performance against industry benchmarks and competitors.',
    zh: '将您的产品环境表现与行业基准和竞争对手进行比较。'
  },
  feature_data_request_title: {
    en: 'Supplier Data Collection',
    zh: '供应商数据收集'
  },
  feature_data_request_desc: {
    en: 'Streamline the process of requesting and collecting carbon footprint data from your suppliers.',
    zh: '简化从供应商请求和收集碳足迹数据的过程。'
  },
  feature_recommendation_title: {
    en: 'Optimization Recommendations',
    zh: '优化建议'
  },
  feature_recommendation_desc: {
    en: 'Receive personalized suggestions to optimize your product and reduce its carbon footprint.',
    zh: '获取个性化建议，优化您的产品并减少其碳足迹。'
  },
  
  // Prediction Result
  product_info: {
    en: 'Product Information',
    zh: '产品信息'
  },
  carbon_footprint: {
    en: 'Carbon Footprint',
    zh: '碳足迹'
  },
  industry_comparison: {
    en: 'Industry Comparison',
    zh: '行业比较'
  },
  improvement_suggestions: {
    en: 'Improvement Suggestions',
    zh: '改进建议'
  },
  technical_details: {
    en: 'Technical Details',
    zh: '技术详情'
  },
  lca_model: {
    en: 'LCA Model',
    zh: '生命周期评估模型'
  },
  similar_products: {
    en: 'Similar Products',
    zh: '类似产品'
  },
  lca_model_flowchart: {
    en: 'LCA Model Flowchart',
    zh: '生命周期评估模型流程图'
  },
  
  // Data Request Form
  data_request_form_title: {
    en: 'Create Data Request',
    zh: '创建数据请求'
  },
  data_request_form_subtitle: {
    en: 'Fill out the form below to create a data request for your supplier',
    zh: '填写以下表格，为您的供应商创建数据请求'
  },
  supplier_product_info_form: {
    en: 'Supplier & Product Information',
    zh: '供应商和产品信息'
  },
  supplier_name_form: {
    en: 'Supplier Name',
    zh: '供应商名称'
  },
  supplier_name_placeholder_form: {
    en: 'Enter supplier company name',
    zh: '输入供应商公司名称'
  },
  product_name_form: {
    en: 'Product Name',
    zh: '产品名称'
  },
  product_name_placeholder_form: {
    en: 'Enter product name or model',
    zh: '输入产品名称或型号'
  },
  contact_info_form: {
    en: 'Contact Information',
    zh: '联系信息'
  },
  contact_name_form: {
    en: 'Contact Name',
    zh: '联系人姓名'
  },
  contact_name_placeholder_form: {
    en: 'Enter contact person name',
    zh: '输入联系人姓名'
  },
  contact_email_form: {
    en: 'Email',
    zh: '邮箱'
  },
  contact_email_placeholder_form: {
    en: 'Enter contact email',
    zh: '输入联系人邮箱'
  },
  contact_phone_form: {
    en: 'Phone (Optional)',
    zh: '电话（可选）'
  },
  contact_phone_placeholder_form: {
    en: 'Enter contact phone number',
    zh: '输入联系人电话号码'
  },
  request_details_form: {
    en: 'Request Details',
    zh: '请求详情'
  },
  request_items_form: {
    en: 'Requested Data',
    zh: '请求数据'
  },
  request_items_description_form: {
    en: 'Select the data you want to request from the supplier',
    zh: '选择您想从供应商处请求的数据'
  },
  product_cf_data: {
    en: 'Product Carbon Footprint Data',
    zh: '产品碳足迹数据'
  },
  material_composition: {
    en: 'Material Composition',
    zh: '材料成分'
  },
  energy_consumption: {
    en: 'Energy Consumption Data',
    zh: '能源消耗数据'
  },
  manufacturing_process: {
    en: 'Manufacturing Process Details',
    zh: '制造过程详情'
  },
  transportation_data: {
    en: 'Transportation & Logistics Data',
    zh: '运输和物流数据'
  },
  certifications: {
    en: 'Environmental Certifications',
    zh: '环境认证'
  },
  deadline_form: {
    en: 'Response Deadline',
    zh: '响应截止日期'
  },
  deadline_description_form: {
    en: 'When do you need this data by?',
    zh: '您需要在何时获得此数据？'
  },
  urgency_form: {
    en: 'Urgency Level',
    zh: '紧急程度'
  },
  low_urgency: {
    en: 'Low',
    zh: '低'
  },
  medium_urgency: {
    en: 'Medium',
    zh: '中'
  },
  high_urgency: {
    en: 'High',
    zh: '高'
  },
  additional_info_form: {
    en: 'Additional Information',
    zh: '附加信息'
  },
  additional_info_placeholder: {
    en: 'Enter any additional details or specific requirements for this data request...',
    zh: '输入有关此数据请求的任何其他详细信息或具体要求...'
  },
  preview_request_button: {
    en: 'Preview Request',
    zh: '预览请求'
  },
  send_request_button: {
    en: 'Send Request',
    zh: '发送请求'
  },
  edit_request_button: {
    en: 'Edit Request',
    zh: '编辑请求'
  },
  
  // Workspace
  workspace_overview: {
    en: 'Overview',
    zh: '概览'
  },
  workspace_inference_history: {
    en: 'Prediction History',
    zh: '预测历史'
  },
  workspace_data_collections: {
    en: 'Data Collections',
    zh: '数据集合'
  },
  workspace_data_request: {
    en: 'Data Request',
    zh: '数据请求'
  },
  workspace_request_management: {
    en: 'Request Management',
    zh: '请求管理'
  },
  workspace_settings: {
    en: 'Settings',
    zh: '设置'
  },
  request_management: {
    en: 'Request Management',
    zh: '请求管理'
  },
  request_records: {
    en: 'Request Records',
    zh: '请求记录'
  },
  search_requests: {
    en: 'Search requests...',
    zh: '搜索请求...'
  },
  filter_status: {
    en: 'Filter by status',
    zh: '按状态筛选'
  },
  all_statuses: {
    en: 'All Statuses',
    zh: '所有状态'
  },
  request_details: {
    en: 'Request Details',
    zh: '请求详情'
  },
  request_id: {
    en: 'Request ID',
    zh: '请求ID'
  },
  supplier: {
    en: 'Supplier',
    zh: '供应商'
  },
  product: {
    en: 'Product',
    zh: '产品'
  },
  contact_method: {
    en: 'Contact Method',
    zh: '联系方式'
  },
  send_date: {
    en: 'Send Date',
    zh: '发送日期'
  },
  response_deadline: {
    en: 'Response Deadline',
    zh: '响应截止日期'
  },
  response_progress: {
    en: 'Response Progress',
    zh: '响应进度'
  },
  request_content: {
    en: 'Request Content',
    zh: '请求内容'
  },
  request_attachments: {
    en: 'Request Attachments',
    zh: '请求附件'
  },
  download: {
    en: 'Download',
    zh: '下载'
  },
  supplier_response: {
    en: 'Supplier Response',
    zh: '供应商响应'
  },
  send_reminder: {
    en: 'Send Reminder',
    zh: '发送提醒'
  },
  export_details: {
    en: 'Export Details',
    zh: '导出详情'
  },
  cancel_request: {
    en: 'Cancel Request',
    zh: '取消请求'
  },
  select_request_view_details: {
    en: 'Select a Request to View Details',
    zh: '选择请求查看详情'
  },
  select_request_description: {
    en: 'Click on any request from the list on the left to view its details and manage the request status.',
    zh: '点击左侧列表中的任何请求，查看其详细信息并管理请求状态。'
  }
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
});

// Provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize with browser language or fallback to English
  const getBrowserLanguage = (): Language => {
    const browserLang = navigator.language.split('-')[0];
    return browserLang === 'zh' ? 'zh' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage());

  // Translation function
  const t = useCallback(
    (key: string): string => {
      const translation = translations[key];
      if (!translation) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
      return translation[language];
    },
    [language]
  );

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
