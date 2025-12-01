import { add } from './add';
import { addPromise, Status } from './add-promise';
console.log(Status.completed);
export var calculator = {
    add: add,
    addPromise: addPromise,
};
