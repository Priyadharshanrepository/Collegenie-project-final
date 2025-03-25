
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import GlassCard from '@/components/ui/glass-card';
import { useNavigate } from 'react-router-dom';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <GlassCard variant="blue" className="p-8 md:p-12 fade-animation">
        <div className="text-center md:text-left md:flex items-center justify-between">
          <div className="mb-6 md:mb-0 md:max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-collegenie-blue-dark">
              Ready to transform your academic experience?
            </h2>
            <p className="text-collegenie-blue-dark/80">
              Join thousands of students who use Collegenie to stay organized, track progress, and excel in their studies.
            </p>
          </div>
          <ButtonCustom 
            variant="gold" 
            size="lg" 
            className="min-w-[180px] text-md"
            onClick={() => navigate('/dashboard')}
          >
            Start Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonCustom>
        </div>
      </GlassCard>
    </section>
  );
};

export default CTASection;
