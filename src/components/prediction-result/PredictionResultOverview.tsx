
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from '@/components/ui/card';
import ComparisonChart from './ComparisonChart';
import ProgressItem from './ProgressItem';
import { PredictionResultData, BilingualText, ChartDataItem } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PredictionResultOverviewProps {
  resultData: PredictionResultData;
}

const PredictionResultOverview: React.FC<PredictionResultOverviewProps> = ({
  resultData
}) => {
  const { t, language } = useLanguage();
  
  // Helper function to get localized text
  const getLocalizedText = (text: string | BilingualText): string => {
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  // Convert the chart data to properly typed ChartDataItem[]
  const chartData: ChartDataItem[] = resultData.comparativeAnalysis.chartData.map(item => ({
    name: item.name,
    value: item.value,
    error: item.error,
    highlight: item.highlight,
    fill: item.fill,
    itemType: item.itemType
  }));
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <BarChart2 className="h-5 w-5 mr-2 text-muted-foreground" />
            {t('carbon_footprint_prediction_result')}
          </CardTitle>
          {/* <CardDescription>{t('product_carbon_industry_comparison')}</CardDescription> */}
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-2">
            <span className="text-4xl font-bold">{resultData.carbonValue}</span>
            <span className="ml-2 text-muted-foreground">{resultData.unit}</span>
          </div>
          
          <div className="mt-6">
            <p className="mb-2 font-medium text-sm">{t('industry_comparison_analysis')}</p>
            <div className="h-72">
              <ComparisonChart data={chartData} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{t('main_component_analysis')}</CardTitle>
          <CardDescription>{t('carbon_footprint_composition')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {resultData.components.map((component, index) => (
              <ProgressItem 
                key={index} 
                name={getLocalizedText(component.name)} 
                value={component.value} 
                percentage={component.percentage} 
                unit={component.unit} 
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResultOverview;
