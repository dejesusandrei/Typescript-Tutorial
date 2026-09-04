import { taskRepository } from "../repositories/taskRepository";
import type { ApiResult } from '../types/Api'
import { CreateTaskSchema, TaskFiltersSchema, UpdateTaskSchema, type CreateTaskRequest, type Task, type TaskFilters, type UpdateTaskRequest } from "../schema/taskSchema";
import { getErrorMessage } from "../util/getErrorMessage";
import type { PaginatedTaskResponse } from "../schema/paginationSchema";

export const taskService = {
  async getTasks(page: number, limit: number, filters?: TaskFilters): Promise<ApiResult<PaginatedTaskResponse>>{
    const filterValidation = TaskFiltersSchema.safeParse(filters ?? {});
    if (!filterValidation.success) {
      const firstError = filterValidation.error?.message || "Invalid filter options";
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
      const repoResponse = await taskRepository.getTasks(page, limit, filterValidation.data);

      if(repoResponse.status === "error" || !repoResponse.data){
        return{
          success: false,
          error: {
            status: 500,
            message: repoResponse.message || "Failed to fetch tasks",
            code: "FETCH_TASKS_FAILED"
          }
        }
      }
      return{
        success: true,
        data: repoResponse.data
      }
    } catch (error) {
      return{
        success: false,
        error: {
          status: 500,
          message: getErrorMessage(error),
          code: "INTERNAL_SERVER_ERROR"
        }
      }
    }
  },


  async createTask(data: unknown): Promise<ApiResult<CreateTaskRequest>> {
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