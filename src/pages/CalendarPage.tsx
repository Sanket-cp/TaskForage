
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useProjects } from "@/contexts/ProjectContext";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task } from "@/contexts/ProjectContext";

const CalendarPage: React.FC = () => {
  const { projects } = useProjects();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Get all tasks from all projects
  const allTasks = projects.flatMap(project => 
    project.tasks.map(task => ({
      ...task,
      projectName: project.name,
      projectId: project.id
    }))
  );

  // Filter tasks based on selected date
  const tasksOnSelectedDate = selectedDate 
    ? allTasks.filter(task => 
        task.dueDate && format(new Date(task.dueDate), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )
    : [];

  // Get all dates that have tasks
  const datesWithTasks = allTasks
    .filter(task => task.dueDate)
    .map(task => new Date(task.dueDate as string));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Task Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg shadow-sm p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="mx-auto"
            modifiers={{
              hasTasks: datesWithTasks,
            }}
            modifiersStyles={{
              hasTasks: {
                backgroundColor: "hsl(var(--primary) / 0.1)",
                fontWeight: "bold",
              }
            }}
          />
        </div>
        
        <div className="md:col-span-2">
          {selectedDate ? (
            <div className="space-y-4">
              <h2 className="text-lg font-medium">
                Tasks due on {format(selectedDate, "MMMM d, yyyy")}
              </h2>
              
              {tasksOnSelectedDate.length > 0 ? (
                <div className="space-y-3">
                  {tasksOnSelectedDate.map((task) => (
                    <Card key={task.id} className="task-card">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base font-medium">{task.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground mb-2">{task.description}</div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <div className="px-2 py-1 rounded-full bg-primary/10">
                            Project: {task.projectName}
                          </div>
                          <div className="px-2 py-1 rounded-full bg-primary/10">
                            Priority: {task.priority}
                          </div>
                          <div className="px-2 py-1 rounded-full bg-primary/10">
                            Status: {task.status}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-40 border rounded-lg bg-secondary/30">
                  <p className="text-muted-foreground">No tasks due on this date</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-40 border rounded-lg bg-secondary/30">
              <p className="text-muted-foreground">Select a date to view tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
