import axios from 'axios';
import { setupResponseInterceptor } from './setupResponseInterceptor';
import { setupRequestInterceptor } from './setupRequestInterceptor';
export var HttpService = axios.create();
export var initHttpService = function (store, router) {
    /* istanbul ignore next */
    HttpService = axios.create({
        baseURL: store && store.state.app.config.api.baseUrl,
    });
    HttpService.store = store;
    HttpService.router = router;
    HttpService.isReAuthenticating = false;
    HttpService.pendingRequests = [];
    setupRequestInterceptor();
    setupResponseInterceptor();
};
export var replaceOldToken = function (request, accessToken) {
    request.headers.Authorization = "Bearer " + accessToken;
    return request;
};
//# sourceMappingURL=HttpService.js.map