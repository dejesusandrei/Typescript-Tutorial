import type { ApiResponse } from '../types/Api';
import type { User } from '../types/User';
import { getErrorMessage } from "../utils/getErrorMessage";

export async function getUser(): Promise<ApiResponse<User[]>> {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const users: User[] = await response.json();
    return {
      data: users,
      success: true,
      message: 'Users fetched successfully'
    };
  }catch(error) {
    return {
      data: [],
      success: false,
      message: getErrorMessage(error)
    };
  }
}