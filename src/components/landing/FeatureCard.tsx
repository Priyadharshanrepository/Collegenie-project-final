
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import GlassCard from '@/components/ui/glass-card';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  iconColor: string;
  delay: 1 | 2 | 3;
}

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  iconColor, 
  delay 
}: FeatureCardProps) => {
  const navigate = useNavigate();

  return (
    <GlassCard 
      className="p-6"
      animate={true}
      delay={delay}
    >
      <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-collegenie-gray-dark mb-4">{description}</p>
      <ButtonCustom 
        variant="ghost" 
        className={`px-0 text-collegenie-blue hover:text-collegenie-blue-dark hover:bg-transparent`}
        onClick={() => navigate('/dashboard')}
      >
        Explore <ArrowRight className="ml-1.5 h-4 w-4" />
      </ButtonCustom>
    </GlassCard>
  );
};

export default FeatureCard;
