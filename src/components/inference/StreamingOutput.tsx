
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Sparkles, Leaf, BarChart2, Cloud, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import MarkdownContent from '@/components/prediction-result/MarkdownContent';

interface StreamingOutputProps {
  progress: number;
  stage: string;
}

interface StreamLine {
  id: number;
  content: string;
  type: 'info' | 'data' | 'analysis' | 'result';
}

const StreamingOutput: React.FC<StreamingOutputProps> = ({ progress, stage }) => {
  const { t } = useLanguage();
  const [streamedLines, setStreamedLines] = useState<StreamLine[]>([]);
  const [processingOpen, setProcessingOpen] = useState(true);
  const [result, setResult] = useState<any | null>(null);
  const [processMarkdown, setProcessMarkdown] = useState<string>('');
  const [resultMarkdown, setResultMarkdown] = useState<string>('');

  // Generate streaming content based on the current progress
  useEffect(() => {
    const progressStages = {
      10: [
        { content: t('collecting_product_info'), type: 'info' },
        { content: t('analyzing_supplier_data'), type: 'info' }
      ],
      25: [
        { content: t('product_composition_analysis'), type: 'analysis' },
        { content: t('material_breakdown'), type: 'data' }
      ],
      40: [
        { content: t('processing_technical_data'), type: 'info' },
        { content: t('energy_consumption_analysis'), type: 'analysis' }
      ],
      55: [
        { content: t('competitor_product_comparison'), type: 'analysis' },
        { content: t('market_position_analysis'), type: 'data' }
      ],
      70: [
        { content: t('building_lca_model'), type: 'info' },
        { content: t('life_cycle_stages_identified'), type: 'analysis' }
      ],
      85: [
        { content: t('calculating_carbon_emissions'), type: 'data' },
        { content: t('footprint_calculation_complete'), type: 'result' }
      ],
      95: [
        { content: t('generating_report_summary'), type: 'info' },
        { content: t('optimization_opportunities_found'), type: 'analysis' }
      ],
      100: [
        { content: t('final_result_summary'), type: 'result' }
      ]
    };

    // Find the current content to add based on progress
    for (const [threshold, lines] of Object.entries(progressStages)) {
      if (progress >= parseInt(threshold) && !streamedLines.some(line => line.content === lines[0].content)) {
        const newLines = lines.map((line, index) => ({
          id: streamedLines.length + index + 1,
          content: line.content,
          type: line.type as 'info' | 'data' | 'analysis' | 'result'
        }));
        
        setStreamedLines(prev => [...prev, ...newLines]);
      }
    }
    
    // Generate process markdown text
    if (streamedLines.length > 0) {
      const processText = streamedLines.map(line => {
        let icon = '';
        switch (line.type) {
          case 'info': icon = 'ℹ️'; break;
          case 'data': icon = '📊'; break;
          case 'analysis': icon = '✨'; break;
          case 'result': icon = '🌱'; break;
        }
        return `- **${icon} ${line.content}**`;
      }).join('\n');
      
      setProcessMarkdown(processText);
    }

    // When we reach 100%, set the final result
    if (progress === 100) {
      const mockResult = {
        carbonFootprint: 42.8,
        unit: 'kg CO₂e',
        reductionPotential: 15,
        mainContributors: [
          { name: t('manufacturing'), percentage: 40 },
          { name: t('materials'), percentage: 30 },
          { name: t('transportation'), percentage: 20 },
          { name: t('packaging'), percentage: 10 }
        ]
      };
      
      setTimeout(() => {
        setResult(mockResult);
        
        // Set result markdown content
        const resultText = `
## ${t('carbon_footprint_result')}

### ${t('total_carbon_footprint')}
**${mockResult.carbonFootprint} ${mockResult.unit}** (${mockResult.reductionPotential}% ${t('reduction_potential')})

### ${t('main_contributors')}
1. **${mockResult.mainContributors[0].name}** (${mockResult.mainContributors[0].percentage}%)
1. **${mockResult.mainContributors[1].name}** (${mockResult.mainContributors[1].percentage}%)
1. **${mockResult.mainContributors[2].name}** (${mockResult.mainContributors[2].percentage}%)
1. **${mockResult.mainContributors[3].name}** (${mockResult.mainContributors[3].percentage}%)

## ${t('optimization_opportunities_found')}
- ${t('material_substitution')}
- ${t('energy_efficiency')}
- ${t('packaging_optimization')}
        `;
        
        setResultMarkdown(resultText);
      }, 500);
    }
  }, [progress, t, streamedLines]);

  if (streamedLines.length === 0) return null;

  const getIconForType = (type: string) => {
    switch (type) {
      case 'info': return <Cloud className="h-4 w-4 text-blue-500" />;
      case 'data': return <BarChart2 className="h-4 w-4 text-purple-500" />;
      case 'analysis': return <Sparkles className="h-4 w-4 text-amber-500" />;
      case 'result': return <Leaf className="h-4 w-4 text-green-500" />;
      default: return <Cloud className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Processing Section - Collapsible Markdown */}
      <Collapsible 
        open={processingOpen} 
        onOpenChange={setProcessingOpen} 
        className="w-full border rounded-lg overflow-hidden"
      >
        <div className="bg-secondary/30 p-3 flex items-center justify-between">
          <h3 className="text-sm font-medium flex items-center">
            <Zap className="mr-2 h-4 w-4 text-amber-500" />
            {t('processing_steps')}
          </h3>
          <CollapsibleTrigger className="p-1 rounded-md hover:bg-secondary/50 transition-colors">
            {processingOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="animate-accordion-down">
          <div className="p-4 bg-white/50">
            <MarkdownContent content={processMarkdown} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Result Section - Markdown */}
      {result && (
        <Card className="p-6 animate-fade-in border-2 border-primary/20 shadow-lg bg-gradient-to-br from-white to-primary/5">
          <MarkdownContent content={resultMarkdown} />
          
          <div className="mt-6 flex justify-end">
            <a 
              href="/prediction-result" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              {t('view_detailed_report')}
            </a>
          </div>
        </Card>
      )}
    </div>
  );
};

export default StreamingOutput;
