import { createLocalVue, mount } from '@vue/test-utils';
import VueCookieConsent from './VueCookieConsent.vue';
import { i18n } from '../../plugins/i18n/i18n';
var localVue = createLocalVue();
describe('VueCookieConsent.vue', function () {
    test('renders visible component and simulates consent click', function () {
        var setCookieConsentVersion = jest.fn();
        var wrapper = mount(VueCookieConsent, {
            localVue: localVue,
            i18n: i18n,
            slots: {
                default: 'foo',
            },
            propsData: {
                currentVersion: '1.1.0',
                cookieConsentVersion: '1.0.0',
                setCookieConsentVersion: setCookieConsentVersion,
            },
        });
        expect(wrapper.text()).toBe('foo');
        expect(wrapper.findAll('.button')).toHaveLength(1);
        expect(wrapper.vm.show).toBeTruthy();
        wrapper.find('.button').trigger('click');
        expect(setCookieConsentVersion).toHaveBeenCalledWith('1.1.0');
    });
    test('renders hidden component', function () {
        var wrapper = mount(VueCookieConsent, {
            localVue: localVue,
            i18n: i18n,
            slots: {
                default: 'foo',
            },
            propsData: {
                currentVersion: '1.0.0',
                cookieConsentVersion: '1.0.0',
                setCookieConsentVersion: jest.fn(),
            },
        });
        expect(wrapper.text()).toBe('');
        expect(wrapper.findAll('.button')).toHaveLength(0);
        expect(wrapper.vm.show).toBeFalsy();
    });
    test('test watchers', function () {
        var wrapper = mount(VueCookieConsent, {
            localVue: localVue,
            i18n: i18n,
            slots: {
                default: 'foo',
            },
            propsData: {
                currentVersion: '1.1.0',
                cookieConsentVersion: '1.0.0',
                setCookieConsentVersion: jest.fn(),
            },
        });
        expect(wrapper.text()).toBe('foo');
        expect(wrapper.findAll('.button')).toHaveLength(1);
        expect(wrapper.vm.show).toBeTruthy();
        wrapper.setProps({ cookieConsentVersion: '1.1.0' });
        expect(wrapper.vm.show).toBeFalsy();
        wrapper.setProps({ cookieConsentVersion: '1.0.0' });
        expect(wrapper.vm.show).toBeTruthy();
    });
});
//# sourceMappingURL=VueCookieConsent.spec.js.map