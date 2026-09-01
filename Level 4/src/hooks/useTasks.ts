import { useEffect, useState, useCallback } from "react";
import type { Task, UpdateTask, CreateTask } from "../types/Task";
import { getTasks, deleteTask, updateTask, createTask } from "../services/taskService";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTasks = async () => {
      try{
        const res = await getTasks();
        if (!res.success || !res.data) {
          setError(res.message || "Failed to load task");
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

  const addTask = useCallback(async (title: CreateTask) => {
    const response = await createTask(title);
    if (!response.success || !response.data) {
      setError(response.message || "Failed to create task");
      return null;
    }
    const newTask = response.data;
    setTasks(prevTask => [...prevTask, newTask]);
    return newTask;
  }, []);
  
  const removeTask = useCallback(async (id: string) => {
    const response = await deleteTask(id);
    if (!response.success) {
      setError(response.message || "Failed to delete task");
      return false;
    }
    setTasks(prevTask => prevTask.filter(task => task.id !== id));
    return true;
  }, []);

  const editTask = useCallback(async (id: string, updates: UpdateTask) => {
    // 1. Hanapin ang kasalukuyang task mula sa local state
    const currentTask = tasks.find(t => t.id === id);
    
    // 2. I-merge ang lumang task data sa mga bagong updates
    const fullPayload = {
      title: currentTask?.title || "Untitled Task",
      completed: currentTask?.completed ?? false,
      ...updates
    };

    const response = await updateTask(id, fullPayload);
    if (!response.success || !response.data) {
      setError(response.message || "Failed to update task");
      return null;
    }
    const updatedTask = response.data;
    setTasks(prevTask => prevTask.map(task => (task.id === id ? updatedTask : task)));
    return updatedTask;
  }, [tasks]);

  return { tasks, isLoading, error, addTask, removeTask, editTask };
}