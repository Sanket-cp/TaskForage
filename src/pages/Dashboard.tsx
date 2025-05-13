
import React from "react";
import { Clipboard, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectContext";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";

const Dashboard: React.FC = () => {
  const { projects } = useProjects();
  
  // Calculate statistics
  const totalTasks = projects.reduce(
    (acc, project) => acc + project.tasks.length, 
    0
  );
  
  const completedTasks = projects.reduce(
    (acc, project) => acc + project.tasks.filter(task => task.status === "done").length, 
    0
  );
  
  const pendingTasks = projects.reduce(
    (acc, project) => acc + project.tasks.filter(task => task.status !== "done").length, 
    0
  );
  
  const highPriorityTasks = projects.reduce(
    (acc, project) => acc + project.tasks.filter(task => task.priority === "high").length, 
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <CreateProjectDialog />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Tasks"
          value={totalTasks}
          icon={<Clipboard className="h-4 w-4 text-muted-foreground" />}
          description="All tasks across all projects"
        />
        <StatsCard
          title="Completed Tasks"
          value={completedTasks}
          icon={<CheckCircle className="h-4 w-4 text-green-500" />}
          description="Tasks marked as done"
          trend={{ value: 8, positive: true }}
        />
        <StatsCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
          description="Tasks in progress or not started"
        />
        <StatsCard
          title="High Priority"
          value={highPriorityTasks}
          icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
          description="Tasks marked as high priority"
          trend={{ value: 2, positive: false }}
        />
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Projects</h2>
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-secondary/50 border rounded-lg p-8 text-center">
            <h3 className="font-medium mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first project to get started
            </p>
            <CreateProjectDialog />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
