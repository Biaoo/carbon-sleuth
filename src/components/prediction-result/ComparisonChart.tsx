
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ErrorBar,
  Cell,
  ReferenceLine,
} from 'recharts';
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BilingualText, ChartDataItem } from './types';

interface ComparisonChartProps {
  data: ChartDataItem[];
  height?: number | string;
  yAxisLabel?: string;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  data,
  height = "100%",
  yAxisLabel = 'kg CO₂e/Unit',
}) => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  // Helper function to get the correct language text
  const getLocalizedText = (text: string | BilingualText): string => {
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  // Process the data to ensure name is a string for recharts
  const formattedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      displayName: getLocalizedText(item.name)
    }));
  }, [data, language]);
  
  const currentProduct = formattedData.find(d => d.highlight);
  const currentProductValue = currentProduct?.value || 0;
  
  const processedData = useMemo(() => {
    return formattedData.map(item => {
      let fill;
      
      // Determine color based on itemType or fallback to previous logic
      const itemType = item.itemType || (
        item.highlight ? 'current' : 
        item.displayName.includes(language === 'zh' ? '行业' : 'Industry') ? 'industry' : 
        'competitor'
      );
      
      if (itemType === 'current' || item.highlight) {
        fill = "#ea384c"; // Current product: red
      } else if (itemType === 'industry') {
        fill = "#94a3b8"; // Industry benchmarks: neutral slate color
      } else if (itemType === 'competitor') {
        if (item.value > currentProductValue) {
          fill = "#F1F0FB"; // Higher carbon footprint competitors: light gray
        } else if (item.value < currentProductValue) {
          fill = "#22c55e"; // Lower carbon footprint competitors: more obvious green
        }
      } else {
        fill = "#8E9196"; // Other cases: neutral gray
      }
      
      return {
        ...item,
        itemType: itemType || (item.highlight ? 'current' : 
          item.displayName.includes(language === 'zh' ? '行业' : 'Industry') ? 'industry' : 'competitor'),
        fill: item.fill || fill
      };
    });
  }, [formattedData, currentProductValue, language]);

  // Find industry benchmark and lowest competitor values for reference lines
  const industryBenchmark = useMemo(() => {
    const industryItems = processedData.filter(item => 
      item.itemType === 'industry' || 
      item.displayName.includes(language === 'zh' ? '行业' : 'Industry')
    );
    return industryItems.length > 0 ? 
      industryItems.reduce((min, item) => item.value < min.value ? item : min, industryItems[0]) : 
      null;
  }, [processedData, language]);
  
  const lowestCompetitor = useMemo(() => {
    const competitorItems = processedData.filter(item => 
      item.itemType === 'competitor' && 
      !item.highlight && 
      !(item.displayName.includes(language === 'zh' ? '行业' : 'Industry'))
    );
    return competitorItems.length > 0 ? 
      competitorItems.reduce((min, item) => item.value < min.value ? item : min, competitorItems[0]) : 
      null;
  }, [processedData, language]);

  const handleBarClick = (data: any) => {
    const originalData = processedData[data.index];
    if (originalData && originalData.id && !originalData.highlight) {
      navigate(`/prediction-result/${originalData.id}`);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const displayName = label;
      const originalData = processedData.find(item => item.displayName === displayName);
      const isClickable = originalData && originalData.id && !originalData.highlight;
      const isCurrent = originalData && originalData.highlight;
      const isLower = originalData && !originalData.highlight && originalData.value < currentProductValue;
      const isHigher = originalData && !originalData.highlight && originalData.value > currentProductValue;
      
      return (
        <div className="bg-white p-3 border rounded-lg shadow-md">
          <p className="text-sm font-semibold mb-1">{displayName}</p>
          <p className="text-sm">{`${payload[0].value} ${yAxisLabel}`}</p>
          {!isCurrent && (
            <p className={`text-xs mt-1 ${isLower ? 'text-green-600' : isHigher ? 'text-gray-500' : 'text-gray-600'}`}>
              {isLower ? t('compared_to_current') + ' ' : isHigher ? t('higher_than_current') + ' ' : ''}
              {Math.abs(((originalData?.value || 0) - currentProductValue) / currentProductValue * 100).toFixed(1)}%
            </p>
          )}
          {isClickable && (
            <p className="text-xs text-blue-600 mt-1 font-medium">{t('click_for_details')}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <div style={{ height: height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            onClick={handleBarClick}
            className="cursor-pointer"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="displayName"
              tick={(props) => {
                const { x, y, payload } = props;
                const item = processedData.find(d => d.displayName === payload.value);
                const isHighest = item && item.value === Math.max(...processedData.map(d => d.value));
                const isLowest = item && item.value === Math.min(...processedData.map(d => d.value));
                const isClickable = item && item.id && !item.highlight;
                const isCurrent = item && item.highlight;
                
                return (
                  <g>
                    <text
                      x={x}
                      y={y + 12}
                      textAnchor="middle"
                      fill={isClickable ? "#3b82f6" : "#666"}
                      fontSize={12}
                      fontWeight={isCurrent || isHighest || isLowest ? "bold" : "normal"}
                      className={isClickable ? "underline" : ""}
                    >
                      {payload.value}
                    </text>
                  </g>
                );
              }}
            />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: -15 }} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Reference lines for industry benchmark and lowest competitor */}
            {industryBenchmark && (
              <ReferenceLine 
                y={industryBenchmark.value} 
                stroke="#94a3b8" 
                strokeDasharray="3 3" 
                strokeWidth={1.5}
                label={{ 
                  value: `${t('industry_benchmark')}: ${industryBenchmark.value} ${yAxisLabel}`, 
                  position: 'insideBottomRight',
                  fill: '#94a3b8',
                  fontSize: 10
                }}
              />
            )}
            
            {lowestCompetitor && (
              <ReferenceLine 
                y={lowestCompetitor.value} 
                stroke="#22c55e" 
                strokeDasharray="3 3" 
                strokeWidth={1.5}
                label={{ 
                  value: `${t('lowest_competitor')}: ${lowestCompetitor.value} ${yAxisLabel}`, 
                  position: 'insideTopRight',
                  fill: '#22c55e',
                  fontSize: 10
                }}
              />
            )}
            
            <Bar
              dataKey="value"
              name={t('carbon_footprint_value')}
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                  stroke={entry.highlight ? "#ea384c" : entry.itemType === 'industry' ? "#94a3b8" : entry.value < currentProductValue ? "#22c55e" : "#8E9196"}
                  strokeWidth={entry.highlight ? 2 : 1}
                  cursor={entry.id && !entry.highlight ? "pointer" : "default"}
                />
              ))}
              <ErrorBar dataKey="error" width={4} strokeWidth={2} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center mt-6 text-sm text-muted-foreground gap-4">
        <div className="flex items-center">
          <Info className="h-4 w-4 mr-1" />
          {t('uncertainty_range_info')}
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
