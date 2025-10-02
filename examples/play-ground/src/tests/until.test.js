import { expect, test } from 'vitest';

test('until', async () => {
  let a = false;

  const until = (callback, timeout = 5000, interval = 500) => {
    const startTime = Date.now();

    const checkExpression = (resolve, reject) => {
      try {
        if (callback()) {
          resolve(true);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('until: timeout exceeded'));
        } else {
          setTimeout(() => {
            checkExpression(resolve, reject);
          }, interval);
        }
      } catch (e) {
        reject(e);
      }
    };

    return new Promise(checkExpression);
  };

  setTimeout(() => {
    a = true;
  }, 1_000);

  const result = await until(() => {
    return a;
  });

  expect(result).toBeTruthy();
});
