
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, DollarSign, CheckSquare, User, Settings, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';
import { useSidebar } from '@/context/SidebarContext';
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
  const { isCollapsed, toggleSidebar, isMobileOpen, setIsMobileOpen } = useSidebar();
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname, setActiveTab]);

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  }, [location.pathname, isMobile, setIsMobileOpen]);

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
          'hover:bg-muted/50 active:scale-[0.98]',
          collapsed ? 'justify-center p-3' : 'space-x-3 py-3 px-4',
          isActive && 'bg-roomly-primary/10 text-roomly-primary'
        )}
      >
        <div className="relative flex-shrink-0">
          <Icon className="h-5 w-5" />
          {badge > 0 && !collapsed && (
            <span className="absolute -top-2 -right-2 h-4 w-4 bg-roomly-accent rounded-full text-xs text-white flex items-center justify-center">
              {badge > 9 ? '9+' : badge}
            </span>
          )}
        </div>
        {!collapsed && (
          <span className="font-medium truncate">{label}</span>
        )}
        {badge > 0 && collapsed && (
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-roomly-accent rounded-full"></span>
        )}
        
        {/* Tooltip for collapsed state */}
        {collapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
            {label}
            {badge > 0 && (
              <span className="ml-2 px-1.5 py-0.5 bg-roomly-accent text-white text-xs rounded-full">
                {badge > 9 ? '9+' : badge}
              </span>
            )}
          </div>
        )}
      </NavLink>
    );
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
          <div className="flex items-center justify-around px-2 py-1 safe-area-pb">
            {mainNavigationItems.map((item) => (
              <TabItem key={item.to} {...item} />
            ))}
          </div>
        </nav>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside className={cn(
          'fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-background border-r z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="font-semibold">Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="flex-1 p-2 space-y-1">
              {mainNavigationItems.map((item) => (
                <SidebarItem key={item.to} {...item} collapsed={false} />
              ))}
              
              <div className="my-4 border-t" />
              
              {drawerItems.map((item) => (
                <SidebarItem key={item.to} {...item} collapsed={false} />
              ))}
            </nav>
          </div>
        </aside>
      </>
    );
  }

  return (
    <>
      <aside className={cn(
        'fixed left-0 top-14 h-[calc(100vh-3.5rem)] flex flex-col border-r bg-background z-40 transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64'
      )}>
        {/* Navigation Items */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto mt-2">
          {mainNavigationItems.map((item) => (
            <SidebarItem key={item.to} {...item} collapsed={isCollapsed} />
          ))}
          
          <div className="my-4 border-t" />
          
          {drawerItems.map((item) => (
            <SidebarItem key={item.to} {...item} collapsed={isCollapsed} />
          ))}
        </nav>
      </aside>

      {/* Toggle Notch - Outside sidebar, positioned relative to first option */}
      <div className={cn(
        'fixed top-[calc(3.5rem+2rem+0.75rem)] z-50 transition-all duration-300 ease-in-out',
        isCollapsed ? 'left-16' : 'left-64'
      )}>
        <button
          onClick={toggleSidebar}
          className="h-8 w-8 bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:from-roomly-primary/90 hover:to-roomly-secondary/90 rounded-r-lg border border-l-0 border-roomly-primary/20 flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg"
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-white" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </>
  );
};

export default Navigation;
