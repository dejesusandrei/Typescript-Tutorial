import type { Task } from "../types/Task";
import type { ApiResponse } from "../types/Api";
import { getErrorMessage } from "../utils/getErrorMessage";

export async function getTasks(): Promise<ApiResponse<Task[]>> {
  try{ 
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if(!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const tasks: Task[] = await response.json();
    return {
      data: tasks,
      success: true,
      message: 'Tasks fetched successfully'
    }
  }catch(error) {
    return{
      data: [],
      success: false,
      message: getErrorMessage(error)
    }
  }
}