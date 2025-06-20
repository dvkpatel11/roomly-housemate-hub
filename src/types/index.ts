
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member';
}

export interface Household {
  id: string;
  name: string;
  members: User[];
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  dueDate?: Date;
  completed: boolean;
  category: 'cleaning' | 'maintenance' | 'shopping' | 'other';
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  category: 'groceries' | 'utilities' | 'rent' | 'other';
  date: Date;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  attendees: string[];
  type: 'meeting' | 'party' | 'maintenance' | 'other';
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppState {
  user: User | null;
  household: Household | null;
  tasks: Task[];
  expenses: Expense[];
  events: Event[];
  theme: ThemeMode;
}
