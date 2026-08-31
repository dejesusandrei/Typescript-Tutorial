export interface Task {
  id: string;
  title: string;
  completed: boolean;
};

export interface UseTaskReturn {
  tasks: Task[];
  isLoading: boolean;
  addTask: (title: string) => void;
  deleteTask: (title: string) => void;
}

export type TaskStatus = "todo" | "in-progress" | "review" | "completed";

export type TaskProps = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: "low" | "medium" | "high";
}

export interface TaskCardProps{
  task: TaskProps;
  onComplete: (taskId: string) => void;
}