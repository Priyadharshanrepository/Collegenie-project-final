
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import GlassCard from '../ui/glass-card';

// Sample data for the chart
const weeklyData = [
  { day: 'Mon', hours: 3.5, tasks: 4 },
  { day: 'Tue', hours: 2.8, tasks: 3 },
  { day: 'Wed', hours: 3.2, tasks: 5 },
  { day: 'Thu', hours: 4.5, tasks: 6 },
  { day: 'Fri', hours: 2.5, tasks: 3 },
  { day: 'Sat', hours: 1.2, tasks: 2 },
  { day: 'Sun', hours: 0.8, tasks: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-subtle rounded-lg border border-collegenie-gray-light">
        <p className="font-medium text-sm">{label}</p>
        <p className="text-collegenie-blue font-medium text-sm">
          {`${payload[0].value} hours`}
        </p>
        <p className="text-collegenie-gold-dark text-sm">
          {`${payload[1].value} tasks`}
        </p>
      </div>
    );
  }

  return null;
};

interface ProgressChartProps {
  className?: string;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ className }) => {
  return (
    <GlassCard className={className} animate={true} delay={1}>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-collegenie-blue-light flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-collegenie-blue-dark" />
            </div>
            <h3 className="text-lg font-semibold">Weekly Progress</h3>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-collegenie-blue"></div>
              <span className="text-xs text-collegenie-gray-dark">Study Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-collegenie-gold"></div>
              <span className="text-xs text-collegenie-gray-dark">Tasks</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={weeklyData}
              margin={{
                top: 5,
                right: 5,
                left: -20,
                bottom: 5,
              }}
              barGap={8}
            >
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12, fill: '#7A7A7A' }}
                axisLine={{ stroke: '#EFEFEF' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#7A7A7A' }}
                axisLine={false}
                tickLine={false}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="hours" 
                fill="#2D7FF9" 
                radius={[4, 4, 0, 0]} 
                barSize={18} 
                animationDuration={1500}
              />
              <Bar 
                dataKey="tasks" 
                fill="#FFCC33" 
                radius={[4, 4, 0, 0]} 
                barSize={18} 
                animationDuration={1500}
                animationBegin={300}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Total This Week:</span>
            <span className="text-collegenie-blue font-semibold">{weeklyData.reduce((acc, curr) => acc + curr.hours, 0)} hrs</span>
          </div>
          <div className="badge-blue animate-pulse-light">
            +12% from last week
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProgressChart;
