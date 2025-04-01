
import React from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Login() {
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/my-articles');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">MediScience Hub</h1>
          <p className="text-muted-foreground">Blogger & Admin Platform</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
