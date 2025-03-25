
export interface Exam {
  id: string;
  title: string;
  date: string;
  subject: string;
  totalQuestions: number;
  completedQuestions: number;
  score?: number;
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface ExamProgress {
  totalExams: number;
  completedExams: number;
  upcomingExams: number;
  averageScore: number;
}
