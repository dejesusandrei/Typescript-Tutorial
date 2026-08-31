import { useState, useEffect } from 'react';
import type { UseTaskReturn } from '../types/Task'
import type { Task } from '../types/Task'

export function useTask(): UseTaskReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const initialTasks: Task[] = [
        { id: '1', title: 'Learn TypeScript', completed: false },
        { id: '2', title: 'Build a Custom Hook', completed: true },
      ];

      setTasks(initialTasks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false
    };
    setTasks((prev) => [...prev, newTask] );
  }

  const deleteTask = (id: string) => setTasks((prevTask) => prevTask.filter((task) => task.id !== id));

  return {
    tasks,
    isLoading,
    addTask,
    deleteTask
  };
}