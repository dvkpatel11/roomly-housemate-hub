
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Expenses: React.FC = () => {
  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Expenses</h1>
          <Button className="bg-roomly-financial hover:bg-roomly-financial/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <DollarSign className="h-5 w-5 mr-2 text-roomly-financial" />
                Groceries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-2">$85.50</p>
              <p className="text-muted-foreground text-sm">Paid by: Alex</p>
              <p className="text-muted-foreground text-sm">Split 3 ways</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <DollarSign className="h-5 w-5 mr-2 text-roomly-financial" />
                Utilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-2">$120.00</p>
              <p className="text-muted-foreground text-sm">Paid by: Jamie</p>
              <p className="text-muted-foreground text-sm">Split 3 ways</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
