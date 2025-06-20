import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Loader2, Home, Check, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getPasswordStrength = (password: string) => {
    const checks = [
      { test: password.length >= 8, label: 'At least 8 characters' },
      { test: /[A-Z]/.test(password), label: 'One uppercase letter' },
      { test: /[a-z]/.test(password), label: 'One lowercase letter' },
      { test: /[0-9]/.test(password), label: 'One number' },
      { test: /[^A-Za-z0-9]/.test(password), label: 'One special character' },
    ];
    
    const passedChecks = checks.filter(check => check.test).length;
    return { checks, strength: passedChecks, percentage: (passedChecks / checks.length) * 100 };
  };

  const passwordAnalysis = getPasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrors({ general: 'Please fill in all fields' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    if (!agreeToTerms) {
      setErrors({ terms: 'Please agree to the terms and conditions' });
      return;
    }

    const result = await signup(formData);
    if (result.success) {
      toast.success('Account created successfully!');
      navigate('/');
    } else if (result.error) {
      if (result.error.field) {
        setErrors({ [result.error.field]: result.error.message });
      } else {
        setErrors({ general: result.error.message });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name] || errors.general) {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  };

  const getStrengthColor = (percentage: number) => {
    if (percentage < 40) return 'bg-red-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (percentage: number) => {
    if (percentage < 40) return 'Weak';
    if (percentage < 80) return 'Good';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Welcome Section */}
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-roomly-primary to-roomly-secondary shadow-lg mb-4">
            <Home className="h-8 w-8 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-roomly-primary to-roomly-secondary bg-clip-text text-transparent">
              Join Roomly
            </h1>
            <p className="text-muted-foreground">
              Start organizing your household today
            </p>
          </div>
        </div>

        {/* Signup Card */}
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-center text-xl font-semibold">Create Account</CardTitle>
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
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={cn(
                        'pl-10 h-12 transition-all duration-200',
                        errors.name && 'border-destructive focus:border-destructive'
                      )}
                      required
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
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

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      className={cn(
                        'pl-10 pr-12 h-12 transition-all duration-200',
                        errors.password && 'border-destructive focus:border-destructive'
                      )}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  
                  {formData.password && (
                    <div className="space-y-3 animate-fade-in">
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Password strength</span>
                          <span className={cn(
                            "text-xs font-medium",
                            passwordAnalysis.percentage < 40 ? "text-red-600" :
                            passwordAnalysis.percentage < 80 ? "text-yellow-600" : "text-green-600"
                          )}>
                            {getStrengthText(passwordAnalysis.percentage)}
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all duration-300",
                              getStrengthColor(passwordAnalysis.percentage)
                            )}
                            style={{ width: `${passwordAnalysis.percentage}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-1">
                        {passwordAnalysis.checks.map((check, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            {check.test ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <X className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span className={cn(
                              "text-xs",
                              check.test ? "text-green-600" : "text-muted-foreground"
                            )}>
                              {check.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={cn(
                        'pl-10 pr-12 h-12 transition-all duration-200',
                        errors.confirmPassword && 'border-destructive focus:border-destructive'
                      )}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-transparent"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive animate-fade-in">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    I agree to the{' '}
                    <Link to="/terms" className="text-roomly-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-roomly-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
                {errors.terms && (
                  <p className="text-sm text-destructive animate-fade-in">{errors.terms}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:opacity-90 transition-all duration-200 shadow-md"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
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

        {/* Benefits */}
        <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-roomly-primary/5 to-roomly-secondary/5 border border-roomly-primary/10">
          <p className="text-xs text-center text-muted-foreground mb-2">✨ What you'll get:</p>
          <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
            <span>Free forever</span>
            <span>•</span>
            <span>Up to 8 roommates</span>
            <span>•</span>
            <span>Unlimited tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
