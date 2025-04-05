
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

interface RegisterFormProps {
  onLoginClick?: () => void;
}

export function RegisterForm({ onLoginClick }: RegisterFormProps) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login, googleLogin } = useAuth();

  const handleGoogleSuccess = (credentialResponse: any) => {
    setIsLoading(true);
    setGoogleError(null);
    
    if (credentialResponse.credential) {
      googleLogin(credentialResponse.credential);
      
      toast({
        title: "Google registration successful",
        description: "Your account has been created",
      });
      
      navigate('/');
    } else {
      toast({
        title: "Google registration failed",
        description: "Could not authenticate with Google",
        variant: "destructive"
      });
    }
    
    setIsLoading(false);
  };

  const handleGoogleError = () => {
    setGoogleError("Google authentication is currently unavailable. Please use email registration instead.");
    toast({
      title: "Google registration unavailable",
      description: "Please use email registration instead",
      variant: "destructive"
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Simulate successful registration
      toast({
        title: "Registration successful",
        description: "Your account has been created",
      });
      
      // Automatically login the new user
      login({
        username: username,
        role: 'user'
      });
      
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>
          Register to access Info Stream Africa
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
              text="signup_with"
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
                Or register with email
              </span>
            </div>
          </div>

          <form onSubmit={handleRegister}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
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
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Register"}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground text-center w-full">
          <p>Already have an account?{" "}
            <Button variant="link" className="p-0 h-auto" onClick={onLoginClick}>
              Login
            </Button>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
