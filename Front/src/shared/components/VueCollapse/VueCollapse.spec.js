import { mount, createLocalVue } from '@vue/test-utils';
import VueCollapse from './VueCollapse.vue';
var localVue = createLocalVue();
describe('VueCollapse.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCollapse, {
            localVue: localVue,
            slots: {
                default: '<h1>content</h1>',
            },
        });
        expect(wrapper.find('h1').text()).toBe('content');
        wrapper.setProps({ show: false });
        expect(wrapper.props().show).toBe(false);
    });
});
//# sourceMappingURL=VueCollapse.spec.js.map