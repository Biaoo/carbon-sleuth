
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // Listen for sidebar toggle events to adjust main content
  useEffect(() => {
    const handleSidebarResize = () => {
      const mainContent = document.getElementById('main-content');
      const sidebar = document.querySelector('[class*="w-16"]'); // Check for collapsed sidebar
      
      if (mainContent) {
        if (sidebar) {
          mainContent.classList.remove('md:ml-64');
          mainContent.classList.add('md:ml-16');
        } else {
          mainContent.classList.remove('md:ml-16');
          mainContent.classList.add('md:ml-64');
        }
      }
    };

    // Create a MutationObserver to watch for sidebar class changes
    const observer = new MutationObserver(handleSidebarResize);
    const sidebarEl = document.querySelector('.bg-secondary\\/5.border-r');
    
    if (sidebarEl) {
      observer.observe(sidebarEl, { attributes: true, attributeFilter: ['class'] });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
