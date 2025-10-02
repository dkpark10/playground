import { useContext, type Context } from "react"

export const useSafeContext = <T>(context: Context<T>): NonNullable<T> => {
  const result = useContext(context);
  if (!result) throw new Error('context not provided');
  return result;
}