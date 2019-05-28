import { createLocalVue, mount } from '@vue/test-utils';
import FadeAnimation from './FadeAnimation.vue';
var localVue = createLocalVue();
describe('FadeAnimation.vue', function () {
    test('renders component', function () {
        var wrapper = mount(FadeAnimation, {
            localVue: localVue,
            slots: {
                default: '<div>foo</div>',
            },
        });
        expect(wrapper.text()).toBe('foo');
    });
});
//# sourceMappingURL=FadeAnimation.spec.js.map