import { createLocalVue, mount } from '@vue/test-utils';
import VueSidebarGroup from './VueSidebarGroup.vue';
var localVue = createLocalVue();
describe('VueSidebarGroup.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueSidebarGroup, {
            localVue: localVue,
            propsData: {
                title: 'foo',
            },
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.text()).toBe('foo foo');
    });
});
//# sourceMappingURL=VueSidebarGroup.spec.js.map