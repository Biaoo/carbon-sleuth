
import React from 'react';
import { Search, BarChart2, LineChart, Mail, Leaf } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-6 w-6 text-data-blue" />,
    title: '产品碳足迹搜索与浏览',
    description: '快速搜索产品和供应商的碳足迹数据，清晰了解数据来源，获取相关低碳建议。'
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-data-blue" />,
    title: '产品碳足迹预测',
    description: '基于AI推理技术，对产品碳足迹进行精准预测，生成详细分析报告和可视化结果。'
  },
  {
    icon: <LineChart className="h-6 w-6 text-data-blue" />,
    title: '竞品碳足迹对比',
    description: '多维度比较竞争对手产品的碳足迹表现，识别市场优势和优化空间。'
  },
  {
    icon: <Mail className="h-6 w-6 text-data-blue" />,
    title: '供应商数据请求',
    description: '一键生成专业的数据请求，通过多种渠道与供应商高效沟通，获取真实碳足迹数据。'
  },
  {
    icon: <Leaf className="h-6 w-6 text-data-blue" />,
    title: '低碳供应商推荐',
    description: '智能推荐碳足迹表现优异的供应商，展示减碳亮点和最佳实践案例。'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-gradient-blue-green">核心功能</span>
          </h2>
          <p className="text-foreground/70 leading-relaxed">
            通过先进的AI技术和专业的碳足迹分析方法，我们为企业提供全方位的低碳转型解决方案
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
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
