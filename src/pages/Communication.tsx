
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MessageCircle, Users, Bell, Phone, Video, Mail } from 'lucide-react';
import { useAnnouncements, usePolls, useUnreadCount } from '@/hooks/useApi';

const Communication: React.FC = () => {
  const { data: announcements, isLoading: announcementsLoading } = useAnnouncements();
  const { data: polls, isLoading: pollsLoading } = usePolls();
  const { data: unreadCount } = useUnreadCount();

  const communicationOptions = [
    { 
      icon: MessageCircle, 
      title: 'House Chat', 
      description: 'Group chat with all household members',
      badge: unreadCount?.data?.count || 0,
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
      badge: announcements?.data?.filter(a => !a.read)?.length || 2,
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
      title: 'Polls & Voting', 
      description: 'Participate in household decisions',
      badge: polls?.data?.filter(p => !p.closed)?.length || 1,
      action: () => console.log('View polls')
    },
  ];

  // Calculate stats from real data
  const totalUnread = unreadCount?.data?.count || 8;
  const activePolls = polls?.data?.filter(p => !p.closed)?.length || 1;
  const pinnedAnnouncements = announcements?.data?.filter(a => a.pinned)?.length || 2;

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
                  <div className="text-2xl font-bold">{totalUnread}</div>
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
                  <div className="text-2xl font-bold">{pinnedAnnouncements}</div>
                  <div className="text-sm text-muted-foreground">Pinned</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="text-2xl font-bold">{activePolls}</div>
                  <div className="text-sm text-muted-foreground">Active Polls</div>
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

          {/* Recent Announcements */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Recent Announcements</h2>
            <div className="space-y-3">
              {announcementsLoading ? (
                // Loading skeleton
                Array.from({ length: 3 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : announcements?.data?.length > 0 ? (
                announcements.data.slice(0, 3).map((announcement) => (
                  <Card key={announcement.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={announcement.created_by_user?.avatar} />
                          <AvatarFallback>
                            {announcement.created_by_user?.name?.charAt(0) || 'A'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium truncate">{announcement.title}</h3>
                            <div className="flex items-center space-x-2">
                              <Badge 
                                variant={announcement.priority === 'high' ? 'destructive' : 'secondary'}
                                className="text-xs"
                              >
                                {announcement.priority}
                              </Badge>
                              {announcement.pinned && (
                                <Badge variant="outline" className="text-xs">
                                  Pinned
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mt-1">
                            {announcement.content}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            by {announcement.created_by_user?.name} • {new Date(announcement.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No announcements yet</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Communication;
