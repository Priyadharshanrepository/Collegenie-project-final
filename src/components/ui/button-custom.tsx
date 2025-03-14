
import React from 'react';
import { cn } from '@/lib/utils';
import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'blue' | 'gold' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
  animate?: boolean;
}

export const ButtonCustom = ({
  className,
  children,
  variant = 'default',
  size = 'default',
  isLoading = false,
  animate = false,
  ...props
}: ButtonCustomProps) => {
  const variantMappings = {
    'default': 'default',
    'blue': 'default',
    'gold': 'outline',
    'outline': 'outline',
    'ghost': 'ghost',
    'link': 'link',
  };
  
  const customClasses = {
    'blue': 'bg-collegenie-blue text-white hover:bg-collegenie-blue-medium',
    'gold': 'bg-collegenie-gold text-collegenie-gold-dark hover:bg-collegenie-gold-dark hover:text-white border-collegenie-gold',
  };
  
  const animationClass = animate ? 'animate-scale-in' : '';
  
  return (
    <ShadcnButton
      className={cn(
        'font-medium transition-all duration-300',
        customClasses[variant as keyof typeof customClasses],
        animationClass,
        className
      )}
      variant={variantMappings[variant as keyof typeof variantMappings]}
      size={size}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : children}
    </ShadcnButton>
  );
};

export default ButtonCustom;
