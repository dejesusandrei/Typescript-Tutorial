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

const API_URL = "https://dummyjson.com/todos";

export const taskRepository = {
  async getTasks(page: number, limit: number, filters?: TaskFilters): Promise<ApiResponse<PaginatedTaskResponse | null>> {
    try {
      const skip = (page - 1) * limit;
      let url = `${API_URL}?limit=${limit}&skip=${skip}`;

      // Backend search support ng DummyJSON
      if (filters?.search) {
        url = `${API_URL}/search?q=${encodeURIComponent(filters.search)}&limit=${limit}&skip=${skip}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}: ${response.statusText}`);
      }

      const json: unknown = await response.json();
      const rawData = json as { todos?: Record<string, unknown>[]; total?: number };

      // Normalization: I-map ang 'todo' -> 'title' at buuin ang pagination object
      const normalizedData = {
        data: (rawData.todos || []).map((item) => ({
          id: String(item.id ?? ""),
          title: String(item.todo ?? ""),
          description: "",
          completed: Boolean(item.completed),
          createdAt: new Date().toISOString(),
        })),
        pagination: {
          page,
          limit,
          total: rawData.total || 0,
          totalPages: Math.ceil((rawData.total || 0) / (limit || 1)),
        },
      };

      const result = PaginatedTaskResponseSchema.safeParse(normalizedData);
      if (!result.success) {
        console.error("Invalid API structure:", result.error.issues);
        throw new Error("Invalid response structure from server");
      }

      return {
        data: result.data,
        status: "success",
        message: "Tasks fetched successfully"
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: getErrorMessage(error)
      };
    }
  },

  async createTask(data: CreateTaskRequest): Promise<ApiResponse<CreateTaskRequest | null>> {
    try {
      const response = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: data.title,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      const json: unknown = await response.json();
      const rawJson = json as Record<string, unknown>;

      const normalizedTask = {
        id: String(rawJson.id ?? ""),
        title: String(rawJson.todo || data.title),
        description: data.description || "",
        completed: Boolean(rawJson.completed),
        createdAt: new Date().toISOString(),
      };

      // Validating against TaskSchema, hindi CreateTaskSchema
      const result = TaskSchema.safeParse(normalizedTask);
      if (!result.success) {
        console.error("Invalid API structure:", result.error.issues);
        throw new Error("Invalid response structure from server");
      }

      return {
        data: result.data,
        status: "success",
        message: "Task created successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: getErrorMessage(error)
      };
    }
  },

  async updateTask(id: string, data: UpdateTaskRequest): Promise<ApiResponse<UpdateTaskRequest | null>> {    
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: data.title,
          completed: data.completed,
        })
      });

      if (!res.ok) {
        throw new Error(`Failed to update task: ${res.statusText}`);
      }

      const json: unknown = await res.json();
      const rawJson = json as Record<string, unknown>;

      const normalizedTask = {
        id: String(rawJson.id ?? id),
        title: data.title || String(rawJson.todo || "Updated Task"),
        description: data.description || "",
        completed: data.completed !== undefined ? data.completed : Boolean(rawJson.completed),
        createdAt: new Date().toISOString(),
      };

      // Validating against TaskSchema, hindi UpdateTaskSchema
      const result = TaskSchema.safeParse(normalizedTask);
      if (!result.success) {
        console.error("Invalid API structure:", result.error.issues);
        throw new Error("Invalid response structure from server");
      }

      return {
        data: result.data,
        status: "success",
        message: "Task updated successfully",
      };
    } catch (error) {
      return {
        data: null,
        status: "error",
        message: getErrorMessage(error)
      };
    }
  }
};