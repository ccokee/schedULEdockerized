import { createLocalVue, mount } from '@vue/test-utils';
import VueHeadline from './VueHeadline.vue';
var localVue = createLocalVue();
describe('VueHeadline.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueHeadline, {
            localVue: localVue,
            propsData: {
                level: '1',
            },
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.find('h1').text()).toBe('foo');
        expect(wrapper.find('.h1').text()).toBe('foo');
    });
    test('renders h1 with h6 style', function () {
        var wrapper = mount(VueHeadline, {
            localVue: localVue,
            propsData: {
                level: '1',
                appearanceLevel: '6',
            },
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.find('h1').text()).toBe('foo');
        expect(wrapper.find('.h6').text()).toBe('foo');
    });
    test('renders h1 as DIV', function () {
        var wrapper = mount(VueHeadline, {
            localVue: localVue,
            propsData: {
                level: '1',
                native: false,
            },
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.find('div').text()).toBe('foo');
        expect(wrapper.find('.h1').text()).toBe('foo');
    });
});
//# sourceMappingURL=VueHeadline.spec.js.map