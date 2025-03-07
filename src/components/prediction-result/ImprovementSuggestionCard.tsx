
import React, { useState } from 'react';
import { Leaf, TrendingDown, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ImprovementSuggestion, BilingualText } from './types';

interface ImprovementSuggestionCardProps {
  suggestion: ImprovementSuggestion;
}

export const ImprovementSuggestionCard: React.FC<ImprovementSuggestionCardProps> = ({
  suggestion
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t, language } = useLanguage();
  
  // Helper function to get the correct language text
  const getLocalizedText = (text: string | BilingualText): string => {
    if (typeof text === 'string') return text;
    return language === 'zh' ? text.zh : text.en;
  };
  
  // Difficulty icon mapping with translated labels
  const difficultyIcons = {
    easy: { icon: <Leaf className="h-4 w-4 text-green-500" />, label: t('improvement_difficulty_easy') },
    medium: { icon: <TrendingDown className="h-4 w-4 text-amber-500" />, label: t('improvement_difficulty_medium') },
    hard: { icon: <AlertTriangle className="h-4 w-4 text-red-500" />, label: t('improvement_difficulty_hard') },
  };
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <div 
        className="p-4 bg-muted/30 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center">
          {difficultyIcons[suggestion.difficulty].icon}
          <span className="font-medium ml-2">{getLocalizedText(suggestion.title)}</span>
          <Badge className="ml-3 bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
            {t('potential_reduction')} {suggestion.reduction} kg CO₂e
          </Badge>
        </div>
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2">
            {difficultyIcons[suggestion.difficulty].label}
          </Badge>
          <Badge variant="outline">
            {getLocalizedText(suggestion.timeline)}
          </Badge>
          {expanded ? (
            <ChevronUp className="h-5 w-5 ml-2 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 ml-2 text-muted-foreground" />
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t">
          <p>{getLocalizedText(suggestion.description)}</p>
        </div>
      )}
    </div>
  );
};

export default ImprovementSuggestionCard;
