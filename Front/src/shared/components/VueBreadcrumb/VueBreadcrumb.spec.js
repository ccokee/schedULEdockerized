import { createLocalVue, mount } from '@vue/test-utils';
import VueBreadcrumb from './VueBreadcrumb.vue';
var localVue = createLocalVue();
describe('VueBreadcrumb.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueBreadcrumb, {
            localVue: localVue,
            propsData: {
                items: [{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }],
            },
            stubs: ['router-link'],
        });
        expect(wrapper.findAll('ul')).toHaveLength(1);
        expect(wrapper.findAll('li')).toHaveLength(2);
        expect(wrapper.findAll('router-link-stub')).toHaveLength(1);
    });
});
//# sourceMappingURL=VueBreadcrumb.spec.js.map