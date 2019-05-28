import { mount, createLocalVue } from '@vue/test-utils';
import VueGridItem from './VueGridItem.vue';
var localVue = createLocalVue();
describe('VueGridItem.vue', function () {
    test('renders gridItem with flow layout', function () {
        var wrapper = mount(VueGridItem, { localVue: localVue });
        expect(wrapper.findAll(".gridItem")).toHaveLength(1);
    });
    test('renders gridItem 100%', function () {
        var wrapper = mount(VueGridItem, {
            localVue: localVue,
            propsData: {
                fill: true,
            },
        });
        expect(wrapper.findAll(".gridItem")).toHaveLength(1);
        expect(wrapper.findAll(".fill")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueGridItem.spec.js.map