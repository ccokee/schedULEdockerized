import { mount, createLocalVue } from '@vue/test-utils';
import VueCardFooter from './VueCardFooter.vue';
var localVue = createLocalVue();
describe('VueCardFooter.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCardFooter, { localVue: localVue });
        expect(wrapper.findAll(".vueCardFooter")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueCardFooter.spec.js.map