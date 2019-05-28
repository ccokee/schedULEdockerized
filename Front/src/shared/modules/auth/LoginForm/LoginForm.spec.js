import { createLocalVue, mount } from '@vue/test-utils';
import LoginForm from './LoginForm.vue';
import { i18n } from '@shared/plugins/i18n/i18n';
var localVue = createLocalVue();
describe('LoginForm.vue', function () {
    test('renders component', function () {
        var wrapper = mount(LoginForm, {
            i18n: i18n,
            localVue: localVue,
        });
        expect(wrapper.vm).toBeDefined();
    });
    test('should submit form values', function () {
        var wrapper = mount(LoginForm, {
            i18n: i18n,
            localVue: localVue,
        });
        wrapper.setData({
            username: 'foo',
            password: '123456',
        });
        wrapper.find('form').trigger('submit');
        var actual = wrapper.emitted('submit');
        var expected = [[{ password: '123456', username: 'foo' }]];
        expect(actual).toEqual(expected);
    });
});
//# sourceMappingURL=LoginForm.spec.js.map