
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "@/contexts/ProjectContext";
import KanbanBoard from "@/components/kanban/KanbanBoard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

const ProjectPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { selectProject, currentProject } = useProjects();
  
  useEffect(() => {
    if (projectId) {
      selectProject(projectId);
    }
    
    return () => {
      selectProject(null);
    };
  }, [projectId, selectProject]);
  
  if (!currentProject) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }
  
  const totalTasks = currentProject.tasks.length;
  const completedTasks = currentProject.tasks.filter(task => task.status === "done").length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  const formattedDate = format(new Date(currentProject.createdAt), "MMMM d, yyyy");

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{currentProject.name}</h1>
        <p className="text-muted-foreground">{currentProject.description}</p>
        
        <div className="flex flex-wrap gap-4 items-center text-sm mt-2">
          <div className="text-muted-foreground">
            Created on {formattedDate}
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-muted-foreground">Members:</div>
            <div className="flex -space-x-2">
              {currentProject.members.map((memberId, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${memberId}`} />
                  <AvatarFallback>{memberId[0].toUpperCase()}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <div className="mr-2 text-muted-foreground">Progress:</div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-brand-purple" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-sm font-medium">{progress}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="board" className="w-full">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        <TabsContent value="board" className="pt-4">
          <KanbanBoard />
        </TabsContent>
        <TabsContent value="list" className="pt-4">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Task list view coming soon</p>
          </div>
        </TabsContent>
        <TabsContent value="calendar" className="pt-4">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Calendar view coming soon</p>
          </div>
        </TabsContent>
        <TabsContent value="files" className="pt-4">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Files view coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectPage;
