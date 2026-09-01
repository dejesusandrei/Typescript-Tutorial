import type  { User } from '../types/User';
import { useState, useEffect } from 'react';
import { getUser } from '../services/userService';

export function useUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await getUser();
      setUsers(res.data);
      setIsLoading(false);
    }
    loadUsers();
  },[]);

  return { users, isLoading };
}