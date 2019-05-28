export var contentActions = {
    setCookieConsentVersion: function (_a, version) {
        var commit = _a.commit;
        return commit('SET_COOKIE_CONSENT_VERSION', version);
    },
};