import { z } from "zod";
import type { ApiResponse } from "../types/Api";
import type { User } from "../types/User";
import { UserSchema } from "../schema/UserSchema";
import { getErrorMessage } from "../utils/getErrorMessage";

// Input types for form validation
export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignupCredentials extends LoginCredentials {
  name: string;
}

// 1. LOGIN SERVICE
export async function login(credentials: LoginCredentials): Promise<ApiResponse<User | null>> {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Login failed (Status: ${response.status})`);
    }

    const data: unknown = await response.json();
    const result = UserSchema.safeParse(data);

    if (!result.success) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: result.data,
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
    };
  }
}

// 2. SIGNUP SERVICE
export async function signup(credentials: SignupCredentials): Promise<ApiResponse<User | null>> {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Signup failed (Status: ${response.status})`);
    }

    const data: unknown = await response.json();
    const result = UserSchema.safeParse(data);

    if (!result.success) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: result.data,
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
    };
  }
}

// 3. LOGOUT SERVICE
export async function logout(): Promise<ApiResponse<null>> {
  try {
    const response = await fetch("/api/logout", { method: "POST" });

    if (!response.ok) {
      throw new Error("Failed to log out");
    }

    return {
      data: null,
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error),
    };
  }
}

export async function getCurrentUser(): Promise<ApiResponse<User | null>> {
  try{
    const response = await fetch("/api/me");

    if(!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const data: unknown = await response.json();

    const result = UserSchema.safeParse(data);

    if(!result.success){
      throw new Error('Invalid user data');
    }

    return {
      data: result.data,
      success: true,
      message: 'Current user fetched successfully'
    };

  }catch(error) {
    return{
      data: null,
      success: false,
      message: getErrorMessage(error)
    }
  }
}