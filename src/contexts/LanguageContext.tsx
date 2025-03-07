
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Available languages
export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
export const translations = {
  zh: {
    // Navbar
    'home': '首页',
    'product_search': '产品搜索',
    'workspace': '工作台',
    'low_carbon_recommendations': '低碳推荐',
    'login': '登录',
    
    // Hero section
    'hero_badge': '可持续未来的智能选择',
    'hero_title_1': '智能分析产品碳足迹',
    'hero_title_2': '引领绿色供应链革新',
    'hero_description': '通过AI驱动的精准碳足迹分析，帮助企业优化供应链，实现可持续发展目标，提升市场竞争力。',
    'search_placeholder': '搜索产品或供应商...',
    'search_button': '搜索',
    'tags': ['电子产品', '纺织品', '食品饮料', '建筑材料', '包装材料'],
    'start_prediction': '开始预测产品碳足迹',
    'view_recommendations': '查看低碳供应商推荐',
    
    // Features section
    'core_features': '核心功能',
    'features_description': '通过先进的AI技术和专业的碳足迹分析方法，我们为企业提供全方位的低碳转型解决方案',
    'feature_search_title': '产品碳足迹搜索与浏览',
    'feature_search_desc': '快速搜索产品和供应商的碳足迹数据，清晰了解数据来源，获取相关低碳建议。',
    'feature_prediction_title': '产品碳足迹预测',
    'feature_prediction_desc': '基于AI推理技术，对产品碳足迹进行精准预测，生成详细分析报告和可视化结果。',
    'feature_comparison_title': '竞品碳足迹对比',
    'feature_comparison_desc': '多维度比较竞争对手产品的碳足迹表现，识别市场优势和优化空间。',
    'feature_data_request_title': '供应商数据请求',
    'feature_data_request_desc': '一键生成专业的数据请求，通过多种渠道与供应商高效沟通，获取真实碳足迹数据。',
    'feature_recommendation_title': '低碳供应商推荐',
    'feature_recommendation_desc': '智能推荐碳足迹表现优异的供应商，展示减碳亮点和最佳实践案例。',
    
    // Call to Action section
    'cta_title': '开始您的低碳供应链之旅',
    'cta_description': '立即使用我们的AI驱动碳足迹分析工具，挖掘减碳潜力，发现商业机遇，引领可持续发展。',
    'search_products': '搜索产品碳足迹',
    
    // Recent Products section
    'recent_products_title': '最新产品碳足迹',
    'recent_products_desc': '浏览最新添加的产品碳足迹数据，掌握行业绿色发展动态',
    'view_all': '查看全部',
    'actual_data': '实际数据',
    'prediction_result': '预测结果',
    'details': '详情',
    
    // Low Carbon Recommendations section
    'low_carbon_suppliers_title': '优秀低碳供应商推荐',
    'low_carbon_suppliers_desc': '发现碳足迹表现卓越的供应商，助力绿色供应链建设',
    'view_all_recommendations': '查看全部推荐',
    'carbon_footprint_rating': '碳足迹评分',
    'low_carbon_highlights': '低碳亮点',
    'view_supplier_details': '查看供应商详情',
    
    // Footer
    'company_description': '专注于提供产品碳足迹分析和环保供应链优化的先进解决方案。让可持续发展成为每个企业的竞争优势。',
    'company_address': '上海市浦东新区张江高科技园区',
    'quick_links': '快速链接',
    'lca_inference': 'LCA模型推理',
    'data_request': '数据请求',
    'resource_center': '资源中心',
    'carbon_footprint_wiki': '碳足迹百科',
    'industry_reports': '行业报告',
    'best_practices': '最佳实践',
    'policy_updates': '政策动态',
    'faq': '常见问题',
    'subscribe': '订阅动态',
    'subscribe_desc': '订阅我们的新闻邮件，及时了解最新的可持续发展趋势和产品更新。',
    'email_placeholder': '您的邮箱地址',
    'subscribe_button': '订阅',
    'privacy_policy': '隐私政策',
    'terms_of_use': '使用条款',
    'about_us': '关于我们',
    
    // Comparison Chart
    'uncertainty_range': '误差棒表示碳足迹计算的不确定度范围',
    'industry_benchmark': '行业基准',
    'lowest_competitor': '最低竞品',
    
    // Prediction Result
    'prediction_result_badge': '预测结果',
    'prediction_date': '预测日期',
    'copy_link': '复制链接',
    'share': '分享',
    'export_report': '导出报告',
    'request_supplier_data': '请求供应商实际数据',
    'request_data_tooltip': '预测数据只是基于现有信息的估算。请求供应商提供实际数据，以获得更精确的碳足迹分析。',
    'product_info': '产品详细信息',
    'reference_sources': '参考来源',
    
    // Workspace Request Management
    'request_management': '请求管理',
    'request_records': '请求记录',
    'search_requests': '搜索请求...',
    'filter_status': '状态筛选',
    'all_statuses': '全部状态',
    'request_details': '请求详情',
    'request_id': '请求 ID',
    'supplier': '供应商',
    'product': '产品',
    'contact_method': '联系方式',
    'send_date': '发送日期',
    'response_deadline': '响应截止日期',
    'response_progress': '响应进度',
    'request_content': '请求内容',
    'request_attachments': '请求附件',
    'download': '下载',
    'supplier_response': '供应商响应',
    'send_reminder': '发送提醒',
    'export_details': '导出详情',
    'cancel_request': '取消请求',
    'select_request_view_details': '选择请求查看详情',
    'select_request_description': '从左侧列表中选择一个请求记录，查看详细信息和供应商响应',
    
    // Workspace Data Collections
    'data_collections': '数据集合',
    'product_carbon_data': '产品碳足迹数据',
    'production_process_data': '生产工艺数据',
    'last_updated': '最后更新',
    'view': '查看',
    'product_carbon_data_desc': '包含50个不同产品的碳足迹数据',
    'production_process_data_desc': '包含30种不同生产工艺的能耗数据',
    
    // Search Page
    'product_carbon_footprint_search': '产品碳足迹搜索',
    'search_product_supplier_category': '搜索产品名称、供应商或类别...',
    'filter': '筛选',
    'filter_and_sort': '筛选与排序',
    'industry': '行业',
    'data_type': '数据类型',
    'sort_by': '排序方式',
    'clear_filters': '清除筛选',
    'applied_filters': '已应用筛选',
    'search': '搜索',
    'sort': '排序',
    'clear_all': '清除全部',
    'found': '找到',
    'results': '个结果',
    'no_results_found': '未找到相关结果',
    'try_adjusting_search': '尝试调整搜索条件或筛选选项，也可以使用我们的预测功能生成新的碳足迹数据。',
    'start_new_prediction': '开始新的预测',
    'related_supplier_recommendations': '相关供应商推荐',
    'product_count': '产品数量',
    
    // Workspace General
    'return_to_home': '返回主页',
    'return': '返回',
    'menu': '菜单',
    'workspace_modules': '工作台模块',
    'function_modules': '功能模块',
    'pro_features': '专业版功能',
    'pro_features_desc': '使用专业版解锁更多高级功能与数据分析',
    'upgrade_to_pro': '升级专业版',
    'close': '关闭',
    
    // Workspace Inference
    'carbon_footprint_prediction': '碳足迹预测',
    'new_prediction': '新建预测',
    'history_records': '历史记录',
    'in_progress': '进行中',
    'no_active_predictions': '当前没有进行中的预测任务',
    'prediction_history': '预测历史记录',
    'history_prediction_list': '历史预测列表',
    'view_details': '查看详情',
    
    // Workspace Data Request
    'data_request': '数据请求',
    'new_request': '新建请求',
    'historical_requests': '历史请求',
    'redirect_from_prediction': '从预测结果页面跳转',
    'creating_data_request': '您正在为',
    'of_supplier': '的产品',
    'creating_data_request_2': '创建数据请求。',
    'prefilled_info': '我们已为您预填了部分信息，请补充完整其余内容。',
  },
  en: {
    // Navbar
    'home': 'Home',
    'product_search': 'Product Search',
    'workspace': 'Workspace',
    'low_carbon_recommendations': 'Low Carbon',
    'login': 'Login',
    
    // Hero section
    'hero_badge': 'Smart Choice for a Sustainable Future',
    'hero_title_1': 'Intelligent Product Carbon Footprint Analysis',
    'hero_title_2': 'Leading Green Supply Chain Innovation',
    'hero_description': 'Through AI-driven precise carbon footprint analysis, we help companies optimize supply chains, achieve sustainable development goals, and enhance market competitiveness.',
    'search_placeholder': 'Search products or suppliers...',
    'search_button': 'Search',
    'tags': ['Electronics', 'Textiles', 'Food & Beverage', 'Building Materials', 'Packaging'],
    'start_prediction': 'Start Product Carbon Prediction',
    'view_recommendations': 'View Low-Carbon Suppliers',
    
    // Features section
    'core_features': 'Core Features',
    'features_description': 'Using advanced AI technology and professional carbon footprint analysis methods, we provide comprehensive low-carbon transformation solutions for enterprises',
    'feature_search_title': 'Carbon Footprint Search & Browse',
    'feature_search_desc': 'Quickly search product and supplier carbon footprint data, clearly understand data sources, and get relevant low-carbon recommendations.',
    'feature_prediction_title': 'Carbon Footprint Prediction',
    'feature_prediction_desc': 'Based on AI inference technology, precisely predict product carbon footprints, generating detailed analysis reports and visualization results.',
    'feature_comparison_title': 'Competitor Carbon Comparison',
    'feature_comparison_desc': 'Compare competitors\' carbon footprint performance in multiple dimensions, identifying market advantages and optimization opportunities.',
    'feature_data_request_title': 'Supplier Data Requests',
    'feature_data_request_desc': 'Generate professional data requests with one click, communicate efficiently with suppliers through multiple channels, and obtain real carbon footprint data.',
    'feature_recommendation_title': 'Low Carbon Supplier Recommendations',
    'feature_recommendation_desc': 'Intelligently recommend suppliers with excellent carbon footprint performance, showcasing carbon reduction highlights and best practice cases.',
    
    // Call to Action section
    'cta_title': 'Start Your Low-Carbon Supply Chain Journey',
    'cta_description': 'Use our AI-driven carbon footprint analysis tools now to uncover carbon reduction potential, discover business opportunities, and lead sustainable development.',
    'search_products': 'Search Product Carbon Footprints',
    
    // Recent Products section
    'recent_products_title': 'Latest Carbon Footprints',
    'recent_products_desc': 'Browse the latest added product carbon footprint data to keep up with green development trends in the industry',
    'view_all': 'View All',
    'actual_data': 'Actual Data',
    'prediction_result': 'Prediction Result',
    'details': 'Details',
    
    // Low Carbon Recommendations section
    'low_carbon_suppliers_title': 'Excellent Low-Carbon Suppliers',
    'low_carbon_suppliers_desc': 'Discover suppliers with outstanding carbon footprint performance to support green supply chain construction',
    'view_all_recommendations': 'View All Recommendations',
    'carbon_footprint_rating': 'Carbon Footprint Rating',
    'low_carbon_highlights': 'Low Carbon Highlights',
    'view_supplier_details': 'View Supplier Details',
    
    // Footer
    'company_description': 'Focused on providing advanced solutions for product carbon footprint analysis and environmentally friendly supply chain optimization. Making sustainable development a competitive advantage for every business.',
    'company_address': 'Zhangjiang Hi-Tech Park, Pudong New Area, Shanghai',
    'quick_links': 'Quick Links',
    'lca_inference': 'LCA Model Inference',
    'data_request': 'Data Request',
    'resource_center': 'Resource Center',
    'carbon_footprint_wiki': 'Carbon Footprint Wiki',
    'industry_reports': 'Industry Reports',
    'best_practices': 'Best Practices',
    'policy_updates': 'Policy Updates',
    'faq': 'FAQ',
    'subscribe': 'Subscribe',
    'subscribe_desc': 'Subscribe to our newsletter to stay updated on the latest sustainable development trends and product updates.',
    'email_placeholder': 'Your email address',
    'subscribe_button': 'Subscribe',
    'privacy_policy': 'Privacy Policy',
    'terms_of_use': 'Terms of Use',
    'about_us': 'About Us',
    
    // Comparison Chart
    'uncertainty_range': 'Error bars represent the uncertainty range of carbon footprint calculation',
    'industry_benchmark': 'Industry Benchmark',
    'lowest_competitor': 'Lowest Competitor',
    
    // Prediction Result
    'prediction_result_badge': 'Prediction Result',
    'prediction_date': 'Prediction Date',
    'copy_link': 'Copy Link',
    'share': 'Share',
    'export_report': 'Export Report',
    'request_supplier_data': 'Request Supplier Data',
    'request_data_tooltip': 'The prediction data is only an estimate based on existing information. Request actual data from suppliers for more accurate carbon footprint analysis.',
    'product_info': 'Product Information',
    'reference_sources': 'Reference Sources',
    
    // Workspace Request Management
    'request_management': 'Request Management',
    'request_records': 'Request Records',
    'search_requests': 'Search requests...',
    'filter_status': 'Filter by Status',
    'all_statuses': 'All Statuses',
    'request_details': 'Request Details',
    'request_id': 'Request ID',
    'supplier': 'Supplier',
    'product': 'Product',
    'contact_method': 'Contact Method',
    'send_date': 'Send Date',
    'response_deadline': 'Response Deadline',
    'response_progress': 'Response Progress',
    'request_content': 'Request Content',
    'request_attachments': 'Request Attachments',
    'download': 'Download',
    'supplier_response': 'Supplier Response',
    'send_reminder': 'Send Reminder',
    'export_details': 'Export Details',
    'cancel_request': 'Cancel Request',
    'select_request_view_details': 'Select a Request to View Details',
    'select_request_description': 'Select a request record from the list on the left to view detailed information and supplier responses',
    
    // Workspace Data Collections
    'data_collections': 'Data Collections',
    'product_carbon_data': 'Product Carbon Footprint Data',
    'production_process_data': 'Production Process Data',
    'last_updated': 'Last Updated',
    'view': 'View',
    'product_carbon_data_desc': 'Contains carbon footprint data for 50 different products',
    'production_process_data_desc': 'Contains energy consumption data for 30 different production processes',
    
    // Search Page
    'product_carbon_footprint_search': 'Product Carbon Footprint Search',
    'search_product_supplier_category': 'Search product name, supplier or category...',
    'filter': 'Filter',
    'filter_and_sort': 'Filter & Sort',
    'industry': 'Industry',
    'data_type': 'Data Type',
    'sort_by': 'Sort By',
    'clear_filters': 'Clear Filters',
    'applied_filters': 'Applied Filters',
    'search': 'Search',
    'sort': 'Sort',
    'clear_all': 'Clear All',
    'found': 'Found',
    'results': 'results',
    'no_results_found': 'No Results Found',
    'try_adjusting_search': 'Try adjusting your search criteria or filter options, or use our prediction feature to generate new carbon footprint data.',
    'start_new_prediction': 'Start New Prediction',
    'related_supplier_recommendations': 'Related Supplier Recommendations',
    'product_count': 'Product Count',
    
    // Workspace General
    'return_to_home': 'Return to Home',
    'return': 'Return',
    'menu': 'Menu',
    'workspace_modules': 'Workspace Modules',
    'function_modules': 'Function Modules',
    'pro_features': 'Pro Features',
    'pro_features_desc': 'Upgrade to Pro to unlock more advanced features and data analysis',
    'upgrade_to_pro': 'Upgrade to Pro',
    'close': 'Close',
    
    // Workspace Inference
    'carbon_footprint_prediction': 'Carbon Footprint Prediction',
    'new_prediction': 'New Prediction',
    'history_records': 'History Records',
    'in_progress': 'In Progress',
    'no_active_predictions': 'No active prediction tasks currently',
    'prediction_history': 'Prediction History',
    'history_prediction_list': 'History Prediction List',
    'view_details': 'View Details',
    
    // Workspace Data Request
    'data_request': 'Data Request',
    'new_request': 'New Request',
    'historical_requests': 'Historical Requests',
    'redirect_from_prediction': 'Redirected from Prediction Result',
    'creating_data_request': 'You are creating a data request for',
    'of_supplier': 'of',
    'creating_data_request_2': '.',
    'prefilled_info': 'We have pre-filled some information for you, please complete the remaining content.',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or use browser language
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'zh'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Try to detect from browser
    const browserLang = navigator.language.toLowerCase();
    return browserLang.startsWith('zh') ? 'zh' : 'en';
  };
  
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };
  
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

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
