import { geometric, linear, log } from './algorithms';
describe('VueSlider Algorithms', function () {
    test('geometric should return correct position', function () {
        expect(geometric.getPosition(50, 0, 100)).toBe(70.71067811865476);
    });
    test('geometric should return correct value', function () {
        expect(geometric.getValue(70.71067811865476, 0, 100)).toBe(50);
    });
    test('linear should return correct position', function () {
        expect(linear.getPosition(50, 0, 100)).toBe(50);
    });
    test('linear should return correct value', function () {
        expect(linear.getValue(50, 0, 100)).toBe(50);
    });
    test('linear should return min value', function () {
        expect(linear.getValue(-50, 0, 100)).toBe(0);
    });
    test('linear should return max value', function () {
        expect(linear.getValue(150, 0, 100)).toBe(100);
    });
    test('log should return correct position', function () {
        expect(log.getPosition(50, 0, 100)).toBe(84.94850021680094);
    });
    test('log should return correct value', function () {
        expect(log.getValue(84.94850021680094, 0, 100)).toBe(50);
    });
    test('log should return correct position', function () {
        expect(log.getPosition(50, 1, 100)).toBe(84.94850021680094);
    });
    test('log should return correct value', function () {
        expect(log.getValue(84.94850021680094, 1, 100)).toBe(50);
    });
    test('log should return min value', function () {
        expect(log.getValue(-50, 0, 100)).toBe(0);
    });
    test('log should return max value', function () {
        expect(log.getValue(150, 0, 100)).toBe(100);
    });
});
//# sourceMappingURL=algorithms.spec.js.map