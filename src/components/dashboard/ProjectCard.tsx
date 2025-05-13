
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/contexts/ProjectContext";
import { format } from "date-fns";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  // Calculate project progress based on completed tasks
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.status === "done").length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Get counts for different task statuses
  const todoCount = project.tasks.filter(task => task.status === "todo").length;
  const inProgressCount = project.tasks.filter(task => task.status === "in-progress").length;
  const doneCount = project.tasks.filter(task => task.status === "done").length;
  
  // Format date
  const formattedDate = format(new Date(project.createdAt), "MMM d, yyyy");

  return (
    <Link to={`/project/${project.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center justify-between">
            {project.name}
            <Badge variant="secondary">{project.tasks.length} tasks</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex gap-3">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">To Do</p>
              <p className="font-medium">{todoCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">In Progress</p>
              <p className="font-medium">{inProgressCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Done</p>
              <p className="font-medium">{doneCount}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <p>Created {formattedDate}</p>
          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((memberId, index) => (
              <Avatar key={index} className="h-6 w-6 border-2 border-background">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${memberId}`} />
                <AvatarFallback>{memberId[0].toUpperCase()}</AvatarFallback>
              </Avatar>
            ))}
            {project.members.length > 3 && (
              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProjectCard;
