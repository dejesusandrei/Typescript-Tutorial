import type { User } from "../schema/UserSchema";

export type AuthState<T> = 
  | { status: 'loading' }
  | { status: 'authenticated', user: T }
  | { status: 'unauthenticated', message: string }