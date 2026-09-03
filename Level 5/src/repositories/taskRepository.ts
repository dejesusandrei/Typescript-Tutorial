import { PaginatedTaskResponseSchema } from "../schema/paginationSchema";
import { type CreateTaskRequest, type UpdateTaskRequest, type TaskFilters, type TaskSchema, type Task, CreateTaskSchema, UpdateTaskSchema } from "../schema/taskSchema";
import type { PaginatedTaskResponse } from "../schema/paginationSchema";
import type { ApiResponse } from '../types/Api'
import { getErrorMessage } from '../util/getErrorMessage'

const API_URL = "/api";

export const taskRepository = {
  async getTasks( page: number, limit: number, filters?: TaskFilters): Promise<ApiResponse<PaginatedTaskResponse | null>> {
    try {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(limit));
  
      if (filters?.search) {
        params.set("search", filters.search);
      }
  
      if (filters?.completed !== undefined) {
        params.set("completed", String(filters.completed));
      }
  
      const response = await fetch(`${API_URL}/tasks?${params}`);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
      }

      const json: unknown = await response.json();

      const result = PaginatedTaskResponseSchema.safeParse(json);
      if (!result.success) {
        console.error("Invalid API structure:", result.error);
        throw new Error("Invalid response structure from server");
      }
  
      // 4. Return properly typed ApiResponse
      return {
        data: result.data, // Dito, sigurado tayong VALID na PaginatedTaskResponse ito
        status: "success",
        message: "Tasks fetched successfully"
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: getErrorMessage(error)
      }
    }
  },

  async createTask(data: CreateTaskRequest): Promise<ApiResponse<CreateTaskRequest | null>> {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }
  
      const json: unknown = await response.json();

      const result = CreateTaskSchema.safeParse(json);
      if (!result.success) {
        console.error("Invalid API structure:", result.error);
        throw new Error("Invalid response structure from server");
      }

      return {
        data: result.data, // Puno na ito ng complete Task object (may id, createdAt, etc.)
        status: "success",
        message: "Task created successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: getErrorMessage(error)
      }
    }
  },

  async updateTask(id: string, data: UpdateTaskRequest): Promise<ApiResponse<UpdateTaskRequest | null>> {    
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      if (!res.ok) {
        throw new Error(`Failed to update task: ${res.statusText}`);
      }

      const json: unknown = await res.json();

      const result = UpdateTaskSchema.safeParse(json);
      if (!result.success) {
        console.error("Invalid API structure:", result.error);
        throw new Error("Invalid response structure from server");
      }
      return {
        data: result.data, // Puno na ito ng complete Task object (may id, createdAt, etc.)
        status: "success",
        message: "Task updated successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: getErrorMessage(error)
      }
    }
  }
};