
import React from "react";
import { Task } from "@/contexts/ProjectContext";
import { Badge } from "@/components/ui/badge";
import { GripVertical, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, taskId: string, status: Task["status"]) => void;
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onDragStart }) => {
  // Format due date if exists
  const formattedDueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : null;

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => onDragStart(e, task.id, task.status)}
    >
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className={cn(priorityColors[task.priority])}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </Badge>
        <div className="drag-handle cursor-grab">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <h4 className="font-medium mb-1">{task.title}</h4>
      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
        {task.description}
      </p>
      
      <div className="flex items-center justify-between mt-2">
        {task.assigneeId ? (
          <Avatar className="h-6 w-6">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assigneeId}`} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        ) : (
          <span className="text-xs text-muted-foreground">Unassigned</span>
        )}
        
        {formattedDueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDueDate}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
