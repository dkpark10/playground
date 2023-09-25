export const debounce = <T extends (...args: any) => any>(callback: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  return (args: unknown) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, delay);
  };
};
