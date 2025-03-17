
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import { User } from '@/types/task';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);

  const handleSave = () => {
    if (!userData) return;
    
    // In a real app, this would send the updated data to an API
    // For this demo, we'll just update localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Success",
      description: "Profile updated successfully!",
    });
    
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!userData) return;
    
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    navigate('/sign-in');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>CollegeGenie - Profile</title>
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto py-20 px-4">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <Avatar className="w-24 h-24">
              {user.profileImage ? (
                <AvatarImage src={user.profileImage} alt={user.name} />
              ) : (
                <AvatarFallback className="text-2xl bg-collegenie-blue-light text-collegenie-blue-dark">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-collegenie-gray-dark">{user.email}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2">Profile Information</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={userData?.name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={userData?.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-collegenie-gray-dark">Full Name</p>
                    <p>{user.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-collegenie-gray-dark">Email</p>
                    <p>{user.email}</p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                  <Button variant="destructive" onClick={handleLogout}>
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
