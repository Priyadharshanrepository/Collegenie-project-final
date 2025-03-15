
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, BarChart3, ListTodo, MessageCircle, Menu, X, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import ButtonCustom from '../ui/button-custom';
import { useAuth } from '@/hooks/useAuth';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <header className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-subtle' : 'bg-transparent'
    )}>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/dad37d42-72df-4ff0-bd5a-f6d391213a7e.png" 
              alt="Collegenie Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-collegenie-gold to-collegenie-gold-dark bg-clip-text text-transparent">Collegenie</span>
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
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-collegenie-gray-dark hover:bg-collegenie-gray-light">
                    <div className="w-8 h-8 rounded-full bg-collegenie-blue-light flex items-center justify-center">
                      <User className="w-4 h-4 text-collegenie-blue-dark" />
                    </div>
                    <span className="hidden sm:inline">{user.name}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/profile')}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <ButtonCustom 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/sign-in')}
                >
                  Sign In
                </ButtonCustom>
                <ButtonCustom 
                  variant="blue" 
                  size="sm" 
                  onClick={() => navigate('/sign-up')}
                >
                  Sign Up
                </ButtonCustom>
              </div>
            )}
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
          
          {user ? (
            <>
              <div className="px-3 py-2 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-collegenie-blue-light flex items-center justify-center">
                  <User className="w-4 h-4 text-collegenie-blue-dark" />
                </div>
                <span>{user.name}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-lg flex items-center space-x-2 text-collegenie-gray-dark hover:bg-collegenie-gray-light"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="pt-2 pb-3 space-y-2">
              <ButtonCustom 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </ButtonCustom>
              <ButtonCustom 
                variant="blue" 
                className="w-full"
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </ButtonCustom>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
