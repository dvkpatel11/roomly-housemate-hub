
import React from 'react';
import PublicHeader from '@/components/PublicHeader';

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <PublicHeader />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default AuthPageLayout;
