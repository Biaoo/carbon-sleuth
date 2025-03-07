
import React from 'react';
import { Search, BarChart2, LineChart, Mail, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Search className="h-6 w-6 text-data-blue" />,
      titleKey: 'feature_search_title',
      descriptionKey: 'feature_search_desc'
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-data-blue" />,
      titleKey: 'feature_prediction_title',
      descriptionKey: 'feature_prediction_desc'
    },
    {
      icon: <LineChart className="h-6 w-6 text-data-blue" />,
      titleKey: 'feature_comparison_title',
      descriptionKey: 'feature_comparison_desc'
    },
    {
      icon: <Mail className="h-6 w-6 text-data-blue" />,
      titleKey: 'feature_data_request_title',
      descriptionKey: 'feature_data_request_desc'
    },
    {
      icon: <Leaf className="h-6 w-6 text-data-blue" />,
      titleKey: 'feature_recommendation_title',
      descriptionKey: 'feature_recommendation_desc'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient-blue-green">{t('core_features')}</span>
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            {t('features_description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-border shadow-subtle rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(feature.titleKey)}</h3>
              <p className="text-foreground/70">{t(feature.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
