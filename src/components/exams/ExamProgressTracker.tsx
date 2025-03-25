
import React from 'react';
import { BarChart, PieChart, Book, BookCheck, Calendar } from 'lucide-react';
import GlassCard from '../ui/glass-card';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';
import ButtonCustom from '../ui/button-custom';
import { Exam, ExamProgress } from '@/types/exam';

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
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getProgressColor = (status: Exam['status'], progress: number) => {
    if (status === 'completed') return 'bg-green-500';
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getStatusBadge = (status: Exam['status']) => {
    switch (status) {
      case 'completed':
        return <span className="badge-green">Completed</span>;
      case 'in-progress':
        return <span className="badge-blue">In Progress</span>;
      case 'not-started':
        return <span className="badge-gray">Not Started</span>;
      default:
        return null;
    }
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total Exams</span>
              <Book className="w-4 h-4 text-collegenie-gray-dark" />
            </div>
            <p className="text-2xl font-bold mt-2">{examProgress.totalExams}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Completed</span>
              <BookCheck className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-bold mt-2">{examProgress.completedExams}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Upcoming</span>
              <Calendar className="w-4 h-4 text-collegenie-blue" />
            </div>
            <p className="text-2xl font-bold mt-2">{examProgress.upcomingExams}</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Avg. Score</span>
              <PieChart className="w-4 h-4 text-collegenie-gold-dark" />
            </div>
            <p className="text-2xl font-bold mt-2">{examProgress.averageScore.toFixed(1)}%</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {exams.map((exam) => {
            const progress = Math.round((exam.completedQuestions / exam.totalQuestions) * 100);
            const progressColor = getProgressColor(exam.status, progress);
            
            return (
              <div key={exam.id} className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{exam.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{formatDate(exam.date)}</span>
                    {getStatusBadge(exam.status)}
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 mb-3">
                  {exam.subject} • {exam.completedQuestions}/{exam.totalQuestions} questions
                  {exam.score !== undefined && ` • Score: ${exam.score}%`}
                </div>
                
                <div className="relative pt-1">
                  <Progress
                    value={progress}
                    className="h-2 bg-gray-200"
                    indicatorClassName={progressColor}
                  />
                  <div className="flex items-center justify-end mt-1">
                    <span className="text-xs font-semibold text-gray-500">
                      {progress}% complete
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
};

export default ExamProgressTracker;
