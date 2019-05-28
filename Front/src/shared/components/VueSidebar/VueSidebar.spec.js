import { createLocalVue, mount } from '@vue/test-utils';
import VueSidebar from './VueSidebar.vue';
var localVue = createLocalVue();
describe('VueSidebar.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueSidebar, {
            localVue: localVue,
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.text()).toBe('foo');
    });
    test('should open', function () {
        var wrapper = mount(VueSidebar, {
            localVue: localVue,
            slots: {
                default: 'foo',
            },
        });
        wrapper.find('button').trigger('click');
        expect(wrapper.findAll('.open')).toHaveLength(2);
    });
    test('adds and removes scroll/click/touchstart listeners', function () {
        document.addEventListener = jest.fn();
        document.removeEventListener = jest.fn();
        var wrapper = mount(VueSidebar, {
            localVue: localVue,
            stubs: ['router-link'],
        });
        wrapper.destroy();
        expect(document.addEventListener).toHaveBeenCalledTimes(2);
        expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    });
    test('should open menu and close it on outside click', function () {
        var wrapper = mount(VueSidebar, {
            localVue: localVue,
            stubs: ['router-link'],
        });
        expect(wrapper.vm.open).toBeFalsy();
        wrapper.find(".hamburger").trigger('click');
        expect(wrapper.vm.open).toBeTruthy();
        wrapper.vm.handleDocumentClick({ target: wrapper.find(".hamburger").element });
        expect(wrapper.vm.open).toBeTruthy();
        wrapper.vm.handleDocumentClick({ target: null });
        expect(wrapper.vm.open).toBeFalsy();
    });
});
//# sourceMappingURL=VueSidebar.spec.js.map