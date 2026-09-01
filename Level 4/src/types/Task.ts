export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type CreateTask = Omit<Task, 'id' | 'completed'>;
export type UpdateTask = Partial<Omit<Task, 'id'>>;