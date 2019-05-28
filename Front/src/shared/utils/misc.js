export var createGUID = function () {
    var s4 = function () {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return "" + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
};
export var randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
export var random = function (min, max) {
    return min + Math.random() * max;
};
//# sourceMappingURL=misc.js.map