
import React, { useState, useEffect } from 'react';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("login");
  const isAdminPath = location.pathname.startsWith('/admin');

  // Check if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      // If coming from admin URL and user is admin, redirect to admin dashboard
      if (isAdminPath && isAdmin) {
        navigate('/admin');
      } else {
        navigate('/my-articles');
      }
    }
  }, [isAuthenticated, navigate, isAdmin, isAdminPath]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">MediScience Hub</h1>
          <p className="text-muted-foreground">
            {isAdminPath ? "Admin Portal" : "Blogger & Admin Platform"}
          </p>
        </div>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm onRegisterClick={() => setActiveTab("register")} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onLoginClick={() => setActiveTab("login")} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
