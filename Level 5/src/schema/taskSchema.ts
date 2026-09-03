import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
});

export const CreateTaskSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(1, "Description is required"),
});

export const UpdateTaskSchema = z.object({
  title: z
    .string()
    .min(3)
    .optional(),

  description: z
    .string()
    .min(1)
    .optional(),

  completed: z
    .boolean()
    .optional(),
})// Sinisigurong may kahit ISANG field na babaguhin bago mag-submit
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided to update",
  });

export const TaskFiltersSchema = z.object({
  search: z.string().optional(),
  completed: z.boolean().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskRequest = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskRequest = z.infer<typeof UpdateTaskSchema>;
export type TaskFilters = z.infer<typeof TaskFiltersSchema>;