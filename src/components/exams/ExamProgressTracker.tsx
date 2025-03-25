
import React from 'react';
import { BarChart } from 'lucide-react';
import GlassCard from '../ui/glass-card';
import { cn } from '@/lib/utils';
import ButtonCustom from '../ui/button-custom';
import { Exam, ExamProgress } from '@/types/exam';
import ExamStats from './ExamStats';
import ExamItem from './ExamItem';

interface ExamProgressTrackerProps {
  className?: string;
}

// Sample data
const exams: Exam[] = [
  {
    id: '1',
    title: 'Midterm Calculus',
    date: '2023-06-20',
    subject: 'Allied Mathematics',
    totalQuestions: 50,
    completedQuestions: 35,
    status: 'in-progress'
  },
  {
    id: '2',
    title: 'Data Structures Final',
    date: '2023-06-25',
    subject: 'Computer Science',
    totalQuestions: 40,
    completedQuestions: 40,
    score: 92,
    status: 'completed'
  },
  {
    id: '3',
    title: 'Advanced AI Quiz',
    date: '2023-07-05',
    subject: 'Machine Learning',
    totalQuestions: 30,
    completedQuestions: 0,
    status: 'not-started'
  },
  {
    id: '4',
    title: 'Physics Lab Test',
    date: '2023-06-18',
    subject: 'Physics',
    totalQuestions: 25,
    completedQuestions: 20,
    status: 'in-progress'
  },
];

const examProgress: ExamProgress = {
  totalExams: exams.length,
  completedExams: exams.filter(exam => exam.status === 'completed').length,
  upcomingExams: exams.filter(exam => exam.status === 'not-started').length,
  averageScore: exams.filter(exam => exam.score !== undefined).reduce((acc, exam) => acc + (exam.score || 0), 0) / 
                exams.filter(exam => exam.score !== undefined).length || 0
};

const ExamProgressTracker: React.FC<ExamProgressTrackerProps> = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <GlassCard className="p-6" animate={true} delay={1}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-collegenie-blue-light flex items-center justify-center">
              <BarChart className="w-5 h-5 text-collegenie-blue-dark" />
            </div>
            <h2 className="text-xl font-bold">Exam Progress</h2>
          </div>
          <ButtonCustom variant="outline" size="sm">
            View All Exams
          </ButtonCustom>
        </div>
        
        <ExamStats examProgress={examProgress} />
        
        <div className="space-y-4">
          {exams.map((exam) => (
            <ExamItem key={exam.id} exam={exam} />
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default ExamProgressTracker;
