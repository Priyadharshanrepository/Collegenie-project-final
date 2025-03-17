
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage } from '@/types/task';
import { fetchGrokResponse } from '@/services/grokService';
import TypeResponseCube from '@/components/animations/TypeResponseCube';
import { useAuth } from '@/hooks/useAuth';

const COLLEGE_SUBJECTS = [
  'Allied Mathematics',
  'Machine Learning',
  'Cloud Computing',
  'Web Development',
  'Database Systems',
  'Software Engineering'
];

const EnhancedChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm CollegeGenie, your AI study assistant. How can I help with your coursework today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(false);
    setIsProcessing(true);

    try {
      // Check for special commands first
      const userInput = input.toLowerCase();
      let botResponse = '';
      
      if (userInput.startsWith('/help')) {
        botResponse = "Available commands:\n/help - Show this help message\n/subjects - List college subjects I can help with";
      } else if (userInput.startsWith('/subjects')) {
        botResponse = `I can help with the following subjects:\n${COLLEGE_SUBJECTS.join('\n')}`;
      } else {
        // For regular messages, use the Grok API via our service
        botResponse = await fetchGrokResponse(input);
        console.log('Response from Grok API:', botResponse);
      }

      const botMessage: ChatMessage = {
        id: uuidv4(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-lg border shadow-sm">
      <div className="bg-primary p-4 text-white">
        <h2 className="text-lg font-semibold">CollegeGenie Chat Assistant</h2>
        <p className="text-sm opacity-80">
          Ask for help with your coursework and assignments
        </p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg p-3 max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <Separator />
      
      <form onSubmit={handleSubmit} className="p-4 flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your coursework..."
          className="flex-1"
          disabled={isProcessing}
        />
        <Button type="submit" disabled={isProcessing}>
          {isProcessing ? "Thinking..." : "Send"}
        </Button>
      </form>
      
      {/* Three.js animation that responds to typing */}
      <TypeResponseCube isTyping={isTyping} inputLength={input.length} />
    </div>
  );
};

export default EnhancedChatInterface;
