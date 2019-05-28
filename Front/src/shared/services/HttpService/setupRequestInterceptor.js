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
import { HttpService } from './HttpService';
export function setupRequestInterceptor() {
    HttpService.interceptors.request.use(function (config) {
        var token = HttpService.store.state.auth.accessToken;
        return __assign({}, config, { headers: __assign({}, config.headers, { Authorization: "Bearer " + token }) });
    }, 
    /* istanbul ignore next */
    function (error) {
        return Promise.reject(error);
    });
}
//# sourceMappingURL=setupRequestInterceptor.js.map