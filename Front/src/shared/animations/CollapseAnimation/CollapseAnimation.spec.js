import { mount, createLocalVue } from '@vue/test-utils';
import CollapseAnimation from './CollapseAnimation.vue';
var localVue = createLocalVue();
describe('CollapseAnimation.vue', function () {
    test('should set default before enter values', function () {
        var wrapper = mount(CollapseAnimation, {
            localVue: localVue,
            slots: {
                default: '<p>TEST</p>',
            },
        });
        var testElement = wrapper.find('p').element;
        wrapper.vm.beforeEnter(testElement);
        expect(testElement.style.height).toBe('0px');
        expect(testElement.style.opacity).toBe('0');
        expect(testElement.style.overflow).toBe('hidden');
    });
    test('should animate enter', function (done) {
        var wrapper = mount(CollapseAnimation, {
            localVue: localVue,
            slots: {
                default: '<p>TEST</p>',
            },
        });
        var testElement = wrapper.find('p').element;
        testElement.getClientRects = function () {
            return {
                length: 0,
            };
        };
        wrapper.vm.enter(testElement, function () {
            expect(testElement.style.height).toBe('0px');
            expect(testElement.style.opacity).toBe('1');
            done();
        });
    });
    test('should set default before leave values', function () {
        var wrapper = mount(CollapseAnimation, {
            localVue: localVue,
            slots: {
                default: '<p>TEST</p>',
            },
        });
        var testElement = wrapper.find('p').element;
        wrapper.vm.beforeLeave(testElement);
        expect(testElement.style.height).toBe('');
        expect(testElement.style.opacity).toBe('');
        expect(testElement.style.overflow).toBe('hidden');
    });
    test('should animate leave', function (done) {
        var wrapper = mount(CollapseAnimation, {
            localVue: localVue,
            slots: {
                default: '<p>TEST</p>',
            },
        });
        var testElement = wrapper.find('p').element;
        testElement.getClientRects = function () {
            return {
                item: function () {
                    return {
                        height: 100,
                    };
                },
            };
        };
        wrapper.vm.leave(testElement, function () {
            expect(testElement.style.height).toBe('');
            expect(testElement.style.opacity).toBe('0');
            done();
        });
    });
});
//# sourceMappingURL=CollapseAnimation.spec.js.map