
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckSquare, DollarSign, Calendar, Users } from 'lucide-react';

const HeroSection: React.FC = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Assign and track household chores with ease',
      color: 'text-roomly-tasks',
    },
    {
      icon: DollarSign,
      title: 'Expense Splitting',
      description: 'Fair and transparent expense tracking',
      color: 'text-roomly-financial',
    },
    {
      icon: Calendar,
      title: 'Event Planning',
      description: 'Coordinate household events and activities',
      color: 'text-roomly-events',
    },
    {
      icon: Users,
      title: 'Roommate Harmony',
      description: 'Build better relationships with your housemates',
      color: 'text-roomly-primary',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-roomly-primary via-roomly-secondary to-roomly-accent bg-clip-text text-transparent">
              Welcome to Roomly
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The ultimate household management app that brings roommates together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:opacity-90 transition-opacity">
                Get Started
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for harmonious living
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className={cn(
                    'w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center',
                    'bg-gradient-to-br from-muted to-muted/50 group-hover:scale-110 transition-transform'
                  )}>
                    <feature.icon className={cn('h-6 w-6', feature.color)} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-roomly-primary/5 to-roomly-secondary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your household?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of happy roommates who've discovered the joy of organized living
          </p>
          <Button size="lg" className="bg-gradient-to-r from-roomly-primary to-roomly-secondary hover:opacity-90 transition-opacity">
            Start Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
