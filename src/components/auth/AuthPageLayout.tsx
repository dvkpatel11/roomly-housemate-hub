
import React from 'react';
import UniversalHeader from '../UniversalHeader';

interface AuthPageLayoutProps {
  children: React.ReactNode;
}

const AuthPageLayout: React.FC<AuthPageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <UniversalHeader variant="public" />
      {children}
    </div>
  );
};

export default AuthPageLayout;
