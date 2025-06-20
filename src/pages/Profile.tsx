
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Settings, User, Home, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Profile: React.FC = () => {
  const { state } = useApp();

  const profileOptions = [
    { 
      icon: User, 
      title: 'Edit Profile', 
      description: 'Update your personal information',
      action: () => console.log('Edit profile')
    },
    { 
      icon: Home, 
      title: 'Household Settings', 
      description: 'Manage your household and members',
      action: () => console.log('Household settings')
    },
    { 
      icon: Bell, 
      title: 'Notifications', 
      description: 'Configure your notification preferences',
      action: () => console.log('Notifications')
    },
    { 
      icon: Shield, 
      title: 'Privacy & Security', 
      description: 'Manage your privacy and security settings',
      action: () => console.log('Privacy')
    },
    { 
      icon: HelpCircle, 
      title: 'Help & Support', 
      description: 'Get help and contact support',
      action: () => console.log('Help')
    },
    { 
      icon: Settings, 
      title: 'App Settings', 
      description: 'Customize your app experience',
      action: () => console.log('Settings')
    },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-20 lg:pb-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback className="text-xl">
                  {state.user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">
                  {state.user?.name || 'User Name'}
                </h2>
                <p className="text-muted-foreground">
                  {state.user?.email || 'user@example.com'}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="secondary">
                    {state.household?.name || 'My Home'}
                  </Badge>
                  <Badge variant="outline">Member</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-roomly-primary">12</div>
              <div className="text-sm text-muted-foreground">Tasks Done</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-roomly-secondary">$450</div>
              <div className="text-sm text-muted-foreground">Expenses</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-roomly-accent">8</div>
              <div className="text-sm text-muted-foreground">Events</div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Options */}
        <div className="space-y-3">
          {profileOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent 
                className="p-4 flex items-center space-x-4"
                onClick={option.action}
              >
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <option.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{option.title}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full text-destructive hover:text-destructive"
          onClick={() => console.log('Logout')}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
