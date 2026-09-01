// src/schema/TaskSchema.ts
import { z } from "zod";

export const TaskSchema = z.object({
  // 1. Gagawaing String ang ID kahit number pa ang ibalik ng API (e.g., 1 -> "1")
  id: z.coerce.string(), 
  title: z.string().min(1, "Title is required"),
  // 2. Kung walang nahanap na 'completed' field, lalagyan nito ng default na false
  completed: z.boolean().default(false),
});

export const CreateTaskSchema = TaskSchema.omit({ id: true });
export const UpdateTaskSchema = CreateTaskSchema.partial();

// Types
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;