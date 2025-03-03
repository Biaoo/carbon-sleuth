
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

interface PhaseData {
  name: string;
  value: number;
  percentage: number;
  unit?: string;
}

interface PhaseAnalysisChartProps {
  data: PhaseData[];
}

export const PhaseAnalysisChart: React.FC<PhaseAnalysisChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
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
        <Tooltip formatter={(value) => [`${value} kg CO₂e`, '碳足迹']} />
        <Bar dataKey="value" name="碳足迹值" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default PhaseAnalysisChart;
