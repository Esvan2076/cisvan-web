import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { authService } from "../services/authService";

interface User {
  id: number;
  username: string;
  admin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  tempUser: { username: string; email: string } | null;
  recoverUser: { username: string; email: string } | null;
  register: (username: string, email: string, password: string) => Promise<void>;
  verify: (code: string) => Promise<boolean>;
  resendVerification: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (code: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tempUser, setTempUser] = useState<{ username: string; email: string } | null>(null);
  const [recoverUser, setRecoverUser] = useState<{ username: string; email: string } | null>(null);
  const { i18n } = useTranslation();

  const fetchUser = async (token: string) => {
    try {
      const userData = await authService.getMe(token, i18n.language);
      setUser(userData);
    } catch {
      logout();
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const token = await authService.login(email, password, i18n.language);
      localStorage.setItem("auth_token", token);
      await fetchUser(token);
      return true;
    } catch (err) {
      if (err instanceof Response) throw err;
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
  };

  const register = async (username: string, email: string, password: string) => {
    const data = await authService.register(username, email, password, i18n.language);
    setTempUser(data);
  };

  const verify = async (code: string): Promise<boolean> => {
    if (!tempUser) return false;
    try {
      const token = await authService.verifyCode(tempUser.email, code, i18n.language);
      localStorage.setItem("auth_token", token);
      await fetchUser(token);
      setTempUser(null);
      return true;
    } catch {
      return false;
    }
  };

  const resendVerification = async () => {
    if (!tempUser) return;
    await authService.resendCode(tempUser.email, i18n.language);
  };

  const forgotPassword = async (email: string) => {
    const data = await authService.forgotPassword(email, i18n.language);
    setRecoverUser(data);
  };

  const resetPassword = async (code: string, newPassword: string): Promise<boolean> => {
    if (!recoverUser) return false;
    return await authService.resetPassword(recoverUser.email, code, newPassword, i18n.language);
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) fetchUser(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        tempUser,
        recoverUser,
        register,
        verify,
        resendVerification,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
