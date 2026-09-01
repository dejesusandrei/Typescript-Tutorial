import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
  const {
    tasks,
    isLoading,
    error,
  } = useTasks();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400 text-sm">
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

        {/* Task List */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-zinc-700 hover:bg-zinc-800/80"
            >
              <div>
                <h3 className="font-medium text-white">
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

              {/* Status indicator */}
              <div
                className={`h-3 w-3 rounded-full ${
                  task.completed
                    ? "bg-emerald-400"
                    : "bg-amber-400"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}