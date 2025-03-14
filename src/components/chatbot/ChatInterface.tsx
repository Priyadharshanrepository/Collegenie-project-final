
import React, { useState, useRef, useEffect } from 'react';
import { Send, Book, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/glass-card';
import ButtonCustom from '../ui/button-custom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: '1',
    content: "Hello! I'm your academic assistant. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(Date.now() - 60000),
  },
];

interface ChatInterfaceProps {
  className?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ className }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Function to handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I understand your question about the physics concept. The relationship between force and acceleration is described by Newton's Second Law: F = ma, where F is force, m is mass, and a is acceleration.",
        "Great question about calculus! The derivative of a function represents its rate of change. For example, if y = f(x) represents the position of an object, then f'(x) represents its velocity.",
        "For your literature assignment, you might want to analyze the author's use of symbolism and how it contributes to the overall themes in the work.",
        "When preparing for your presentation, remember to structure it with a clear introduction, main points, and conclusion. Visual aids can help reinforce your key messages.",
        "Based on your study schedule, I recommend allocating more time to the topics you find challenging. Spaced repetition can also help improve retention of the material."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
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
          <div className="w-8 h-8 rounded-full bg-collegenie-blue-light flex items-center justify-center">
            <Bot className="w-4 h-4 text-collegenie-blue-dark" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Study Assistant</h3>
            <p className="text-xs text-collegenie-gray-dark">Ask me anything about your courses</p>
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
                  <Bot className="h-4 w-4 text-collegenie-blue-dark" />
                ) : (
                  <User className="h-4 w-4 text-white" />
                )}
                <span className={cn(
                  "text-xs font-medium",
                  message.sender === 'user' ? "text-white/80" : "text-collegenie-gray-dark"
                )}>
                  {message.sender === 'user' ? 'You' : 'AI Assistant'}
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
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-collegenie-gray-dark rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-2 h-2 bg-collegenie-gray-dark rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-2 h-2 bg-collegenie-gray-dark rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
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
            placeholder="Ask about your coursework..."
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
          <span>Type your academic questions and get AI-powered answers</span>
        </div>
      </div>
    </GlassCard>
  );
};

export default ChatInterface;
