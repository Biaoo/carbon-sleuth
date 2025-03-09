import React from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const bilingual = (zh: string, en: string) => ({ zh, en });
// Mock data for recent products
const recentProducts = [
  {
    id: 1,
    name: bilingual("高性能锂电池", "High-performance lithium battery"),
    supplier: bilingual("绿能科技有限公司", "Green Energy Technology Co."),
    category: bilingual("电子元件", "Electronic Components"),
    carbonFootprint: 12.5,
    unit: "kg CO₂e/unit",
    dataType: bilingual("实际数据", "Actual Data"),
    date: "2023-05-15",
    image:
      "https://images.unsplash.com/photo-1602920068685-a05c7e8ccb2d?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    name: bilingual("有机棉T恤", "Organic Cotton T-shirt"),
    supplier: bilingual("可持续时装集团", "Sustainable Fashion Group"),
    category: bilingual("纺织品", "Textiles"),
    carbonFootprint: 3.2,
    unit: "kg CO₂e/unit",
    dataType: bilingual("预测结果", "Predicted Result"),
    date: "2023-06-02",
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    name: bilingual("可回收纸质包装", "Recyclable paper packaging"),
    supplier: bilingual("绿色包装技术公司", "Green Packaging Technology Co."),
    category: bilingual("包装材料", "Packaging Materials"),
    carbonFootprint: 0.8,
    unit: "kg CO₂e/unit",
    dataType: bilingual("实际数据", "Actual Data"),
    date: "2023-06-10",
    image:
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    name: bilingual("太阳能充电宝", "Solar-powered charging power bank"),
    supplier: bilingual("新能源科技有限公司", "New Energy Technology Co."),
    category: bilingual("电子产品", "Electronic Products"),
    carbonFootprint: 5.6,
    unit: "kg CO₂e/unit",
    dataType: bilingual("预测结果", "Predicted Result"),
    date: "2023-06-15",
    image:
      "https://images.unsplash.com/photo-1594549181032-e8923e7d74d5?q=80&w=500&auto=format&fit=crop",
  },
];

const RecentProducts = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              {t("recent_products_title")}
            </h2>
            <p className="text-foreground/70 max-w-xl">
              {t("recent_products_desc")}
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0"
            onClick={() => navigate("/search")}
          >
            {t("view_all")}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-lg transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={language === "zh" ? product.name.zh : product.name.en}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <Badge
                  className={`absolute top-3 right-3 ${
                    product.dataType.zh === "实际数据" ||
                      product.dataType.en === "Actual Data"
                      ? "bg-eco-green text-white"
                      : "bg-data-blue text-white"
                  }`}
                >
                  {language === "zh"
                    ? product.dataType.zh
                    : product.dataType.en}
                </Badge>
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {language === "zh"
                      ? product.category.zh
                      : product.category.en}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {product.date}
                  </span>
                </div>

                <h3 className="text-lg font-semibold mb-1">
                  {language === "zh" ? product.name.zh : product.name.en}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {language === "zh"
                    ? product.supplier.zh
                    : product.supplier.en}
                </p>

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
                    {t("details")}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProducts;
