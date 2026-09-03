export type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
};

export type CreateTaskRequest = {
  title: string;
  description: string;
};

export type UpdateTaskRequest = {
  title?: string;
  description?: string;
  completed?: boolean;
};

export type TaskFilters = {
  search?: string;
  completed?: boolean;
};