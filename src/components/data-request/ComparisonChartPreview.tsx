
import React from 'react';
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
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CompetitorData {
  name: string;
  carbonValue: number;
  unit: string;
  difference: string;
}

interface BenchmarkData {
  name: string;
  value: number;
  unit: string;
}

interface ComparisonChartPreviewProps {
  competitorsData: CompetitorData[];
  industryBenchmarks: BenchmarkData[];
  height?: number | string;
}

const ComparisonChartPreview: React.FC<ComparisonChartPreviewProps> = ({ 
  competitorsData, 
  industryBenchmarks,
  height = 300
}) => {
  // Transform the data into the format needed for the chart
  const chartData = [
    ...competitorsData.map(comp => ({
      name: comp.name,
      value: Number(comp.carbonValue),
      // Extract numeric value from difference string for error bar
      error: Math.abs(Number(comp.difference.replace(/[^0-9.-]/g, ''))),
      fill: comp.difference.startsWith('-') ? '#22c55e' : '#ef4444',
    })),
    ...industryBenchmarks.map(bench => ({
      name: bench.name,
      value: bench.value,
      error: bench.value * 0.1, // Assuming 10% error for benchmarks
      fill: '#64748b',
    }))
  ];

  // Find the highest and lowest values
  const values = chartData.map(item => item.value);
  const highestValue = Math.max(...values);
  const lowestValue = Math.min(...values);

  // CustomTooltip component for better tooltips
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const unit = competitorsData.find(c => c.name === label)?.unit || 
                  industryBenchmarks.find(b => b.name === label)?.unit || 
                  'kg CO₂e';
      
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm">{`${payload[0].value} ${unit}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name"
            tick={(props) => {
              const { x, y, payload } = props;
              const item = chartData.find(d => d.name === payload.value);
              const isHighest = item && item.value === highestValue;
              const isLowest = item && item.value === lowestValue;
              
              return (
                <g>
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    fill="#666"
                    fontSize={12}
                    fontWeight={isHighest || isLowest ? "bold" : "normal"}
                  >
                    {payload.value}
                  </text>
                  {isHighest && (
                    <TrendingUp x={x + 25} y={y} className="h-4 w-4 text-red-600" />
                  )}
                  {isLowest && (
                    <TrendingDown x={x + 25} y={y} className="h-4 w-4 text-green-600" />
                  )}
                </g>
              );
            }}
          />
          <YAxis label={{ value: 'kg CO₂e', angle: -90, position: 'insideLeft', offset: -15 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" name="碳足迹值">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
            <ErrorBar dataKey="error" width={4} strokeWidth={2} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
        <span className="flex items-center mr-4">
          <TrendingUp className="h-4 w-4 mr-1 text-red-600" />
          最高值
        </span>
        <span className="flex items-center">
          <TrendingDown className="h-4 w-4 mr-1 text-green-600" />
          最低值
        </span>
      </div>
    </div>
  );
};

export default ComparisonChartPreview;
