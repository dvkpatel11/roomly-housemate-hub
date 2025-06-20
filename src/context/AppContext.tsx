
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, ThemeMode, User, Household, Task, Expense, Event } from '@/types';

interface AppContextType {
  state: AppState;
  setUser: (user: User | null) => void;
  setHousehold: (household: Household | null) => void;
  setTheme: (theme: ThemeMode) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  addExpense: (expense: Expense) => void;
  addEvent: (event: Event) => void;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_HOUSEHOLD'; payload: Household | null }
  | { type: 'SET_THEME'; payload: ThemeMode }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'ADD_EXPENSE'; payload: Expense }
  | { type: 'ADD_EVENT'; payload: Event };

const initialState: AppState = {
  user: null,
  household: null,
  tasks: [],
  expenses: [],
  events: [],
  theme: 'system',
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_HOUSEHOLD':
      return { ...state, household: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'ADD_EVENT':
      return { ...state, events: [...state.events, action.payload] };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextType = {
    state,
    setUser: (user) => dispatch({ type: 'SET_USER', payload: user }),
    setHousehold: (household) => dispatch({ type: 'SET_HOUSEHOLD', payload: household }),
    setTheme: (theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    addTask: (task) => dispatch({ type: 'ADD_TASK', payload: task }),
    updateTask: (id, updates) => dispatch({ type: 'UPDATE_TASK', payload: { id, updates } }),
    deleteTask: (id) => dispatch({ type: 'DELETE_TASK', payload: id }),
    addExpense: (expense) => dispatch({ type: 'ADD_EXPENSE', payload: expense }),
    addEvent: (event) => dispatch({ type: 'ADD_EVENT', payload: event }),
  };

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
