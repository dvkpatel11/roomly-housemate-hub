
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Users, Bell, Phone, Video, Mail } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Communication: React.FC = () => {
  const { state } = useApp();

  const communicationOptions = [
    { 
      icon: MessageCircle, 
      title: 'House Chat', 
      description: 'Group chat with all household members',
      badge: 5,
      action: () => console.log('Open house chat')
    },
    { 
      icon: Users, 
      title: 'Household Members', 
      description: 'View and manage household members',
      badge: 0,
      action: () => console.log('View members')
    },
    { 
      icon: Bell, 
      title: 'Announcements', 
      description: 'Important household announcements',
      badge: 2,
      action: () => console.log('View announcements')
    },
    { 
      icon: Phone, 
      title: 'Emergency Contacts', 
      description: 'Quick access to emergency numbers',
      badge: 0,
      action: () => console.log('Emergency contacts')
    },
    { 
      icon: Video, 
      title: 'Video Calls', 
      description: 'Start a video call with housemates',
      badge: 0,
      action: () => console.log('Start video call')
    },
    { 
      icon: Mail, 
      title: 'Shared Messages', 
      description: 'Messages from landlord or property manager',
      badge: 1,
      action: () => console.log('View shared messages')
    },
  ];

  const recentChats = [
    { name: 'Kitchen Cleanup', lastMessage: 'Thanks for doing the dishes!', time: '2m ago', unread: 2 },
    { name: 'Weekend Plans', lastMessage: 'Anyone up for a movie night?', time: '1h ago', unread: 0 },
    { name: 'Bill Reminder', lastMessage: 'Electricity bill is due tomorrow', time: '3h ago', unread: 1 },
  ];

  return (
    <div className="min-h-screen bg-background p-4 pb-20 lg:pb-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Communication</h1>
            <p className="text-muted-foreground">Stay connected with your household</p>
          </div>
          <Button>
            <MessageCircle className="h-4 w-4 mr-2" />
            New Message
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Unread</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold">4</div>
                  <div className="text-sm text-muted-foreground">Members</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">2</div>
                  <div className="text-sm text-muted-foreground">Alerts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">Shared</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Communication Options */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Communication Tools</h2>
            <div className="space-y-3">
              {communicationOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent 
                    className="p-4 flex items-center space-x-4"
                    onClick={option.action}
                  >
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <option.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{option.title}</h3>
                        {option.badge > 0 && (
                          <Badge variant="secondary" className="h-5">
                            {option.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{option.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Chats */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Chats</h2>
            <div className="space-y-3">
              {recentChats.map((chat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {chat.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{chat.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-muted-foreground">{chat.time}</span>
                            {chat.unread > 0 && (
                              <Badge variant="secondary" className="h-5 text-xs">
                                {chat.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
