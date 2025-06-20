
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  toggleDrawer: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: number;
  setNotifications: (count: number) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('/');
  const [notifications, setNotifications] = useState(3);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const contextValue: NavigationContextType = {
    isDrawerOpen,
    setIsDrawerOpen,
    toggleDrawer,
    activeTab,
    setActiveTab,
    notifications,
    setNotifications,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
