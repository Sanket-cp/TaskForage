
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-brand-purple/20 to-brand-blue/20 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-tr from-brand-purple to-brand-blue text-white font-bold flex items-center justify-center mx-auto mb-4">
            TF
          </div>
          <h1 className="text-3xl font-bold">TaskForge</h1>
          <p className="text-muted-foreground">Project Management Platform</p>
        </div>
        
        <Card className="p-6">
          {isLogin ? (
            <LoginForm onToggleForm={() => setIsLogin(false)} />
          ) : (
            <RegisterForm onToggleForm={() => setIsLogin(true)} />
          )}
        </Card>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Note: This is a demo application. Use john@example.com / password123 to login.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
