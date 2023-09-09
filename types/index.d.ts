declare namespace NodeJS {
  interface ProcessEnv {
    /** node environment */
    BASE_URL: string;
    NEXT_PBULIC_BASE_URL: string;
  }
}

declare module "response-type" {
  export interface Response<T> {
    data: T;
    isSuccess: boolean;
    isError: boolean;
  }
}

declare module "global-type" {
  export type Todo = { title: string; isCompleted: boolean; id: `todo-${string}` };
}
