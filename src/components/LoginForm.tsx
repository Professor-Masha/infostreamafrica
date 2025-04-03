
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Mock users
const USERS = [
  { username: 'admin', password: 'admin123', role: 'admin', email: 'admin@example.com' },
  { username: 'user1', password: 'user123', role: 'user', email: 'user1@example.com' },
  { username: 'user2', password: 'user123', role: 'user', email: 'user2@example.com' },
];

interface LoginFormProps {
  onRegisterClick?: () => void;
}

export function LoginForm({ onRegisterClick }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Try to find user by email first, then by username as fallback
      const user = USERS.find(
        u => (u.email === email || u.username === email) && u.password === password
      );

      if (user) {
        login({
          username: user.username,
          role: user.role as any
        });

        toast({
          title: "Login successful",
          description: `Welcome, ${user.username}!`,
        });

        // Redirect to appropriate page
        navigate('/');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email/username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      // For demo, we're using the user1 account
      const user = USERS.find(u => u.username === 'user1');
      
      if (user) {
        login({
          username: user.username,
          role: user.role as any
        });

        toast({
          title: "Google login successful",
          description: `Welcome, ${user.username}!`,
        });

        navigate('/');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login to Info Stream Africa</CardTitle>
        <CardDescription>
          Access the latest news and videos from Africa
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button 
            className="w-full bg-red-600 hover:bg-red-700" 
            onClick={handleGoogleLogin} 
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-muted-foreground text-center w-full">
          <p>Don't have an account?{" "}
            <Button variant="link" className="p-0 h-auto" onClick={onRegisterClick}>
              Register
            </Button>
          </p>
        </div>
        <div className="text-sm text-muted-foreground">
          <p className="text-center">Demo accounts:</p>
          <p className="text-center">Admin: admin / admin123</p>
          <p className="text-center">User: user1 / user123</p>
        </div>
      </CardFooter>
    </Card>
  );
}
