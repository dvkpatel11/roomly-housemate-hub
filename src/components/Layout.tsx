
import React from 'react';
import { Outlet } from 'react-router-dom';
import UniversalHeader from './UniversalHeader';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';

const Layout: React.FC = () => {
  const isMobile = useIsMobile();
  const { isCollapsed } = useSidebar();
  const { isAuthenticated, isLoading } = useAuth();

  console.log('Layout render:', { isAuthenticated, isLoading, isMobile });

  // Don't render navigation while loading to prevent flickering
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <UniversalHeader variant="public" />
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <UniversalHeader variant={isAuthenticated ? 'protected' : 'public'} />
      
      {/* Only render Navigation when authenticated and not loading */}
      {isAuthenticated && <Navigation />}
      
      <main className={cn(
        'min-h-[calc(100vh-4rem)] transition-all duration-300 ease-in-out',
        // Mobile: bottom padding for mobile nav, no left margin
        isAuthenticated && isMobile && 'pb-20',
        // Desktop: left margin based on sidebar state
        isAuthenticated && !isMobile && [
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
