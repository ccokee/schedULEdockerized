import { createLocalVue, mount } from '@vue/test-utils';
import VueBadge from './VueBadge.vue';
import { brandVariations } from '@components/utils';
var localVue = createLocalVue();
describe('VueBadge.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueBadge, {
            localVue: localVue,
            slots: {
                default: 'VueBadge',
            },
        });
        expect(wrapper.find('span').text()).toBe('VueBadge');
    });
    test('renders color variations', function () {
        brandVariations.forEach(function (variation) {
            var wrapper = mount(VueBadge, {
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
    test('renders outlined', function () {
        var wrapper = mount(VueBadge, {
            localVue: localVue,
            propsData: {
                outlined: true,
            },
        });
        expect(wrapper.findAll('.outlined')).toHaveLength(1);
    });
});
//# sourceMappingURL=VueBadge.spec.js.map