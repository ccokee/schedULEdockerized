import { mount, createLocalVue } from '@vue/test-utils';
import VueTooltip from './VueTooltip.vue';
var localVue = createLocalVue();
describe('VueTooltip.vue', function () {
    test('renders component with text', function () {
        var wrapper = mount(VueTooltip, {
            localVue: localVue,
            propsData: {
                tip: 'foo',
            },
            slots: {
                default: 'test',
            },
        });
        expect(wrapper.text()).toBe('test');
        expect(wrapper.classes()).toContain('vueTooltip');
        expect(wrapper.classes()).toContain('highlight');
    });
    test('renders component with button', function () {
        var wrapper = mount(VueTooltip, {
            localVue: localVue,
            propsData: {
                tip: 'foo',
            },
            slots: {
                default: '<button>test</button>',
            },
        });
        expect(wrapper.text()).toBe('test');
        expect(wrapper.classes()).toContain('vueTooltip');
        expect(wrapper.classes()).not.toContain('highlight');
    });
    test('renders component with nothing', function () {
        var wrapper = mount(VueTooltip, {
            localVue: localVue,
            propsData: {
                tip: 'foo',
            },
            slots: {
                default: [],
            },
        });
        expect(wrapper.text()).toBe('');
        expect(wrapper.classes()).toContain('vueTooltip');
        expect(wrapper.classes()).not.toContain('highlight');
    });
    test('should show and hide tooltip', function () {
        var wrapper = mount(VueTooltip, {
            localVue: localVue,
            propsData: {
                tip: 'foo',
            },
            slots: {
                default: 'test',
            },
        });
        expect(wrapper.classes()).not.toContain('show');
        wrapper.vm.$el.dispatchEvent(new Event('mouseenter'));
        expect(wrapper.classes()).toContain('show');
        wrapper.vm.$el.dispatchEvent(new Event('mouseleave'));
        expect(wrapper.classes()).not.toContain('show');
        /**
         * touch
         */
        wrapper.vm.$el.dispatchEvent(new Event('touchend'));
        expect(wrapper.classes()).toContain('show');
        wrapper.vm.$el.dispatchEvent(new Event('touchend'));
        expect(wrapper.classes()).not.toContain('show');
    });
    test('should not show the tooltip', function () {
        var wrapper = mount(VueTooltip, {
            localVue: localVue,
            propsData: {
                tip: 'foo',
                disabled: true,
            },
            slots: {
                default: 'test',
            },
        });
        expect(wrapper.classes()).not.toContain('show');
        wrapper.vm.$el.dispatchEvent(new Event('mouseenter'));
        expect(wrapper.classes()).not.toContain('show');
        /**
         * touch
         */
        wrapper.vm.$el.dispatchEvent(new Event('touchend'));
        expect(wrapper.classes()).not.toContain('show');
    });
});
//# sourceMappingURL=VueTooltip.spec.js.map