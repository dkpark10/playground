import { HeapQueue } from '../src/heap_q';

interface Person {
  height: number;
  weight: number;
  grade: number;
}

describe('heapq test', () => {
  test('test 0', () => {
    const pq = new HeapQueue<number>();
    expect(pq.size()).toBe(0);
  });

  test('test 1', () => {
    const pq = new HeapQueue<number>();
    expect(pq.isEmpty()).toBeTruthy();
  });

  test('test 2', () => {
    const pq = new HeapQueue<number>();
    pq.push(123);
    expect(pq.size()).toBe(1);
  });

  test('test 3', () => {
    const pq = new HeapQueue<number>();
    const fn = pq.top.bind(pq);
    expect(fn).toThrow();
  });

  test('test 4', () => {
    const pq = new HeapQueue<number>();
    const fn = pq.pop.bind(pq);
    expect(fn).toThrow();
  });

  test.skip('test 5 유효하지 않은 타입', () => {
    const pq = new HeapQueue<number>();
    // @ts-expect-error 타입 에러
    expect(pq.push('1')).toThrow();
  });

  test('test 6', () => {
    const pq = new HeapQueue<number>();
    pq.push(123);
    expect(pq.isEmpty()).toBeFalsy();
  });

  test('test 7', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    expect(pq.top()).toBe(1);
  });

  test('test 8', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    pq.pop();
    expect(pq.size()).toBe(0);
  });

  test('test 9', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    pq.pop();
    expect(pq.isEmpty()).toBeTruthy();
  });

  test('test 10', () => {
    const pq = new HeapQueue<number>();
    pq.push(1);
    pq.pop();
    const fn = pq.pop.bind(pq);
    expect(fn).toThrow();
  });

  test('test 11', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(1);
    pq.push(2);
    pq.pop();
    expect(pq.top()).toBe(2);
  });

  test('test 12', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(2);
    pq.push(1);
    expect(pq.top()).toBe(1);
  });

  test('test 13', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(2);
    pq.push(3);
    pq.push(1);
    pq.push(4);
    pq.push(5);
    pq.push(6);
    expect(pq.top()).toBe(1);
  });

  test('test 14', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(2);
    pq.push(3);
    pq.push(4);
    pq.push(5);
    pq.push(6);
    pq.push(1);
    expect(pq.top()).toBe(1);
  });

  test('test 15', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(6);
    pq.push(2);
    pq.push(4);
    pq.push(3);
    pq.push(1);
    pq.push(5);
    expect(pq.top()).toBe(1);
  });

  test('test 16', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(6);
    pq.push(2);
    pq.push(4);
    pq.push(3);
    pq.push(1);
    pq.push(5);
    pq.pop();
    expect(pq.top()).toBe(2);
  });

  test('test 17', () => {
    const pq = new HeapQueue<number>(true);
    pq.push(6);
    pq.push(2);
    pq.push(4);
    pq.push(-3);
    pq.push(3);
    pq.push(1);
    pq.push(5);
    expect(pq.top()).toBe(-3);
  });

  test('ascending test of numbers', () => {
    const pq = new HeapQueue<number>();

    expect(pq.size()).toEqual(0);
    expect(pq.isEmpty()).toEqual(true);

    pq.push(123);
    expect(pq.size()).toEqual(1);
    expect(pq.isEmpty()).toEqual(false);

    pq.push(2);
    pq.push(46);
    pq.push(1);
    pq.push(55);

    expect(pq.size()).toEqual(5);
    expect(pq.top()).toEqual(123);

    pq.pop();
    pq.pop();

    expect(pq.size()).toEqual(3);
    expect(pq.top()).toEqual(46);

    pq.pop();
    pq.pop();
    pq.pop();
    pq.pop();

    expect(pq.size()).toEqual(0);
    expect(pq.isEmpty()).toEqual(true);
  });

  test('descending test of numbers', () => {
    const pq = new HeapQueue<number>(true);

    expect(pq.size()).toEqual(0);
    expect(pq.isEmpty()).toEqual(true);

    pq.push(123);
    expect(pq.size()).toEqual(1);
    expect(pq.isEmpty()).toEqual(false);

    pq.push(2);
    pq.push(46);
    pq.push(1);
    pq.push(55);

    expect(pq.size()).toEqual(5);
    expect(pq.top()).toEqual(1);

    pq.pop();

    expect(pq.size()).toEqual(4);
    expect(pq.top()).toEqual(2);

    pq.pop();
    pq.pop();
    pq.pop();
    pq.pop();

    expect(pq.size()).toEqual(0);
    expect(pq.isEmpty()).toEqual(true);
  });

  test('pop return test', () => {
    const pq = new HeapQueue();
    pq.push(1);
    pq.push(2);
    pq.push(3);
    pq.push(4);
    pq.push(5);

    expect(pq.size()).toEqual(5);
    expect(pq.top()).toEqual(5);

    expect(pq.pop()).toEqual(5);
    expect(pq.top()).toEqual(4);

    expect(pq.pop()).toEqual(4);
    expect(pq.top()).toEqual(3);

    expect(pq.pop()).toEqual(3);
    expect(pq.top()).toEqual(2);

    expect(pq.pop()).toEqual(2);
    expect(pq.top()).toEqual(1);

    expect(pq.pop()).toEqual(1);
    expect(pq.isEmpty()).toBeTruthy();
    expect(pq.pop()).toEqual(null);
  });

  test('object test', () => {
    const p1 = {
      height: 3222,
      weight: 22,
      grade: 1,
    } as Person;

    const p2 = {
      height: 3222,
      weight: 22,
      grade: 9,
    } as Person;

    const p3 = {
      height: 88,
      weight: 4532,
      grade: 1,
    } as Person;

    const p4 = {
      height: 88,
      weight: 184,
      grade: 2,
    } as Person;

    const pq = new HeapQueue<Person>((prev, next) => {
      if (prev.height === next.height) {
        if (prev.weight === next.weight) {
          return prev.grade - next.grade;
        }
        return next.weight - prev.weight;
      }
      return next.height - prev.height;
    });

    pq.push(p1);
    pq.push(p2);
    pq.push(p3);
    pq.push(p4);

    expect(pq.top()).toEqual(p1);
    pq.pop();
    expect(pq.top()).toEqual(p2);
  });

  test('should throw error if the type is an object and comparator function not registered', () => {
    const pq = new HeapQueue<Person>();
    const p1: Person = {
      height: 3222,
      weight: 22,
      grade: 1,
    };

    const fn = pq.push.bind(pq);
    expect(() => fn(p1)).toThrow();
  });
});
