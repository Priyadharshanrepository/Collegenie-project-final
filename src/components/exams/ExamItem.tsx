
import React from 'react';
import { Progress } from '../ui/progress';
import { Exam } from '@/types/exam';

interface ExamItemProps {
  exam: Exam;
}

const ExamItem: React.FC<ExamItemProps> = ({ exam }) => {
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

  const progress = Math.round((exam.completedQuestions / exam.totalQuestions) * 100);
  const progressColor = getProgressColor(exam.status, progress);

  return (
    <div className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
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
};

export default ExamItem;
