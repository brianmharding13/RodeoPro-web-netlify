import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  subscriptionStatus: 'active' | 'inactive' | 'pending';
  subscriptionPlan?: 'monthly' | 'annual';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateSubscription: (status: 'active' | 'inactive' | 'pending', plan?: 'monthly' | 'annual') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rodeopro_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      subscriptionStatus: 'pending',
    };
    
    setUser(newUser);
    localStorage.setItem('rodeopro_user', JSON.stringify(newUser));
  };

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // For demo purposes, create a user on login
    const existingUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      subscriptionStatus: 'active',
      subscriptionPlan: 'monthly',
    };
    
    setUser(existingUser);
    localStorage.setItem('rodeopro_user', JSON.stringify(existingUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rodeopro_user');
  };

  const updateSubscription = (status: 'active' | 'inactive' | 'pending', plan?: 'monthly' | 'annual') => {
    if (user) {
      const updatedUser = { ...user, subscriptionStatus: status, subscriptionPlan: plan };
      setUser(updatedUser);
      localStorage.setItem('rodeopro_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user && user.subscriptionStatus === 'active',
        login,
        signup,
        logout,
        updateSubscription,
      }}
    >
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
