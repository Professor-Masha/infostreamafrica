
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  username: string;
  role: 'admin' | 'user' | 'blogger';
  email?: string;
  fullName?: string;
  avatar?: string;
  googleId?: string;
  savedArticles?: string[];
  savedVideos?: string[];
}

interface GoogleProfile {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

interface SavedItem {
  id: string;
  userId: string;
  itemId: string;
  itemType: 'article' | 'video';
  savedDate: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  login: (user: User) => void;
  googleLogin: (credential: string) => void;
  logout: () => void;
  saveItem: (itemId: string, itemType: 'article' | 'video') => Promise<void>;
  unsaveItem: (itemId: string, itemType: 'article' | 'video') => Promise<void>;
  isItemSaved: (itemId: string, itemType: 'article' | 'video') => boolean;
  getSavedItems: (itemType?: 'article' | 'video') => SavedItem[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set secure cookie options
const SECURE_COOKIE_OPTIONS = {
  secure: true,         // Only sent over HTTPS
  httpOnly: true,       // Not accessible via JavaScript
  sameSite: 'strict',   // Only sent to the same site
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Mock users
const USERS = [
  { 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin' as const, 
    email: 'admin@example.com',
    savedArticles: [],
    savedVideos: []
  },
  { 
    username: 'user1', 
    password: 'user123', 
    role: 'user' as const, 
    email: 'user1@example.com',
    savedArticles: [],
    savedVideos: []
  },
  { 
    username: 'user2', 
    password: 'user123', 
    role: 'user' as const, 
    email: 'user2@example.com',
    savedArticles: [],
    savedVideos: []
  },
  { 
    username: 'writer1', 
    password: 'writer123', 
    role: 'blogger' as const, 
    email: 'writer1@example.com',
    savedArticles: [],
    savedVideos: []
  },
];

// Mock saved items
const SAVED_ITEMS: SavedItem[] = [];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

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
    
    const storedSavedItems = localStorage.getItem('savedItems');
    if (storedSavedItems) {
      try {
        setSavedItems(JSON.parse(storedSavedItems));
      } catch (error) {
        console.error('Failed to parse saved items', error);
        localStorage.removeItem('savedItems');
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

  const googleLogin = (credential: string) => {
    try {
      // Decode JWT token
      const profile = jwtDecode(credential) as GoogleProfile;
      
      // Find if user already exists by email
      const existingUser = USERS.find(u => u.email === profile.email);
      
      // Create or update user
      const userData: User = existingUser 
        ? { 
            ...existingUser, 
            googleId: profile.sub,
            avatar: profile.picture,
            fullName: profile.name
          }
        : {
            username: profile.name.replace(/\s+/g, '').toLowerCase(),
            email: profile.email,
            fullName: profile.name,
            avatar: profile.picture,
            role: 'user' as const,
            googleId: profile.sub,
            savedArticles: [],
            savedVideos: []
          };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // In production, send credential to backend for verification
      // Example: await fetch('/api/auth/google', {method: 'POST', body: JSON.stringify({credential})})
    } catch (error) {
      console.error('Failed to process Google login', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    
    // In a production environment, you would clear the HttpOnly cookie here
    // Example: document.cookie = 'auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };
  
  // Save item functionality
  const saveItem = async (itemId: string, itemType: 'article' | 'video') => {
    if (!user) return;
    
    // Create new saved item
    const newSavedItem: SavedItem = {
      id: `${Date.now()}`,
      userId: user.username,
      itemId,
      itemType,
      savedDate: new Date().toISOString(),
    };
    
    // Update savedItems state
    const updatedSavedItems = [...savedItems, newSavedItem];
    setSavedItems(updatedSavedItems);
    
    // Update user's saved items
    const updatedUser = { ...user };
    if (itemType === 'article') {
      updatedUser.savedArticles = [...(updatedUser.savedArticles || []), itemId];
    } else {
      updatedUser.savedVideos = [...(updatedUser.savedVideos || []), itemId];
    }
    
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  // Unsave item functionality
  const unsaveItem = async (itemId: string, itemType: 'article' | 'video') => {
    if (!user) return;
    
    // Remove from savedItems
    const updatedSavedItems = savedItems.filter(
      item => !(item.itemId === itemId && item.itemType === itemType && item.userId === user.username)
    );
    setSavedItems(updatedSavedItems);
    
    // Update user's saved items
    const updatedUser = { ...user };
    if (itemType === 'article') {
      updatedUser.savedArticles = (updatedUser.savedArticles || []).filter(id => id !== itemId);
    } else {
      updatedUser.savedVideos = (updatedUser.savedVideos || []).filter(id => id !== itemId);
    }
    
    setUser(updatedUser);
    
    // Update localStorage
    localStorage.setItem('savedItems', JSON.stringify(updatedSavedItems));
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  
  // Check if item is saved
  const isItemSaved = (itemId: string, itemType: 'article' | 'video') => {
    if (!user) return false;
    
    if (itemType === 'article') {
      return (user.savedArticles || []).includes(itemId);
    } else {
      return (user.savedVideos || []).includes(itemId);
    }
  };
  
  // Get all saved items for the current user
  const getSavedItems = (itemType?: 'article' | 'video') => {
    if (!user) return [];
    
    let filteredItems = savedItems.filter(item => item.userId === user.username);
    
    if (itemType) {
      filteredItems = filteredItems.filter(item => item.itemType === itemType);
    }
    
    return filteredItems;
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAdmin,
      isAuthenticated, 
      login, 
      googleLogin,
      logout,
      saveItem,
      unsaveItem,
      isItemSaved,
      getSavedItems
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
