
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
  
  // Find the current product (highlighted one)
  const currentProduct = data.find(d => d.highlight);
  const currentProductValue = currentProduct?.value || 0;
  
  // Process data with enhanced visual indicators and colors
  const processedData = data.map(item => {
    // Define colors based on the requirements
    let fill;
    
    if (item.highlight) {
      // Current product: red
      fill = "#ea384c"; 
    } else if (item.value > currentProductValue) {
      // Higher carbon footprint than current product: light gray
      fill = "#F1F0FB"; 
    } else if (item.value < currentProductValue) {
      // Lower carbon footprint than current product: green
      fill = "#F2FCE2"; 
    } else {
      // Industry average/benchmark: neutral gray
      fill = "#8E9196"; 
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
      const isCurrent = originalData && originalData.highlight;
      const isLower = originalData && !originalData.highlight && originalData.value < currentProductValue;
      const isHigher = originalData && !originalData.highlight && originalData.value > currentProductValue;
      
      return (
        <div className="bg-white p-3 border rounded-lg shadow-md">
          <p className="text-sm font-semibold mb-1">{label}</p>
          <p className="text-sm">{`${payload[0].value} ${yAxisLabel}`}</p>
          {!isCurrent && (
            <p className={`text-xs mt-1 ${isLower ? 'text-green-600' : isHigher ? 'text-gray-500' : 'text-gray-600'}`}>
              {isLower ? '低于当前产品 ' : isHigher ? '高于当前产品 ' : ''}
              {Math.abs(((originalData?.value || 0) - currentProductValue) / currentProductValue * 100).toFixed(1)}%
            </p>
          )}
          {isClickable && (
            <p className="text-xs text-blue-600 mt-1 font-medium">点击查看详情</p>
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
                    {isHighest && (
                      <TrendingUp x={x + 25} y={y} className="h-4 w-4 text-gray-600" />
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
            <Legend 
              verticalAlign="top" 
              height={36} 
              formatter={(value, entry) => (
                <span style={{ color: '#666' }}>{value}</span>
              )}
            />
            <Bar
              dataKey="value"
              name="碳足迹值"
            >
              {processedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.fill} 
                  stroke={entry.highlight ? "#ea384c" : entry.value < currentProductValue ? "#22c55e" : "#8E9196"}
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
          误差棒表示碳足迹计算的不确定度范围
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-[#ea384c]" style={{borderRadius: '50%'}}></div>
            <span>当前产品</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-[#F2FCE2]" style={{borderRadius: '50%'}}></div>
            <span>低碳产品</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 mr-1 bg-[#F1F0FB]" style={{borderRadius: '50%'}}></div>
            <span>高碳产品</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonChart;
