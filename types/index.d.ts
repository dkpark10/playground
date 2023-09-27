declare namespace NodeJS {
  interface ProcessEnv {
    /** node environment */
    BASE_URL: string;
    NEXT_PBULIC_BASE_URL: string;
  }
}

declare module "response-type" {
  export interface Response<T> {
    statusCode: number;
    data: T;
    isSuccess: boolean;
    isError: boolean;
  }
}
