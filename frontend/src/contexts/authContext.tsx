import { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/axios';
import { toast } from 'sonner';
import { SignInForm } from '@/pages/auth/sign-in';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (data: SignInForm, onSuccess: () => void, onError: () => void) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const login = async (data: SignInForm, onSuccess: () => void, onError: (errorMessage: string) => void) => {
    try {
      const response = await api('/users/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });

      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
      api.defaults.headers['Content-Type'] = 'application/json'

      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true);
      onSuccess(); 
      toast.success(' bem-sucedido!');
    } catch (error: any) {
      // onError(error.response?.data?.message || 'Erro desconhecido');  
      toast.error('Credenciais inválidas');
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    toast.success('Logout realizado com sucesso!');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
