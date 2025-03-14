
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, BarChart3, ListTodo, MessageCircle, ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import GlassCard from '@/components/ui/glass-card';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
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
            >
              Learn More
            </ButtonCustom>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <GlassCard 
              key={index} 
              className="p-6"
              animate={true}
              delay={feature.delay as 1 | 2 | 3}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-collegenie-gray-dark mb-4">{feature.description}</p>
              <ButtonCustom 
                variant="ghost" 
                className={`px-0 text-collegenie-blue hover:text-collegenie-blue-dark hover:bg-transparent`}
                onClick={() => navigate('/dashboard')}
              >
                Explore <ArrowRight className="ml-1.5 h-4 w-4" />
              </ButtonCustom>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-collegenie-gray-dark text-sm">
        <p>© {new Date().getFullYear()} Collegenie. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
