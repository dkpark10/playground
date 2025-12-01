export var Status;
(function (Status) {
    Status["completed"] = "completed";
    Status["progress"] = "progress";
    Status["notStart"] = "notStart";
})(Status || (Status = {}));
;
export const addPromise = (a, b) => new Promise((resolve) => resolve(a + b));
