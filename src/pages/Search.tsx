
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
  BarChart2 
} from 'lucide-react';

// Mock data
const products = [
  {
    id: 1,
    name: '高性能锂电池',
    supplier: '绿能科技有限公司',
    category: '电子元件',
    industry: '电子制造',
    carbonFootprint: 12.5,
    unit: 'kg CO₂e/unit',
    dataType: '实际数据',
    date: '2023-05-15',
    image: 'https://images.unsplash.com/photo-1602920068685-a05c7e8ccb2d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 2,
    name: '有机棉T恤',
    supplier: '可持续时装集团',
    category: '纺织品',
    industry: '纺织服装',
    carbonFootprint: 3.2,
    unit: 'kg CO₂e/unit',
    dataType: '预测结果',
    date: '2023-06-02',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 3,
    name: '可回收纸质包装',
    supplier: '绿色包装技术公司',
    category: '包装材料',
    industry: '包装',
    carbonFootprint: 0.8,
    unit: 'kg CO₂e/unit',
    dataType: '实际数据',
    date: '2023-06-10',
    image: 'https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 4,
    name: '太阳能充电宝',
    supplier: '新能源科技有限公司',
    category: '电子产品',
    industry: '电子制造',
    carbonFootprint: 5.6,
    unit: 'kg CO₂e/unit',
    dataType: '预测结果',
    date: '2023-06-15',
    image: 'https://images.unsplash.com/photo-1594549181032-e8923e7d74d5?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 5,
    name: '可降解购物袋',
    supplier: '绿色材料有限公司',
    category: '包装材料',
    industry: '包装',
    carbonFootprint: 0.3,
    unit: 'kg CO₂e/unit',
    dataType: '实际数据',
    date: '2023-07-05',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 6,
    name: '有机巧克力',
    supplier: '生态食品公司',
    category: '食品',
    industry: '食品加工',
    carbonFootprint: 2.1,
    unit: 'kg CO₂e/unit',
    dataType: '预测结果',
    date: '2023-07-20',
    image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=500&auto=format&fit=crop'
  },
];

// Recommended suppliers
const recommendedSuppliers = [
  {
    id: 1,
    name: '绿能科技有限公司',
    industry: '电子元件',
    rating: 4.8,
    products: 15
  },
  {
    id: 2,
    name: '可持续时装集团',
    industry: '纺织品',
    rating: 4.6,
    products: 28
  },
  {
    id: 3,
    name: '绿色包装技术公司',
    industry: '包装材料',
    rating: 4.9,
    products: 12
  }
];

// Filter options
const industries = ['全部行业', '电子制造', '纺织服装', '包装', '食品加工', '建筑材料'];
const dataTypes = ['全部数据', '实际数据', '预测结果'];
const sortOptions = ['最新添加', '碳足迹值 (低-高)', '碳足迹值 (高-低)'];

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('全部行业');
  const [selectedDataType, setSelectedDataType] = useState('全部数据');
  const [selectedSort, setSelectedSort] = useState('最新添加');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([...products]);

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
    if (selectedIndustry !== '全部行业') {
      result = result.filter(product => product.industry === selectedIndustry);
    }
    
    // Apply data type filter
    if (selectedDataType !== '全部数据') {
      result = result.filter(product => product.dataType === selectedDataType);
    }
    
    // Apply sorting
    if (selectedSort === '碳足迹值 (低-高)') {
      result.sort((a, b) => a.carbonFootprint - b.carbonFootprint);
    } else if (selectedSort === '碳足迹值 (高-低)') {
      result.sort((a, b) => b.carbonFootprint - a.carbonFootprint);
    } else {
      // Default to date sorting (newest first)
      result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedIndustry, selectedDataType, selectedSort]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const clearFilters = () => {
    setSelectedIndustry('全部行业');
    setSelectedDataType('全部数据');
    setSelectedSort('最新添加');
  };

  return (
    <Layout>
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">产品碳足迹搜索</h1>
            
            {/* Search form */}
            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="搜索产品名称、供应商或类别..."
                    className="pl-10 h-12"
                  />
                </div>
                <Button type="submit" className="h-12 px-8">
                  搜索
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 md:w-auto"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  筛选
                </Button>
              </div>
            </form>
            
            {/* Filters */}
            {isFilterOpen && (
              <div className="bg-white p-6 rounded-lg border border-border mb-8 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold">筛选与排序</h2>
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
                      行业
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {industries.map((industry) => (
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
                      数据类型
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {dataTypes.map((type) => (
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
                      排序方式
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
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
                    清除筛选
                  </Button>
                </div>
              </div>
            )}
            
            {/* Applied filters */}
            {(selectedIndustry !== '全部行业' || selectedDataType !== '全部数据' || selectedSort !== '最新添加' || searchQuery) && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">已应用筛选：</span>
                
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    搜索: {searchQuery}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}
                
                {selectedIndustry !== '全部行业' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    行业: {selectedIndustry}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedIndustry('全部行业')}
                    />
                  </Badge>
                )}
                
                {selectedDataType !== '全部数据' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    数据类型: {selectedDataType}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedDataType('全部数据')}
                    />
                  </Badge>
                )}
                
                {selectedSort !== '最新添加' && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    排序: {selectedSort}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => setSelectedSort('最新添加')}
                    />
                  </Badge>
                )}
                
                <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                  清除全部
                </Button>
              </div>
            )}
            
            {/* Results count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">
                找到 <span className="font-medium text-foreground">{filteredProducts.length}</span> 个结果
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <span>排序: {selectedSort}</span>
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
                          product.dataType === '实际数据'
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
                          详情
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
                <h3 className="text-xl font-semibold mb-2">未找到相关结果</h3>
                <p className="text-muted-foreground mb-6">
                  尝试调整搜索条件或筛选选项，也可以使用我们的预测功能生成新的碳足迹数据。
                </p>
                <Button onClick={() => navigate('/inference')}>
                  <BarChart2 className="h-4 w-4 mr-2" />
                  开始新的预测
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
              <h2 className="text-2xl font-bold mb-6">相关供应商推荐</h2>
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
                        <p className="text-sm text-muted-foreground">碳足迹评分</p>
                        <p className="font-semibold flex items-center">
                          {supplier.rating}
                          <Star className="h-4 w-4 ml-1 fill-action-orange text-action-orange" />
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">产品数量</p>
                        <p className="font-semibold">{supplier.products}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-between"
                      onClick={() => navigate(`/recommendation/supplier/${supplier.id}`)}
                    >
                      <span>查看供应商详情</span>
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
