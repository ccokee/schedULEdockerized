import { createLocalVue, mount } from '@vue/test-utils';
import VueInput from './VueInput.vue';
var localVue = createLocalVue();
describe('VueInput.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueInput, {
            localVue: localVue,
            propsData: {
                message: 'MESSAGE!',
                name: 'name',
                id: 'id',
            },
            mocks: {
                errors: null,
            },
        });
        expect(wrapper.findAll(".vueInput")).toHaveLength(1);
        expect(wrapper.find(".message").text()).toBe('MESSAGE!');
    });
    test('renders disabled component', function () {
        var wrapper = mount(VueInput, {
            localVue: localVue,
            propsData: {
                disabled: true,
                name: 'name',
                id: 'id',
            },
        });
        expect(wrapper.findAll(".disabled")).toHaveLength(1);
    });
    test('should emit input', function () {
        var wrapper = mount(VueInput, {
            localVue: localVue,
            propsData: {
                name: 'name',
                id: 'id',
            },
        });
        wrapper.find('input').trigger('input');
        expect(wrapper.emitted('input')).toBeTruthy();
    });
    test('should display error state', function () {
        var wrapper = mount(VueInput, {
            localVue: localVue,
            mocks: {
                errors: {
                    first: function () {
                        return true;
                    },
                },
            },
            propsData: {
                errorMessage: 'ERROR!',
                name: 'name',
                id: 'id',
            },
        });
        expect(wrapper.findAll(".error")).toHaveLength(1);
        expect(wrapper.find(".message").text()).toBe('ERROR!');
    });
    test('autofocus fallback', function () {
        var wrapper = mount(VueInput, {
            localVue: localVue,
            propsData: {
                name: 'name',
                id: 'id',
                autofocus: true,
            },
        });
        expect(wrapper.vm.observer).toBeNull();
    });
    test('autofocus in modern browsers', function () {
        window.IntersectionObserver = /** @class */ (function () {
            function IntersectionObserver(cb, options) {
                this.cb = cb;
                this.options = options;
            }
            IntersectionObserver.prototype.observe = function () {
                this.cb();
            };
            return IntersectionObserver;
        }());
        var wrapper = mount(VueInput, {
            localVue: localVue,
            propsData: {
                name: 'name',
                id: 'id',
                autofocus: false,
            },
        });
        wrapper.vm.$refs.input.focus = jest.fn();
        expect(wrapper.vm.observer).not.toBeNull();
        expect(wrapper.vm.$refs.input.focus).not.toHaveBeenCalled();
        wrapper.setProps({ autofocus: true });
        wrapper.vm.observer.observe();
        expect(wrapper.vm.$refs.input.focus).toHaveBeenCalled();
        wrapper.destroy();
    });
});
//# sourceMappingURL=VueInput.spec.js.map