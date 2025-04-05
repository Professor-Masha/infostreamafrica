
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
import { GoogleLogin } from '@react-oauth/google';

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
  const [googleError, setGoogleError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

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

  const handleGoogleSuccess = (credentialResponse: any) => {
    setIsLoading(true);
    setGoogleError(null);
    
    if (credentialResponse.credential) {
      googleLogin(credentialResponse.credential);
      
      toast({
        title: "Google login successful",
        description: "Welcome to Info Stream Africa!"
      });
      
      navigate('/');
    } else {
      toast({
        title: "Google login failed",
        description: "Could not authenticate with Google",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleGoogleError = () => {
    setGoogleError("Google authentication is currently unavailable. Please use email login instead.");
    toast({
      title: "Google login unavailable",
      description: "Please use email login instead",
      variant: "destructive"
    });
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
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              auto_select={false}
              theme="filled_blue"
              shape="pill"
              size="large"
              text="signin_with"
              width="280px"
            />
          </div>

          {googleError && (
            <div className="p-3 text-sm bg-red-50 border border-red-200 rounded text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {googleError}
            </div>
          )}

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
