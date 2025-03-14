
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ChatInterface from '@/components/chatbot/ChatInterface';
import GlassCard from '@/components/ui/glass-card';
import { Bot, Book, Search, Sparkles, BarChart3, Zap } from 'lucide-react';

const Chat = () => {
  const chatFeatures = [
    {
      title: 'Course Assistance',
      description: 'Get answers to your questions about any subject or course concept.',
      icon: Book,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Study Planning',
      description: 'AI recommendations for optimizing your study schedule and techniques.',
      icon: BarChart3,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Quick Research',
      description: 'Find references, explanations, and summaries for any topic.',
      icon: Search,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'AI Explanations',
      description: 'Complex topics broken down into simpler, easier-to-understand explanations.',
      icon: Sparkles,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Instant Feedback',
      description: 'Submit your answers and get immediate feedback to improve.',
      icon: Zap,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
  ];
  
  return (
    <div className="min-h-screen bg-collegenie-gray-lightest">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 fade-animation">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <GlassCard className="p-4 md:p-6" animate={true}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-collegenie-blue flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">AI Study Assistant</h2>
                  <p className="text-xs text-collegenie-gray-dark">Powered by advanced AI</p>
                </div>
              </div>
              
              <p className="text-sm text-collegenie-gray-dark mb-4">
                Your personal AI assistant is here to help with any academic questions. 
                Ask about course concepts, get help with assignments, or plan your study schedule.
              </p>
              
              <div className="space-y-3">
                {chatFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-collegenie-gray-light">
                    <div className={`w-8 h-8 rounded-full ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className={`w-4 h-4 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{feature.title}</h3>
                      <p className="text-xs text-collegenie-gray-dark">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard className="p-4 md:p-6" animate={true} delay={2}>
              <h3 className="text-sm font-medium mb-3">Try asking about:</h3>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-collegenie-blue-light text-collegenie-blue-dark text-sm">
                  "Explain the concept of derivatives in calculus"
                </div>
                <div className="p-2 rounded-lg bg-collegenie-gold-light text-collegenie-gold-dark text-sm">
                  "Help me create a study plan for my biology exam"
                </div>
                <div className="p-2 rounded-lg bg-collegenie-gray-light text-collegenie-gray-dark text-sm">
                  "What are the key themes in Shakespeare's Hamlet?"
                </div>
              </div>
            </GlassCard>
          </div>
          
          {/* Chat Interface */}
          <div className="lg:col-span-2 h-[calc(100vh-10rem)]">
            <ChatInterface className="h-full" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
