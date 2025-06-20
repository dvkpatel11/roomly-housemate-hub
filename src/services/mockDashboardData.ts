
import { DashboardData, DashboardQuickStats, WeeklyInsights } from '@/types/dashboard';

export const generateMockDashboardData = (): DashboardData => {
  return {
    user_id: 1,
    household_id: 1,
    financial: {
      total_owed: 245.50,
      total_owed_to_you: 180.25,
      monthly_spending: 1247.80,
      pending_payments: 3,
      upcoming_bills: [
        {
          id: '1',
          name: 'Electric Bill',
          amount: 89.50,
          due_date: '2025-01-25',
          category: 'utilities',
          days_until_due: 5
        },
        {
          id: '2',
          name: 'Internet',
          amount: 65.00,
          due_date: '2025-01-28',
          category: 'utilities',
          days_until_due: 8
        },
        {
          id: '3',
          name: 'Rent',
          amount: 1200.00,
          due_date: '2025-02-01',
          category: 'housing',
          days_until_due: 12
        }
      ],
      recent_expenses: [
        {
          id: '1',
          title: 'Groceries - Whole Foods',
          amount: 87.50,
          category: 'food',
          date: '2025-01-18',
          paid_by_name: 'Alex'
        },
        {
          id: '2',
          title: 'House Cleaning Supplies',
          amount: 42.30,
          category: 'household',
          date: '2025-01-17',
          paid_by_name: 'Sarah'
        },
        {
          id: '3',
          title: 'Pizza Night',
          amount: 35.75,
          category: 'food',
          date: '2025-01-16',
          paid_by_name: 'Mike'
        }
      ],
      largest_expense_this_month: {
        id: '4',
        title: 'Home Repair - Plumbing',
        amount: 285.00,
        category: 'maintenance',
        date: '2025-01-12'
      }
    },
    tasks: {
      overdue_tasks: 2,
      tasks_due_today: 3,
      tasks_due_this_week: 7,
      completed_this_week: 12,
      your_task_score: 85,
      your_rank: 2,
      completion_rate: 78.5,
      upcoming_tasks: [
        {
          id: '1',
          title: 'Take out trash',
          due_date: '2025-01-20',
          priority: 'high',
          assigned_to_name: 'You',
          days_until_due: 0
        },
        {
          id: '2',
          title: 'Clean bathroom',
          due_date: '2025-01-21',
          priority: 'medium',
          assigned_to_name: 'Sarah',
          days_until_due: 1
        },
        {
          id: '3',
          title: 'Vacuum living room',
          due_date: '2025-01-22',
          priority: 'low',
          assigned_to_name: 'Mike',
          days_until_due: 2
        }
      ]
    },
    events: {
      events_this_week: 2,
      events_you_created: 1,
      upcoming_events: [
        {
          id: '1',
          title: 'House Meeting',
          date: '2025-01-22',
          location: 'Living Room',
          type: 'meeting',
          attendee_count: 4,
          days_until_event: 2
        },
        {
          id: '2',
          title: 'Game Night',
          date: '2025-01-25',
          location: 'Game Room',
          type: 'party',
          attendee_count: 6,
          days_until_event: 5
        }
      ],
      pending_rsvps: [
        {
          id: '1',
          event_title: 'Birthday Party',
          event_date: '2025-01-28',
          days_until_event: 8
        }
      ]
    },
    guests: {
      guests_this_week: 1,
      your_guests_this_month: 2,
      pending_approvals: [
        {
          id: '1',
          name: 'Emily Johnson',
          visit_date: '2025-01-24',
          requested_by_name: 'Sarah',
          days_until_visit: 4
        }
      ]
    },
    communications: {
      unread_announcements: 2,
      active_polls: [
        {
          id: '1',
          question: 'What should we order for movie night?',
          closes_at: '2025-01-25',
          vote_count: 3,
          has_voted: false
        }
      ],
      recent_announcements: [
        {
          id: '1',
          title: 'Wifi Password Updated',
          content: 'The wifi password has been changed to "RoomlyHouse2025"',
          created_at: '2025-01-19',
          author_name: 'Alex',
          priority: 'medium'
        },
        {
          id: '2',
          title: 'Quiet Hours Reminder',
          content: 'Please remember quiet hours are 10 PM - 7 AM on weekdays',
          created_at: '2025-01-18',
          author_name: 'Sarah',
          priority: 'low'
        }
      ]
    },
    notifications: {
      unread_count: 5,
      high_priority_count: 1,
      recent_notifications: [
        {
          id: '1',
          title: 'Bill Due Soon',
          content: 'Electric bill is due in 5 days',
          type: 'bill_reminder',
          priority: 'high',
          created_at: '2025-01-20'
        },
        {
          id: '2',
          title: 'Task Completed',
          content: 'Mike completed "Wash dishes"',
          type: 'task_update',
          priority: 'low',
          created_at: '2025-01-19'
        }
      ]
    },
    quick_actions: [
      {
        id: '1',
        title: 'Add Expense',
        description: 'Log a new household expense',
        icon: 'DollarSign',
        url: '/dashboard/expenses/new',
        priority: 1
      },
      {
        id: '2',
        title: 'Create Task',
        description: 'Assign a new task',
        icon: 'CheckSquare',
        url: '/dashboard/tasks/new',
        priority: 2
      },
      {
        id: '3',
        title: 'Schedule Event',
        description: 'Plan a household event',
        icon: 'Calendar',
        url: '/dashboard/events/new',
        priority: 3
      }
    ],
    activity_feed: [
      {
        id: 1,
        type: 'expense',
        title: 'New Expense Added',
        description: 'Alex added "Groceries - Whole Foods" for $87.50',
        user_name: 'Alex',
        timestamp: '2025-01-18T14:30:00Z',
        icon: 'DollarSign',
        url: '/dashboard/expenses/1'
      },
      {
        id: 2,
        type: 'task',
        title: 'Task Completed',
        description: 'Sarah completed "Clean kitchen"',
        user_name: 'Sarah',
        timestamp: '2025-01-18T12:15:00Z',
        icon: 'CheckSquare'
      },
      {
        id: 3,
        type: 'event',
        title: 'Event Created',
        description: 'Mike scheduled "Game Night" for Jan 25',
        user_name: 'Mike',
        timestamp: '2025-01-17T19:45:00Z',
        icon: 'Calendar',
        url: '/dashboard/events/2'
      },
      {
        id: 4,
        type: 'announcement',
        title: 'New Announcement',
        description: 'Alex posted "Wifi Password Updated"',
        user_name: 'Alex',
        timestamp: '2025-01-17T16:20:00Z',
        icon: 'MessageCircle'
      }
    ],
    household_health: {
      overall_score: 85,
      financial_health: 78,
      task_completion: 89,
      communication_activity: 82,
      member_satisfaction: 91,
      improvement_suggestions: [
        'Consider setting up automatic bill payments',
        'Increase task completion rate by 10%',
        'Schedule more regular house meetings'
      ]
    },
    last_updated: '2025-01-20T10:30:00Z'
  };
};

export const generateMockQuickStats = (): DashboardQuickStats => {
  return {
    total_owed: 245.50,
    overdue_tasks: 2,
    upcoming_events: 2,
    unread_notifications: 5,
    household_health_score: 85
  };
};

export const generateMockWeeklyInsights = (): WeeklyInsights => {
  return {
    top_spender: 'Alex',
    top_task_completer: 'Sarah',
    most_active_communicator: 'Mike',
    biggest_expense: {
      title: 'Home Repair - Plumbing',
      amount: 285.00,
      category: 'maintenance'
    },
    most_overdue_task: {
      title: 'Fix leaky faucet',
      days_overdue: 3
    },
    upcoming_deadline: {
      title: 'Electric Bill',
      days_until: 5,
      type: 'bill'
    }
  };
};
