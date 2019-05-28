import { AuthMutations } from './mutations';
import { AuthDefaultState } from './state';
describe('AuthMutations', function () {
    var testState;
    beforeEach(function () {
        testState = AuthDefaultState();
    });
    test('it should set the access token', function () {
        AuthMutations.SET_ACCESS_TOKEN(testState, 'foo');
        var actual = testState.accessToken;
        var expected = 'foo';
        expect(actual).toBe(expected);
    });
    test('it should set the refresh token', function () {
        AuthMutations.SET_REFRESH_TOKEN(testState, 'foo');
        var actual = testState.refreshToken;
        var expected = 'foo';
        expect(actual).toBe(expected);
    });
});
//# sourceMappingURL=mutations.spec.js.map