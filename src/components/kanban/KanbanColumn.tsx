
import React from "react";
import { Task } from "@/contexts/ProjectContext";
import TaskCard from "@/components/kanban/TaskCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onDragStart: (e: React.DragEvent, taskId: string, status: Task["status"]) => void;
  onDrop: (e: React.DragEvent, status: Task["status"]) => void;
  onDragOver: (e: React.DragEvent) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  tasks,
  onDragStart,
  onDrop,
  onDragOver,
}) => {
  const getColumnColor = () => {
    switch (status) {
      case "todo":
        return "border-t-blue-400";
      case "in-progress":
        return "border-t-yellow-400";
      case "done":
        return "border-t-green-400";
      default:
        return "border-t-gray-400";
    }
  };

  return (
    <div
      className={cn(
        "kanban-column border-t-4",
        getColumnColor()
      )}
      onDrop={(e) => onDrop(e, status)}
      onDragOver={onDragOver}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">{title}</h3>
        <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={onDragStart}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-20 border border-dashed rounded-md text-muted-foreground text-sm">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
