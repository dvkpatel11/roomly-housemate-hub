
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, DollarSign, Calendar, Users, ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppTourProps {
  onComplete: () => void;
}

const AppTour: React.FC<AppTourProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const tourSteps = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Assign and track household chores with ease. Create recurring tasks, set due dates, and mark them as complete.',
      color: 'text-roomly-tasks',
      bgColor: 'bg-roomly-tasks/10',
      features: [
        'Create and assign tasks to housemates',
        'Set recurring schedules for regular chores',
        'Track completion status and history',
        'Get notifications for upcoming tasks'
      ],
    },
    {
      icon: DollarSign,
      title: 'Expense Splitting',
      description: 'Keep track of shared expenses and split bills fairly among all housemates.',
      color: 'text-roomly-financial',
      bgColor: 'bg-roomly-financial/10',
      features: [
        'Log shared expenses and receipts',
        'Automatically calculate fair splits',
        'Track who owes what to whom',
        'Generate expense reports and summaries'
      ],
    },
    {
      icon: Calendar,
      title: 'Event Planning',
      description: 'Coordinate household events, meetings, and activities with shared calendars.',
      color: 'text-roomly-events',
      bgColor: 'bg-roomly-events/10',
      features: [
        'Schedule house meetings and events',
        'Send invitations to all housemates',
        'Set reminders for important dates',
        'Coordinate group activities and outings'
      ],
    },
    {
      icon: Users,
      title: 'Household Management',
      description: 'Manage your household members, settings, and preferences in one place.',
      color: 'text-roomly-primary',
      bgColor: 'bg-roomly-primary/10',
      features: [
        'Invite and manage household members',
        'Set household rules and guidelines',
        'Customize notification preferences',
        'Access household statistics and insights'
      ],
    },
  ];

  const currentTourStep = tourSteps[currentStep];
  const isLastStep = currentStep === tourSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress dots */}
      <div className="flex justify-center space-x-2">
        {tourSteps.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={cn(
              'w-3 h-3 rounded-full transition-all duration-200',
              index === currentStep
                ? 'bg-roomly-primary scale-125'
                : index < currentStep
                ? 'bg-roomly-primary/60'
                : 'bg-muted-foreground/30'
            )}
          />
        ))}
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <div className="text-center space-y-4 mb-6">
            <div className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center mx-auto',
              currentTourStep.bgColor
            )}>
              <currentTourStep.icon className={cn('h-8 w-8', currentTourStep.color)} />
            </div>
            <h3 className="text-2xl font-semibold">{currentTourStep.title}</h3>
            <p className="text-muted-foreground text-lg">
              {currentTourStep.description}
            </p>
          </div>

          <div className="space-y-3">
            {currentTourStep.features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-sm text-muted-foreground">{feature}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center"
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          className="bg-gradient-to-r from-roomly-primary to-roomly-secondary flex items-center"
        >
          {isLastStep ? (
            'Get Started'
          ) : (
            <>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>

      <div className="text-center">
        <button
          onClick={onComplete}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip tour
        </button>
      </div>
    </div>
  );
};

export default AppTour;
