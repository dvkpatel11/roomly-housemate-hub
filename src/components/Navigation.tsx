
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, DollarSign, CheckSquare, User, Settings, Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const mainNavigationItems = [
  { to: '/', icon: Home, label: 'Dashboard', badge: 0 },
  { to: '/calendar', icon: Calendar, label: 'Calendar', badge: 2 },
  { to: '/expenses', icon: DollarSign, label: 'Expenses', badge: 0 },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks', badge: 5 },
  { to: '/profile', icon: User, label: 'More', badge: 0 },
];

const drawerItems = [
  { to: '/settings', icon: Settings, label: 'Settings' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const { setActiveTab } = useNavigation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname, setActiveTab]);

  const TabItem: React.FC<{ 
    to: string; 
    icon: any; 
    label: string; 
    badge?: number;
  }> = ({ to, icon: Icon, label, badge = 0 }) => {
    const isActive = location.pathname === to || 
      (to === '/' && location.pathname === '/') ||
      (to !== '/' && location.pathname.startsWith(to));
    
    return (
      <NavLink
        to={to}
        className={cn(
          'flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 relative',
          'min-w-0 flex-1',
          'hover:bg-muted/50 active:scale-95',
          isActive && 'text-roomly-primary'
        )}
      >
        <div className="relative">
          <Icon className={cn(
            'h-5 w-5 transition-colors',
            isActive && 'text-roomly-primary'
          )} />
          {badge > 0 && (
            <span className="absolute -top-2 -right-2 h-4 w-4 bg-roomly-accent rounded-full text-xs text-white flex items-center justify-center">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </div>
        <span className={cn(
          'text-xs mt-1 font-medium truncate transition-colors',
          isActive ? 'text-roomly-primary' : 'text-muted-foreground'
        )}>
          {label}
        </span>
        {isActive && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-roomly-primary rounded-full" />
        )}
      </NavLink>
    );
  };

  const SidebarItem: React.FC<{ 
    to: string; 
    icon: any; 
    label: string;
    badge?: number;
    collapsed?: boolean;
  }> = ({ to, icon: Icon, label, badge = 0, collapsed = false }) => {
    const isActive = location.pathname === to || 
      (to === '/' && location.pathname === '/') ||
      (to !== '/' && location.pathname.startsWith(to));
    
    return (
      <NavLink
        to={to}
        className={cn(
          'flex items-center rounded-lg transition-all duration-200 relative group',
          'hover:bg-muted/50',
          collapsed ? 'justify-center p-3' : 'space-x-3 py-3 px-4',
          isActive && 'bg-roomly-primary/10 text-roomly-primary'
        )}
      >
        <div className="relative">
          <Icon className="h-5 w-5" />
          {badge > 0 && !collapsed && (
            <span className="absolute -top-2 -right-2 h-4 w-4 bg-roomly-accent rounded-full text-xs text-white flex items-center justify-center">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </div>
        {!collapsed && <span className="font-medium">{label}</span>}
        {badge > 0 && collapsed && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-roomly-accent rounded-full"></span>
        )}
        
        {/* Tooltip for collapsed state */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {label}
          </div>
        )}
      </NavLink>
    );
  };

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
        <div className="flex items-center justify-around px-2 py-1 safe-area-pb">
          {mainNavigationItems.map((item) => (
            <TabItem key={item.to} {...item} />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <aside className={cn(
      'fixed left-0 top-14 h-[calc(100vh-3.5rem)] flex flex-col border-r bg-background transition-all duration-300 z-40',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Collapse Toggle */}
      <div className="flex items-center justify-end p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {mainNavigationItems.map((item) => (
          <SidebarItem key={item.to} {...item} collapsed={isCollapsed} />
        ))}
        
        <div className="my-4 border-t" />
        
        {drawerItems.map((item) => (
          <SidebarItem key={item.to} {...item} collapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  );
};

export default Navigation;
