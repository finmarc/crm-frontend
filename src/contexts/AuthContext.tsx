import { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import api from "../services/apiClient";
import { helper } from "../utils";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}
interface SignInCredesentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredesentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider = ({ children }: any) => {
  const history = useHistory();
  const router = useLocation();
  const [data, setData] = useState<AuthState | any>(() => {
    const { "@token": token } = parseCookies();
    const { "@user": user } = parseCookies();

    if (token && user) {
      // para não precisar ficar passando no header das requisições a api
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { token, user: JSON.stringify(user) };
    }

    return {} as AuthState;
  });

  useEffect(() => {
    const { "@token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const user = response.data;
          setData({
            token,
            user,
          });
        })
        .catch((error: AxiosError) => {
          if (helper.isBrowser()) {
            signOut();
          }
        });
    }
  }, [router.pathname]);

  const signIn = useCallback(async ({ email, password }: any) => {
    const toastId = toast.loading("Autenticando...", {
      duration: 4000,
      position: "top-right",
    });

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user, refreshToken } = response.data;

      if (token && user) {
        toast.dismiss(toastId);
      }

      setCookie(undefined, "@token", token, {
        maxAge: 60 * 60 * 24 * 90,
        path: "/",
      });

      setCookie(undefined, "@user", user, {
        maxAge: 60 * 60 * 24 * 90,
        path: "/",
      });

      setCookie(undefined, "@refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 90,
        path: "/",
      });

      // para não precisar ficar passando no header das requisições a api
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setData({ token, user });
    } catch (err: any) {
      toast.dismiss(toastId);
      console.log(err);
      toast.error("Ops! Usuário ou senha inválido", {
        duration: 4000,
        position: "top-right",
      });
    }
  }, []);

  const signOut = useCallback(() => {
    destroyCookie(null, "@token");
    destroyCookie(null, "@user");
    destroyCookie(null, "@refreshToken");

    setData({} as AuthState);
    history.push("/login");
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
