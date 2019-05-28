/**
 * based on Springboot security
 */
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
import { HttpService } from '@shared/services/HttpService/HttpService';
var getFormData = function (username, password) {
    return "grant_type=password&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
};
export var AuthActions = {
    createToken: function (_a, _b) {
        var commit = _a.commit;
        var username = _b.username, password = _b.password;
        return __awaiter(this, void 0, void 0, function () {
            var _c, access_token, refresh_token, e_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, HttpService.post('/token', getFormData(username, password), {
                                headers: {
                                    Authorization: 'Basic Zm9vYmFy',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                            })];
                    case 1:
                        _c = (_d.sent()).data, access_token = _c.access_token, refresh_token = _c.refresh_token;
                        commit('SET_ACCESS_TOKEN', access_token);
                        commit('SET_REFRESH_TOKEN', refresh_token);
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _d.sent();
                        commit('SET_ACCESS_TOKEN', null);
                        commit('SET_REFRESH_TOKEN', null);
                        throw new Error(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    refreshToken: function (_a) {
        var commit = _a.commit, refreshToken = _a.state.refreshToken;
        return __awaiter(this, void 0, void 0, function () {
            var _b, access_token, refresh_token, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, HttpService.post('/token', "grant_type=refresh_token&refresh_token=" + refreshToken, {
                                headers: {
                                    Authorization: 'Basic Zm9vYmFy',
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                            })];
                    case 1:
                        _b = (_c.sent()).data, access_token = _b.access_token, refresh_token = _b.refresh_token;
                        commit('SET_ACCESS_TOKEN', access_token);
                        commit('SET_REFRESH_TOKEN', refresh_token);
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _c.sent();
                        commit('SET_ACCESS_TOKEN', null);
                        commit('SET_REFRESH_TOKEN', null);
                        throw new Error(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    revokeToken: function (_a) {
        var commit = _a.commit;
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, HttpService.delete('/token')];
                    case 1:
                        _b.sent();
                        commit('SET_ACCESS_TOKEN', null);
                        commit('SET_REFRESH_TOKEN', null);
                        return [3 /*break*/, 3];
                    case 2:
                        e_3 = _b.sent();
                        commit('SET_ACCESS_TOKEN', null);
                        commit('SET_REFRESH_TOKEN', null);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
};
//# sourceMappingURL=actions.js.map