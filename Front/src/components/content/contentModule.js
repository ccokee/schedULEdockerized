var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { contentDefaultState } from './contentActions.js';
import { contentActions } from './contentActions';
import { contentGetters } from './contentGetters';
import { contentMutations } from './contentMutations';
export var contentModule = {
    namespaced: true,
    actions: __assign({}, contentActions),
    getters: __assign({}, contentGetters),
    state: __assign({}, contentDefaultState()),
    mutations: __assign({}, contentMutations),
};