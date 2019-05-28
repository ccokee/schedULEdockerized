var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import MockAdapter from 'axios-mock-adapter';
import { HttpService, initHttpService } from './HttpService';
describe('ResponseInterceptor', function () {
    var mockAxios;
    beforeEach(function () {
        initHttpService({
            state: {
                app: { config: { api: { baseUrl: '' } } },
                auth: {
                    accessToken: 'foo',
                    refreshToken: 'bar',
                },
            },
            commit: jest.fn(),
            dispatch: jest.fn(function () { return Promise.resolve(); }),
        }, {
            push: jest.fn(),
        });
        mockAxios = new MockAdapter(HttpService);
    });
    test('dispatch auth/refreshToken when response status is 401', function () { return __awaiter(_this, void 0, void 0, function () {
        var actual, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAxios.onGet('/me').replyOnce(401);
                    mockAxios.onGet('/me').replyOnce(200, { username: 'foo' });
                    return [4 /*yield*/, HttpService.get('/me')];
                case 1:
                    _a.sent();
                    actual = HttpService.store.dispatch;
                    expected = 'auth/refreshToken';
                    expect(actual).toBeCalledWith(expected);
                    return [2 /*return*/];
            }
        });
    }); });
    test('not dispatch auth/refreshToken when it is already refreshing', function () { return __awaiter(_this, void 0, void 0, function () {
        var actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAxios.onGet('/me').replyOnce(401);
                    mockAxios.onGet('/protected-route').replyOnce(401);
                    mockAxios.onGet('/me').replyOnce(200, { username: 'foo' });
                    mockAxios.onGet('/protected-route').replyOnce(200, { username: 'foo' });
                    return [4 /*yield*/, Promise.all([HttpService.get('/me'), HttpService.get('/protected-route')])];
                case 1:
                    _a.sent();
                    actual = HttpService.store.dispatch;
                    expect(actual).toBeCalledTimes(1);
                    return [2 /*return*/];
            }
        });
    }); });
    test('reject all pending requests when refresh-token failed', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1, actual;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    HttpService.store.state.auth.accessToken = null;
                    mockAxios.onGet('/me').replyOnce(401);
                    mockAxios.onGet('/protected-route').replyOnce(401);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([HttpService.get('/me'), HttpService.get('/protected-route')])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    actual = HttpService.store.dispatch;
                    expect(actual).toBeCalledTimes(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test('reject promise if server returns an error not related to auhentication', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_2, actual, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockAxios.onGet('/me').replyOnce(500);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, HttpService.get('/me')];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    actual = e_2.response.status;
                    expected = 500;
                    expect(actual).toEqual(expected);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    test('redirect to sign-in page when auth/refreshToken fails', function () { return __awaiter(_this, void 0, void 0, function () {
        var e_3, actual, expected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    HttpService.store.dispatch = jest.fn(function () { return Promise.reject({}); });
                    mockAxios.onGet('/me').replyOnce(401);
                    mockAxios.onGet('/protected-route').replyOnce(401);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, Promise.all([HttpService.get('/me'), HttpService.get('/protected-route')])];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_3 = _a.sent();
                    actual = HttpService.router.push;
                    expected = '/';
                    expect(actual).toBeCalledWith(expected);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=setupResponseInterceptor.spec.js.map