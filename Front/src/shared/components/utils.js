export var brandVariations = ['default', 'primary', 'secondary', 'success', 'warning', 'danger'];
export var variationValidator = function (value) {
    return brandVariations.indexOf(value.toLowerCase()) !== -1;
};
//# sourceMappingURL=utils.js.map