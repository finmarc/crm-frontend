import { Navigate } from "react-router-dom";
import Login from "../pages/login";
import { AuthProvider, useAuth } from "./AuthContext";

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  if(!user)  return <Login />

  return <AuthProvider>{children}</AuthProvider>;
};         

export default AppProvider;
       