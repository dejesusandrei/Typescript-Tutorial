import { useState, type ReactNode } from "react";
import type { AuthContextValue, User } from "../types/User";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = async () => {
        setUser(null);
        console.log('logout');
    };

    const value: AuthContextValue = {
        user,
        isLoading,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}