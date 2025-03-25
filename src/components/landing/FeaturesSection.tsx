
import React from 'react';
import { BarChart3, ListTodo, MessageCircle } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      title: 'Track Your Progress',
      description: 'Visualize your study hours and achievements with intuitive charts and metrics.',
      icon: BarChart3,
      color: 'bg-collegenie-blue-light',
      iconColor: 'text-collegenie-blue-dark',
      delay: 1
    },
    {
      title: 'Manage Tasks',
      description: 'Stay organized with smart to-do lists, deadlines, and automated reminders.',
      icon: ListTodo,
      color: 'bg-collegenie-gold-light',
      iconColor: 'text-collegenie-gold-dark',
      delay: 2
    },
    {
      title: 'AI Study Assistant',
      description: 'Get instant answers to academic questions with our intelligent AI chatbot.',
      icon: MessageCircle,
      color: 'bg-collegenie-gray-light',
      iconColor: 'text-collegenie-gray-dark',
      delay: 3
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard 
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            color={feature.color}
            iconColor={feature.iconColor}
            delay={feature.delay as 1 | 2 | 3}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
