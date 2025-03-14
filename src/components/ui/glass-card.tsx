
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'light' | 'blue' | 'gold';
  animate?: boolean;
  delay?: 1 | 2 | 3;
}

export const GlassCard = ({
  className,
  children,
  variant = 'default',
  animate = false,
  delay = 1,
  ...props
}: GlassCardProps) => {
  const baseClasses = "rounded-2xl transition-all duration-300 backdrop-blur-md";
  
  const variantClasses = {
    default: "bg-white/90 border border-white/30 shadow-glass",
    light: "bg-white/60 border border-white/20 shadow-subtle",
    blue: "bg-collegenie-blue-light/80 border border-collegenie-blue-light shadow-subtle",
    gold: "bg-collegenie-gold-light/80 border border-collegenie-gold-light shadow-subtle",
  };
  
  const animationClasses = animate ? `fade-animation stagger-${delay}` : '';
  
  return (
    <div 
      className={cn(
        baseClasses, 
        variantClasses[variant], 
        animationClasses,
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
