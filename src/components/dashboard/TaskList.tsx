import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, ListTodo, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '../ui/glass-card';
import ButtonCustom from '../ui/button-custom';
import { Task } from '@/types/task';

// Sample data for tasks
const sampleTasks: Task[] = [
  { 
    id: 1, 
    title: 'Finish Physics Assignment', 
    dueDate: '2023-06-10', 
    isCompleted: false, 
    priority: 'high',
    category: 'Homework' 
  },
  { 
    id: 2, 
    title: 'Read Chapter 7 of Calculus', 
    dueDate: '2023-06-12', 
    isCompleted: false, 
    priority: 'medium',
    category: 'Reading' 
  },
  { 
    id: 3, 
    title: 'Prepare slides for presentation', 
    dueDate: '2023-06-15', 
    isCompleted: true, 
    priority: 'low',
    category: 'Project' 
  },
  { 
    id: 4, 
    title: 'Schedule meeting with study group', 
    dueDate: '2023-06-08', 
    isCompleted: false, 
    priority: 'medium',
    category: 'Meeting' 
  },
];

interface TaskListProps {
  className?: string;
}

const TaskList: React.FC<TaskListProps> = ({ className }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  
  const toggleTaskCompletion = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const getDueDateStatus = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);
    
    if (dueDate.getTime() === today.getTime()) return 'today';
    if (dueDate < today) return 'overdue';
    return 'upcoming';
  };
  
  const getPriorityStyles = (priority: 'high' | 'medium' | 'low') => {
    switch(priority) {
      case 'high':
        return 'bg-red-50 text-red-600 border-red-200';
      case 'medium':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      case 'low':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-collegenie-gray-light text-collegenie-gray-dark';
    }
  };
  
  const getDueDateStyles = (status: string) => {
    switch(status) {
      case 'today':
        return 'text-blue-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-collegenie-gray-dark';
    }
  };

  return (
    <GlassCard className={className} animate={true} delay={2}>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-collegenie-gold-light flex items-center justify-center">
              <ListTodo className="w-4 h-4 text-collegenie-gold-dark" />
            </div>
            <h3 className="text-lg font-semibold">Upcoming Tasks</h3>
          </div>
          <ButtonCustom 
            variant="ghost" 
            size="sm" 
            className="text-collegenie-blue hover:text-collegenie-blue-dark hover:bg-collegenie-blue-light"
          >
            View All
          </ButtonCustom>
        </div>
        
        <div className="space-y-3">
          {tasks.map((task) => {
            const dueDateStatus = getDueDateStatus(task.dueDate);
            
            return (
              <div 
                key={task.id}
                className={cn(
                  "p-3 rounded-xl border transition-all duration-200 group hover:shadow-subtle",
                  task.isCompleted ? "bg-collegenie-gray-lightest border-collegenie-gray-light" : "bg-white border-collegenie-gray"
                )}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleTaskCompletion(task.id)}
                    className="flex-shrink-0 focus:outline-none"
                  >
                    {task.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-collegenie-blue" />
                    ) : (
                      <Circle className="w-5 h-5 text-collegenie-gray-dark group-hover:text-collegenie-blue transition-colors" />
                    )}
                  </button>
                  
                  <div className="flex-grow min-w-0">
                    <p className={cn(
                      "text-sm font-medium truncate transition-all",
                      task.isCompleted ? "text-collegenie-gray-dark line-through" : "text-foreground"
                    )}>
                      {task.title}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <div className={cn(
                        "inline-flex items-center px-2 py-0.5 text-xs rounded-full border",
                        getPriorityStyles(task.priority)
                      )}>
                        {task.priority}
                      </div>
                      
                      <div className="inline-flex items-center text-xs text-collegenie-gray-dark">
                        <Tag className="w-3 h-3 mr-1" />
                        {task.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "flex items-center text-xs font-medium whitespace-nowrap",
                    getDueDateStyles(dueDateStatus)
                  )}>
                    <Clock className="w-3 h-3 mr-1" />
                    {dueDateStatus === 'today' ? 'Today' : formatDate(task.dueDate)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex justify-center">
          <ButtonCustom variant="outline" size="sm" className="w-full">
            Add New Task
          </ButtonCustom>
        </div>
      </div>
    </GlassCard>
  );
};

export default TaskList;
