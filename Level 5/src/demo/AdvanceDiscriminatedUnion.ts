type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskState =
  | { status: "loading" }
  | { status: "success"; data: Task[] }
  | { status: "error"; message: string };

  // Usable for User, task, Product
type AsyncState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };