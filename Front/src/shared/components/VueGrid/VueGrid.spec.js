import { mount, createLocalVue } from '@vue/test-utils';
import VueGrid from './VueGrid.vue';
var localVue = createLocalVue();
describe('VueGrid.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueGrid, { localVue: localVue });
        expect(wrapper.findAll(".grid")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueGrid.spec.js.map