export var Status;
(function (Status) {
    Status["completed"] = "completed";
    Status["progress"] = "progress";
    Status["notStart"] = "notStart";
})(Status || (Status = {}));
;
export var addPromise = function (a, b) { return new Promise(function (resolve) { return resolve(a + b); }); };
