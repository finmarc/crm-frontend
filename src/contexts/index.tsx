import { AuthProvider, useAuth } from "./AuthContext";

const AppProvider = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};         

export default AppProvider;
       