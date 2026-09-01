import type  { User } from '../types/User';
import { useState, useEffect } from 'react';
import { getUser } from '../services/userService';
import { getErrorMessage } from '../utils/getErrorMessage';

export function useUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try{
        const res = await getUser();
        if (!res.success) {
          setError(res.message);
          return;
        }
        setUsers(res.data);
      }catch(error) {
        setError(getErrorMessage(error));
      }finally {
        setIsLoading(false);
      }
    }
    loadUsers();
  },[]);

  return { users, isLoading, error };
}