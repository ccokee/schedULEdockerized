import { createLocalVue, mount } from '@vue/test-utils';
import VueDateRangePicker from './VueDateRangePicker.vue';
import { i18n } from '../../plugins/i18n/i18n';
var localVue = createLocalVue();
var today = new Date();
var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
describe('VueDateRangePicker.vue', function () {
    test('should handle onStartChange', function () {
        var wrapper = mount(VueDateRangePicker, {
            localVue: localVue,
            i18n: i18n,
        });
        expect(wrapper.vm.startDate).toBe(null);
        wrapper.vm.onStartChange(today);
        expect(wrapper.vm.startDate).toBe(today);
        expect(wrapper.vm.endDate).toBe(null);
        wrapper.vm.$data.endDate = today;
        expect(wrapper.vm.startDate).toBe(today);
        expect(wrapper.vm.endDate).toBe(today);
        wrapper.vm.onStartChange(nextWeek);
        expect(wrapper.vm.startDate).toBe(nextWeek);
        expect(wrapper.vm.endDate).toBe(nextWeek);
    });
    test('should handle onEndChange', function () {
        var wrapper = mount(VueDateRangePicker, {
            localVue: localVue,
            i18n: i18n,
        });
        expect(wrapper.vm.endDate).toBe(null);
        wrapper.vm.onEndChange(today);
        expect(wrapper.vm.endDate).toBe(today);
        expect(wrapper.emitted('change')).toBeTruthy();
    });
});
//# sourceMappingURL=VueDateRangePicker.spec.js.map