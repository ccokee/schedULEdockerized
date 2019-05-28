import { random, randomInt } from '../utils/misc';
var Circle = /** @class */ (function () {
    function Circle(context, radius, speed, width, xPos, yPos) {
        this.context = context;
        this.radius = radius;
        this.speed = speed;
        this.width = width;
        this.xPos = xPos;
        this.yPos = yPos;
        this.opacity = random(0.05, 0.9);
        this.counter = 0;
        this.direction = 0;
        this.direction = randomInt(0, 1) === 1 ? -1 : 1;
    }
    Circle.prototype.update = function () {
        this.counter += this.direction * this.speed;
        var opacityDirection = randomInt(0, 1) === 1 ? -1 : 1;
        this.opacity += opacityDirection * (randomInt(0, 999) / 50000);
        this.context.beginPath();
        this.context.arc(this.xPos + Math.cos(this.counter / 100) * this.radius, this.yPos + Math.sin(this.counter / 100) * this.radius, this.width, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.fillStyle = 'rgba(244, 59, 108,' + this.opacity + ')';
        this.context.fill();
        if (this.opacity <= 0) {
            this.counter = 0;
            this.opacity = random(0.05, 0.9);
            this.width = randomInt(2, 10);
            this.speed = random(0.1, 1);
        }
    };
    return Circle;
}());
var getCircles = function (circleCount, canvas, context) {
    var localCircles = [];
    for (var i = 0; i < circleCount; i++) {
        localCircles.push(new Circle(context, randomInt(50, 350), random(0.1, 1), random(2, 10), randomInt(0, canvas.width), randomInt(0, canvas.height)));
    }
    return localCircles;
};
var draw = function (canvas, context, circles) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(function (circle) {
        circle.update();
    });
    /* istanbul ignore next */
    window.requestAnimationFrame(function () {
        draw(canvas, context, circles);
    });
};
export var CircleAnimation = function (canvas) {
    var context = canvas.getContext('2d');
    var circleCount = 50;
    var circles = getCircles(circleCount, canvas, context);
    if (context) {
        draw(canvas, context, circles);
    }
    return {
        draw: draw,
        circles: circles,
    };
};
//# sourceMappingURL=CircleAnimation.js.map