
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { toast } from 'sonner';
import type {
  DashboardData,
  Task,
  Expense,
  Event,
  Announcement,
  Poll,
  Notification,
  Household,
  User,
  HouseholdMember,
} from '@/types/api';

// Query keys
export const queryKeys = {
  dashboard: ['dashboard'],
  tasks: ['tasks'],
  myTasks: ['tasks', 'me'],
  expenses: ['expenses'],
  events: ['events'],
  myEvents: ['events', 'me'],
  announcements: ['communications', 'announcements'],
  polls: ['communications', 'polls'],
  notifications: ['notifications'],
  unreadCount: ['notifications', 'unread-count'],
  household: ['household'],
  householdMembers: ['household', 'members'],
  profile: ['profile'],
};

// Dashboard hooks
export const useDashboard = () => {
  return useQuery({
    queryKey: queryKeys.dashboard,
    queryFn: () => apiService.getDashboard(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useQuickStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'quick-stats'],
    queryFn: () => apiService.getQuickStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUrgentItems = () => {
  return useQuery({
    queryKey: ['dashboard', 'urgent-items'],
    queryFn: () => apiService.getUrgentItems(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useFinancialSnapshot = () => {
  return useQuery({
    queryKey: ['dashboard', 'financial-snapshot'],
    queryFn: () => apiService.getFinancialSnapshot(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTaskProgress = () => {
  return useQuery({
    queryKey: ['dashboard', 'task-progress'],
    queryFn: () => apiService.getTaskProgress(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ['dashboard', 'upcoming-events'],
    queryFn: () => apiService.getUpcomingEvents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useRecentActivity = () => {
  return useQuery({
    queryKey: ['dashboard', 'recent-activity'],
    queryFn: () => apiService.getRecentActivity(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

// Task hooks
export const useTasks = () => {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: () => apiService.getTasks(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMyTasks = () => {
  return useQuery({
    queryKey: queryKeys.myTasks,
    queryFn: () => apiService.getMyTasks(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (task: Partial<Task>) => apiService.createTask(task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.myTasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success('Task created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create task');
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string; updates: Partial<Task> }) => 
      apiService.updateTask(taskId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.myTasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success('Task updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update task');
    },
  });
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskId: string) => apiService.completeTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.myTasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success('Task completed!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to complete task');
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (taskId: string) => apiService.deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.myTasks });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success('Task deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete task');
    },
  });
};

// Expense hooks
export const useExpenses = () => {
  return useQuery({
    queryKey: queryKeys.expenses,
    queryFn: () => apiService.getExpenses(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (expense: Partial<Expense>) => apiService.createExpense(expense),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.expenses });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success('Expense created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create expense');
    },
  });
};

// Event hooks
export const useEvents = () => {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: () => apiService.getEvents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useMyEvents = () => {
  return useQuery({
    queryKey: queryKeys.myEvents,
    queryFn: () => apiService.getMyEvents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (event: Partial<Event>) => apiService.createEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.myEvents });
      queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
      toast.success('Event created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create event');
    },
  });
};

export const useRSVPEvent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ eventId, response }: { eventId: string; response: string }) => 
      apiService.rsvpEvent(eventId, response),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.events });
      queryClient.invalidateQueries({ queryKey: queryKeys.myEvents });
      toast.success('RSVP updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update RSVP');
    },
  });
};

// Communication hooks
export const useAnnouncements = () => {
  return useQuery({
    queryKey: queryKeys.announcements,
    queryFn: () => apiService.getAnnouncements(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePolls = () => {
  return useQuery({
    queryKey: queryKeys.polls,
    queryFn: () => apiService.getPolls(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (announcement: Partial<Announcement>) => apiService.createAnnouncement(announcement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements });
      toast.success('Announcement created successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create announcement');
    },
  });
};

export const useVoteOnPoll = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ pollId, option }: { pollId: string; option: string }) => 
      apiService.voteOnPoll(pollId, option),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.polls });
      toast.success('Vote submitted successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to submit vote');
    },
  });
};

// Notification hooks
export const useNotifications = () => {
  return useQuery({
    queryKey: queryKeys.notifications,
    queryFn: () => apiService.getNotifications(),
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useUnreadCount = () => {
  return useQuery({
    queryKey: queryKeys.unreadCount,
    queryFn: () => apiService.getUnreadCount(),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 30 * 1000, // Poll every 30 seconds
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => apiService.markNotificationRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.unreadCount });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiService.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications });
      queryClient.invalidateQueries({ queryKey: queryKeys.unreadCount });
      toast.success('All notifications marked as read');
    },
  });
};

// Household hooks
export const useHousehold = () => {
  return useQuery({
    queryKey: queryKeys.household,
    queryFn: () => apiService.getHousehold(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useHouseholdMembers = () => {
  return useQuery({
    queryKey: queryKeys.householdMembers,
    queryFn: () => apiService.getHouseholdMembers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useInviteMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (email: string) => apiService.inviteMember(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.householdMembers });
      toast.success('Invitation sent successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send invitation');
    },
  });
};

// Profile hooks
export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: () => apiService.getProfile(),
    staleTime: 10 * 60 * 1000, //10 minutes
  });
};
