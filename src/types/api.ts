
// Base types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
  created_at: string;
}

export interface Household {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  members: HouseholdMember[];
  owner_id: string;
}

export interface HouseholdMember extends User {
  household_role: 'owner' | 'admin' | 'member';
  joined_at: string;
}

// Task types
export interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to: string;
  assigned_user?: User;
  due_date?: string;
  completed: boolean;
  completed_at?: string;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  points?: number;
  created_at: string;
  updated_at: string;
}

export interface TaskConfig {
  priorities: Array<{ value: string; label: string; color?: string }>;
  statuses: Array<{ value: string; label: string; color?: string }>;
}

// Expense types
export interface Expense {
  id: string;
  title: string;
  description?: string;
  amount: number;
  paid_by: string;
  paid_by_user?: User;
  category: string;
  date: string;
  split_method: 'equal' | 'custom' | 'percentage';
  splits: ExpenseSplit[];
  receipts?: string[];
  created_at: string;
  updated_at: string;
}

export interface ExpenseSplit {
  user_id: string;
  user?: User;
  amount: number;
  paid: boolean;
  paid_at?: string;
}

export interface ExpenseConfig {
  categories: Array<{ value: string; label: string; icon?: string }>;
  split_methods: Array<{ value: string; label: string; description?: string }>;
}

// Event types
export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  end_date?: string;
  location?: string;
  type: 'meeting' | 'party' | 'maintenance' | 'other';
  created_by: string;
  created_by_user?: User;
  status: 'pending' | 'approved' | 'denied' | 'cancelled';
  attendees: EventRSVP[];
  created_at: string;
  updated_at: string;
}

export interface EventRSVP {
  user_id: string;
  user?: User;
  response: 'yes' | 'no' | 'maybe';
  responded_at: string;
}

// Communication types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  created_by: string;
  created_by_user?: User;
  pinned: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Poll {
  id: string;
  question: string;
  description?: string;
  options: PollOption[];
  created_by: string;
  created_by_user?: User;
  closes_at?: string;
  closed: boolean;
  anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: PollVote[];
  vote_count: number;
}

export interface PollVote {
  user_id: string;
  user?: User;
  voted_at: string;
}

export interface HouseRules {
  id: string;
  content: string;
  updated_by: string;
  updated_by_user?: User;
  updated_at: string;
}

// Notification types
export interface Notification {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: 'low' | 'medium' | 'high';
  read: boolean;
  read_at?: string;
  action_url?: string;
  data?: Record<string, any>;
  created_at: string;
}

export interface NotificationPreferences {
  email_enabled: boolean;
  push_enabled: boolean;
  task_reminders: boolean;
  bill_reminders: boolean;
  event_reminders: boolean;
  announcements: boolean;
  polls: boolean;
  guest_requests: boolean;
}

// Bill types
export interface Bill {
  id: string;
  name: string;
  description?: string;
  amount: number;
  due_date: string;
  category: string;
  recurring: boolean;
  recurring_period?: 'weekly' | 'monthly' | 'yearly';
  split_method: 'equal' | 'custom';
  splits: BillSplit[];
  paid: boolean;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface BillSplit {
  user_id: string;
  user?: User;
  amount: number;
  paid: boolean;
  paid_at?: string;
}

// Guest types
export interface Guest {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  relationship_type: string;
  visit_date: string;
  visit_end_date?: string;
  status: 'pending' | 'approved' | 'denied';
  notes?: string;
  requested_by: string;
  requested_by_user?: User;
  created_at: string;
  updated_at: string;
}

export interface GuestPolicy {
  max_guests_per_visit: number;
  max_visit_duration_days: number;
  advance_notice_hours: number;
  quiet_hours_start: string;
  quiet_hours_end: string;
  common_area_restrictions: string[];
  approval_required: boolean;
}

// Shopping types
export interface ShoppingList {
  id: string;
  name: string;
  description?: string;
  assigned_to?: string;
  assigned_user?: User;
  due_date?: string;
  completed: boolean;
  completed_at?: string;
  items: ShoppingItem[];
  created_by: string;
  created_by_user?: User;
  created_at: string;
  updated_at: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit?: string;
  category?: string;
  estimated_price?: number;
  purchased: boolean;
  purchased_at?: string;
  actual_price?: number;
  notes?: string;
}

// Dashboard types
export interface DashboardData {
  quick_stats: QuickStats;
  urgent_items: UrgentItems;
  financial_snapshot: FinancialSnapshot;
  task_progress: TaskProgress;
  upcoming_events: Event[];
  recent_activity: ActivityItem[];
  notifications_summary: NotificationsSummary;
  household_pulse: HouseholdPulse;
}

export interface QuickStats {
  total_tasks: number;
  completed_tasks: number;
  overdue_tasks: number;
  total_expenses: number;
  my_expenses: number;
  upcoming_events: number;
  unread_notifications: number;
}

export interface UrgentItems {
  overdue_tasks: Task[];
  upcoming_bills: Bill[];
  pending_expenses: Expense[];
  pending_guests: Guest[];
}

export interface FinancialSnapshot {
  total_expenses_this_month: number;
  my_expenses_this_month: number;
  pending_payments: number;
  upcoming_bills: number;
  expense_categories: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
}

export interface TaskProgress {
  completion_rate: number;
  tasks_by_status: Array<{
    status: string;
    count: number;
  }>;
  top_contributors: Array<{
    user: User;
    completed_tasks: number;
    points: number;
  }>;
}

export interface ActivityItem {
  id: string;
  type: 'task' | 'expense' | 'event' | 'announcement' | 'guest';
  title: string;
  description: string;
  user: User;
  timestamp: string;
  icon?: string;
}

export interface NotificationsSummary {
  unread_count: number;
  priority_count: number;
  recent_notifications: Notification[];
}

export interface HouseholdPulse {
  health_score: number;
  member_activity: Array<{
    user: User;
    last_active: string;
    activity_score: number;
  }>;
  trends: Array<{
    metric: string;
    value: number;
    change: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

// API Response wrappers
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
  pages: number;
}

export interface ApiError {
  message: string;
  status?: number;
  field?: string;
}
