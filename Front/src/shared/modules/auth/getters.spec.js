import { AuthGetters } from './getters';
import { AuthDefaultState } from './state';
describe('AuthGetters', function () {
    var testState;
    beforeEach(function () {
        testState = AuthDefaultState();
    });
    test('isAuthenticated should return false', function () {
        var actual = AuthGetters.isAuthenticated(testState);
        var expected = false;
        expect(actual).toBe(expected);
    });
    test('isAuthenticated should return true', function () {
        testState.accessToken = 'foo';
        var actual = AuthGetters.isAuthenticated(testState);
        var expected = true;
        expect(actual).toBe(expected);
    });
});
//# sourceMappingURL=getters.spec.js.map