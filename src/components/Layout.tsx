import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/context/SidebarContext';

const Layout: React.FC = () => {
  const isMobile = useIsMobile();
  const { isCollapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className={cn(
        'min-h-[calc(100vh-3.5rem)] transition-all duration-300 ease-in-out',
        // Mobile: bottom padding for mobile nav, no left margin
        isMobile && 'pb-20',
        // Desktop: left margin based on sidebar state
        !isMobile && [
          isCollapsed ? 'ml-16' : 'ml-64',
          'transition-[margin-left] duration-300 ease-in-out'
        ]
      )}>
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;