
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonPath?: string;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = false,
  backButtonPath = -1,
  className,
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof backButtonPath === 'string') {
      navigate(backButtonPath);
    } else {
      navigate(backButtonPath);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and branding */}
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-roomly-primary to-roomly-secondary bg-clip-text text-transparent">
            Roomly
          </h1>
          <p className="text-muted-foreground mt-2">Household management made simple</p>
        </div>

        <Card className={cn('shadow-lg border-0 bg-card/95 backdrop-blur-sm', className)}>
          <CardHeader className="space-y-1 pb-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="w-fit -ml-2 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h2 className="text-2xl font-semibold text-center">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-center text-sm">{subtitle}</p>
            )}
          </CardHeader>
          <CardContent className="pt-0">
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
