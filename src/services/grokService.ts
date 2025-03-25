
import { GrokResponse } from '@/types/task';
import { supabase } from '@/integrations/supabase/client';

const GROK_API_KEY = 'xai-ZJKyiEIFus1MGPxvRzU8mA729UZaBEt2rZNJJrO7Rrh9ASy0XRCTc2Xhg1fG7uFWoXI3YKlseRYgBuzj';

export const fetchGrokResponse = async (message: string, userId?: string): Promise<string> => {
  try {
    // Track the start time of the request
    const requestStartTime = new Date();
    console.log(`AI request started at ${requestStartTime.toISOString()} for message: ${message}`);
    
    // Make a direct request to the Groq API with our key
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        model: "llama3-70b-8192",
        messages: [
          {
            role: "system",
            content: "You are CollegeGenie, an expert AI assistant specialized in college subjects including Allied Mathematics, Machine Learning, Cloud Computing, Web Development, Database Systems, and Software Engineering. Provide detailed, accurate, and helpful responses to students' questions. Include examples, explanations, and code snippets when relevant. Be conversational but focused on providing high-quality academic assistance. If you don't know something, admit it rather than making up an answer."
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 2048
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data = await response.json();
    const responseContent = data.choices[0].message.content;
    
    // Track response time
    const responseEndTime = new Date();
    const responseTimeMs = responseEndTime.getTime() - requestStartTime.getTime();
    console.log(`AI response received in ${responseTimeMs}ms`);
    
    // Store the interaction in Supabase if user is logged in
    if (userId) {
      try {
        const { error } = await supabase
          .from('chat_interactions')
          .insert({
            user_id: userId,
            query: message,
            response: responseContent,
            response_time_ms: responseTimeMs,
            timestamp: new Date().toISOString()
          });
        
        if (error) {
          console.error('Error storing chat interaction:', error);
        } else {
          console.log('Chat interaction stored successfully');
        }
      } catch (dbError) {
        console.error('Error accessing database:', dbError);
      }
    }
    
    return responseContent;
  } catch (error) {
    console.error('Error fetching from Groq API:', error);
    
    // Fallback responses for when the API fails
    const fallbackResponses = [
      "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
      "I apologize, but I can't access the information you need right now. Could you please try again shortly?",
      "There seems to be a technical issue with my connection. Please try your question again.",
      "I'm experiencing a temporary service disruption. Please try again in a few moments.",
      "I apologize for the inconvenience, but I'm having trouble processing your request right now. Please try again shortly."
    ];
    
    // Return a random fallback response for when the API fails
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};
