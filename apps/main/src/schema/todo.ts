import { z } from "zod";

export const TodoItemSchema = z.object({
  title: z.string().nonempty(),
  isCompleted: z.boolean(),
  id: z.string().nonempty(),
});

export const TodoSchema = z.array(TodoItemSchema);

export type Todo = z.infer<typeof TodoItemSchema>;
