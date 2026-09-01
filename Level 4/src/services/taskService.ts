import type { Task, CreateTask, UpdateTask  } from "../types/Task";
import type { ApiResponse } from "../types/Api";
import { getErrorMessage } from "../utils/getErrorMessage";
import { TaskSchema } from "../schema/TaskSchema";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

export async function getTasks(): Promise<ApiResponse<Task[]>> {
  try{ 
    const response = await fetch(API_URL);
    if(!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data: unknown = await response.json();
    const result = TaskSchema.array().safeParse(data);
    
    if(!result.success){
      console.error("Zod Error Details:", result.error.format()); 
      throw new Error("Invalid task data");
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

export async function getTaskById(id: string): Promise<ApiResponse<Task | null>> {
  try{
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok) {
      throw new Error('Failed to fetch task');
    }
    const data: unknown = await response.json();
    const result = TaskSchema.safeParse(data);

    if(!result.success){
      throw new Error('Invalid task data');
    }

    return {
      data: result.data,
      success: true,
      message: 'Task fetched successfully'
    }
  }catch(error) {
    return {
      data: null,
      success: false,
      message: getErrorMessage(error)
    }
  }
}

export async function createTask(title: CreateTask): Promise<ApiResponse<Task | null>> {
  try{
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: false,
        ...title,
      })
    });

    if(!response.ok){
      throw new Error("Failed to create task");
    }

    const data: unknown = await response.json();
    const result = TaskSchema.safeParse(data);

    if(!result.success){
      console.error("Zod Error Details:", result.error.format()); 
      throw new Error("Invalid task data");
    }

    return {
      data: result.data,
      success: true,
      message: 'Task created successfully'
    }
  }catch(error){
    return {
      data: null,
      success: false,
      message: getErrorMessage(error)
    }
  }
}

export async function updateTask(id: string, task: UpdateTask): Promise<ApiResponse<Task | null>> {
  try{
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });

    if(!response.ok){
      throw new Error("Failed to update task");
    }

    const data: unknown = await response.json();

    // 2. I-merge ang lumang task updates para hindi mawala ang 'title' kung empty object lang ang ibinalik ng mock API
    const mergedData = {
      id,
      title: "Task", // Fallback kung sakaling mawala ang title
      completed: false,
      ...(typeof data === "object" && data !== null ? data : {}),
      ...task, // <-- ISAMA ITO: Sinisiguro nitong hindi mawawala ang mga ipinasang bagong values
    };

    const result = TaskSchema.safeParse(mergedData);

    if(!result.success){
      console.error("Zod Error Details:", result.error.format()); 
      throw new Error("Invalid task data");
    }

    return {
      data: result.data,
      success: true,
      message: 'Task updated successfully'
    }
  }catch(error){
    return {
      data: null,
      success: false,
      message: getErrorMessage(error)
    }
  }
}

export async function deleteTask(id: string): Promise<ApiResponse<Task | null>> {
  try{
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok && response.status !== 404) {
      throw new Error("Failed to delete task");
    }

    return {
      data: null,
      success: true
    }
  }catch(error){
    return {
      data: null,
      success: false,
      message: getErrorMessage(error)
    }
  }
}