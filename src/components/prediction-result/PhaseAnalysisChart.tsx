
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { LifecyclePhase, BilingualText } from './types';
import { useLanguage } from '@/contexts/LanguageContext';

interface PhaseAnalysisChartProps {
  data: LifecyclePhase[];
}

export const PhaseAnalysisChart: React.FC<PhaseAnalysisChartProps> = ({ data }) => {
  const { language } = useLanguage();
  
  // Helper function to get localized text
  const getLocalizedText = (text: string | BilingualText): string => {
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  // Process data for the chart
  const processedData = data.map(phase => ({
    ...phase,
    name: getLocalizedText(phase.name),
    // Ensure value is a number
    value: typeof phase.value === 'number' ? phase.value : parseFloat(String(phase.value))
  }));
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={processedData}
        layout="vertical"
        margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis
          type="category"
          dataKey="name"
          width={120}
        />
        <Tooltip formatter={(value) => [`${value} ${processedData[0]?.unit || 'kg CO₂e'}`, '碳足迹']} />
        <Bar dataKey="value" name="碳足迹值" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PhaseAnalysisChart;
