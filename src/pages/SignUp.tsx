
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import GlassCard from '@/components/ui/glass-card';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      // Mock successful registration
      localStorage.setItem('user', JSON.stringify({
        id: '1',
        name: name,
        email: email,
      }));
      
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-collegenie-gray-lightest py-12 px-4 sm:px-6 lg:px-8">
      <GlassCard className="w-full max-w-md p-8" animate={true}>
        <div className="flex flex-col items-center justify-center mb-8">
          <img 
            src="/lovable-uploads/dad37d42-72df-4ff0-bd5a-f6d391213a7e.png" 
            alt="Collegenie Logo" 
            className="h-20 w-20 mb-4"
          />
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-collegenie-gray-dark mt-2 text-center">
            Join Collegenie and start your academic journey
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-collegenie-gray-dark" />
              <Input
                id="name"
                type="text"
                placeholder="Your Name"
                className="pl-10"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-collegenie-gray-dark" />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-collegenie-gray-dark" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-collegenie-gray-dark" />
                ) : (
                  <Eye className="h-4 w-4 text-collegenie-gray-dark" />
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-collegenie-gray-dark" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-collegenie-gray text-collegenie-blue focus:ring-collegenie-blue-light"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-collegenie-gray-dark">
              I agree to the{" "}
              <a href="#" className="font-medium text-collegenie-blue hover:text-collegenie-blue-dark">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-collegenie-blue hover:text-collegenie-blue-dark">
                Privacy Policy
              </a>
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-collegenie-blue hover:bg-collegenie-blue-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
          
          <div className="text-center mt-4">
            <p className="text-sm text-collegenie-gray-dark">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-medium text-collegenie-blue hover:text-collegenie-blue-dark">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </GlassCard>
    </div>
  );
};

export default SignUp;
