
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  role: 'admin' | 'user' | 'blogger';
  email?: string;
  fullName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set secure cookie options
const SECURE_COOKIE_OPTIONS = {
  secure: true,         // Only sent over HTTPS
  httpOnly: true,       // Not accessible via JavaScript
  sameSite: 'strict',   // Only sent to the same site
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // In a production environment, you would set an HttpOnly cookie here
    // This would require a server-side endpoint
    // Example: document.cookie = `auth_token=${token}; ${serializeCookieOptions(SECURE_COOKIE_OPTIONS)}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // In a production environment, you would clear the HttpOnly cookie here
    // Example: document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin,
      isAuthenticated, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
