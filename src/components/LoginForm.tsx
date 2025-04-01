
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Mock users with roles
const USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'blogger1', password: 'blog123', role: 'blogger' },
  { username: 'blogger2', password: 'blog123', role: 'blogger' },
];

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const user = USERS.find(
        u => u.username === username && u.password === password
      );

      if (user) {
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify({
          username: user.username,
          role: user.role
        }));

        toast({
          title: "Login successful",
          description: `Welcome, ${username}!`,
        });

        // Redirect to appropriate page
        navigate('/my-articles');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Sign in to access the blogging platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        <div>
          <p className="text-center">Use these demo accounts:</p>
          <p className="text-center">Admin: admin / admin123</p>
          <p className="text-center">Blogger: blogger1 / blog123</p>
        </div>
      </CardFooter>
    </Card>
  );
}
