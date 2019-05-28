import { createLocalVue, mount } from '@vue/test-utils';
import VueSidebarGroupItem from './VueSidebarGroupItem.vue';
var localVue = createLocalVue();
describe('VueSidebarGroupItem.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueSidebarGroupItem, {
            localVue: localVue,
            stubs: ['router-link'],
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.text()).toBe('foo');
    });
});
//# sourceMappingURL=VueSidebarGroupItem.spec.js.map