
import React, { useState, useRef, useEffect } from 'react';
import { Send, Book, Bot, User, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/glass-card';
import ButtonCustom from '../ui/button-custom';
import { ChatMessage } from '@/types/task';
import { useToast } from '@/components/ui/use-toast';

// Sample initial messages
const initialMessages: ChatMessage[] = [
  {
    id: '1',
    content: "Hello! I'm your academic assistant specialized in college subjects. How can I help you with your studies today?",
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
  },
];

// College-specific responses
const collegeResponses = {
  'allied mathematics': [
    "In Allied Mathematics, linear algebra concepts are crucial for understanding vector spaces. The key properties to focus on are linearity, span, basis, and dimension.",
    "For your Allied Mathematics assignment, remember that differential equations model real-world phenomena like population growth or electrical circuits. The order of a differential equation is determined by the highest derivative present.",
    "When tackling probability problems in Allied Mathematics, make sure to apply Bayes' theorem correctly. It's often useful for updating probabilities when new information becomes available."
  ],
  'machine learning': [
    "For your Machine Learning assignment, ensure you're properly splitting your dataset into training, validation, and test sets. A common split is 70-15-15 or 80-10-10.",
    "When implementing gradient descent in your Machine Learning project, remember to normalize your features to ensure the algorithm converges quickly and doesn't oscillate.",
    "For your classification task, consider using ensemble methods like Random Forest or XGBoost which often outperform single models and provide better generalization."
  ],
  'cloud computing': [
    "In your Cloud Computing assignment, make sure to address the key security considerations when designing a multi-tenant architecture, including data isolation and access controls.",
    "When designing your AWS architecture for the Cloud Computing project, consider using Auto Scaling Groups to ensure your application can handle varying loads efficiently.",
    "For your Docker containerization assignment, remember that images should be kept as small as possible by using multi-stage builds and minimizing the number of layers."
  ],
  'data science': [
    "When preprocessing data for your Data Science assignment, pay close attention to handling missing values appropriately - consider whether imputation or removal is more appropriate.",
    "For your exploratory data analysis, remember to use both visual techniques (like histograms and scatter plots) and statistical methods to identify patterns and relationships."
  ],
  'software engineering': [
    "In your Software Engineering project, make sure to follow SOLID principles, especially the Single Responsibility Principle which states that a class should have only one reason to change.",
    "When designing your system architecture, consider using microservices if your application needs to scale different components independently."
  ],
  'artificial intelligence': [
    "For your AI assignment on heuristic search, remember that A* algorithm is optimal when the heuristic is admissible (never overestimates the cost).",
    "When implementing a neural network, consider the vanishing gradient problem if using sigmoid activations in deep networks. ReLU activations can help mitigate this issue."
  ],
  'database systems': [
    "In your Database Systems assignment, ensure you've normalized your database schema to at least 3NF to reduce data redundancy and improve integrity.",
    "When designing queries for your database project, remember that proper indexing can significantly improve performance for frequently queried columns."
  ],
  'computer networks': [
    "For your Computer Networks assignment, understand the differences between connection-oriented (TCP) and connectionless (UDP) protocols and when to use each.",
    "When designing a network topology, consider factors like scalability, redundancy, and fault tolerance in your architecture."
  ]
};

// Function to get a relevant response based on message content
const getSmartResponse = (message: string): string => {
  message = message.toLowerCase();
  
  // Check for specific subjects
  for (const [subject, responses] of Object.entries(collegeResponses)) {
    if (message.includes(subject)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Check for assignment-related keywords
  if (message.includes('assignment') || message.includes('homework') || message.includes('project')) {
    const allResponses = Object.values(collegeResponses).flat();
    return allResponses[Math.floor(Math.random() * allResponses.length)];
  }
  
  // Default response
  return "I understand you're asking about an academic topic. Could you specify which subject area you're interested in? I'm specialized in Allied Mathematics, Machine Learning, Cloud Computing, Data Science, Software Engineering, Artificial Intelligence, Database Systems, and Computer Networks.";
};

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate typing indication for a more realistic experience
    const typingTime = Math.min(2000, 500 + input.length * 10);
    
    // Generate a "smart" response based on the user's message
    setTimeout(() => {
      const smartResponse = getSmartResponse(input);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: smartResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      // Show toast for important keywords
      if (input.toLowerCase().includes('deadline') || input.toLowerCase().includes('due')) {
        toast({
          title: "Reminder",
          description: "I've noticed you're discussing deadlines. Would you like me to help you create a task for this?",
          action: <ButtonCustom size="sm" variant="blue" onClick={() => console.log('Create task')}>Create Task</ButtonCustom>
        });
      }
    }, typingTime);
  };
  
  // Handle enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <GlassCard className={cn("flex flex-col h-full", className)} animate={true}>
      <div className="p-4 border-b border-collegenie-gray-light">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-collegenie-gold-light flex items-center justify-center">
            <Bot className="w-4 h-4 text-collegenie-gold-dark" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">College AI Assistant</h3>
            <p className="text-xs text-collegenie-gray-dark">Specialized in higher education subjects</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={cn(
              "flex w-full mb-4",
              message.sender === 'user' ? "justify-end" : "justify-start"
            )}
          >
            <div 
              className={cn(
                "max-w-[80%] p-3 rounded-2xl",
                message.sender === 'user' 
                  ? "bg-collegenie-blue text-white rounded-tr-none" 
                  : "bg-collegenie-gray-light text-foreground rounded-tl-none"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'bot' ? (
                  <Bot className="h-4 w-4 text-collegenie-gold-dark" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  message.sender === 'user' ? "text-white/80" : "text-collegenie-gray-dark"
                )}>
                  {message.sender === 'user' ? 'You' : 'College Assistant'}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <div className={cn(
                "text-right text-xs mt-1",
                message.sender === 'user' ? "text-white/70" : "text-collegenie-gray-dark"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-collegenie-gray-light text-foreground rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 text-collegenie-gold-dark animate-spin" />
                <span className="text-xs text-collegenie-gray-dark">College Assistant is typing...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-collegenie-gray-light">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about your college courses, assignments, or concepts..."
            className="flex-grow p-2 border border-collegenie-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-collegenie-blue focus:border-transparent resize-none"
            rows={1}
          />
          <ButtonCustom 
            variant="blue" 
            size="icon" 
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
          </ButtonCustom>
        </div>
        <div className="mt-2 text-xs text-collegenie-gray-dark flex items-center justify-center">
          <Book className="h-3 w-3 mr-1" />
          <span>Specialized in Allied Mathematics, Machine Learning, Cloud Computing, and more</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default ChatInterface;
