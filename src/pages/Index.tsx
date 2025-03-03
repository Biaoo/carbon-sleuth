
import React from 'react';
import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import RecentProducts from '@/components/home/RecentProducts';
import LowCarbonRecommendations from '@/components/home/LowCarbonRecommendations';
import Stats from '@/components/home/Stats';
import CallToAction from '@/components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <RecentProducts />
      <LowCarbonRecommendations />
      <Stats />
      <CallToAction />
    </Layout>
  );
};

export default Index;
