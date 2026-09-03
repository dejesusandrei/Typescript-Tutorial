import { z } from "zod";
import { TaskSchema } from '../schema/taskSchema'

export const PaginationSchema = z.object({
  page: z.number(),
  limit: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const PaginatedTaskResponseSchema = z.object({
  success: z.boolean(),
  data: TaskSchema.array(),
  pagination: PaginationSchema,
  message: z.string().optional(),
});

export type Pagination = z.infer<typeof PaginationSchema>;
export type PaginatedTaskResponse = z.infer<typeof PaginatedTaskResponseSchema>;