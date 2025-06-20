
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  children,
  title,
  subtitle,
  step,
  totalSteps,
  showBackButton = false,
  onBack,
  className,
}) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-gradient-to-r from-roomly-primary to-roomly-secondary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step indicator */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Step {step} of {totalSteps}
          </p>
        </div>

        <Card className={cn('shadow-lg border-0 bg-card/95 backdrop-blur-sm', className)}>
          <CardHeader className="space-y-1 pb-4">
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="w-fit -ml-2 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h2 className="text-2xl font-semibold text-center">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground text-center">{subtitle}</p>
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

export default OnboardingLayout;
