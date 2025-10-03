"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPromise = void 0;
const addPromise = (a, b) => new Promise((resolve) => resolve(a + b));
exports.addPromise = addPromise;
