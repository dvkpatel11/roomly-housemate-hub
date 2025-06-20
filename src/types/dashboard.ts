
import { User } from './api';

// Financial Types
export interface FinancialSummary {
  total_owed: number;
  total_owed_to_you: number;
  monthly_spending: number;
  pending_payments: number;
  upcoming_bills: UpcomingBill[];
  recent_expenses: RecentExpense[];
  largest_expense_this_month?: LargestExpense;
}

export interface UpcomingBill {
  id: string;
  name: string;
  amount: number;
  due_date: string;
  category: string;
  days_until_due: number;
}

export interface RecentExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  paid_by_name: string;
}

export interface LargestExpense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

// Task Types
export interface TaskSummary {
  overdue_tasks: number;
  tasks_due_today: number;
  tasks_due_this_week: number;
  completed_this_week: number;
  your_task_score: number;
  your_rank: number;
  upcoming_tasks: UpcomingTask[];
  completion_rate: number;
}

export interface UpcomingTask {
  id: string;
  title: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to_name: string;
  days_until_due: number;
}

// Event Types
export interface EventSummary {
  upcoming_events: UpcomingEvent[];
  events_this_week: number;
  events_you_created: number;
  pending_rsvps: PendingRSVP[];
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  type: 'meeting' | 'party' | 'maintenance' | 'other';
  attendee_count: number;
  days_until_event: number;
}

export interface PendingRSVP {
  id: string;
  event_title: string;
  event_date: string;
  days_until_event: number;
}

// Guest Types
export interface GuestSummary {
  guests_this_week: number;
  pending_approvals: PendingGuest[];
  your_guests_this_month: number;
}

export interface PendingGuest {
  id: string;
  name: string;
  visit_date: string;
  requested_by_name: string;
  days_until_visit: number;
}

// Communication Types
export interface CommunicationSummary {
  unread_announcements: number;
  active_polls: ActivePoll[];
  recent_announcements: RecentAnnouncement[];
}

export interface ActivePoll {
  id: string;
  question: string;
  closes_at?: string;
  vote_count: number;
  has_voted: boolean;
}

export interface RecentAnnouncement {
  id: string;
  title: string;
  content: string;
  created_at: string;
  author_name: string;
  priority: 'low' | 'medium' | 'high';
}

// Notification Types
export interface NotificationSummary {
  unread_count: number;
  high_priority_count: number;
  recent_notifications: RecentNotification[];
}

export interface RecentNotification {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
}

// Quick Actions
export interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: string;
  url: string;
  priority: number;
}

// Activity Feed
export interface ActivityFeedItem {
  id: number;
  type: 'expense' | 'task' | 'event' | 'announcement' | 'guest';
  title: string;
  description: string;
  user_name: string;
  timestamp: string;
  icon: string;
  url?: string;
}

// Household Health
export interface HouseholdHealthScore {
  overall_score: number;
  financial_health: number;
  task_completion: number;
  communication_activity: number;
  member_satisfaction: number;
  improvement_suggestions: string[];
}

// Main Dashboard Data
export interface DashboardData {
  user_id: number;
  household_id: number;
  financial: FinancialSummary;
  tasks: TaskSummary;
  events: EventSummary;
  guests: GuestSummary;
  communications: CommunicationSummary;
  notifications: NotificationSummary;
  quick_actions: QuickAction[];
  activity_feed: ActivityFeedItem[];
  household_health: HouseholdHealthScore;
  last_updated: string;
}

// Quick Stats
export interface DashboardQuickStats {
  total_owed: number;
  overdue_tasks: number;
  upcoming_events: number;
  unread_notifications: number;
  household_health_score: number;
}

// Weekly Insights
export interface WeeklyInsights {
  top_spender?: string;
  top_task_completer?: string;
  most_active_communicator?: string;
  biggest_expense?: {
    title: string;
    amount: number;
    category: string;
  };
  most_overdue_task?: {
    title: string;
    days_overdue: number;
  };
  upcoming_deadline?: {
    title: string;
    days_until: number;
    type: string;
  };
}

// Monthly Report
export interface MonthlyReport {
  month: string;
  total_expenses: number;
  total_bills_paid: number;
  tasks_completed: number;
  events_held: number;
  new_members: number;
  satisfaction_score: number;
  insights: WeeklyInsights;
}
