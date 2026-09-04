import { useCallback, useEffect, useState } from "react";
import type { CreateTaskRequest, TaskFilters, UpdateTaskRequest } from "../schema/taskSchema";
import type { Task } from "../types/Task";
import type { Pagination } from "../schema/paginationSchema";
import { taskService } from "../service/taskService";
import { getErrorMessage } from "../util/getErrorMessage";


export const useTasks = (initialPage = 1, initialLimit = 10, initialFilters?: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [filters, setFilters] = useState<TaskFilters | undefined>(initialFilters);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await taskService.getTasks(page, limit, filters);
      if (!result.success) {
        setError(result.error.message);
      } else {
        const { data: taskList, pagination: pageInfo } = result.data;
        setTasks(taskList);
        setPagination(pageInfo);
      }
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, filters]);

  useEffect(() => {
    let isMounted = true;
    queueMicrotask(() => {
      if (isMounted) {fetchTasks();}
    });
    return () => {
      isMounted = false;
    };
  }, [fetchTasks]);

  // Mutation: Create Task (With Local UI Update for Mock APIs)
  const createTask = async (data: CreateTaskRequest) => {
    setIsLoading(true);
    try {
      const result = await taskService.createTask(data);

      if (result.success) {
        const task: Task = {
          ...result.data,
          id: crypto.randomUUID(),
          completed: false,
          createdAt: new Date().toISOString(),
        };

        setTasks((prev) => [task, ...prev]);
        return { success: true, task };
      } else {
        return { success: false, error: result.error.message };
      }
    } catch (err) {
      return { success: false, error: getErrorMessage(err) };
    } finally {
      setIsLoading(false);
    }
  };

  // Mutation: Update Task
  const updateTask = async (id: string, data: UpdateTaskRequest) => {
    try {
      const result = await taskService.updateTask(id, data);

      if (result.success) {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? { ...task, ...result.data } : task))
        );
        return { success: true };
      } else {
        return { success: false, error: result.error.message };
      }
    } catch (err) {
      return { success: false, error: getErrorMessage(err) };
    }
  };

  return {
    tasks,
    pagination,
    page,
    limit,
    filters,
    isLoading,
    error,

    setPage,
    setLimit,
    setFilters,

    refetch: fetchTasks,
    createTask,
    updateTask,
  };

};