type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type TaskState =
  | { status: "loading" }
  | { status: "success"; data: Task[] }
  | { status: "error"; message: string };