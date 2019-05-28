import { createGUID } from './misc';
describe('misc.ts', function () {
    test('createGUID', function () {
        expect(createGUID()).toHaveLength(32);
    });
});
//# sourceMappingURL=misc.spec.js.map