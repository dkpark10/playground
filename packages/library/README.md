# heapq-ts

Library for using heap-queue with ts

#### install

```
npm i heapq-ts
```

#### import 

```
import Heap_Queue from "heapq-ts";
```



## examples

#### maxheap

```typescript
const heapq: Heap_Queue = new Heap_Queue();
heapq.push(4);
heapq.push(1);
heapq.push(2);
console.log(heapq.top()); // 4
```



#### minheap

```typescript
const heapq: Heap_Queue = new Heap_Queue(true);
heapq.push(4);
heapq.push(1);
heapq.push(2);
console.log(heapq.top()); // 1
```



#### custom comparison

```typescript
  interface Person {
    height:number;
    weight:number;
    grade:number;
  }

  const p1 = {
    height: 3222,
    weight: 22,
    grade: 1
  }

  const p2 = {
    height: 3222,
    weight: 22,
    grade: 9
  }

  const p3 = {
    height: 88,
    weight: 4532,
    grade: 1
  }

  const p4 = {
    height: 88,
    weight: 184,
    grade: 2
  }

  const heapq: Heap_Queue = new Heap_Queue<Person>((p1, p2) => {
    if (p1.height === p2.height) {
      if (p1.weight === p2.weight) {
        return p1.grade - p2.grade;
      }
      return p2.weight - p1.weight;
    }
    return p2.height - p1.height;
  });

  heapq.push(p1);
  heapq.push(p2);
  heapq.push(p3);
  heapq.push(p4);

  console.log(heapq.top());  //   { height: 3222, weight: 22, grade: 1 }
  heapq.pop();
  console.log(heapq.top());  //   { height: 3222, weight: 22, grade: 9 }
```



## method

#### push(item)

push item in the heap


#### pop()

pop the smallest item or largest item of the heap and return


### top()

get the smallest item or largest item


#### size()

get the length of heap


#### empty()

check if the length is empty or not