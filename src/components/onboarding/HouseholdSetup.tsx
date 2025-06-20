
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Users, Loader2 } from 'lucide-react';
import { HouseholdSetup as HouseholdSetupType } from '@/types/auth';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const createHouseholdSchema = z.object({
  householdName: z.string().min(2, 'Household name must be at least 2 characters'),
});

const joinHouseholdSchema = z.object({
  inviteCode: z.string().min(6, 'Invite code must be at least 6 characters'),
});

type CreateHouseholdFormData = z.infer<typeof createHouseholdSchema>;
type JoinHouseholdFormData = z.infer<typeof joinHouseholdSchema>;

interface HouseholdSetupProps {
  onNext: (data: HouseholdSetupType) => void;
}

const HouseholdSetup: React.FC<HouseholdSetupProps> = ({ onNext }) => {
  const [selectedAction, setSelectedAction] = useState<'create' | 'join' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: createErrors },
  } = useForm<CreateHouseholdFormData>({
    resolver: zodResolver(createHouseholdSchema),
  });

  const {
    register: registerJoin,
    handleSubmit: handleSubmitJoin,
    formState: { errors: joinErrors },
  } = useForm<JoinHouseholdFormData>({
    resolver: zodResolver(joinHouseholdSchema),
  });

  const onSubmitCreate = async (data: CreateHouseholdFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const householdData: HouseholdSetupType = {
      action: 'create',
      householdName: data.householdName,
    };

    onNext(householdData);
    setIsLoading(false);
    toast.success('Household created successfully!');
  };

  const onSubmitJoin = async (data: JoinHouseholdFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const householdData: HouseholdSetupType = {
      action: 'join',
      inviteCode: data.inviteCode,
    };

    onNext(householdData);
    setIsLoading(false);
    toast.success('Joined household successfully!');
  };

  if (!selectedAction) {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            Choose how you'd like to get started with Roomly
          </p>
        </div>

        <div className="grid gap-4">
          <Card
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-roomly-primary/50',
              'group'
            )}
            onClick={() => setSelectedAction('create')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-roomly-primary/10 rounded-lg flex items-center justify-center group-hover:bg-roomly-primary/20 transition-colors">
                  <Home className="h-6 w-6 text-roomly-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Create a New Household</h3>
                  <p className="text-sm text-muted-foreground">
                    Start fresh and invite your housemates to join
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={cn(
              'cursor-pointer transition-all duration-200 hover:shadow-md hover:border-roomly-primary/50',
              'group'
            )}
            onClick={() => setSelectedAction('join')}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-roomly-secondary/10 rounded-lg flex items-center justify-center group-hover:bg-roomly-secondary/20 transition-colors">
                  <Users className="h-6 w-6 text-roomly-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Join Existing Household</h3>
                  <p className="text-sm text-muted-foreground">
                    Use an invite code from your housemates
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (selectedAction === 'create') {
    return (
      <form onSubmit={handleSubmitCreate(onSubmitCreate)} className="space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-roomly-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Home className="h-8 w-8 text-roomly-primary" />
          </div>
          <h3 className="text-lg font-semibold">Create Your Household</h3>
          <p className="text-muted-foreground">
            Give your household a name that everyone will recognize
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="householdName">Household Name</Label>
          <Input
            id="householdName"
            type="text"
            placeholder="e.g., The Smith House, Downtown Apartment"
            {...registerCreate('householdName')}
            className={createErrors.householdName ? 'border-destructive' : ''}
          />
          {createErrors.householdName && (
            <p className="text-sm text-destructive">{createErrors.householdName.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-roomly-primary to-roomly-secondary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating household...
              </>
            ) : (
              'Create Household'
            )}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => setSelectedAction(null)}
          >
            Back to Options
          </Button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmitJoin(onSubmitJoin)} className="space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-roomly-secondary/10 rounded-full flex items-center justify-center mx-auto">
          <Users className="h-8 w-8 text-roomly-secondary" />
        </div>
        <h3 className="text-lg font-semibold">Join a Household</h3>
        <p className="text-muted-foreground">
          Enter the invite code your housemates shared with you
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="inviteCode">Invite Code</Label>
        <Input
          id="inviteCode"
          type="text"
          placeholder="Enter invite code"
          {...registerJoin('inviteCode')}
          className={joinErrors.inviteCode ? 'border-destructive' : ''}
        />
        {joinErrors.inviteCode && (
          <p className="text-sm text-destructive">{joinErrors.inviteCode.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          Ask your housemates for the invite code they received when setting up the household
        </p>
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-roomly-primary to-roomly-secondary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Joining household...
            </>
          ) : (
            'Join Household'
          )}
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setSelectedAction(null)}
        >
          Back to Options
        </Button>
      </div>
    </form>
  );
};

export default HouseholdSetup;
