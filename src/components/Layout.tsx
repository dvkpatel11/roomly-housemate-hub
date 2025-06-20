
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navigation from './Navigation';
import { cn } from '@/lib/utils';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className={cn(
        'min-h-[calc(100vh-3.5rem)]',
        'lg:ml-64', // Desktop sidebar offset
        'pb-20 lg:pb-0' // Mobile bottom nav offset
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
