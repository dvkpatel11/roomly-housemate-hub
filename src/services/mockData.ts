
import type {
  Task,
  Expense,
  Event,
  Announcement,
  Poll,
  Notification,
  Household,
  User,
  DashboardData,
  QuickStats,
  UrgentItems,
  FinancialSnapshot,
  TaskProgress,
  ActivityItem,
  NotificationsSummary,
  HouseholdPulse,
} from '@/types/api';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: '/placeholder.svg',
    role: 'admin',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Sam Wilson',
    email: 'sam@example.com',
    avatar: '/placeholder.svg',
    role: 'member',
    created_at: '2024-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    avatar: '/placeholder.svg',
    role: 'member',
    created_at: '2024-01-03T00:00:00Z',
  },
];

// Mock household
export const mockHousehold: Household = {
  id: '1',
  name: 'Sunny Side Apartment',
  description: 'Our cozy shared living space',
  created_at: '2024-01-01T00:00:00Z',
  owner_id: '1',
  members: mockUsers.map(user => ({
    ...user,
    household_role: user.id === '1' ? 'owner' : 'member',
    joined_at: user.created_at,
  })),
};

// Mock tasks
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Clean Kitchen',
    description: 'Deep clean the kitchen including appliances',
    assigned_to: '1',
    assigned_user: mockUsers[0],
    due_date: '2024-12-25T10:00:00Z',
    completed: false,
    category: 'cleaning',
    priority: 'high',
    status: 'pending',
    points: 10,
    created_at: '2024-12-20T00:00:00Z',
    updated_at: '2024-12-20T00:00:00Z',
  },
  {
    id: '2',
    title: 'Take Out Trash',
    description: 'Weekly trash and recycling pickup',
    assigned_to: '2',
    assigned_user: mockUsers[1],
    due_date: '2024-12-24T08:00:00Z',
    completed: true,
    completed_at: '2024-12-23T19:30:00Z',
    category: 'maintenance',
    priority: 'medium',
    status: 'completed',
    points: 5,
    created_at: '2024-12-20T00:00:00Z',
    updated_at: '2024-12-23T19:30:00Z',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    description: 'Weekly grocery run for household essentials',
    assigned_to: '3',
    assigned_user: mockUsers[2],
    due_date: '2024-12-26T12:00:00Z',
    completed: false,
    category: 'shopping',
    priority: 'medium',
    status: 'in_progress',
    points: 8,
    created_at: '2024-12-21T00:00:00Z',
    updated_at: '2024-12-22T10:00:00Z',
  },
];

// Mock expenses
export const mockExpenses: Expense[] = [
  {
    id: '1',
    title: 'Groceries',
    description: 'Weekly grocery shopping at Whole Foods',
    amount: 85.50,
    paid_by: '1',
    paid_by_user: mockUsers[0],
    category: 'groceries',
    date: '2024-12-22T00:00:00Z',
    split_method: 'equal',
    splits: mockUsers.map(user => ({
      user_id: user.id,
      user,
      amount: 28.50,
      paid: user.id === '1',
      paid_at: user.id === '1' ? '2024-12-22T00:00:00Z' : undefined,
    })),
    created_at: '2024-12-22T00:00:00Z',
    updated_at: '2024-12-22T00:00:00Z',
  },
  {
    id: '2',
    title: 'Electricity Bill',
    description: 'Monthly electricity bill',
    amount: 120.00,
    paid_by: '2',
    paid_by_user: mockUsers[1],
    category: 'utilities',
    date: '2024-12-21T00:00:00Z',
    split_method: 'equal',
    splits: mockUsers.map(user => ({
      user_id: user.id,
      user,
      amount: 40.00,
      paid: true,
      paid_at: '2024-12-21T00:00:00Z',
    })),
    created_at: '2024-12-21T00:00:00Z',
    updated_at: '2024-12-21T00:00:00Z',
  },
];

// Mock events
export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'House Meeting',
    description: 'Monthly house meeting to discuss upcoming items',
    date: '2024-12-28T19:00:00Z',
    location: 'Living Room',
    type: 'meeting',
    created_by: '1',
    created_by_user: mockUsers[0],
    status: 'approved',
    attendees: mockUsers.map(user => ({
      user_id: user.id,
      user,
      response: 'yes',
      responded_at: '2024-12-20T00:00:00Z',
    })),
    created_at: '2024-12-20T00:00:00Z',
    updated_at: '2024-12-20T00:00:00Z',
  },
  {
    id: '2',
    title: 'New Years Party',
    description: 'Celebrate the new year together!',
    date: '2024-12-31T20:00:00Z',
    end_date: '2025-01-01T02:00:00Z',
    location: 'Main Apartment',
    type: 'party',
    created_by: '2',
    created_by_user: mockUsers[1],
    status: 'approved',
    attendees: [
      {
        user_id: '1',
        user: mockUsers[0],
        response: 'yes',
        responded_at: '2024-12-21T00:00:00Z',
      },
      {
        user_id: '2',
        user: mockUsers[1],
        response: 'yes',
        responded_at: '2024-12-21T00:00:00Z',
      },
      {
        user_id: '3',
        user: mockUsers[2],
        response: 'maybe',
        responded_at: '2024-12-22T00:00:00Z',
      },
    ],
    created_at: '2024-12-21T00:00:00Z',
    updated_at: '2024-12-22T00:00:00Z',
  },
];

// Mock announcements
export const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Maintenance Notice',
    content: 'The building will be performing elevator maintenance this weekend. Please plan accordingly.',
    category: 'maintenance',
    priority: 'high',
    created_by: '1',
    created_by_user: mockUsers[0],
    pinned: true,
    expires_at: '2024-12-30T00:00:00Z',
    created_at: '2024-12-20T00:00:00Z',
    updated_at: '2024-12-20T00:00:00Z',
  },
  {
    id: '2',
    title: 'New House Rules',
    content: 'Please review the updated house rules document shared in our group chat.',
    category: 'general',
    priority: 'medium',
    created_by: '1',
    created_by_user: mockUsers[0],
    pinned: false,
    created_at: '2024-12-19T00:00:00Z',
    updated_at: '2024-12-19T00:00:00Z',
  },
];

// Mock polls
export const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'What should we do for our next house dinner?',
    description: 'Let\'s plan our monthly group dinner!',
    options: [
      {
        id: '1',
        text: 'Order Pizza',
        votes: [{ user_id: '2', user: mockUsers[1], voted_at: '2024-12-21T00:00:00Z' }],
        vote_count: 1,
      },
      {
        id: '2',
        text: 'Cook Together',
        votes: [
          { user_id: '1', user: mockUsers[0], voted_at: '2024-12-21T00:00:00Z' },
          { user_id: '3', user: mockUsers[2], voted_at: '2024-12-22T00:00:00Z' },
        ],
        vote_count: 2,
      },
      {
        id: '3',
        text: 'Go to Restaurant',
        votes: [],
        vote_count: 0,
      },
    ],
    created_by: '1',
    created_by_user: mockUsers[0],
    closes_at: '2024-12-30T00:00:00Z',
    closed: false,
    anonymous: false,
    created_at: '2024-12-20T00:00:00Z',
    updated_at: '2024-12-22T00:00:00Z',
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Task Assigned',
    content: 'You have been assigned a new task: Clean Kitchen',
    type: 'task_assigned',
    priority: 'medium',
    read: false,
    action_url: '/tasks/1',
    created_at: '2024-12-22T10:00:00Z',
  },
  {
    id: '2',
    title: 'Expense Added',
    content: 'Alex added a new expense: Groceries ($85.50)',
    type: 'expense_added',
    priority: 'low',
    read: false,
    action_url: '/expenses/1',
    created_at: '2024-12-22T08:30:00Z',
  },
  {
    id: '3',
    title: 'Bill Due Soon',
    content: 'Electricity bill is due in 2 days',
    type: 'bill_reminder',
    priority: 'high',
    read: true,
    read_at: '2024-12-22T09:00:00Z',
    action_url: '/bills/1',
    created_at: '2024-12-21T00:00:00Z',
  },
];

// Mock dashboard data
export const mockDashboardData: DashboardData = {
  quick_stats: {
    total_tasks: 12,
    completed_tasks: 8,
    overdue_tasks: 2,
    total_expenses: 450.75,
    my_expenses: 125.30,
    upcoming_events: 3,
    unread_notifications: 5,
  },
  urgent_items: {
    overdue_tasks: mockTasks.filter(t => !t.completed && new Date(t.due_date!) < new Date()),
    upcoming_bills: [],
    pending_expenses: mockExpenses.filter(e => e.splits.some(s => !s.paid)),
    pending_guests: [],
  },
  financial_snapshot: {
    total_expenses_this_month: 1250.75,
    my_expenses_this_month: 425.30,
    pending_payments: 85.50,
    upcoming_bills: 340.00,
    expense_categories: [
      { category: 'Groceries', amount: 425.50, percentage: 34 },
      { category: 'Utilities', amount: 320.00, percentage: 26 },
      { category: 'Entertainment', amount: 180.25, percentage: 14 },
      { category: 'Other', amount: 325.00, percentage: 26 },
    ],
  },
  task_progress: {
    completion_rate: 75,
    tasks_by_status: [
      { status: 'completed', count: 8 },
      { status: 'in_progress', count: 3 },
      { status: 'pending', count: 1 },
    ],
    top_contributors: mockUsers.map((user, index) => ({
      user,
      completed_tasks: 10 - index * 2,
      points: 50 - index * 10,
    })),
  },
  upcoming_events: mockEvents,
  recent_activity: [
    {
      id: '1',
      type: 'task',
      title: 'Task Completed',
      description: 'Sam completed "Take Out Trash"',
      user: mockUsers[1],
      timestamp: '2024-12-23T19:30:00Z',
      icon: 'CheckSquare',
    },
    {
      id: '2',
      type: 'expense',
      title: 'New Expense',
      description: 'Alex added groceries expense ($85.50)',
      user: mockUsers[0],
      timestamp: '2024-12-22T00:00:00Z',
      icon: 'DollarSign',
    },
    {
      id: '3',
      type: 'announcement',
      title: 'New Announcement',
      description: 'Maintenance Notice posted',
      user: mockUsers[0],
      timestamp: '2024-12-20T00:00:00Z',
      icon: 'Bell',
    },
  ],
  notifications_summary: {
    unread_count: 5,
    priority_count: 2,
    recent_notifications: mockNotifications.slice(0, 3),
  },
  household_pulse: {
    health_score: 85,
    member_activity: mockUsers.map((user, index) => ({
      user,
      last_active: `2024-12-${23 - index}T12:00:00Z`,
      activity_score: 90 - index * 10,
    })),
    trends: [
      { metric: 'Task Completion', value: 75, change: 5, trend: 'up' },
      { metric: 'Expense Sharing', value: 92, change: -2, trend: 'down' },
      { metric: 'Communication', value: 88, change: 0, trend: 'stable' },
    ],
  },
};

// Development flag
export const isDevelopment = import.meta.env.DEV;

// Mock API responses
export const mockApiResponses = {
  dashboard: { data: mockDashboardData, success: true },
  'dashboard/quick-stats': { data: mockDashboardData.quick_stats, success: true },
  'dashboard/urgent-items': { data: mockDashboardData.urgent_items, success: true },
  'dashboard/financial-snapshot': { data: mockDashboardData.financial_snapshot, success: true },
  'dashboard/task-progress': { data: mockDashboardData.task_progress, success: true },
  'dashboard/upcoming-events': { data: mockDashboardData.upcoming_events, success: true },
  'dashboard/recent-activity': { data: mockDashboardData.recent_activity, success: true },
  tasks: { data: mockTasks, success: true },
  'tasks/me': { data: mockTasks.filter(t => t.assigned_to === '1'), success: true },
  expenses: { data: mockExpenses, success: true },
  'event/events': { data: mockEvents, success: true },
  'event/my-events': { data: mockEvents.filter(e => e.created_by === '1'), success: true },
  'communications/announcements': { data: mockAnnouncements, success: true },
  'communications/polls': { data: mockPolls, success: true },
  notifications: { data: mockNotifications, success: true },
  'notifications/unread-count': { data: { count: 5 }, success: true },
  'households/me': { data: mockHousehold, success: true },
  'households/me/members': { data: mockHousehold.members, success: true },
  'auth/profile': { data: mockUsers[0], success: true },
};
