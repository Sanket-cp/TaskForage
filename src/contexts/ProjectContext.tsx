import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  assigneeId: string | null;
  dueDate: string | null;
  createdAt: string;
  createdBy: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  members: string[];
  createdBy: string;
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  createProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  selectProject: (id: string | null) => void;
  createTask: (projectId: string, task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (projectId: string, taskId: string, task: Partial<Task>) => void;
  deleteTask: (projectId: string, taskId: string) => void;
  updateTaskStatus: (projectId: string, taskId: string, status: Task["status"]) => void;
}

// Demo data with Indian themes
const demoProjects: Project[] = [
  {
    id: "proj1",
    name: "Diwali Festival App",
    description: "Create a mobile app for tracking and organizing Diwali celebrations and events",
    tasks: [
      {
        id: "task1",
        title: "Design homepage with rangoli patterns",
        description: "Create a vibrant homepage with traditional rangoli designs and motifs",
        status: "done",
        priority: "high",
        assigneeId: "user1",
        dueDate: "2025-05-20",
        createdAt: "2025-05-01",
        createdBy: "user1",
      },
      {
        id: "task2",
        title: "Implement diya lighting animation",
        description: "Create an interactive animation for lighting virtual diyas on the app",
        status: "in-progress",
        priority: "medium",
        assigneeId: "user2",
        dueDate: "2025-05-25",
        createdAt: "2025-05-05",
        createdBy: "user1",
      },
      {
        id: "task3",
        title: "Add sweets and gifts marketplace",
        description: "Integrate local vendors for ordering traditional sweets and gifts",
        status: "todo",
        priority: "low",
        assigneeId: null,
        dueDate: "2025-05-30",
        createdAt: "2025-05-10",
        createdBy: "user1",
      }
    ],
    members: ["user1", "user2"],
    createdBy: "user1",
    createdAt: "2025-05-01",
  }
];

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(demoProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const createProject = (project: Omit<Project, "id" | "createdAt">) => {
    const newProject = {
      ...project,
      id: `proj${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setProjects([...projects, newProject]);
    toast.success(`Project "${newProject.name}" created successfully`);
  };

  const updateProject = (id: string, projectUpdate: Partial<Project>) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, ...projectUpdate } : project
    ));
    
    if (currentProject?.id === id) {
      setCurrentProject(prev => prev ? { ...prev, ...projectUpdate } : null);
    }
    
    toast.success("Project updated successfully");
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(project => project.id !== id));
    
    if (currentProject?.id === id) {
      setCurrentProject(null);
    }
    
    toast.success("Project deleted successfully");
  };

  const selectProject = (id: string | null) => {
    if (!id) {
      setCurrentProject(null);
      return;
    }
    
    const project = projects.find(p => p.id === id);
    setCurrentProject(project || null);
  };

  const createTask = (projectId: string, task: Omit<Task, "id" | "createdAt">) => {
    const newTask = {
      ...task,
      id: `task${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, tasks: [...project.tasks, newTask] } 
        : project
    ));
    
    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null
      );
    }
    
    toast.success("Task created successfully");
  };

  const updateTask = (projectId: string, taskId: string, taskUpdate: Partial<Task>) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {
            ...project,
            tasks: project.tasks.map(task => 
              task.id === taskId ? { ...task, ...taskUpdate } : task
            )
          } 
        : project
    ));
    
    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev 
          ? {
              ...prev,
              tasks: prev.tasks.map(task => 
                task.id === taskId ? { ...task, ...taskUpdate } : task
              )
            } 
          : null
      );
    }
    
    toast.success("Task updated successfully");
  };

  const deleteTask = (projectId: string, taskId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? {
            ...project,
            tasks: project.tasks.filter(task => task.id !== taskId)
          } 
        : project
    ));
    
    if (currentProject?.id === projectId) {
      setCurrentProject(prev => 
        prev 
          ? {
              ...prev,
              tasks: prev.tasks.filter(task => task.id !== taskId)
            } 
          : null
      );
    }
    
    toast.success("Task deleted successfully");
  };

  const updateTaskStatus = (projectId: string, taskId: string, status: Task["status"]) => {
    updateTask(projectId, taskId, { status });
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      currentProject,
      createProject,
      updateProject,
      deleteProject,
      selectProject,
      createTask,
      updateTask,
      deleteTask,
      updateTaskStatus,
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
