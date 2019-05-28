import { CircleAnimation } from './CircleAnimation';
describe('CircleAnimation', function () {
    test('should animate', function () {
        var context = {
            clearRect: jest.fn(),
            beginPath: jest.fn(),
            arc: jest.fn(),
            fill: jest.fn(),
            closePath: jest.fn(),
        };
        var canvas = {
            width: 300,
            height: 300,
            getContext: function () {
                return context;
            },
        };
        var animation = CircleAnimation(canvas);
        expect(context.clearRect).toHaveBeenCalledTimes(1);
        expect(context.beginPath).toHaveBeenCalledTimes(50);
        expect(context.arc).toHaveBeenCalledTimes(50);
        expect(context.fill).toHaveBeenCalledTimes(50);
        expect(context.closePath).toHaveBeenCalledTimes(50);
        animation.circles[0].opacity = -1000;
        animation.draw(canvas, context, animation.circles);
        expect(context.clearRect).toHaveBeenCalledTimes(2);
        expect(context.beginPath).toHaveBeenCalledTimes(100);
        expect(context.arc).toHaveBeenCalledTimes(100);
        expect(context.fill).toHaveBeenCalledTimes(100);
        expect(context.closePath).toHaveBeenCalledTimes(100);
    });
    test('should not animate', function () {
        var canvas = {
            width: 300,
            height: 300,
            getContext: jest.fn().mockReturnValue(null),
        };
        CircleAnimation(canvas);
        expect(canvas.getContext).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=CircleAnimation.spec.js.map