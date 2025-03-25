
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ButtonCustom } from '@/components/ui/button-custom';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

interface AboutDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AboutDialog = ({ isOpen, onOpenChange }: AboutDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-collegenie-blue">About CollegeGenie</DialogTitle>
          <DialogDescription className="text-lg mt-2">Your AI-powered academic companion</DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">What is CollegeGenie?</h3>
            <p className="text-base leading-relaxed">
              CollegeGenie is a comprehensive academic assistant designed specifically for college students. Our platform combines advanced AI technology with intuitive tools to help you excel in your studies, stay organized, and achieve your academic goals.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Key Features</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-medium">AI Study Assistant:</span> Get instant answers to questions across multiple college subjects including Mathematics, Computer Science, Engineering, and more.
              </li>
              <li>
                <span className="font-medium">Progress Tracking:</span> Visualize your study hours, assignment completion, and academic achievements through intuitive charts and metrics.
              </li>
              <li>
                <span className="font-medium">Task Management:</span> Stay on top of assignments, exams, and projects with our smart to-do lists and automated reminders.
              </li>
              <li>
                <span className="font-medium">Personalized Learning:</span> Receive recommendations and study tips tailored to your academic needs and learning style.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">How It Works</h3>
            <p className="text-base leading-relaxed">
              CollegeGenie leverages advanced AI models to provide instant academic assistance across various college subjects. Our platform processes your questions and provides detailed, accurate responses, complete with explanations, examples, and references where appropriate.
            </p>
            <p className="text-base leading-relaxed mt-2">
              Beyond the AI assistant, our task management and progress tracking tools help you organize your academic life, visualize your achievements, and stay on track with your educational goals.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Get Started Today</h3>
            <p className="text-base leading-relaxed">
              Join thousands of students who are already using CollegeGenie to transform their academic experience and achieve better results with less stress. Sign up for free and discover how our AI-powered academic companion can help you excel in your college journey.
            </p>
            
            <div className="mt-6 flex justify-center">
              <ButtonCustom 
                variant="blue" 
                size="lg"
                onClick={() => {
                  onOpenChange(false);
                  navigate('/dashboard');
                }}
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </ButtonCustom>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
