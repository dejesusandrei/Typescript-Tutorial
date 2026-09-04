import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  Circle, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  AlertCircle,
  Filter,
  Pencil,
  X,
  Check
} from "lucide-react";

export default function TaskList() {
  const {
    tasks,
    pagination,
    page,
    isLoading,
    error,
    setPage,
    setFilters,
    createTask,
    updateTask,
  } = useTasks(1, 5);

  // Form Local State
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Inline Editing Local State
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // Search/Filter State
  const [searchTerm, setSearchTerm] = useState("");

  // Handle New Task Submission
  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setFormError("Title is required");
      return;
    }

    setFormError(null);
    setIsSubmitting(true);

    const res = await createTask({
      title: newTitle,
      description: newDescription,
    });

    setIsSubmitting(false);

    if (res.success) {
      setNewTitle("");
      setNewDescription("");
    } else {
      setFormError(res.error || "Failed to create task");
    }
  };

  // Start Inline Editing Mode
  const handleStartEdit = (task: { id: string; title: string; description?: string }) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Submit Inline Update
  const handleSaveEdit = async (id: string) => {
    if (!editTitle.trim()) return;

    setIsUpdating(true);
    const res = await updateTask(id, {
      title: editTitle,
      description: editDescription,
    });

    setIsUpdating(false);

    if (res.success) {
      handleCancelEdit();
    }
  };

  // Handle Search Input Change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    setFilters((prev) => ({ ...prev, search: val || undefined }));
  };

  // Handle Status Filter Change
  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const completed = val === "completed" ? true : val === "pending" ? false : undefined;
    setFilters((prev) => ({ ...prev, completed }));
  };

  // Handle Task Toggle Complete
  const handleToggleTask = async (id: string, currentCompleted: boolean) => {
    await updateTask(id, { completed: !currentCompleted });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task Manager</h1>
            <p className="text-sm text-slate-500">Manage, filter, and complete your day-to-day tasks efficiently.</p>
          </div>
          {pagination && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Total Tasks: {pagination.total}
            </div>
          )}
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Create Task Card */}
        <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm transition-all hover:shadow-md">
          <h2 className="text-base font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-indigo-600" />
            Add New Task
          </h2>

          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <textarea
                placeholder="Add description (optional)..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-sm transition-all placeholder:text-slate-400 resize-none"
              />
            </div>

            {formError && (
              <p className="text-xs text-red-500 font-medium">{formError}</p>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm transition-all shadow-sm shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Create Task"
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Status Select Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              onChange={handleStatusFilterChange}
              className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Task List */}
        <section className="space-y-3">
          {isLoading && tasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-600" />
              <p className="text-sm font-medium">Fetching tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <p className="text-sm font-medium">No tasks found. Create one above to get started!</p>
            </div>
          ) : (
            tasks.map((task) => {
              const isEditing = editingTaskId === task.id;

              return (
                <div
                  key={task.id}
                  className={`group bg-white rounded-2xl p-4 border transition-all flex items-start justify-between gap-4 ${
                    task.completed 
                      ? "border-slate-100 bg-slate-50/50 opacity-75" 
                      : "border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <button
                      onClick={() => handleToggleTask(task.id, task.completed)}
                      className="mt-0.5 text-slate-300 hover:text-indigo-600 transition-colors focus:outline-none shrink-0"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    {isEditing ? (
                      <div className="space-y-2 flex-1 pr-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-indigo-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <input
                          type="text"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          placeholder="Description..."
                          className="w-full px-3 py-1 rounded-lg border border-slate-200 text-xs text-slate-600 focus:outline-none"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1 min-w-0 flex-1">
                        <h3
                          className={`text-sm font-semibold truncate ${
                            task.completed ? "line-through text-slate-400" : "text-slate-800"
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-xs text-slate-500 line-clamp-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSaveEdit(task.id)}
                          disabled={isUpdating}
                          className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                        >
                          {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleStartEdit(task)}
                          className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <span
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide uppercase ${
                            task.completed
                              ? "bg-emerald-50 text-emerald-600 border border-emerald-200/50"
                              : "bg-amber-50 text-amber-600 border border-amber-200/50"
                          }`}
                        >
                          {task.completed ? "Done" : "Pending"}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* Pagination Footer */}
        {pagination && pagination.totalPages > 1 && (
          <footer className="flex items-center justify-between bg-white px-4 py-3 rounded-2xl border border-slate-200 shadow-sm text-sm">
            <p className="text-slate-500 text-xs">
              Page <span className="font-semibold text-slate-800">{page}</span> of{" "}
              <span className="font-semibold text-slate-800">{pagination.totalPages}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((prev) => prev - 1)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                disabled={page >= pagination.totalPages || isLoading}
                onClick={() => setPage((prev) => prev + 1)}
                className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </footer>
        )}

      </div>
    </div>
  );
}