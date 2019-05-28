import { createLocalVue, mount } from '@vue/test-utils';
import VueDropdownMenu from './VueDropdownMenu.vue';
var localVue = createLocalVue();
describe('VueDropdownMenuMenu.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueDropdownMenu, {
            localVue: localVue,
            propsData: {
                options: [],
            },
            slots: {
                default: 'foo',
            },
        });
        expect(wrapper.text()).toBe('foo');
    });
    test('onClick', function () {
        var wrapper = mount(VueDropdownMenu, {
            localVue: localVue,
            propsData: {
                options: [{ label: 'foo', value: 'foo' }],
            },
            slots: {
                default: 'foo',
            },
        });
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.show).toBeTruthy();
        wrapper.vm.onClick({ label: 'foo', value: 'foo' });
        expect(wrapper.emitted('click')).toBeTruthy();
        expect(wrapper.vm.show).toBeFalsy();
    });
    test('onKeyPress', function () {
        var wrapper = mount(VueDropdownMenu, {
            localVue: localVue,
            propsData: {
                options: [{ label: 'foo', value: 'foo' }, { label: '', value: 'separator' }, { label: 'foo', value: 'foo' }],
            },
            slots: {
                default: 'foo',
            },
        });
        wrapper.vm.onKeyPress({ code: 'Tab', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.show).toBeFalsy();
        wrapper.vm.onKeyPress({ code: 'Space', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.show).toBeTruthy();
        expect(wrapper.vm.index).toBe(-1);
        wrapper.vm.onKeyPress({ code: 'ArrowDown', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.index).toBe(0);
        wrapper.vm.onKeyPress({ code: 'ArrowDown', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.index).toBe(2);
        wrapper.vm.onKeyPress({ code: 'ArrowUp', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.index).toBe(0);
        wrapper.vm.onKeyPress({ code: 'Space', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.show).toBeFalsy();
        wrapper.vm.onKeyPress({ code: 'Space', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.show).toBeTruthy();
        wrapper.vm.onKeyPress({ code: 'Escape', stopPropagation: jest.fn(), preventDefault: jest.fn() });
        expect(wrapper.vm.show).toBeFalsy();
    });
    test('registers and unregisters click event', function () {
        document.addEventListener = jest.fn();
        document.removeEventListener = jest.fn();
        var wrapper = mount(VueDropdownMenu, {
            localVue: localVue,
            propsData: {
                options: [{ label: 'foo', value: 'foo' }],
            },
            slots: {
                default: 'foo',
            },
        });
        wrapper.destroy();
        expect(document.addEventListener).toHaveBeenCalledTimes(2);
        expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    });
    test('should close on outside click', function () {
        var wrapper = mount(VueDropdownMenu, {
            localVue: localVue,
            propsData: {
                options: [{ label: 'foo', value: 'foo' }],
            },
            slots: {
                default: '<p>foo</p>',
            },
        });
        wrapper.vm.$emit = jest.fn();
        wrapper.find('span').trigger('click');
        expect(wrapper.vm.show).toBeTruthy();
        wrapper.vm.handleDocumentClick({ target: wrapper.find("p").element });
        expect(wrapper.vm.show).toBeTruthy();
        wrapper.vm.handleDocumentClick({ target: null });
        expect(wrapper.vm.show).toBeFalsy();
    });
    test('handleSelection', function () {
        var wrapper = mount(VueDropdownMenu, {
            localVue: localVue,
            propsData: {
                options: [{ label: 'foo', value: 'foo' }, { label: 'foo', value: 'foo' }, { label: 'foo', value: 'foo' }],
            },
            slots: {
                default: '<p>foo</p>',
            },
        });
        wrapper.vm.handleSelection(-2);
        expect(wrapper.vm.index).toBe(2);
        wrapper.vm.handleSelection(3);
        expect(wrapper.vm.index).toBe(0);
        wrapper.vm.handleSelection(1);
        expect(wrapper.vm.index).toBe(1);
    });
});
//# sourceMappingURL=VueDropdownMenu.spec.js.map