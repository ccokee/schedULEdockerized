import { mount, createLocalVue } from '@vue/test-utils';
import VueFooter from './VueFooter.vue';
var localVue = createLocalVue();
describe('VueFooter.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueFooter, { localVue: localVue });
        expect(wrapper.find('small').text()).toMatch('Copyright');
    });
});
//# sourceMappingURL=VueFooter.spec.js.map