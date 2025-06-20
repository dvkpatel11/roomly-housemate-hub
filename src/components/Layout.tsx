
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Layout: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className={cn(
        'min-h-[calc(100vh-3.5rem)]',
        isMobile ? 'pb-20' : 'ml-16 lg:ml-64', // Responsive margin for desktop sidebar
        'transition-all duration-300'
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
