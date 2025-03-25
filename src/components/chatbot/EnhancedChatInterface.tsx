
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
import { Sparkles, Book, Send, Loader, Info, Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
  const [conversationId, setConversationId] = useState<string>(uuidv4());
  const [typingSpeed, setTypingSpeed] = useState<number>(0);
  const [averageResponseTime, setAverageResponseTime] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastKeyPressTimeRef = useRef<number | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef.current?.focus();
    
    // Create a new conversation entry in Supabase
    if (user) {
      createConversation();
    }

    return () => {
      // Clear typing timer if it exists
      if (typingTimerRef.current) {
        clearInterval(typingTimerRef.current);
      }
    };
  }, [user]);

  const createConversation = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert({
          id: conversationId,
          user_id: user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true
        })
        .select();
      
      if (error) {
        console.error('Error creating conversation:', error);
      } else {
        console.log('Conversation created successfully:', data);
      }
    } catch (error) {
      console.error('Exception creating conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const trackTypingSpeed = () => {
    const currentTime = Date.now();
    
    if (lastKeyPressTimeRef.current) {
      const timeDiff = currentTime - lastKeyPressTimeRef.current;
      // Only update if time difference is reasonable (< 5 seconds)
      if (timeDiff < 5000) {
        // Convert to characters per minute
        const cpm = Math.round(60000 / timeDiff);
        // Rolling average with more weight to recent typing
        setTypingSpeed(prev => prev ? Math.round(0.3 * prev + 0.7 * cpm) : cpm);
      }
    }
    
    lastKeyPressTimeRef.current = currentTime;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsTyping(e.target.value.length > 0);
    trackTypingSpeed();
  };

  const saveMessageToSupabase = async (message: ChatMessage) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          content: message.content,
          role: message.sender === 'user' ? 'user' : 'assistant',
          timestamp: message.timestamp.toISOString()
        });
      
      if (error) {
        console.error('Error saving message:', error);
      }
    } catch (error) {
      console.error('Exception saving message:', error);
    }
  };

  const updateConversationTimestamp = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);
      
      if (error) {
        console.error('Error updating conversation timestamp:', error);
      }
    } catch (error) {
      console.error('Exception updating conversation timestamp:', error);
    }
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
    saveMessageToSupabase(userMessage);
    setInput('');
    setIsTyping(false);
    setIsProcessing(true);
    updateConversationTimestamp();

    // Display a temporary "thinking" message
    const thinkingId = uuidv4();
    setMessages(prev => [...prev, {
      id: thinkingId,
      content: "Thinking...",
      sender: 'bot',
      timestamp: new Date()
    }]);

    const startTime = Date.now();

    try {
      // Check for special commands first
      const userInput = input.toLowerCase();
      let botResponse = '';
      
      if (userInput.startsWith('/help')) {
        botResponse = "Available commands:\n/help - Show this help message\n/subjects - List college subjects I can help with\n/clear - Clear chat history\n/stats - Show conversation statistics";
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
      } else if (userInput.startsWith('/stats')) {
        botResponse = `Conversation Statistics:\nMessages: ${messages.length}\nAverage Response Time: ${averageResponseTime ? `${averageResponseTime.toFixed(2)}ms` : 'N/A'}\nYour Typing Speed: ${typingSpeed ? `${typingSpeed} CPM` : 'N/A'}`;
      } else {
        // For regular messages, use the Groq API via our service
        botResponse = await fetchGrokResponse(input, user?.id);
      }

      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Update average response time
      setAverageResponseTime(prev => 
        prev ? (prev + responseTime) / 2 : responseTime
      );

      // Remove the temporary thinking message and add the real response
      const botMessageObj: ChatMessage = {
        id: uuidv4(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(msg => msg.id !== thinkingId).concat(botMessageObj));
      saveMessageToSupabase(botMessageObj);

      // Focus the input for next message
      inputRef.current?.focus();
    } catch (error) {
      console.error('Failed to get response:', error);
      // Remove the thinking message and add an error message
      const errorMessageObj: ChatMessage = {
        id: uuidv4(),
        content: "Sorry, I had trouble generating a response. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => prev.filter(msg => msg.id !== thinkingId).concat(errorMessageObj));
      saveMessageToSupabase(errorMessageObj);
      
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      updateConversationTimestamp();
    }
  };

  const exportChat = () => {
    if (messages.length <= 1) {
      toast({
        title: "Nothing to export",
        description: "Have a conversation first before exporting.",
        variant: "destructive"
      });
      return;
    }
    
    const chatContent = messages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.sender === 'user' ? 'You' : 'CollegeGenie'}: ${msg.content}`
    ).join('\n\n');
    
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `collegegenie-chat-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Chat Exported",
      description: "Your conversation has been saved as a text file.",
    });
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
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="sm" 
            className="text-primary" 
            onClick={exportChat}
          >
            <Save className="h-4 w-4 mr-1" /> Export
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:text-white hover:bg-primary-dark"
            onClick={() => toast({
              title: "Real-time Tracking",
              description: "Your conversation is being tracked for improved responses. Typing speed: " + 
                (typingSpeed ? `${typingSpeed} CPM` : 'Calculating...'),
            })}
          >
            <Info className="h-4 w-4" />
          </Button>
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
        <span>Use /help to see available commands • {typingSpeed ? `Typing: ${typingSpeed} CPM` : 'Start typing...'}</span>
      </div>
      
      {/* Three.js animation that responds to typing */}
      <TypeResponseCube isTyping={isTyping} inputLength={input.length} />
    </div>
  );
};

export default EnhancedChatInterface;
