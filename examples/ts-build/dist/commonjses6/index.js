"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculator = void 0;
const add_1 = require("./add");
const add_promise_1 = require("./add-promise");
exports.calculator = {
    add: add_1.add,
    addPromise: add_promise_1.addPromise,
};
