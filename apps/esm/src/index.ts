import PriorityQueue from 'heapq-ts/es';

const pq = new PriorityQueue<number>();
pq.push(1);
pq.push(2);
pq.push(3);

console.log(pq.top());
