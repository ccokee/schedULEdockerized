import { createLocalVue, mount } from '@vue/test-utils';
import VueLoader from './VueLoader.vue';
import { brandVariations } from '@components/utils';
var localVue = createLocalVue();
describe('VueLoader.vue', function () {
    test('renders default loader', function () {
        var wrapper = mount(VueLoader, {
            localVue: localVue,
        });
        expect(wrapper.findAll(".loader")).toHaveLength(1);
    });
    test('renders medium loader', function () {
        var wrapper = mount(VueLoader, {
            localVue: localVue,
            propsData: {
                medium: true,
            },
        });
        expect(wrapper.findAll(".medium")).toHaveLength(1);
    });
    test('renders large loader', function () {
        var wrapper = mount(VueLoader, {
            localVue: localVue,
            propsData: {
                large: true,
            },
        });
        expect(wrapper.findAll(".large")).toHaveLength(1);
    });
    test('renders color variations', function () {
        brandVariations.forEach(function (variation) {
            var wrapper = mount(VueLoader, {
                localVue: localVue,
                propsData: {
                    color: variation,
                },
            });
            var actual = wrapper.findAll("." + variation);
            var expected = 1;
            expect(actual).toHaveLength(expected);
        });
    });
});
//# sourceMappingURL=VueLoader.spec.js.map