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
var addPromise = function (a, b) { return new Promise(function (resolve) { return resolve(a + b); }); };
exports.addPromise = addPromise;
