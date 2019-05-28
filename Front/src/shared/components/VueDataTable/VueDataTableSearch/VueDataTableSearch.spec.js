import { createLocalVue, mount } from '@vue/test-utils';
import VueDataTableSearch from './VueDataTableSearch.vue';
var localVue = createLocalVue();
describe('VueDataTableSearch.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueDataTableSearch, {
            localVue: localVue,
        });
        expect(wrapper.isVueInstance()).toBe(true);
    });
});
//# sourceMappingURL=VueDataTableSearch.spec.js.map