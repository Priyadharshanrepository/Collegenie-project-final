
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
import { Sparkles, Book, Send, Loader } from 'lucide-react';

const COLLEGE_SUBJECTS = [
  'Allied Mathematics',
  'Machine Learning',
  'Cloud Computing',
  'Web Development',
  'Database Systems',
  'Software Engineering',
  'Artificial Intelligence',
  'Computer Networks',
  'Data Science'
];

const EnhancedChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm CollegeGenie, your AI study assistant powered by advanced language models. How can I help with your coursework today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
  }, []);

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

    // Display a temporary "thinking" message
    const thinkingId = uuidv4();
    setMessages(prev => [...prev, {
      id: thinkingId,
      content: "Thinking...",
      sender: 'bot',
      timestamp: new Date()
    }]);

    try {
      // Check for special commands first
      const userInput = input.toLowerCase();
      let botResponse = '';
      
      if (userInput.startsWith('/help')) {
        botResponse = "Available commands:\n/help - Show this help message\n/subjects - List college subjects I can help with\n/clear - Clear chat history";
      } else if (userInput.startsWith('/subjects')) {
        botResponse = `I can help with the following subjects:\n${COLLEGE_SUBJECTS.join('\n')}`;
      } else if (userInput.startsWith('/clear')) {
        setMessages([{
          id: uuidv4(),
          content: "Chat history cleared. How can I help you today?",
          sender: 'bot',
          timestamp: new Date()
        }]);
        setIsProcessing(false);
        return;
      } else {
        // For regular messages, use the Groq API via our service
        botResponse = await fetchGrokResponse(input);
        console.log('Response from Groq API:', botResponse);
      }

      // Remove the temporary thinking message and add the real response
      setMessages(prev => prev.filter(msg => msg.id !== thinkingId).concat({
        id: uuidv4(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }));

      // Focus the input for next message
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to get response:', error);
      // Remove the thinking message and add an error message
      setMessages(prev => prev.filter(msg => msg.id !== thinkingId).concat({
        id: uuidv4(),
        content: "Sorry, I had trouble generating a response. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      }));
      
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
    <div className="relative flex flex-col h-full w-full overflow-hidden rounded-lg border shadow-sm bg-background">
      <div className="bg-primary p-4 text-white flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            CollegeGenie AI Assistant
          </h2>
          <p className="text-sm opacity-80">
            Powered by Groq LLama-3 70B
          </p>
        </div>
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
                className={`rounded-lg p-3 max-w-[85%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : message.content === "Thinking..." 
                      ? 'bg-muted text-muted-foreground animate-pulse'
                      : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
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
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your coursework..."
          className="flex-1"
          disabled={isProcessing}
        />
        <Button type="submit" disabled={isProcessing} size="icon">
          {isProcessing ? <Loader className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
      
      <div className="px-4 pb-3 pt-0 text-xs text-muted-foreground flex justify-center items-center">
        <Book className="h-3 w-3 mr-1" />
        <span>Use /help to see available commands</span>
      </div>
      
      {/* Three.js animation that responds to typing */}
      <TypeResponseCube isTyping={isTyping} inputLength={input.length} />
    </div>
  );
};

export default EnhancedChatInterface;
