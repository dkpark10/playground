import { vi, beforeEach, describe, expect, test } from 'vitest';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('until', () => {
  const until = (callback, timeout = 5000, interval = 500) => {
    const startTime = Date.now();

    const checkExpression = (resolve, reject) => {
      try {
        if (callback()) {
          resolve(true);
        } else if (Date.now() - startTime > timeout) {
          reject(new Error('시간 초과'));
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

  test('resolve', async () => {
    let a = false;

    setTimeout(() => {
      a = true;
    }, 2_000);

    vi.advanceTimersByTime(2_000);

    const result = await until(() => {
      return a;
    });

    expect(result).toBeTruthy();
  });

  test('reject', async () => {
    let a = false;

    await until(() => {
      vi.advanceTimersByTime(10_000);
      return a;
    }).catch((err) => {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('시간 초과');
    });
  });
});
