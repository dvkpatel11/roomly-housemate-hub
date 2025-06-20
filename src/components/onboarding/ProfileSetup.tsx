
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Loader2 } from 'lucide-react';
import { OnboardingProfile } from '@/types/auth';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatar: z.any().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileSetupProps {
  onNext: (data: OnboardingProfile) => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('avatar', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const profileData: OnboardingProfile = {
      name: data.name,
      avatar: data.avatar,
      preferences: {
        notifications: true,
        theme: 'system',
        language: 'en',
      },
    };

    onNext(profileData);
    setIsLoading(false);
    toast.success('Profile updated successfully!');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Avatar upload */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarPreview || user?.avatar} />
            <AvatarFallback className="text-lg">
              {user?.name ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-roomly-primary text-white rounded-full p-2 cursor-pointer hover:bg-roomly-primary/90 transition-colors"
          >
            <Camera className="h-4 w-4" />
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </label>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Upload a profile picture to help your housemates recognize you
        </p>
      </div>

      {/* Name field */}
      <div className="space-y-2">
        <Label htmlFor="name">Display Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Enter your display name"
          {...register('name')}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
        <p className="text-xs text-muted-foreground">
          This is how other housemates will see you in the app
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-roomly-primary to-roomly-secondary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Saving profile...
          </>
        ) : (
          'Continue'
        )}
      </Button>
    </form>
  );
};

export default ProfileSetup;
