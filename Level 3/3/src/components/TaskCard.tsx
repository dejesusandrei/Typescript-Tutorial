import type { TaskCardProps } from '../types/Task'

export default function TaskCard({ task, onComplete }: TaskCardProps) {
  return(
    <>
      <div className="border p-4 rounded-lg space-y-2 max-w-sm">
        {/* 1. Display Title */}
        <h3 className="font-bold text-lg">{task.title}</h3>

        {/* 2. Display Priority & Status */}
        <div className="text-sm text-gray-600 flex gap-4">
          <p>Priority: <span className="font-semibold">{task.priority}</span></p>
          <p>Status: <span className="font-semibold">{task.status}</span></p>
        </div>

        {/* 3. Button that calls onComplete with task.id */}
        <button
          onClick={() => onComplete(task.id)}
          className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
        >
          Complete Task
        </button>
      </div>
    </>
  );
}