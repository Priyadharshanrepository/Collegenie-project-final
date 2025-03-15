import React, { useState } from 'react';
import { 
  ListTodo, Plus, Filter, Search, Calendar, Tag, ChevronDown, 
  CheckCircle, Circle, Clock, Edit2, Trash2, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import GlassCard from '@/components/ui/glass-card';
import ButtonCustom from '@/components/ui/button-custom';
import { Task, GroupedTasks } from '@/types/task';

const sampleTasks: Task[] = [
  { 
    id: 1, 
    title: 'Finish Physics Assignment', 
    description: 'Complete problems 5-10 from Chapter 7',
    dueDate: '2023-06-10', 
    isCompleted: false, 
    priority: 'high',
    category: 'Homework',
    course: 'Physics 101'
  },
  { 
    id: 2, 
    title: 'Read Chapter 7 of Calculus', 
    description: 'Focus on integration techniques and examples',
    dueDate: '2023-06-12', 
    isCompleted: false, 
    priority: 'medium',
    category: 'Reading',
    course: 'Calculus II'
  },
  { 
    id: 3, 
    title: 'Prepare slides for presentation', 
    description: 'Create 10-15 slides about renewable energy sources',
    dueDate: '2023-06-15', 
    isCompleted: true, 
    priority: 'low',
    category: 'Project',
    course: 'Environmental Science'
  },
  { 
    id: 4, 
    title: 'Schedule meeting with study group', 
    description: 'Coordinate with team for final project discussion',
    dueDate: '2023-06-08', 
    isCompleted: false, 
    priority: 'medium',
    category: 'Meeting',
    course: 'Group Project'
  },
  { 
    id: 5, 
    title: 'Submit literature review draft', 
    description: 'First draft of 5 pages for term paper',
    dueDate: '2023-06-20', 
    isCompleted: false, 
    priority: 'high',
    category: 'Assignment',
    course: 'English 202'
  },
  { 
    id: 6, 
    title: 'Study for chemistry quiz', 
    description: 'Review nomenclature and balancing equations',
    dueDate: '2023-06-11', 
    isCompleted: false, 
    priority: 'high',
    category: 'Exam Prep',
    course: 'Chemistry 101'
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [filter, setFilter] = useState('all'); // all, active, completed
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);
  
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
        return 'text-blue-600 font-medium';
      case 'overdue':
        return 'text-red-600 font-medium';
      default:
        return 'text-collegenie-gray-dark';
    }
  };
  
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'active' && !task.isCompleted) || 
      (filter === 'completed' && task.isCompleted);
    
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.course.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });
  
  const groupedTasks = filteredTasks.reduce((groups: GroupedTasks, task) => {
    const dueDate = task.dueDate;
    const status = getDueDateStatus(dueDate);
    
    if (!groups[dueDate]) {
      groups[dueDate] = {
        status,
        tasks: []
      };
    }
    
    groups[dueDate].tasks.push(task);
    return groups;
  }, {});
  
  const sortedDates = Object.keys(groupedTasks).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });
  
  const toggleTaskExpansion = (taskId: number) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(task => task.isCompleted).length,
    overdue: tasks.filter(task => !task.isCompleted && getDueDateStatus(task.dueDate) === 'overdue').length,
    dueToday: tasks.filter(task => !task.isCompleted && getDueDateStatus(task.dueDate) === 'today').length,
  };

  return (
    <div className="min-h-screen bg-collegenie-gray-lightest">
      <Navbar />
      
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 fade-animation">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Task Manager</h1>
              <p className="text-collegenie-gray-dark mt-1">
                Organize your assignments, deadlines, and study schedule
              </p>
            </div>
            <ButtonCustom variant="blue">
              <Plus className="w-4 h-4 mr-1.5" />
              New Task
            </ButtonCustom>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <GlassCard className="p-4" animate={true} delay={1}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-collegenie-blue-light flex items-center justify-center">
                <ListTodo className="w-4 h-4 text-collegenie-blue-dark" />
              </div>
              <div>
                <p className="text-sm text-collegenie-gray-dark">Total Tasks</p>
                <p className="text-xl font-bold">{taskStats.total}</p>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-4" animate={true} delay={1}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-collegenie-gray-dark">Completed</p>
                <p className="text-xl font-bold">{taskStats.completed}</p>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-4" animate={true} delay={2}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-collegenie-gray-dark">Due Today</p>
                <p className="text-xl font-bold">{taskStats.dueToday}</p>
              </div>
            </div>
          </GlassCard>
          
          <GlassCard className="p-4" animate={true} delay={2}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-collegenie-gray-dark">Overdue</p>
                <p className="text-xl font-bold">{taskStats.overdue}</p>
              </div>
            </div>
          </GlassCard>
        </div>
        
        <GlassCard className="p-4 md:p-6 mb-6" animate={true} delay={1}>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-collegenie-gray-dark" />
              </div>
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-collegenie-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-collegenie-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <ButtonCustom 
                variant={filter === 'all' ? 'blue' : 'outline'} 
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </ButtonCustom>
              <ButtonCustom 
                variant={filter === 'active' ? 'blue' : 'outline'} 
                size="sm"
                onClick={() => setFilter('active')}
              >
                Active
              </ButtonCustom>
              <ButtonCustom 
                variant={filter === 'completed' ? 'blue' : 'outline'} 
                size="sm"
                onClick={() => setFilter('completed')}
              >
                Completed
              </ButtonCustom>
              <ButtonCustom variant="outline" size="sm" className="ml-auto">
                <Filter className="w-4 h-4 mr-1.5" />
                More Filters
              </ButtonCustom>
            </div>
          </div>
        </GlassCard>
        
        <div className="space-y-6 fade-animation">
          {sortedDates.length === 0 && (
            <GlassCard className="p-8 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-collegenie-gray-light flex items-center justify-center">
                  <ListTodo className="w-8 h-8 text-collegenie-gray-dark" />
                </div>
                <h3 className="text-xl font-semibold">No tasks found</h3>
                <p className="text-collegenie-gray-dark">
                  {searchTerm 
                    ? "Try adjusting your search or filters" 
                    : "Create a new task to get started"}
                </p>
                <ButtonCustom variant="blue" className="mt-2">
                  <Plus className="w-4 h-4 mr-1.5" />
                  Add Task
                </ButtonCustom>
              </div>
            </GlassCard>
          )}
          
          {sortedDates.map((date) => {
            const { status, tasks } = groupedTasks[date];
            
            return (
              <div key={date} className="fade-animation">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className={cn(
                    "w-4 h-4",
                    status === 'overdue' ? "text-red-600" :
                    status === 'today' ? "text-blue-600" : "text-collegenie-gray-dark"
                  )} />
                  <h3 className={cn(
                    "text-sm font-medium",
                    status === 'overdue' ? "text-red-600" :
                    status === 'today' ? "text-blue-600" : "text-collegenie-gray-dark"
                  )}>
                    {status === 'today' ? 'Today' : 
                     status === 'overdue' ? 'Overdue' : formatDate(date)}
                  </h3>
                  <div className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-collegenie-gray-light text-collegenie-gray-dark">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                  </div>
                </div>
                
                <GlassCard className="overflow-hidden">
                  <div className="divide-y divide-collegenie-gray-light">
                    {tasks.map((task) => {
                      const isExpanded = expandedTaskId === task.id;
                      
                      return (
                        <div 
                          key={task.id}
                          className={cn(
                            "transition-all duration-200",
                            task.isCompleted ? "bg-collegenie-gray-lightest" : "bg-white",
                            isExpanded ? "shadow-subtle" : ""
                          )}
                        >
                          <div 
                            className="p-4 flex items-center gap-3 cursor-pointer"
                            onClick={() => toggleTaskExpansion(task.id)}
                          >
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTaskCompletion(task.id);
                              }}
                              className="flex-shrink-0 focus:outline-none"
                            >
                              {task.isCompleted ? (
                                <CheckCircle className="w-5 h-5 text-collegenie-blue" />
                              ) : (
                                <Circle className="w-5 h-5 text-collegenie-gray-dark hover:text-collegenie-blue transition-colors" />
                              )}
                            </button>
                            
                            <div className="flex-grow min-w-0">
                              <p className={cn(
                                "font-medium transition-all",
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
                            
                            <div className="flex items-center gap-2">
                              <div className={cn(
                                "hidden sm:inline-flex items-center text-xs",
                                getDueDateStyles(getDueDateStatus(task.dueDate))
                              )}>
                                <Clock className="w-3 h-3 mr-1" />
                                {status === 'today' ? 'Today' : formatDate(task.dueDate)}
                              </div>
                              
                              <ChevronDown className={cn(
                                "w-4 h-4 text-collegenie-gray-dark transition-transform",
                                isExpanded ? "transform rotate-180" : ""
                              )} />
                            </div>
                          </div>
                          
                          {isExpanded && (
                            <div className="p-4 pt-0 pl-12 pb-4 border-t border-collegenie-gray-light">
                              <div className="bg-collegenie-gray-lightest rounded-lg p-3 mb-3">
                                <p className="text-sm text-collegenie-gray-dark">{task.description}</p>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-collegenie-gray-dark">
                                <div className="flex items-center">
                                  <Tag className="w-3 h-3 mr-1" />
                                  Course: <span className="ml-1 font-medium">{task.course}</span>
                                </div>
                                
                                <div className="flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  Due: <span className="ml-1 font-medium">{formatDate(task.dueDate)}</span>
                                </div>
                              </div>
                              
                              <div className="mt-3 flex gap-2">
                                <ButtonCustom variant="outline" size="sm" className="text-xs">
                                  <Edit2 className="w-3 h-3 mr-1" />
                                  Edit
                                </ButtonCustom>
                                <ButtonCustom variant="outline" size="sm" className="text-xs text-red-600 hover:bg-red-50 border-red-200">
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Delete
                                </ButtonCustom>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Tasks;
