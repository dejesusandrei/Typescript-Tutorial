import { createContext, useContext, type ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";

// 1. Define the shape of the Context
type AuthContextType = ReturnType<typeof useAuth>;

// 2. Create Context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth(); // Calls internal hook ONCE at top-level

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Custom Hook to consume Context safely
// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}