import { createLocalVue, mount } from '@vue/test-utils';
import VueModal from './VueModal.vue';
var localVue = createLocalVue();
describe('VueModal.vue', function () {
    test('renders slot', function (done) {
        var wrapper = mount(VueModal, {
            localVue: localVue,
            slots: {
                default: '<p>TEST</p>',
            },
        });
        expect(wrapper.findAll('p')).toHaveLength(0);
        wrapper.setProps({ show: true });
        expect(wrapper.findAll('p')).toHaveLength(1);
        wrapper.setProps({ show: false });
        expect(wrapper.findAll('p')).toHaveLength(0);
        wrapper.setProps({ show: true });
        wrapper.vm.beforeEnter(wrapper.vm.$el);
        wrapper.vm.enter(wrapper.vm.$el, jest.fn());
        wrapper.vm.beforeLeave(wrapper.vm.$el);
        wrapper.vm.leave(wrapper.vm.$el, done);
    });
    test('registers and unregisters scroll/click/keydown event', function () {
        document.addEventListener = jest.fn();
        document.removeEventListener = jest.fn();
        var wrapper = mount(VueModal, { localVue: localVue });
        wrapper.destroy();
        expect(document.addEventListener).toHaveBeenCalledTimes(3);
        expect(document.removeEventListener).toHaveBeenCalledTimes(3);
    });
    test('should close on outside click', function () {
        var wrapper = mount(VueModal, {
            localVue: localVue,
            slots: {
                default: '<p>TEST</p>',
            },
        });
        wrapper.vm.$emit = jest.fn();
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);
        wrapper.vm.handleDocumentClick({ target: wrapper.find("p").element });
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);
        wrapper.vm.handleDocumentClick({ target: null });
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);
        wrapper.setProps({ show: true });
        wrapper.vm.handleDocumentClick({ target: null });
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
    });
    test('should close on ESC press', function () {
        var wrapper = mount(VueModal, {
            localVue: localVue,
        });
        wrapper.vm.$emit = jest.fn();
        wrapper.vm.handleDocumentKeyDown({ key: 'Enter' });
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(0);
        wrapper.vm.handleDocumentKeyDown({ key: 'Escape' });
        expect(wrapper.vm.$emit).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=VueModal.spec.js.map