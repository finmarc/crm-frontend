import React, { createContext, useCallback, useState, useContext } from "react";
import api from "../services/apiClient";

interface User {
  id: string;
  name: string;
  document: string;
  full_name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}
interface SignInCredesentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredesentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@token");
    const user = localStorage.getItem("@user");

    if (token && user) {
      // para não precisar ficar passando no header das requisições a api
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }: any) => {
    const response = await api.post("login", {
      username,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@token", token);
    localStorage.setItem("@user", JSON.stringify(user));

    // para não precisar ficar passando no header das requisições a api
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@token");
    localStorage.removeItem("@user");

    setData({} as AuthState);
  }, []);

  // Para atualizra avatar na tela
  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem("@user", JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token]
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// criando um hook
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
