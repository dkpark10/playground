import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string(),
  isCompleted: z.boolean(),
  id: z.string(),
});

export type Todo = z.infer<typeof TodoSchema>;
