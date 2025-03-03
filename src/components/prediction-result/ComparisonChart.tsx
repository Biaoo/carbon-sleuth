
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ErrorBar,
  Cell,
} from 'recharts';
import { Info } from 'lucide-react';

interface ChartDataItem {
  name: string;
  value: number;
  error?: number;
  fill?: string;
  highlight?: boolean;
}

interface ComparisonChartProps {
  data: ChartDataItem[];
  height?: number | string;
  yAxisLabel?: string;
}

export const ComparisonChart: React.FC<ComparisonChartProps> = ({
  data,
  height = "100%",
  yAxisLabel = 'kg CO₂e/件',
}) => {
  // Highlight the current product with red, lowest value with green, and others with neutral colors
  const processedData = data.map(item => {
    // Default to neutral color
    let fill = "#64748b"; // neutral gray
    
    // Highlight current product in red
    if (item.highlight) {
      fill = "#ef4444"; // red
    }
    
    // Find the lowest value item (excluding the current product)
    const lowestValue = Math.min(...data.filter(d => !d.highlight).map(d => d.value));
    
    // Highlight the lowest value in green
    if (!item.highlight && item.value === lowestValue) {
      fill = "#22c55e"; // green
    }
    
    return {
      ...item,
      fill: item.fill || fill
    };
  });

  return (
    <div className="h-full">
      <div style={{ height: height }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={(props) => {
                const { x, y, payload } = props;
                return (
                  <text
                    x={x}
                    y={y + 12}
                    textAnchor="middle"
                    fill="#666"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: -15 }} />
            <Tooltip formatter={(value) => [`${value} ${yAxisLabel}`, '碳足迹']} />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="value"
              name="碳足迹值"
            >
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
              <ErrorBar dataKey="error" width={4} strokeWidth={2} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center mt-2 text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1" />
        误差棒表示碳足迹计算的不确定度范围
      </div>
    </div>
  );
};

export default ComparisonChart;
