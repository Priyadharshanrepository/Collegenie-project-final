
import React from 'react';
import { Book, BookCheck, Calendar, PieChart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExamStatCardProps {
  title: string;
  value: string | number;
  icon: 'total' | 'completed' | 'upcoming' | 'average';
  className?: string;
}

const ExamStatCard: React.FC<ExamStatCardProps> = ({ title, value, icon, className }) => {
  const getIcon = () => {
    switch (icon) {
      case 'total':
        return <Book className="w-4 h-4 text-collegenie-gray-dark" />;
      case 'completed':
        return <BookCheck className="w-4 h-4 text-green-600" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4 text-collegenie-blue" />;
      case 'average':
        return <PieChart className="w-4 h-4 text-collegenie-gold-dark" />;
      default:
        return <Book className="w-4 h-4 text-collegenie-gray-dark" />;
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-subtle border border-gray-100">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">{title}</span>
        {getIcon()}
      </div>
      <p className="text-2xl font-bold mt-2">
        {value}
        {icon === 'average' && '%'}
      </p>
    </div>
  );
};

export default ExamStatCard;
