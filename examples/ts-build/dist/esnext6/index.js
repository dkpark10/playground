import { add } from './add';
import { addPromise, Status } from './add-promise';
console.log(Status.completed);
export const calculator = {
    add,
    addPromise,
};
