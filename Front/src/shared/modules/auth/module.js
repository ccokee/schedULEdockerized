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
import { AuthDefaultState } from './state';
import { AuthActions } from './actions';
import { AuthGetters } from './getters';
import { AuthMutations } from './mutations';
export var AuthModule = {
    namespaced: true,
    actions: __assign({}, AuthActions),
    getters: __assign({}, AuthGetters),
    state: __assign({}, AuthDefaultState()),
    mutations: __assign({}, AuthMutations),
};
//# sourceMappingURL=module.js.map