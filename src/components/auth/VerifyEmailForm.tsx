
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Mail, CheckCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

const VerifyEmailForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { user, verifyEmail, resendVerification } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleVerification(token);
    }
  }, [token]);

  const handleVerification = async (verificationToken: string) => {
    setIsLoading(true);
    
    const result = await verifyEmail(verificationToken);
    
    setIsLoading(false);
    
    if (result.success) {
      setIsVerified(true);
      toast.success('Email verified successfully!');
      
      // Redirect to onboarding or dashboard after a short delay
      setTimeout(() => {
        if (user && !user.onboardingCompleted) {
          navigate('/onboarding');
        } else {
          navigate('/');
        }
      }, 2000);
    } else {
      toast.error(result.error?.message || 'Verification failed');
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    
    const result = await resendVerification();
    
    setIsResending(false);
    
    if (result.success) {
      toast.success('Verification email sent!');
    } else {
      toast.error(result.error?.message || 'Failed to resend verification email');
    }
  };

  if (isVerified) {
    return (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-green-600">Email Verified!</h3>
        <p className="text-muted-foreground">
          Your email has been successfully verified. Redirecting you to the app...
        </p>
        <div className="flex justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-roomly-primary" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-roomly-primary" />
        </div>
        <p className="text-muted-foreground">Verifying your email...</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-roomly-primary/10 rounded-full flex items-center justify-center mx-auto">
        <Mail className="h-8 w-8 text-roomly-primary" />
      </div>
      <h3 className="text-lg font-semibold">Verify your email</h3>
      <p className="text-muted-foreground">
        We've sent a verification email to <strong>{user?.email}</strong>
      </p>
      <p className="text-sm text-muted-foreground">
        Click the link in the email to verify your account and continue setting up your profile.
      </p>
      
      <div className="space-y-3">
        <Button
          onClick={handleResendVerification}
          variant="outline"
          className="w-full"
          disabled={isResending}
        >
          {isResending ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Resending...
            </>
          ) : (
            'Resend verification email'
          )}
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Didn't receive the email? Check your spam folder or try resending.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
