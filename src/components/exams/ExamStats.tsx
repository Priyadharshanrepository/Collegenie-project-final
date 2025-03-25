
import React from 'react';
import ExamStatCard from './ExamStatCard';
import { ExamProgress } from '@/types/exam';

interface ExamStatsProps {
  examProgress: ExamProgress;
}

const ExamStats: React.FC<ExamStatsProps> = ({ examProgress }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <ExamStatCard
        title="Total Exams"
        value={examProgress.totalExams}
        icon="total"
      />
      
      <ExamStatCard
        title="Completed"
        value={examProgress.completedExams}
        icon="completed"
      />
      
      <ExamStatCard
        title="Upcoming"
        value={examProgress.upcomingExams}
        icon="upcoming"
      />
      
      <ExamStatCard
        title="Avg. Score"
        value={examProgress.averageScore.toFixed(1)}
        icon="average"
      />
    </div>
  );
};

export default ExamStats;
