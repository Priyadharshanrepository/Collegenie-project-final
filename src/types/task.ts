
export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  course?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}
