
import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const { t, language } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-eco-green/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-data-blue/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 pt-24 pb-16 md:pt-36 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-3 py-1 mb-6 bg-primary/10 text-primary rounded-full text-sm font-medium animate-fade-in">
            {t('hero_badge')}
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in [animation-delay:150ms]">
            <span className="block">{t('hero_title_1')}</span>
            <span className="block mt-2 text-gradient-blue-green">{t('hero_title_2')}</span>
          </h1>
          
          <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in [animation-delay:250ms]">
            {t('hero_description')}
          </p>
          
          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10 animate-fade-in [animation-delay:350ms]">
            <div className="flex h-14 rounded-full overflow-hidden border border-border shadow-sm focus-within:ring-2 focus-within:ring-primary/20 bg-white">
              <div className="flex items-center pl-5">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('search_placeholder')}
                className="flex-1 h-full px-4 bg-transparent focus:outline-none text-foreground"
              />
              <button
                type="submit"
                className="h-full px-6 bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center"
              >
                <span>{t('search_button')}</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
          
          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 animate-fade-in [animation-delay:450ms]">
            {t('tags').map((tag, index) => (
              <button
                key={index}
                className="px-3 py-1.5 text-sm bg-white border border-border rounded-full hover:bg-secondary/80 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:550ms]">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-7 h-12" 
              onClick={() => navigate('/inference')}
            >
              {t('start_prediction')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              variant="outline"
              className="rounded-full px-7 h-12"
              onClick={() => navigate('/recommendation')}
            >
              {t('view_recommendations')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
