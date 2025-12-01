export enum Status {
  completed = 'completed',
  progress = 'progress',
  notStart = 'notStart',
};

export const addPromise = (a: number, b: number) => new Promise((resolve) => resolve(a + b));