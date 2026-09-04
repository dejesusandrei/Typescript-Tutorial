// taskRepository.ts
import { PaginatedTaskResponseSchema } from "../schema/paginationSchema";
import { 
  type CreateTaskRequest, 
  type UpdateTaskRequest, 
  type TaskFilters, 
  type Task, 
  TaskSchema 
} from "../schema/taskSchema";
import type { PaginatedTaskResponse } from "../schema/paginationSchema";
import type { ApiResponse } from '../types/Api';
import { getErrorMessage } from '../util/getErrorMessage';

// Gamitin ang environment variable para sa iyong totoong backend URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

export const taskRepository = {
  // 1. GET ALL / SEARCH / PAGINATE
  async getTasks(page: number, limit: number, filters?: TaskFilters): Promise<ApiResponse<PaginatedTaskResponse | null>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(filters?.search && { search: filters.search }),
        ...(filters?.completed !== undefined && { completed: String(filters.completed) }),
      });

      const response = await fetch(`${API_URL}?${params.toString()}`);
      if (!response.ok) throw new Error(`Server Error: ${response.statusText}`);

      const json = await response.json();

      // Direktang ipinapasa sa Zod validation dahil pareho na ang response format ng API at Schema
      const result = PaginatedTaskResponseSchema.safeParse(json);
      if (!result.success) throw new Error("Invalid response structure from server");

      return { data: result.data, status: "success", message: "Tasks fetched" };
    } catch (error) {
      return { data: null, status: "error", message: getErrorMessage(error) };
    }
  },

  // 2. CREATE TASK
  async createTask(data: CreateTaskRequest): Promise<ApiResponse<Task | null>> {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Failed to create task: ${response.statusText}`);

      const json = await response.json();
      const result = TaskSchema.safeParse(json);
      if (!result.success) throw new Error("Invalid task data received from server");

      return { data: result.data, status: "success", message: "Task created" };
    } catch (error) {
      return { data: null, status: "error", message: getErrorMessage(error) };
    }
  },

  // 3. UPDATE TASK
  async updateTask(id: string, data: UpdateTaskRequest): Promise<ApiResponse<Task | null>> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`Failed to update task: ${response.statusText}`);

      const json = await response.json();
      const result = TaskSchema.safeParse(json);
      if (!result.success) throw new Error("Invalid task data received from server");

      return { data: result.data, status: "success", message: "Task updated" };
    } catch (error) {
      return { data: null, status: "error", message: getErrorMessage(error) };
    }
  },
};