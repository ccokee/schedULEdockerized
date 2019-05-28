import { createLocalVue, mount } from '@vue/test-utils';
import VueNavigationProgress from './VueNavigationProgress.vue';
var localVue = createLocalVue();
describe('VueNavigationProgress.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueNavigationProgress, {
            localVue: localVue,
            propsData: {
                isNavigating: false,
            },
        });
        expect(wrapper.classes()).toContain('vueNavigationProgress');
    });
    test('has width when is navigating', function (done) {
        var wrapper = mount(VueNavigationProgress, {
            localVue: localVue,
            propsData: {
                isNavigating: true,
            },
        });
        var initialWidth = parseInt(wrapper.element.style.width, 10);
        expect(initialWidth).toBe(0);
        setTimeout(function () {
            var width = parseInt(wrapper.element.style.width, 10);
            expect(width).toBeGreaterThan(0);
            expect(width).toBeLessThan(100);
            done();
        }, 200);
    });
    test('has no width after navigating', function (done) {
        var wrapper = mount(VueNavigationProgress, {
            localVue: localVue,
            propsData: {
                isNavigating: true,
            },
        });
        setTimeout(function () {
            expect(parseInt(wrapper.element.style.width, 10)).toBeGreaterThan(0);
            wrapper.setProps({
                isNavigating: false,
            });
            setTimeout(function () {
                expect(parseInt(wrapper.element.style.width, 10)).toBe(0);
                done();
            }, 1100);
        }, 200);
    });
});
//# sourceMappingURL=VueNavigationProgress.spec.js.map