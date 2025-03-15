
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import ChatInterface from '@/components/chatbot/ChatInterface';
import GlassCard from '@/components/ui/glass-card';
import { Bot, Book, Search, Sparkles, BarChart3, Zap, Code, Server, Database, Network } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const Chat = () => {
  const { user } = useAuth();
  
  const chatFeatures = [
    {
      title: 'College Course Help',
      description: 'Get answers to questions about your higher education courses.',
      icon: Book,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Programming Assistance',
      description: 'Help with coding assignments in languages like Python, Java, and more.',
      icon: Code,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Research Guidance',
      description: 'Find academic resources and research paper assistance.',
      icon: Search,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Complex Concept Explanations',
      description: 'Get simplified explanations of difficult college-level concepts.',
      icon: Sparkles,
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Assignment Planning',
      description: 'Create structured plans for tackling your college assignments.',
      icon: BarChart3,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
    },
  ];
  
  const suggestedTopics = [
    {
      title: 'Allied Mathematics',
      examples: [
        'Explain the concept of eigenvalues in linear algebra',
        'Help me understand Laplace transforms',
        'What are the applications of differential equations?'
      ],
      icon: BarChart3,
      color: 'bg-collegenie-blue-light',
      iconColor: 'text-collegenie-blue-dark'
    },
    {
      title: 'Machine Learning',
      examples: [
        'How do neural networks work?',
        'Explain overfitting and how to prevent it',
        'What is the difference between supervised and unsupervised learning?'
      ],
      icon: Sparkles,
      color: 'bg-collegenie-gold-light',
      iconColor: 'text-collegenie-gold-dark'
    },
    {
      title: 'Cloud Computing',
      examples: [
        'Explain the concept of containerization',
        'What are the benefits of microservices?',
        'How does auto-scaling work in AWS?'
      ],
      icon: Server,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      title: 'Database Systems',
      examples: [
        'What is database normalization?',
        'Explain the difference between SQL and NoSQL',
        'How do indexes improve database performance?'
      ],
      icon: Database,
      color: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      title: 'Computer Networks',
      examples: [
        'Explain the OSI model layers',
        'How does TCP/IP work?',
        'What is subnetting in networking?'
      ],
      icon: Network,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600'
    }
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
                <div className="w-10 h-10 rounded-full bg-collegenie-gold flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">College AI Assistant</h2>
                  <p className="text-xs text-collegenie-gray-dark">Specialized for higher education</p>
                </div>
              </div>
              
              <p className="text-sm text-collegenie-gray-dark mb-4">
                Hello {user?.name || 'there'}! I'm your AI assistant for college-level courses. 
                I can help with course concepts, assignments, and research in subjects like Allied Mathematics, 
                Machine Learning, Cloud Computing, and more.
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
              <h3 className="text-sm font-medium mb-3">Popular Topics</h3>
              <div className="space-y-4">
                {suggestedTopics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-full ${topic.color} flex items-center justify-center`}>
                        <topic.icon className={`w-3 h-3 ${topic.iconColor}`} />
                      </div>
                      <h4 className="text-sm font-medium">{topic.title}</h4>
                    </div>
                    <div className="space-y-1 pl-8">
                      {topic.examples.map((example, exampleIndex) => (
                        <div 
                          key={exampleIndex} 
                          className="p-2 rounded-lg bg-white text-collegenie-gray-dark text-xs cursor-pointer hover:bg-collegenie-gray-light transition-colors"
                          onClick={() => {
                            // Would integrate with chat interface in a real implementation
                            console.log('Selected example:', example);
                          }}
                        >
                          "{example}"
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
