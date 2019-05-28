import { createLocalVue, mount } from '@vue/test-utils';
import VueButton from './VueButton.vue';
import { brandVariations } from '@components/utils';
var localVue = createLocalVue();
describe('VueButton.vue', function () {
    describe('Button', function () {
        test('renders component', function () {
            var wrapper = mount(VueButton, { localVue: localVue });
            expect(wrapper.findAll(".button")).toHaveLength(1);
            expect(wrapper.findAll(".active")).toHaveLength(0);
        });
        test('should emit onClick event', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
            });
            wrapper.find('button').trigger('click');
            expect(wrapper.emitted().click).toBeTruthy();
        });
        test('should disable button and not emit onClick event', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    disabled: true,
                },
            });
            expect(wrapper.findAll(".disabled")).toHaveLength(1);
            wrapper.find('button').trigger('click');
            expect(wrapper.emitted().click).toBeFalsy();
        });
        test('should show loader and not emit onClick event', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    loading: true,
                },
            });
            wrapper.find('button').trigger('click');
            expect(wrapper.emitted().click).toBeFalsy();
        });
        test('should render color variations', function () {
            brandVariations.forEach(function (variation) {
                var wrapper = mount(VueButton, {
                    localVue: localVue,
                    propsData: {
                        color: variation,
                    },
                });
                var actual = wrapper.findAll("." + variation);
                var expected = 1;
                expect(actual).toHaveLength(expected);
            });
        });
        test('should render outlined color', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    outlined: true,
                },
            });
            expect(wrapper.findAll(".outlined")).toHaveLength(1);
        });
        test('should render ghost color', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    ghost: true,
                },
            });
            expect(wrapper.findAll(".ghost")).toHaveLength(1);
        });
        test('should apply fixed width when loading', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
            });
            wrapper.vm.$refs.button.getBoundingClientRect = function () {
                return {
                    width: 134,
                };
            };
            expect(wrapper.vm.actualWidth).toBeNull();
            wrapper.setProps({ loading: true });
            expect(wrapper.vm.actualWidth).toBe('134px');
        });
    });
    describe('Link', function () {
        test('renders router-link', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    as: 'router-link',
                    to: '/foo',
                },
                stubs: ['router-link'],
            });
            var actual = wrapper.html();
            var expected = '<router-link-stub event="click" tabindex="0" class="button ripple default" to="/foo"> <!----></router-link-stub>';
            expect(actual).toBe(expected);
        });
        test('renders disabled router-link', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    as: 'router-link',
                    to: '/foo',
                    disabled: true,
                },
                stubs: ['router-link'],
            });
            var actual = wrapper.html();
            var expected = '<router-link-stub disabled="true" tabindex="-1" aria-hidden="true" class="button ripple default disabled" to="/foo"> <!----></router-link-stub>';
            expect(actual).toBe(expected);
        });
        test('renders a', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    as: 'a',
                    href: '/foo',
                },
            });
            var actual = wrapper.html();
            var expected = '<a tabindex="0" class="button ripple default" href="/foo"> <!----></a>';
            expect(actual).toBe(expected);
        });
        test('should prevent and stop click event if disabled', function () {
            var wrapper = mount(VueButton, {
                localVue: localVue,
                propsData: {
                    as: 'a',
                    href: '/foo',
                    disabled: true,
                },
            });
            var e = {
                preventDefault: jest.fn(),
                stopPropagation: jest.fn(),
            };
            wrapper.vm.click(e);
            expect(e.preventDefault).toHaveBeenCalled();
            expect(e.stopPropagation).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=VueButton.spec.js.map