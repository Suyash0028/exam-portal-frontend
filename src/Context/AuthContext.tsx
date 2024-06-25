import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string, isAdmin: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface DecodedToken {
  exp: number;
  isAdmin: boolean;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const isAdmin: boolean = strToBool(localStorage.getItem('isAdmin'));
    if (token && isAdmin) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();

      if (!isTokenExpired) {
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
      } 
    }
    else if(token && !isAdmin) {
      const decodedToken: DecodedToken = jwtDecode(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();

      if (!isTokenExpired) {
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
      }
      else{
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    }
  }, []);

  const strToBool = (str: string | null): boolean => {
    return str === 'true';
  };

  const login = (token: string, isAdmin: boolean) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('score');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
