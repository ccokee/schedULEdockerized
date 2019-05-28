import { createLocalVue, mount } from '@vue/test-utils';
import VueImage from './VueImage.vue';
var localVue = createLocalVue();
describe('VueImage.vue', function () {
    test('renders native image', function () {
        var wrapper = mount(VueImage, {
            localVue: localVue,
            propsData: {
                src: 'foo',
            },
        });
        var actual = wrapper.html();
        var expected = '<img src="foo">';
        expect(actual).toBe(expected);
    });
    test('renders image as div', function () {
        var wrapper = mount(VueImage, {
            localVue: localVue,
            propsData: {
                src: 'foo',
                native: false,
            },
        });
        var actual = wrapper.html();
        var expected = '<div style="background-image: url(foo);"></div>';
        expect(actual).toBe(expected);
    });
    test('renders image via observer', function () {
        var disconnected = false;
        window.IntersectionObserver = /** @class */ (function () {
            function IntersectionObserver(cb, options) {
                this.cb = cb;
                this.options = options;
            }
            IntersectionObserver.prototype.observe = function () {
                this.cb([{ intersectionRatio: 0 }, { intersectionRatio: 1 }]);
            };
            IntersectionObserver.prototype.disconnect = function () {
                disconnected = true;
            };
            return IntersectionObserver;
        }());
        var wrapper = mount(VueImage, {
            localVue: localVue,
            propsData: {
                src: 'foo',
            },
        });
        var actual = wrapper.html();
        var expected = '<img src="foo">';
        wrapper.vm.observer.observe();
        expect(actual).toBe(expected);
        actual = disconnected;
        expected = true;
        expect(actual).toBe(expected);
    });
});
//# sourceMappingURL=VueImage.spec.js.map