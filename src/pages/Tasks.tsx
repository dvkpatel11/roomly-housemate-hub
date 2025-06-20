
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Tasks: React.FC = () => {
  return (
    <div className="p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <Button className="bg-roomly-tasks hover:bg-roomly-tasks/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Task
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <CheckSquare className="h-5 w-5 mr-2 text-roomly-tasks" />
                Clean Kitchen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Assigned to: Alex</p>
              <p className="text-sm text-muted-foreground">Due: Today</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <CheckSquare className="h-5 w-5 mr-2 text-roomly-tasks" />
                Take Out Trash
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Assigned to: Jamie</p>
              <p className="text-sm text-muted-foreground">Due: Tomorrow</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
