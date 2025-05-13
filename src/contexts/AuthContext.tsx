import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member";
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const demoUsers = [
  {
    id: "user1",
    name: "Arjun Sharma",
    email: "arjun@example.com",
    password: "password123",
    role: "admin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
  },
  {
    id: "user2",
    name: "Priya Patel",
    email: "priya@example.com",
    password: "password123",
    role: "member" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = demoUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      toast.success("Login successful!");
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid email or password");
    }
    
    setLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = demoUsers.find(u => u.email === email);
    
    if (existingUser) {
      toast.error("User with this email already exists");
      throw new Error("User with this email already exists");
    }
    
    const newUser = {
      id: `user${demoUsers.length + 1}`,
      name,
      email,
      role: "member" as const,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Registration successful!");
    
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      loading,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
