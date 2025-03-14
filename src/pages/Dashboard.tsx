
import React from 'react';
import { Calendar, GraduationCap, Clock, Award, BookOpen, ChevronRight, AlarmClock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/glass-card';
import ProgressChart from '@/components/dashboard/ProgressChart';
import TaskList from '@/components/dashboard/TaskList';
import ButtonCustom from '@/components/ui/button-custom';

const Dashboard = () => {
  const statsCards = [
    {
      title: 'Study Hours',
      value: '18.5',
      unit: 'hrs',
      icon: Clock,
      change: '+2.5 hrs',
      isPositive: true,
      bg: 'bg-collegenie-blue-light',
      iconColor: 'text-collegenie-blue-dark',
    },
    {
      title: 'Tasks Completed',
      value: '24',
      unit: '',
      icon: Award,
      change: '+5 tasks',
      isPositive: true,
      bg: 'bg-collegenie-gold-light',
      iconColor: 'text-collegenie-gold-dark',
    },
    {
      title: 'Courses Active',
      value: '5',
      unit: '',
      icon: BookOpen,
      change: 'All on track',
      isPositive: true,
      bg: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      title: 'Next Deadline',
      value: 'Jun 15',
      unit: '',
      icon: AlarmClock,
      change: '2 days left',
      isPositive: false,
      bg: 'bg-red-100',
      iconColor: 'text-red-600',
    }
  ];

  // Current week dates
  const getCurrentWeekDates = () => {
    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const diff = now.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust to start from Monday
    
    const startDate = new Date(now.setDate(diff));
    const endDate = new Date(now.setDate(diff + 6));
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <div className="min-h-screen bg-collegenie-gray-lightest">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 fade-animation">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
              <div className="flex items-center text-collegenie-gray-dark mt-1">
                <Calendar className="w-4 h-4 mr-1.5" />
                <span>{getCurrentWeekDates()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ButtonCustom variant="outline" size="sm">
                This Week
              </ButtonCustom>
              <ButtonCustom variant="outline" size="sm">
                This Month
              </ButtonCustom>
              <ButtonCustom variant="blue" size="sm">
                <GraduationCap className="w-4 h-4 mr-1.5" />
                Study Session
              </ButtonCustom>
            </div>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsCards.map((stat, index) => (
            <GlassCard 
              key={index} 
              className="p-4" 
              animate={true} 
              delay={(index % 3 + 1) as 1 | 2 | 3}
            >
              <div className="flex items-center justify-between">
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", stat.bg)}>
                  <stat.icon className={cn("w-5 h-5", stat.iconColor)} />
                </div>
                <span className="text-xs font-medium text-collegenie-gray-dark">
                  {stat.title}
                </span>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <div>
                  <h3 className="text-2xl font-bold">
                    {stat.value}
                    <span className="text-sm font-medium text-collegenie-gray-dark ml-1">{stat.unit}</span>
                  </h3>
                  <p className={cn(
                    "text-xs font-medium",
                    stat.isPositive ? "text-green-600" : "text-red-600"
                  )}>
                    {stat.change}
                  </p>
                </div>
                <ButtonCustom 
                  variant="ghost" 
                  size="sm" 
                  className="text-collegenie-gray-dark hover:text-collegenie-blue hover:bg-collegenie-blue-light/50 p-1 h-auto rounded-full"
                >
                  <ChevronRight className="w-4 h-4" />
                </ButtonCustom>
              </div>
            </GlassCard>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProgressChart className="lg:col-span-2" />
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
