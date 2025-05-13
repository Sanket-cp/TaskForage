
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

// Mock team members with Indian names
const teamMembers = [
  {
    id: "user1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    department: "Engineering",
  },
  {
    id: "user2",
    name: "Priya Patel",
    email: "priya@example.com",
    role: "member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    department: "Design",
  },
  {
    id: "user3",
    name: "Raj Malhotra",
    email: "raj@example.com",
    role: "member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
    department: "Engineering",
  },
  {
    id: "user4",
    name: "Meera Verma",
    email: "meera@example.com",
    role: "member",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera",
    department: "Marketing",
  },
];

const TeamPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team Members</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <Badge variant={member.role === "admin" ? "default" : "secondary"}>
                  {member.role === "admin" ? "Admin" : "Member"}
                </Badge>
                <span className="text-muted-foreground">{member.department}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamPage;
