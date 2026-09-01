import { useEffect, useState, useCallback } from "react";
import type { AuthState } from "../types/AuthState";
import { 
  getCurrentUser, 
  login as loginService, 
  signup as signupService, 
  logout as logoutService,
  type LoginCredentials,
  type SignupCredentials
} from "../services/authService";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    status: 'loading'
  });

  // 1. Initial Authentication Check
  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
        if (!isMounted) return;

        if (!response.success || !response.data) {
          setAuthState({
            status: "unauthenticated",
            message: response.message || "Please login",
          });
          return;
        }

        setAuthState({
          status: "authenticated",
          user: response.data,
        });
      } catch (error) {
        if (isMounted) {
          setAuthState({
            status: "unauthenticated",
            message: "Please login",
          });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  // 2. Login Handler
  /**
   * useCallback is used here to memoize the login function.
   * Preserves the function reference across re-renders.
   * Prevents downstream child components from re-rendering when passed as a prop.
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState({ status: 'loading' });
    
    const response = await loginService(credentials);

    if (response.success && response.data) {
      setAuthState({
        status: 'authenticated',
        user: response.data,
      });
    } else {
      setAuthState({
        status: 'unauthenticated',
        message: response.message || 'Login failed',
      });
    }

    return response;
  }, []);

  // 3. Signup Handler
  const signup = useCallback(async (credentials: SignupCredentials) => {
    setAuthState({ status: 'loading' });

    const response = await signupService(credentials);

    if (response.success && response.data) {
      setAuthState({
        status: 'authenticated',
        user: response.data,
      });
    } else {
      setAuthState({
        status: 'unauthenticated',
        message: response.message || 'Signup failed',
      });
    }

    return response;
  }, []);

  // 4. Logout Handler
  const logout = useCallback(async () => {
    setAuthState({ status: 'loading' });

    const response = await logoutService();

    setAuthState({
      status: 'unauthenticated',
      message: 'Logged out successfully',
    });

    return response;
  }, []);

  return {
    ...authState,
    login,
    signup,
    logout,
  };
}