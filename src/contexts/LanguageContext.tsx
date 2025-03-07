
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
    'quick_links': '快速链接',
    'resource_center': '资源中心',
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
    'quick_links': 'Quick Links',
    'resource_center': 'Resource Center',
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
