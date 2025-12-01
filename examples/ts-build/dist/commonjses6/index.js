"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
const add_1 = require("./add");
const add_promise_1 = require("./add-promise");
console.log(add_promise_1.Status.completed);
exports.calculator = {
    add: add_1.add,
    addPromise: add_promise_1.addPromise,
};
