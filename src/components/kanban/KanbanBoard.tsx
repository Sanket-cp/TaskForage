
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import KanbanColumn from "@/components/kanban/KanbanColumn";
import { Task, useProjects } from "@/contexts/ProjectContext";
import CreateTaskDialog from "@/components/kanban/CreateTaskDialog";

const KanbanBoard: React.FC = () => {
  const { currentProject, updateTaskStatus } = useProjects();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  if (!currentProject) return null;

  const todoTasks = currentProject.tasks.filter(task => task.status === "todo");
  const inProgressTasks = currentProject.tasks.filter(task => task.status === "in-progress");
  const doneTasks = currentProject.tasks.filter(task => task.status === "done");

  const handleDragStart = (e: React.DragEvent, taskId: string, status: Task["status"]) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("status", status);
  };

  const handleDrop = (e: React.DragEvent, newStatus: Task["status"]) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const oldStatus = e.dataTransfer.getData("status");
    
    if (oldStatus !== newStatus) {
      updateTaskStatus(currentProject.id, taskId, newStatus);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Task Board</h2>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-6">
        <KanbanColumn
          title="To Do"
          tasks={todoTasks}
          status="todo"
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
        
        <KanbanColumn
          title="In Progress"
          tasks={inProgressTasks}
          status="in-progress"
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
        
        <KanbanColumn
          title="Done"
          tasks={doneTasks}
          status="done"
          onDragStart={handleDragStart}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        />
      </div>
      
      <CreateTaskDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        projectId={currentProject.id} 
      />
    </div>
  );
};

export default KanbanBoard;
