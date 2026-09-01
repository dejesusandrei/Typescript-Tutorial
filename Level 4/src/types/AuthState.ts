import type { User } from "../schema/UserSchema";

export type AuthState = 
  | { status: 'loading' }
  | { status: 'authenticated', user: User }
  | { status: 'unauthenticated', message: string }