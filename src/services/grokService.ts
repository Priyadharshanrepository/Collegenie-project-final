
import { GrokResponse } from '@/types/task';

const GROK_API_KEY = 'xai-ZJKyiEIFus1MGPxvRzU8mA729UZaBEt2rZNJJrO7Rrh9ASy0XRCTc2Xhg1fG7uFWoXI3YKlseRYgBuzj';

export const fetchGrokResponse = async (message: string): Promise<string> => {
  try {
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
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from Groq API:', error);
    
    // Fallback responses for when the API fails
    const fallbackResponses = [
      "I can help with your Allied Mathematics assignment. What specific topic are you studying?",
      "For your Machine Learning project, consider using scikit-learn or TensorFlow to implement your models.",
      "Cloud Computing assignments often require understanding of services like AWS, Azure, or Google Cloud. What platform are you working with?",
      "I'd be happy to help with your Web Development project. Are you working with React, Angular, or another framework?",
      "For Database Systems, make sure you understand normalization and proper query optimization.",
      "Software Engineering principles like SOLID can really improve your code architecture."
    ];
    
    // Return a random fallback response for when the API fails
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};
