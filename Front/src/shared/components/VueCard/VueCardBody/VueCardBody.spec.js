import { mount, createLocalVue } from '@vue/test-utils';
import VueCardBody from './VueCardBody.vue';
var localVue = createLocalVue();
describe('VueCardBody.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCardBody, { localVue: localVue });
        expect(wrapper.findAll(".vueCardBody")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueCardBody.spec.js.map