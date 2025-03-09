import React, { useEffect, useState } from 'react';
import { BarChart2, Users, Building, Leaf } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
const bilingual = (zh: string, en: string) => ({ zh, en });


const stats = [
  {
    icon: <BarChart2 className="h-6 w-6 text-data-blue" />,
    value: 3570,
    label: bilingual('已分析产品数量', 'Analyzed Product Count'),
    suffix: '+',
    increment: 42
  },
  {
    icon: <Building className="h-6 w-6 text-tech-purple" />,
    value: 18,
    label: bilingual('覆盖行业数量', 'Industry Coverage Count'),
    suffix: '',
    increment: 1
  },
  {
    icon: <Leaf className="h-6 w-6 text-eco-green" />,
    value: 25,
    label: bilingual('平均减碳潜力', 'Average Carbon Reduction Potential'),
    suffix: '%',
    increment: 0.4
  },
  {
    icon: <Users className="h-6 w-6 text-action-orange" />,
    value: 98,
    label: bilingual('用户满意度', 'User Satisfaction Rate'),
    suffix: '%',
    increment: 0.1
  }
];

const Stats = () => {
  const { language } = useLanguage();
  const [animatedStats, setAnimatedStats] = useState(stats.map(stat => ({
    ...stat,
    displayValue: 0
  })));
  

  useEffect(() => {
    let mounted = true;
    const increment = () => {
      if (!mounted) return;
      
      setAnimatedStats(prev => 
        prev.map((stat, index) => {
          const targetValue = stats[index].value;
          const currentValue = stat.displayValue;
          
          // If we've reached the target, stop animating
          if (currentValue >= targetValue) {
            return { ...stat, displayValue: targetValue };
          }
          
          // Calculate increment based on magnitude of the target value
          const magnitude = Math.max(1, Math.floor(Math.log10(targetValue)));
          const step = Math.max(1, Math.floor(targetValue / (25 * magnitude)));
          
          const newValue = Math.min(
            targetValue, 
            currentValue + step
          );
          
          return { ...stat, displayValue: newValue };
        })
      );
      
      // Check if all animations are complete
      const allComplete = animatedStats.every(
        (stat, index) => stat.displayValue >= stats[index].value
      );
      
      if (!allComplete) {
        requestAnimationFrame(increment);
      }
    };
    
    // Start the animation
    requestAnimationFrame(increment);
    
    return () => {
      mounted = false;
    };
  }, []);
  
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {animatedStats.map((stat, index) => (
            <div 
              key={index}
              className="p-6 bg-white border border-border rounded-xl shadow-subtle flex items-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                {stat.icon}
              </div>
              <div>
                <div className="flex items-end">
                  <span className="text-3xl font-bold">{Math.floor(stat.displayValue)}</span>
                  <span className="text-xl font-semibold">{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {typeof stat.label === 'string' ? stat.label : language === 'zh' ? stat.label.zh : stat.label.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
