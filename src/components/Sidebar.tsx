
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/contexts/ProjectContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CreateProjectDialog from "@/components/projects/CreateProjectDialog";

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const { user, logout } = useAuth();
  const { projects } = useProjects();
  const location = useLocation();

  const mainLinks = [
    { name: "Dashboard", to: "/dashboard", icon: Home },
    { name: "My Tasks", to: "/tasks", icon: CheckSquare },
    { name: "Calendar", to: "/calendar", icon: Calendar },
    { name: "Team", to: "/team", icon: Users },
    { name: "Settings", to: "/settings", icon: Settings },
  ];

  return (
    <div className={cn(
      "flex flex-col h-full bg-sidebar border-r transition-all",
      collapsed ? "w-[70px]" : "w-[240px]"
    )}>
      <div className="p-4 flex items-center justify-center">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-gradient-to-tr from-orange-500 to-yellow-400 flex items-center justify-center text-white font-bold">
            KJ
          </div>
          {!collapsed && <span className="text-lg font-bold">KarmJyot</span>}
        </Link>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.to}
                className={cn(
                  "flex items-center px-2 py-2 text-sm rounded-md",
                  location.pathname === link.to 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  "transition-colors duration-200"
                )}
              >
                <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 px-4">
          <div className={cn("flex items-center justify-between mb-2", 
            collapsed && "justify-center"
          )}>
            {!collapsed && <h3 className="text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">
              Projects
            </h3>}
            <CreateProjectDialog 
              variant="outline" 
              size="icon" 
              children={<Button variant="outline" size="icon" className="h-5 w-5 p-0">+</Button>} 
            />
          </div>
          <div className="space-y-1">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className={cn(
                  "flex items-center px-2 py-2 text-sm rounded-md",
                  location.pathname === `/project/${project.id}` 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  "transition-colors duration-200",
                  collapsed && "justify-center"
                )}
              >
                <div className={cn(
                  "h-2 w-2 rounded-full bg-brand-blue",
                  collapsed ? "mx-auto" : "mr-3"
                )} />
                {!collapsed && (
                  <span className="truncate">{project.name}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 border-t border-sidebar-border">
        {user && (
          <div className={cn(
            "flex items-center", 
            collapsed ? "justify-center" : "justify-between"
          )}>
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="ml-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-sidebar-foreground/70">{user.role}</p>
                </div>
              )}
            </div>
            {!collapsed && (
              <Button variant="outline" size="icon" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
