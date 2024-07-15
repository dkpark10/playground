import Temp from './class';

import PriorityQueue from 'heapq-ts';

const pq = new PriorityQueue<number>();

pq.push(1);
pq.push(2);
pq.push(3);
pq.push('2');

console.log(pq.top());

const temp = new Temp();
console.log(temp.getValue());
// error
temp.add('123');