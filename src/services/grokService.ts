
import { GrokResponse } from '@/types/task';

// This function would typically fetch from a backend that securely manages the API key
export const fetchGrokResponse = async (message: string): Promise<string> => {
  try {
    // In a production app, this request would go to your backend which securely stores the API key
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message,
        // Academic context to focus on college subjects
        context: "You are CollegeGenie, an AI assistant focused on helping with college subjects like Allied Mathematics, Machine Learning, Cloud Computing, Web Development, Database Systems, and Software Engineering. Provide concise, helpful responses to students' questions."
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    
    const data: GrokResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from Grok API:', error);
    
    // Fallback responses for testing without the actual API
    const fallbackResponses = [
      "I can help with your Allied Mathematics assignment. What specific topic are you studying?",
      "For your Machine Learning project, consider using scikit-learn or TensorFlow to implement your models.",
      "Cloud Computing assignments often require understanding of services like AWS, Azure, or Google Cloud. What platform are you working with?",
      "I'd be happy to help with your Web Development project. Are you working with React, Angular, or another framework?",
      "For Database Systems, make sure you understand normalization and proper query optimization.",
      "Software Engineering principles like SOLID can really improve your code architecture."
    ];
    
    // Return a random fallback response for testing purposes
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
};
