
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import CTASection from '@/components/landing/CTASection';
import AboutDialog from '@/components/landing/AboutDialog';
import Footer from '@/components/landing/Footer';

const Index = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection onLearnMoreClick={() => setIsDialogOpen(true)} />
      <FeaturesSection />
      <CTASection />
      <AboutDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <Footer />
    </div>
  );
};

export default Index;
