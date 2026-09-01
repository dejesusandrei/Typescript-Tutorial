import type { ApiResponse } from '../types/Api';
import type { User } from '../types/User';
import { getErrorMessage } from "../utils/getErrorMessage";
import { UserSchema } from '../schema/UserSchema';

export async function getUser(): Promise<ApiResponse<User[]>> {
  try{
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data: unknown = await response.json();

    // For getting one user only, use the following line instead of the one below it
    // const result = UserSchema.safeParse(data);

    // For getting an array of users, use the following line instead of the one above it
    const result = UserSchema.array().safeParse(data);

    if(!result.success){
      throw new Error('Invalid user data');
    }

    return {
      data: result.data,
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