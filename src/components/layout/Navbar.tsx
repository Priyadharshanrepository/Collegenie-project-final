
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BarChart3, ListTodo, MessageCircle, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ButtonCustom from '../ui/button-custom';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Tasks', path: '/tasks', icon: ListTodo },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
  ];
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'
    )}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-collegenie-blue rounded-lg rotate-45 transition-all duration-300 hover:rotate-0"></div>
              <Book className="absolute inset-0 text-white w-5 h-5 m-1.5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-collegenie-blue to-collegenie-blue-dark bg-clip-text text-transparent">Collegenie</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link 
                  key={item.name}
                  to={item.path}
                  className={cn(
                    'px-3 py-2 rounded-lg flex items-center space-x-1 transition-all duration-200',
                    isActive 
                      ? 'bg-collegenie-blue-light text-collegenie-blue-dark font-medium' 
                      : 'text-collegenie-gray-dark hover:bg-collegenie-gray-light'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            <ButtonCustom variant="blue" size="sm" className="ml-2">
              Sign In
            </ButtonCustom>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg text-collegenie-gray-dark hover:bg-collegenie-gray-light transition-all"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
        isMobileMenuOpen ? 'max-h-screen bg-white shadow-subtle' : 'max-h-0'
      )}>
        <div className="px-4 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={cn(
                  'block px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200',
                  isActive 
                    ? 'bg-collegenie-blue-light text-collegenie-blue-dark font-medium' 
                    : 'text-collegenie-gray-dark hover:bg-collegenie-gray-light'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          
          <div className="pt-2 pb-3">
            <ButtonCustom variant="blue" className="w-full">
              Sign In
            </ButtonCustom>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
