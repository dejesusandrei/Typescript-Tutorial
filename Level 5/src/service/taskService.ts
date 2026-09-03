import { taskRepository } from "../repositories/taskRepository";
import type { ApiResult } from '../types/Api'
import { CreateTaskSchema, UpdateTaskSchema, type CreateTaskRequest, type Task, type UpdateTaskRequest } from "../schema/taskSchema";
import { getErrorMessage } from "../util/getErrorMessage";

export const taskService = {
  async createTask(data: unknown): Promise<ApiResult<CreateTaskRequest>> {
    // 1. Client-side Zod validation
    const validation = CreateTaskSchema.safeParse(data);

    if (!validation.success) {
      const firstError = validation.error?.message || "Invalid input data";
      return {
        success: false,
        error: {
          status: 400, // Bad Request
          message: firstError,
          code: "VALIDATION_ERROR",
        },
      };
    }
    try {
      const repoResponse = await taskRepository.createTask(validation.data);
      // 3. I-map ang Repository ApiResponse papuntang ApiResult
      if (repoResponse.status === "error" || !repoResponse.data) {
        return {
          success: false,
          error: {
            status: 500,
            message: repoResponse.message || "Failed to create task",
            code: "CREATE_TASK_FAILED",
          },
        };
      }
  
      return {
        success: true,
        data: repoResponse.data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          status: 500,
          message: getErrorMessage(error),
          code: "INTERNAL_SERVER_ERROR",
        },
      };
    }

  },


  async updateTask(id: string, data: unknown): Promise<ApiResult<UpdateTaskRequest>> {
    // 1. Validate task ID
  if (!id) {
    return {
      success: false,
      error: {
        status: 400,
        message: "Task ID is required",
        code: "VALIDATION_ERROR",
      },
    };
  }
  // 2. Validate request body
  const validation = UpdateTaskSchema.safeParse(data);

  if (!validation.success) {
    return {
      success: false,
      error: {
        status: 400,
        message: validation.error.message,
        code: "VALIDATION_ERROR",
      },
    };
  }
  try {
    const repoResponse = await taskRepository.updateTask(id, validation.data);

    if(repoResponse.status === "error" || !repoResponse.data){
      return{
        success: false,
        error: {
          status: 500,
          message: repoResponse.message || "Failed to update task",
          code: "UPDATE_TASK_FAILED"
        }
      }
    }

    return{
      success: true,
      data: repoResponse.data
    }
  } catch (error) {
    return {
      success: false,
        error: {
          status: 500,
          message: getErrorMessage(error),
          code: "INTERNAL_SERVER_ERROR",
        },
    }
  }
  }
};