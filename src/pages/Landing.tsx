import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  DollarSign, 
  Calendar, 
  Users, 
  Home,
  Bell,
  MessageSquare,
  Package,
  UserCheck,
  BarChart3,
  Zap,
  Shield,
  Star,
  ArrowRight,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '@/components/PublicHeader';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: BarChart3,
      title: 'Dashboard Hub',
      description: 'Complete financial overview, task status, and household health score in one place',
      color: 'text-roomly-primary',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: Calendar,
      title: 'Smart Calendar',
      description: 'Shared scheduling with chore rotations, bill reminders, and guest tracking',
      color: 'text-roomly-events',
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    },
    {
      icon: DollarSign,
      title: 'Expense Management',
      description: 'Bill splitting, payment tracking, and automated reminders with receipt storage',
      color: 'text-roomly-financial',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Fair chore distribution with completion tracking and accountability points',
      color: 'text-roomly-tasks',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      icon: MessageSquare,
      title: 'Communication Hub',
      description: 'House announcements, polls, rules documentation, and emergency contacts',
      color: 'text-roomly-primary',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      icon: Package,
      title: 'Resource Tracking',
      description: 'Shared grocery lists, inventory management, and borrowing system',
      color: 'text-roomly-financial',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
  ];

  const painPoints = [
    {
      title: 'Financial Friction',
      description: 'Awkward money conversations, bill splitting confusion, and payment accountability issues',
      icon: DollarSign,
    },
    {
      title: 'Household Chaos',
      description: 'Unfair chore distribution, unclear task completion, and neglected shared spaces',
      icon: Home,
    },
    {
      title: 'Communication Breakdown',
      description: 'Important info buried in chats, unclear house rules, and scheduling conflicts',
      icon: MessageSquare,
    },
    {
      title: 'Resource Conflicts',
      description: 'Disappearing groceries, supply shortages, and unauthorized borrowing',
      icon: Package,
    },
  ];

  const benefits = [
    'Automated bill splitting and payment tracking',
    'Fair chore rotation with accountability',
    'Centralized communication and house rules',
    'Smart notifications and reminders',
    'Guest management and scheduling',
    'Resource sharing and inventory tracking',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <PublicHeader />
      
      {/* Hero Section */}
      <section className="relative px-4 py-20 text-center overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-roomly-primary/5 via-transparent to-roomly-secondary/5" />
        <div className="relative max-w-6xl mx-auto">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
            🏠 The future of household management
          </Badge>
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-roomly-primary via-roomly-secondary to-roomly-accent bg-clip-text text-transparent leading-tight">
              Welcome to Roomly
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Transform your household into a harmonious home. Manage expenses, coordinate chores, and build better relationships with your roommates — all in one beautifully designed app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:opacity-90 transition-opacity text-lg px-8 py-4"
                onClick={() => navigate('/auth/signup')}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4"
                onClick={() => navigate('/auth/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="px-4 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We understand the struggle
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Living with roommates shouldn't be stressful. We've identified the key pain points and built solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {painPoints.map((point, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-background/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 flex items-center justify-center">
                    <point.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{point.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything you need for harmonious living
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From expense splitting to chore management, Roomly has all the tools to make household management effortless.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 overflow-hidden">
                <CardContent className="p-8">
                  <div className={cn(
                    'w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110',
                    feature.bgColor
                  )}>
                    <feature.icon className={cn('h-8 w-8', feature.color)} />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-roomly-primary/5 to-roomly-secondary/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why roommates choose Roomly</h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of happy households who've transformed their living experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-background/60 backdrop-blur-sm">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-roomly-primary to-roomly-secondary flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-foreground font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center items-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Loved by roommates everywhere
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            "Roomly completely transformed how we manage our household. No more awkward money conversations!"
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-roomly-primary mb-2">10k+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-roomly-primary mb-2">95%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-roomly-primary mb-2">$2M+</div>
              <div className="text-muted-foreground">Expenses Tracked</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-roomly-primary via-roomly-secondary to-roomly-accent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to transform your household?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of roommates who've discovered the joy of organized, harmonious living with Roomly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-roomly-primary hover:bg-white/90 text-lg px-8 py-4"
              onClick={() => navigate('/auth/signup')}
            >
              Start Your Free Trial
              <Zap className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-4"
              onClick={() => navigate('/auth/login')}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
