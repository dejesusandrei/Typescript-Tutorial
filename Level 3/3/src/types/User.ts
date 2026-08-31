export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
};