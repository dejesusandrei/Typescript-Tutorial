import { useState } from "react";
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
  const {
    tasks,
    isLoading,
    error,
    addTask,
    removeTask,
    editTask,
  } = useTasks();

  const [title, setTitle] = useState("");

  const handleAddTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title.trim()) return;
    await addTask({ title: title.trim() });
    setTitle("");
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await editTask(id, {completed: !completed});
  };

  const handleDelete = async (id: string) => {
    await removeTask(id);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-sm text-zinc-400">
          Loading...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-5 py-4">
          <p className="text-sm text-red-400">
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10">
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Tasks
          </h1>

          <p className="mt-1 text-sm text-zinc-500">
            Manage your tasks and track your progress.
          </p>
        </div>

        {/* Add Task */}
        <form
          onSubmit={handleAddTask}
          className="mb-6 flex gap-3"
        >
          <input
            type="text"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Enter a task..."
            className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-zinc-600"
          />

          <button
            type="submit"
            className="rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700"
            >
              <div>
                <h3
                  className={`font-medium ${
                    task.completed
                      ? "text-zinc-500 line-through"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

                <p
                  className={`mt-1 text-sm ${
                    task.completed
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }`}
                >
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </p>
              </div>

              <div className="flex items-center gap-2">

                {/* Toggle */}
                <button
                  onClick={() =>
                    handleToggle(
                      task.id,
                      task.completed
                    )
                  }
                  className="rounded-lg border border-zinc-700 px-3 py-2 text-xs text-zinc-300 transition hover:bg-zinc-800"
                >
                  {task.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                {/* Delete */}
                <button
                  onClick={() =>
                    handleDelete(task.id)
                  }
                  className="rounded-lg border border-red-900/50 px-3 py-2 text-xs text-red-400 transition hover:bg-red-950/40"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}