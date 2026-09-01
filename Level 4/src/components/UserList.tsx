import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';
import type { User } from '../types/User';

export default function UserList() {
  const { users, isLoading } = useUser();
  console.log(users);

  if(isLoading) return <p>Loading...</p>;

  return(
    <div>
      <h1>User List</h1>
        <ul>
          {users.map((user) => (
            <li className="flex gap-x-2 items-center p-2 text-sm" key={user.id}>Name: {user.name} | Email: {user.email}</li>
          ))}
        </ul>
    </div>
  );
}