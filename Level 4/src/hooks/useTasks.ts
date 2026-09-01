import { useEffect, useState } from "react";
import type { Task } from "../types/Task";
import { getTasks } from "../services/taskService";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try{
        const res = await getTasks();
        if (!res.success) {
          setError(res.message);
          return;
        }
        setTasks(res.data);
      }catch(error) {
        setError(getErrorMessage(error));
      }finally {
        setIsLoading(false);
      }
    }
    loadTasks();
  }, []);

  return { tasks, isLoading, error };
}