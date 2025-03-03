
import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Info, TrendingUp, TrendingDown } from 'lucide-react';

interface ChartDataItem {
  name: string;
  value: number;
  error?: number;
  fill?: string;
  highlight?: boolean;
  id?: string;
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
  const navigate = useNavigate();
  
  // Find the highest value among all items
  const highestValue = Math.max(...data.map(d => d.value));
  
  // Find the lowest value among competitor products (excluding the current product)
  const lowestCompetitorValue = Math.min(...data.filter(d => !d.highlight).map(d => d.value));
  
  // Process data with enhanced visual indicators
  const processedData = data.map(item => {
    // Default to neutral color
    let fill = "#64748b"; // neutral gray
    
    // Highlight current product - if it's also the highest value, use a more prominent red
    if (item.highlight) {
      fill = item.value === highestValue ? "#dc2626" : "#ef4444"; // brighter red for highest
    }
    
    // Highlight the lowest competitor value in green
    if (!item.highlight && item.value === lowestCompetitorValue) {
      fill = "#22c55e"; // green
    }
    
    return {
      ...item,
      fill: item.fill || fill
    };
  });

  // Handle bar click to navigate to the corresponding prediction result
  const handleBarClick = (data: any) => {
    const originalData = processedData[data.index];
    if (originalData && originalData.id && !originalData.highlight) {
      navigate(`/prediction-result/${originalData.id}`);
    }
  };

  // Custom tooltip to show if item is clickable
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const originalData = processedData.find(item => item.name === label);
      const isClickable = originalData && originalData.id && !originalData.highlight;
      
      return (
        <div className="bg-white p-2 border rounded shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm">{`${payload[0].value} ${yAxisLabel}`}</p>
          {isClickable && (
            <p className="text-xs text-blue-600 mt-1">点击查看详情</p>
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
              dataKey="name"
              tick={(props) => {
                const { x, y, payload } = props;
                const item = processedData.find(d => d.name === payload.value);
                const isHighest = item && item.value === highestValue;
                const isLowest = item && item.value === lowestCompetitorValue;
                const isClickable = item && item.id && !item.highlight;
                
                return (
                  <g>
                    <text
                      x={x}
                      y={y + 12}
                      textAnchor="middle"
                      fill={isClickable ? "#3b82f6" : "#666"}
                      fontSize={12}
                      fontWeight={isHighest || isLowest ? "bold" : "normal"}
                      className={isClickable ? "underline" : ""}
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
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft', offset: -15 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="value"
              name="碳足迹值"
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                  cursor={entry.id && !entry.highlight ? "pointer" : "default"}
                />
              ))}
              <ErrorBar dataKey="error" width={4} strokeWidth={2} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center mt-6 text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1" />
        误差棒表示碳足迹计算的不确定度范围
        <span className="ml-4 flex items-center">
          <TrendingUp className="h-4 w-4 mr-1 text-red-600" />
          最高值
        </span>
        <span className="ml-3 flex items-center">
          <TrendingDown className="h-4 w-4 mr-1 text-green-600" />
          最低值
        </span>
      </div>
    </div>
  );
};

export default ComparisonChart;
