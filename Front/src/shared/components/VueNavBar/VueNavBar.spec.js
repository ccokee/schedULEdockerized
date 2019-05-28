import { createLocalVue, mount } from '@vue/test-utils';
import VueNavBar from './VueNavBar.vue';
var localVue = createLocalVue();
describe('VueNavBar.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueNavBar, {
            localVue: localVue,
            stubs: ['router-link'],
        });
        expect(wrapper.findAll(".vueNavBar")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueNavBar.spec.js.map