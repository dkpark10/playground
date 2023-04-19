declare namespace NodeJS {
  interface Process {
    /** running on server */
  }
  interface ProcessEnv {
    /** node environment */
    BASE_URL: string;
  }
}
