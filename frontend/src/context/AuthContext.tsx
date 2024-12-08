'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: number;
  email: string;
  full_name: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error parsing stored user:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={value}>
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