import { createLocalVue, mount } from '@vue/test-utils';
import VueCalendar from './VueCalendar.vue';
import { i18n } from '../../plugins/i18n/i18n';
var localVue = createLocalVue();
var today = new Date();
var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
describe('VueCalendar.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
        });
        expect(wrapper.findAll(".calendar")).toHaveLength(1);
        expect(wrapper.findAll(".body")).toHaveLength(1);
        wrapper.find('.h4').trigger('click');
        expect(wrapper.findAll(".calendar")).toHaveLength(1);
        expect(wrapper.findAll(".body")).toHaveLength(0);
        expect(wrapper.findAll(".year")).toHaveLength(1);
    });
    test('renders component with min max date', function () {
        var min = new Date(2018, 1, 8);
        var max = new Date(2018, 1, 15);
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                minDate: min,
                maxDate: max,
            },
        });
        expect(wrapper.findAll(".calendar")).toHaveLength(1);
        expect(wrapper.findAll(".body")).toHaveLength(1);
        wrapper.find('.h4').trigger('click');
        expect(wrapper.findAll(".calendar")).toHaveLength(1);
        expect(wrapper.findAll(".body")).toHaveLength(0);
        expect(wrapper.findAll(".year")).toHaveLength(1);
    });
    test('renders component with range', function () {
        var start = new Date(2018, 1, 8);
        var end = new Date(2018, 1, 15);
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                startDate: start,
                endDate: end,
            },
        });
        expect(wrapper.findAll(".selectedDay")).toHaveLength(8);
    });
    test('renders component with selected date', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                selectedDate: nextWeek,
            },
        });
        expect(wrapper.findAll(".selectedDay")).toHaveLength(1);
    });
    test('should emit events', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
        });
        wrapper.vm.onChange();
        wrapper.vm.onClose();
        expect(wrapper.emitted('change')).toBeTruthy();
        expect(wrapper.emitted('close')).toBeTruthy();
    });
    test('should setByDay', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
        });
        expect(wrapper.vm.selectedDay).toBe(today.getDate());
        wrapper.vm.setByDay({ day: 5, disabled: true });
        expect(wrapper.vm.selectedDay).toBe(today.getDate());
        wrapper.vm.setByDay({ day: 5, disabled: false });
        expect(wrapper.vm.selectedDay).toBe(5);
    });
    test('should setByMonth', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
        });
        expect(wrapper.vm.currentMonth).toBe(today.getMonth());
        expect(wrapper.vm.currentYear).toBe(today.getFullYear());
        wrapper.vm.setByMonth(5);
        expect(wrapper.vm.currentMonth).toBe(5);
        wrapper.vm.setByMonth(12);
        expect(wrapper.vm.currentMonth).toBe(0);
        expect(wrapper.vm.currentYear).toBe(today.getFullYear() + 1);
        wrapper.vm.setByMonth(-1);
        expect(wrapper.vm.currentMonth).toBe(11);
        expect(wrapper.vm.currentYear).toBe(today.getFullYear());
    });
    test('should setByYear', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
        });
        wrapper.vm.$data.selecting = 'year';
        expect(wrapper.vm.selectedYear).toBe(today.getFullYear());
        expect(wrapper.vm.currentYear).toBe(today.getFullYear());
        expect(wrapper.vm.selecting).toBe('year');
        wrapper.vm.setByYear(today.getFullYear() + 1);
        expect(wrapper.vm.selectedYear).toBe(today.getFullYear() + 1);
        expect(wrapper.vm.currentYear).toBe(today.getFullYear() + 1);
        expect(wrapper.vm.selecting).toBe('date');
    });
    test('should render 1. april 2018', function () {
        var start = new Date(2018, 3, 1);
        var end = new Date(2018, 3, 2);
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                startDate: start,
                endDate: end,
                firstDayOfWeek: 1,
            },
        });
        expect(wrapper.findAll(".selectedDay")).toHaveLength(2);
    });
    test('should render 31. may 2018', function () {
        var wrapper = mount(VueCalendar, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                today: new Date(2018, 4, 31),
                selectedDate: new Date(2018, 5, 2),
            },
        });
        expect(wrapper.findAll(".currentDay")).toHaveLength(0);
    });
});
//# sourceMappingURL=VueCalendar.spec.js.map