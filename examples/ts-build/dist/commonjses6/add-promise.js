"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPromise = exports.Status = void 0;
var Status;
(function (Status) {
    Status["completed"] = "completed";
    Status["progress"] = "progress";
    Status["notStart"] = "notStart";
})(Status || (exports.Status = Status = {}));
;
const addPromise = (a, b) => new Promise((resolve) => resolve(a + b));
exports.addPromise = addPromise;
