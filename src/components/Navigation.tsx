
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, CheckSquare, DollarSign, Calendar, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/expenses', icon: DollarSign, label: 'Expenses' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  const NavItem: React.FC<{ to: string; icon: any; label: string }> = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    
    return (
      <NavLink
        to={to}
        className={cn(
          'flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200',
          'lg:flex-row lg:justify-start lg:py-3 lg:px-4 lg:w-full',
          'hover:bg-muted/50',
          isActive && 'bg-roomly-primary/10 text-roomly-primary'
        )}
      >
        <Icon className={cn('h-5 w-5', 'lg:mr-3')} />
        <span className={cn('text-xs mt-1', 'lg:text-sm lg:mt-0')}>
          {label}
        </span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 flex-col border-r bg-background p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="flex items-center justify-around py-2 px-4">
          {navigationItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
