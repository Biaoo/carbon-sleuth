
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  BarChart2, 
  Leaf, 
  Menu, 
  X,
  Globe,
  User,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), path: '/', icon: <Leaf className="h-4 w-4" /> },
    { name: t('product_search'), path: '/search', icon: <Search className="h-4 w-4" /> },
    { name: t('workspace'), path: '/workspace', icon: <Briefcase className="h-4 w-4" /> },
    { name: t('low_carbon_recommendations'), path: '/recommendation', icon: <Leaf className="h-4 w-4" /> },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-subtle py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="font-display text-xl font-semibold">CarbonSleuth</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary text-foreground/80 hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Right Side - User & Lang Switch */}
          <div className="hidden md:flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-sm">
                  <Globe className="h-4 w-4 mr-1" />
                  {language === 'zh' ? '中文' : 'English'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage('zh')}>
                  中文
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="text-sm">
              <User className="h-4 w-4 mr-1" />
              {t('login')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white animate-fade-in border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2.5 rounded-md text-base font-medium flex items-center ${
                  location.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-secondary text-foreground/80 hover:text-foreground'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </Link>
            ))}
            <div className="pt-2 flex space-x-2 px-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="text-sm flex-1">
                    <Globe className="h-4 w-4 mr-1" />
                    {language === 'zh' ? '中文' : 'English'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage('zh')}>
                    中文
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="ghost" size="sm" className="text-sm flex-1">
                <User className="h-4 w-4 mr-1" />
                {t('login')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
