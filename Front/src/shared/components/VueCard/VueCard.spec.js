import { mount, createLocalVue } from '@vue/test-utils';
import VueCard from './VueCard.vue';
var localVue = createLocalVue();
describe('VueCard.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCard, { localVue: localVue });
        expect(wrapper.findAll(".vueCard")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueCard.spec.js.map