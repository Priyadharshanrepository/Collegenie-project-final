
import React from 'react';
import { GraduationCap, ArrowRight, BookOpen } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onLearnMoreClick: () => void;
}

const HeroSection = ({ onLearnMoreClick }: HeroSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto fade-animation">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-collegenie-blue-light text-collegenie-blue-dark text-sm font-medium mb-6">
          <GraduationCap className="h-4 w-4 mr-1.5" />
          Your AI-Powered Study Companion
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          Study Smarter, <span className="text-collegenie-blue">Achieve More</span>
        </h1>
        <p className="text-lg text-collegenie-gray-dark mb-8 max-w-2xl mx-auto">
          Collegenie brings together progress tracking, task management, and AI assistance to help college students excel in their academic journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonCustom 
            variant="blue" 
            size="lg" 
            className="text-md"
            onClick={() => navigate('/dashboard')}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </ButtonCustom>
          <ButtonCustom 
            variant="outline" 
            size="lg" 
            className="text-md"
            onClick={onLearnMoreClick}
          >
            Learn More
            <BookOpen className="ml-2 h-4 w-4" />
          </ButtonCustom>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
