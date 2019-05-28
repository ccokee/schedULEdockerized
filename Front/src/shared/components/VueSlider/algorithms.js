/**
 * adopted from https://github.com/airbnb/rheostat
 */
export var geometric = {
    getPosition: function (value, min, max) {
        return Math.pow((max / (max - min)), 0.5) * Math.pow(((value - min) / max), 0.5) * 100;
    },
    getValue: function (percentageDiff, min, max) {
        return Math.round(Math.pow((percentageDiff / 100), 2) * (max - min)) + min;
    },
};
export var linear = {
    getPosition: function (value, min, max) {
        return ((value - min) / (max - min)) * 100;
    },
    getValue: function (percentageDiff, min, max) {
        var decimal = percentageDiff / 100;
        if (percentageDiff <= 0) {
            return min;
        }
        else if (percentageDiff >= 100) {
            return max;
        }
        return Math.round((max - min) * decimal + min);
    },
};
export var log = {
    getPosition: function (value, min, max) {
        var minv = min === 0 ? 0 : Math.log(min);
        var maxv = Math.log(max);
        var scale = (maxv - minv) / 100;
        return (Math.log(value) - minv) / scale;
    },
    getValue: function (percentageDiff, min, max) {
        var minv = min === 0 ? 0 : Math.log(min);
        var maxv = Math.log(max);
        if (percentageDiff <= 0) {
            return min;
        }
        else if (percentageDiff >= 100) {
            return max;
        }
        var scale = (maxv - minv) / 100;
        return Math.floor(Math.exp(minv + scale * percentageDiff));
    },
};
//# sourceMappingURL=algorithms.js.map