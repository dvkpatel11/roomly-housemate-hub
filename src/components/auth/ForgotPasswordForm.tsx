
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    const result = await resetPassword({ email: data.email });

    setIsLoading(false);

    if (result.success) {
      setEmailSent(true);
      toast.success('Password reset email sent!');
    } else {
      toast.error(result.error?.message || 'Failed to send reset email');
    }
  };

  if (emailSent)   {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-roomly-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="h-8 w-8 text-roomly-primary" />
        </div>
        <h3 className="text-lg font-semibold">Check your email</h3>
        <p className="text-muted-foreground">
          We've sent a password reset link to <strong>{getValues('email')}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          Didn't receive the email? Check your spam folder or{' '}
          <button
            onClick={() => setEmailSent(false)}
            className="text-roomly-primary hover:underline"
          >
            try again
          </button>
        </p>
        <Link to="/auth/login">
          <Button variant="outline" className="w-full">
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center space-y-2 mb-6">
        <p className="text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-roomly-primary to-roomly-secondary"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending reset link...
          </>
        ) : (
          'Send Reset Link'
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remember your password?{' '}
        <Link to="/auth/login" className="text-roomly-primary hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
