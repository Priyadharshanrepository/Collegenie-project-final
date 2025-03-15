
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import EnhancedChatInterface from '@/components/chatbot/EnhancedChatInterface';

const EnhancedChat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CollegeGenie - AI Chat Assistant</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto py-6 px-4 h-[calc(100vh-4rem)]">
        <div className="h-full">
          <EnhancedChatInterface />
        </div>
      </main>
    </div>
  );
};

export default EnhancedChat;
