
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search as SearchIcon, 
  Filter, 
  ArrowUpDown, 
  X, 
  ExternalLink, 
  BarChart2,
  Building,
  Star
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Mock data with translation support
const getProducts = (language: string) => [
  {
    id: 1,
    name: language === 'zh' ? '高性能锂电池' : 'High-Performance Lithium Battery',
    supplier: language === 'zh' ? '绿能科技有限公司' : 'GreenTech Co., Ltd.',
    category: language === 'zh' ? '电子元件' : 'Electronic Components',
    industry: language === 'zh' ? '电子制造' : 'Electronics Manufacturing',
    carbonFootprint: 12.5,
    unit: 'kg CO₂e/unit',
    dataType: language === 'zh' ? '实际数据' : 'Actual Data',
    date: '2023-05-15',
    image: 'https://images.unsplash.com/photo-1602920068685-a05c7e8ccb2d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    name: language === 'zh' ? '有机棉T恤' : 'Organic Cotton T-shirt',
    supplier: language === 'zh' ? '可持续时装集团' : 'Sustainable Fashion Group',
    category: language === 'zh' ? '纺织品' : 'Textiles',
    industry: language === 'zh' ? '纺织服装' : 'Textile & Apparel',
    carbonFootprint: 3.2,
    unit: 'kg CO₂e/unit',
    dataType: language === 'zh' ? '预测结果' : 'Prediction Result',
    date: '2023-06-02',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    name: language === 'zh' ? '可回收纸质包装' : 'Recyclable Paper Packaging',
    supplier: language === 'zh' ? '绿色包装技术公司' : 'Green Packaging Technologies',
    category: language === 'zh' ? '包装材料' : 'Packaging Materials',
    industry: language === 'zh' ? '包装' : 'Packaging',
    carbonFootprint: 0.8,
    unit: 'kg CO₂e/unit',
    dataType: language === 'zh' ? '实际数据' : 'Actual Data',
    date: '2023-06-10',
    image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    name: language === 'zh' ? '太阳能充电宝' : 'Solar Power Bank',
    supplier: language === 'zh' ? '新能源科技有限公司' : 'New Energy Technologies',
    category: language === 'zh' ? '电子产品' : 'Electronic Products',
    industry: language === 'zh' ? '电子制造' : 'Electronics Manufacturing',
    carbonFootprint: 5.6,
    unit: 'kg CO₂e/unit',
    dataType: language === 'zh' ? '预测结果' : 'Prediction Result',
    date: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1594549181032-e8923e7d74d5?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    name: language === 'zh' ? '可降解购物袋' : 'Biodegradable Shopping Bag',
    supplier: language === 'zh' ? '绿色材料有限公司' : 'Green Materials Co., Ltd.',
    category: language === 'zh' ? '包装材料' : 'Packaging Materials',
    industry: language === 'zh' ? '包装' : 'Packaging',
    carbonFootprint: 0.3,
    unit: 'kg CO₂e/unit',
    dataType: language === 'zh' ? '实际数据' : 'Actual Data',
    date: '2023-07-05',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 6,
    name: language === 'zh' ? '有机巧克力' : 'Organic Chocolate',
    supplier: language === 'zh' ? '生态食品公司' : 'Eco Foods Company',
    category: language === 'zh' ? '食品' : 'Food',
    industry: language === 'zh' ? '食品加工' : 'Food Processing',
    carbonFootprint: 2.1,
    unit: 'kg CO₂e/unit',
    dataType: language === 'zh' ? '预测结果' : 'Prediction Result',
    date: '2023-07-20',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=500&auto=format&fit=crop'
  },
];

// Recommended suppliers with translation support
const getRecommendedSuppliers = (language: string) => [
  {
    id: 1,
    name: language === 'zh' ? '绿能科技有限公司' : 'GreenTech Co., Ltd.',
    industry: language === 'zh' ? '电子元件' : 'Electronic Components',
    rating: 4.8,
    products: 15
  },
  {
    id: 2,
    name: language === 'zh' ? '可持续时装集团' : 'Sustainable Fashion Group',
    industry: language === 'zh' ? '纺织品' : 'Textiles',
    rating: 4.6,
    products: 28
  },
  {
    id: 3,
    name: language === 'zh' ? '绿色包装技术公司' : 'Green Packaging Technologies',
    industry: language === 'zh' ? '包装材料' : 'Packaging Materials',
    rating: 4.9,
    products: 12
  }
];

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(language === 'zh' ? '全部行业' : 'All Industries');
  const [selectedDataType, setSelectedDataType] = useState(language === 'zh' ? '全部数据' : 'All Data Types');
  const [selectedSort, setSelectedSort] = useState(language === 'zh' ? '最新添加' : 'Latest Added');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState(getProducts(language));
  const [recommendedSuppliers, setRecommendedSuppliers] = useState(getRecommendedSuppliers(language));
  const [filteredProducts, setFilteredProducts] = useState([...products]);

  // Update products and suppliers when language changes
  useEffect(() => {
    setProducts(getProducts(language));
    setRecommendedSuppliers(getRecommendedSuppliers(language));
    
    // Update filter options when language changes
    setSelectedIndustry(language === 'zh' ? '全部行业' : 'All Industries');
    setSelectedDataType(language === 'zh' ? '全部数据' : 'All Data Types');
    setSelectedSort(language === 'zh' ? '最新添加' : 'Latest Added');
  }, [language]);

  // Get industries based on current language
  const getIndustries = () => {
    if (language === 'zh') {
      return ['全部行业', '电子制造', '纺织服装', '包装', '食品加工', '建筑材料'];
    } else {
      return ['All Industries', 'Electronics Manufacturing', 'Textile & Apparel', 'Packaging', 'Food Processing', 'Building Materials'];
    }
  };

  // Get data types based on current language
  const getDataTypes = () => {
    if (language === 'zh') {
      return ['全部数据', '实际数据', '预测结果'];
    } else {
      return ['All Data Types', 'Actual Data', 'Prediction Result'];
    }
  };

  // Get sort options based on current language
  const getSortOptions = () => {
    if (language === 'zh') {
      return ['最新添加', '碳足迹值 (低-高)', '碳足迹值 (高-低)'];
    } else {
      return ['Latest Added', 'Carbon Footprint (Low-High)', 'Carbon Footprint (High-Low)'];
    }
  };

  // Get query from URL on initial load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);

  // Filter products based on search and filters
  useEffect(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.supplier.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }
    
    // Apply industry filter
    if (selectedIndustry !== (language === 'zh' ? '全部行业' : 'All Industries')) {
      result = result.filter(product => product.industry === selectedIndustry);
    }
    
    // Apply data type filter
    if (selectedDataType !== (language === 'zh' ? '全部数据' : 'All Data Types')) {
      result = result.filter(product => product.dataType === selectedDataType);
    }
    
    // Apply sorting
    if (selectedSort === (language === 'zh' ? '碳足迹值 (低-高)' : 'Carbon Footprint (Low-High)')) {
      result.sort((a, b) => a.carbonFootprint - b.carbonFootprint);
    } else if (selectedSort === (language === 'zh' ? '碳足迹值 (高-低)' : 'Carbon Footprint (High-Low)')) {
      result.sort((a, b) => b.carbonFootprint - a.carbonFootprint);
    } else {
      // Default to date sorting (newest first)
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedIndustry, selectedDataType, selectedSort, products, language]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const clearFilters = () => {
    setSelectedIndustry(language === 'zh' ? '全部行业' : 'All Industries');
    setSelectedDataType(language === 'zh' ? '全部数据' : 'All Data Types');
    setSelectedSort(language === 'zh' ? '最新添加' : 'Latest Added');
  };

  // Update translations in the language context
  useEffect(() => {
    // This will re-render the component when translations change
  }, [t]);

  return (
    <Layout>
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{t('product_carbon_footprint_search')}</h1>
            
            {/* Search form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search_product_supplier_category')}
                    className="pl-10 h-12"
                  />
                </div>
                <Button type="submit" className="h-12 px-8">
                  {t('search_button')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 md:w-auto"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {t('filter')}
                </Button>
              </div>
            </form>
            
            {/* Filters */}
            {isFilterOpen && (
              <div className="bg-white p-6 rounded-lg border border-border mb-8 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">{t('filter_and_sort')}</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Industry filter */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      {t('industry')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {getIndustries().map((industry) => (
                        <Badge
                          key={industry}
                          variant={selectedIndustry === industry ? "default" : "outline"}
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => setSelectedIndustry(industry)}
                        >
                          {industry}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Data type filter */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      {t('data_type')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {getDataTypes().map((type) => (
                        <Badge
                          key={type}
                          variant={selectedDataType === type ? "default" : "outline"}
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => setSelectedDataType(type)}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort options */}
                  <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                      {t('sort_by')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {getSortOptions().map((option) => (
                        <Badge
                          key={option}
                          variant={selectedSort === option ? "default" : "outline"}
                          className="cursor-pointer hover:bg-secondary/80"
                          onClick={() => setSelectedSort(option)}
                        >
                          {option}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    {t('clear_filters')}
                  </Button>
                </div>
              </div>
            )}
            
            {/* Applied filters */}
            {(selectedIndustry !== (language === 'zh' ? '全部行业' : 'All Industries') || 
              selectedDataType !== (language === 'zh' ? '全部数据' : 'All Data Types') || 
              selectedSort !== (language === 'zh' ? '最新添加' : 'Latest Added') || 
              searchQuery) && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">{t('applied_filters')}:</span>
                
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('search')}: {searchQuery}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}
                
                {selectedIndustry !== (language === 'zh' ? '全部行业' : 'All Industries') && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('industry')}: {selectedIndustry}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedIndustry(language === 'zh' ? '全部行业' : 'All Industries')}
                    />
                  </Badge>
                )}
                
                {selectedDataType !== (language === 'zh' ? '全部数据' : 'All Data Types') && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('data_type')}: {selectedDataType}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedDataType(language === 'zh' ? '全部数据' : 'All Data Types')}
                    />
                  </Badge>
                )}
                
                {selectedSort !== (language === 'zh' ? '最新添加' : 'Latest Added') && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('sort')}: {selectedSort}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedSort(language === 'zh' ? '最新添加' : 'Latest Added')}
                    />
                  </Badge>
                )}
                
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                  {t('clear_all')}
                </Button>
              </div>
            )}
            
            {/* Results count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                {t('found')} <span className="font-medium text-foreground">{filteredProducts.length}</span> {t('results')}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <span>{t('sort')}: {selectedSort}</span>
              </div>
            </div>
            
            {/* Results */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <Badge
                        className={`absolute top-3 right-3 ${
                          product.dataType === (language === 'zh' ? '实际数据' : 'Actual Data')
                            ? 'bg-eco-green text-white'
                            : 'bg-data-blue text-white'
                        }`}
                      >
                        {product.dataType}
                      </Badge>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs font-normal">
                          {product.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {product.date}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{product.supplier}</p>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-foreground">
                            {product.carbonFootprint}
                            <span className="text-sm font-normal text-muted-foreground ml-1">
                              {product.unit}
                            </span>
                          </p>
                        </div>

                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-primary"
                          onClick={() => navigate(`/search/${product.id}`)}
                        >
                          {t('details')}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-border rounded-xl p-8 text-center mb-10">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                  <SearchIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t('no_results_found')}</h3>
                <p className="text-muted-foreground mb-6">
                  {t('try_adjusting_search')}
                </p>
                <Button onClick={() => navigate('/inference')}>
                  <BarChart2 className="h-4 w-4 mr-2" />
                  {t('start_new_prediction')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recommended suppliers */}
      {filteredProducts.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">{t('related_supplier_recommendations')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendedSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="bg-white border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Building className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{supplier.name}</h3>
                        <p className="text-sm text-muted-foreground">{supplier.industry}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{t('carbon_footprint_rating')}</p>
                        <p className="font-semibold flex items-center">
                          {supplier.rating}
                          <Star className="h-4 w-4 ml-1 fill-action-orange text-action-orange" />
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t('product_count')}</p>
                        <p className="font-semibold">{supplier.products}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => navigate(`/recommendation/supplier/${supplier.id}`)}
                    >
                      <span>{t('view_supplier_details')}</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default SearchPage;
