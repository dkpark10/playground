"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPromise = void 0;
var addPromise = function (a, b) { return new Promise(function (resolve) { return resolve(a + b); }); };
exports.addPromise = addPromise;
