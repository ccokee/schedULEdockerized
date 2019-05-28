var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createLocalVue, mount } from '@vue/test-utils';
import VueDatePicker from './VueDatePicker.vue';
import { i18n } from '../../plugins/i18n/i18n';
var localVue = createLocalVue();
describe('VueDatePicker.vue', function () {
    var defaultProps = {
        name: 'test',
        id: 'test',
    };
    test('renders component', function () {
        var wrapper = mount(VueDatePicker, {
            localVue: localVue,
            i18n: i18n,
            propsData: defaultProps,
        });
        expect(wrapper.findAll(".vueDatePicker")).toHaveLength(1);
        expect(wrapper.findAll('input')).toHaveLength(1);
        expect(wrapper.vm.inputValue).toBe('');
    });
    test('renders component with selected date', function () {
        var wrapper = mount(VueDatePicker, {
            localVue: localVue,
            i18n: i18n,
            propsData: defaultProps,
        });
        expect(wrapper.vm.inputValue).toBe('');
        wrapper.vm.$data.selectedDate = new Date();
        expect(wrapper.vm.inputValue).not.toBe('');
    });
    test('renders component with current date', function () {
        var wrapper = mount(VueDatePicker, {
            localVue: localVue,
            i18n: i18n,
            propsData: __assign({ currentDate: new Date() }, defaultProps),
        });
        expect(wrapper.vm.inputValue).not.toBe('');
    });
    test('should emit change', function () {
        var wrapper = mount(VueDatePicker, {
            localVue: localVue,
            i18n: i18n,
            propsData: defaultProps,
        });
        wrapper.vm.onChange();
        expect(wrapper.emitted('change')).toBeTruthy();
    });
    test('should open calendar on focus', function () {
        var wrapper = mount(VueDatePicker, {
            localVue: localVue,
            i18n: i18n,
            propsData: defaultProps,
        });
        expect(wrapper.vm.show).toBeFalsy();
        wrapper.find('input').trigger('focus');
        expect(wrapper.vm.show).toBeTruthy();
    });
    test('should blur on focus', function () {
        var wrapper = mount(VueDatePicker, {
            localVue: localVue,
            i18n: i18n,
            propsData: defaultProps,
        });
        var event = {
            currentTarget: {
                blur: jest.fn(),
            },
        };
        wrapper.vm.onFocus(event);
        expect(event.currentTarget.blur).toHaveBeenCalled();
    });
});
//# sourceMappingURL=VueDatePicker.spec.js.map