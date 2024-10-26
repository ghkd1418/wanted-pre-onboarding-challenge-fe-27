import { createContext, useEffect, useState } from "react";
import { authStorage } from "../shared/lib/authStorage";

interface AuthContextType {
  user: string | null;
  signin: (user: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(authStorage.getAuthToken());

  const signin = (newUser: string, callback: VoidFunction) => {
    setUser(newUser);
    callback();
  };
  const signout = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  const value = { user, signin, signout };

  useEffect(() => {
    if (user) {
      authStorage.setAuthToken(user);
    } else {
      authStorage.clearAuthToken();
    }
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
