import { createLocalVue, mount } from '@vue/test-utils';
import VueGridRow from './VueGridRow.vue';
var localVue = createLocalVue();
describe('VueGridRow.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueGridRow, { localVue: localVue });
        expect(wrapper.findAll(".vueGridRow")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueGridRow.spec.js.map