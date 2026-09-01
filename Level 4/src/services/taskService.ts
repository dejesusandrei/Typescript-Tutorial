import type { Task } from "../types/Task";
import type { ApiResponse } from "../types/Api";
import { getErrorMessage } from "../utils/getErrorMessage";
import { TaskSchema } from "../schema/TaskSchema";

export async function getTasks(): Promise<ApiResponse<Task[]>> {
  try{ 
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    if(!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data: unknown = await response.json();

    const result = TaskSchema.array().safeParse(data);
    
    if(!result.success){
      throw new Error('Invalid task data');
    }

    return {
      data: result.data,
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