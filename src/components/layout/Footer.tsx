
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-tech-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-data-blue to-eco-green rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="font-display text-xl font-semibold">CarbonSleuth</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              专注于提供产品碳足迹分析和环保供应链优化的先进解决方案。让可持续发展成为每个企业的竞争优势。
            </p>
            <div className="pt-2 space-y-2">
              <div className="flex items-center text-white/70 hover:text-white transition-colors">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:contact@carbonsleuth.com" className="text-sm">contact@carbonsleuth.com</a>
              </div>
              <div className="flex items-center text-white/70 hover:text-white transition-colors">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+123456789" className="text-sm">+123 456 789</a>
              </div>
              <div className="flex items-start text-white/70 hover:text-white transition-colors">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span className="text-sm">上海市浦东新区张江高科技园区</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-4">快速链接</h4>
            <ul className="space-y-2">
              {[
                { name: '首页', path: '/' },
                { name: '产品搜索', path: '/search' },
                { name: 'LCA模型推理', path: '/inference' },
                { name: '数据请求', path: '/data-request' },
                { name: '低碳推荐', path: '/recommendation' },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-1.5" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-medium mb-4">资源中心</h4>
            <ul className="space-y-2">
              {[
                { name: '碳足迹百科', path: '#' },
                { name: '行业报告', path: '#' },
                { name: '最佳实践', path: '#' },
                { name: '政策动态', path: '#' },
                { name: '常见问题', path: '#' },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path} 
                    className="text-white/70 hover:text-white transition-colors flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-1.5" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-medium mb-4">订阅动态</h4>
            <p className="text-white/70 text-sm mb-4">
              订阅我们的新闻邮件，及时了解最新的可持续发展趋势和产品更新。
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="您的邮箱地址" 
                className="bg-white/10 border border-white/20 rounded-l-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button className="bg-accent text-white px-3 py-2 rounded-r-md text-sm font-medium hover:bg-accent/90 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} CarbonSleuth. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">隐私政策</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">使用条款</a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">关于我们</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
