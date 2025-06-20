
import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Calendar, DollarSign, CheckSquare, User, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/context/NavigationContext';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

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
  const { isDrawerOpen, setIsDrawerOpen, setActiveTab } = useNavigation();

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

  const DrawerItem: React.FC<{ 
    to: string; 
    icon: any; 
    label: string;
  }> = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;
    
    return (
      <NavLink
        to={to}
        onClick={() => setIsDrawerOpen(false)}
        className={cn(
          'flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200',
          'hover:bg-muted/50',
          isActive && 'bg-roomly-primary/10 text-roomly-primary'
        )}
      >
        <Icon className="h-5 w-5" />
        <span className="font-medium">{label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t">
        <div className="flex items-center justify-around px-2 py-1 safe-area-pb">
          {mainNavigationItems.map((item) => (
            <TabItem key={item.to} {...item} />
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 flex-col border-r bg-background p-4">
        <nav className="space-y-2">
          {mainNavigationItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200',
                'hover:bg-muted/50',
                (location.pathname === item.to || 
                 (item.to === '/' && location.pathname === '/') ||
                 (item.to !== '/' && location.pathname.startsWith(item.to))) && 
                'bg-roomly-primary/10 text-roomly-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge > 0 && (
                <span className="ml-auto bg-roomly-accent text-white text-xs px-2 py-1 rounded-full">
                  {item.badge > 9 ? '9+' : item.badge}
                </span>
              )}
            </NavLink>
          ))}
          {drawerItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center space-x-3 py-3 px-4 rounded-lg transition-all duration-200',
                'hover:bg-muted/50',
                (location.pathname === item.to || 
                 (item.to === '/' && location.pathname === '/') ||
                 (item.to !== '/' && location.pathname.startsWith(item.to))) && 
                'bg-roomly-primary/10 text-roomly-primary'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Mobile Side Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6 space-y-2">
            {drawerItems.map((item) => (
              <DrawerItem key={item.to} {...item} />
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Navigation;
