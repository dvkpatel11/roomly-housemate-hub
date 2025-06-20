
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, ArrowLeft, CheckCircle, Loader2, Lock } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { resetPassword, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!email) {
      setErrors({ email: 'Please enter your email address' });
      return;
    }

    const result = await resetPassword({ email });
    if (result.success) {
      setIsSubmitted(true);
      toast.success('Password reset email sent!');
    } else if (result.error) {
      setErrors({ general: result.error.message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email || errors.general) {
      setErrors({});
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Success Section */}
          <div className="text-center mb-8 space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Check your email
              </h1>
              <p className="text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
          </div>

          {/* Instructions Card */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Click the link in your email to reset your password. 
                    The link will expire in 24 hours.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the email? Check your spam folder.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full h-12 transition-all duration-200"
                  >
                    Send another email
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/auth/login')}
                    className="w-full h-12 transition-all duration-200"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-roomly-primary to-roomly-secondary shadow-lg mb-4">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-roomly-primary to-roomly-secondary bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-muted-foreground">
              Enter your email to receive a reset link
            </p>
          </div>
        </div>

        {/* Reset Form Card */}
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-center text-xl font-semibold">Forgot Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm animate-fade-in">
                  {errors.general}
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      className={cn(
                        'pl-10 h-12 transition-all duration-200',
                        errors.email && 'border-destructive focus:border-destructive'
                      )}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:opacity-90 transition-all duration-200 shadow-md"
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

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate('/auth/login')}
                  className="w-full h-12 transition-all duration-200"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link
                  to="/auth/login"
                  className="text-roomly-primary hover:underline font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-muted-foreground/20">
          <p className="text-xs text-center text-muted-foreground">
            💡 <strong>Tip:</strong> If you don't receive the email within a few minutes, 
            check your spam folder or try again with a different email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
