import { createLocalVue, mount } from '@vue/test-utils';
import VueAccordion from './VueAccordion.vue';
import VueAccordionItem from './VueAccordionItem/VueAccordionItem.vue';
var localVue = createLocalVue();
localVue.component('vueA-accordion-item', VueAccordionItem);
describe('VueAccordion.vue', function () {
    test('renders component with an accordion item', function () {
        var wrapper = mount(VueAccordion, {
            localVue: localVue,
            slots: {
                default: '<vueA-accordion-item title="foo" :initOpen="false"/>',
            },
        });
        var accordionItemWrapper = wrapper.find(VueAccordionItem);
        accordionItemWrapper.vm.$parent = wrapper.vm;
        accordionItemWrapper.vm.$options.created[1].call(accordionItemWrapper.vm);
        expect(wrapper.vm.items.length).toBeGreaterThan(0);
        expect(wrapper.vm.openItems.length).toBe(0);
        wrapper.destroy();
    });
    test('renders component with an open accordion item', function () {
        var wrapper = mount(VueAccordion, {
            localVue: localVue,
            slots: {
                default: '<vueA-accordion-item title="foo" :initOpen="true"/>',
            },
        });
        var accordionItemWrapper = wrapper.find(VueAccordionItem);
        accordionItemWrapper.vm.$parent = wrapper.vm;
        accordionItemWrapper.vm.$options.created[1].call(accordionItemWrapper.vm);
        expect(wrapper.vm.items.length).toBeGreaterThan(0);
        expect(wrapper.vm.openItems.length).toBeGreaterThan(0);
        wrapper.destroy();
    });
    test('should handle single accordion', function () {
        var wrapper = mount(VueAccordion, {
            localVue: localVue,
            propsData: {
                multiple: false,
            },
        });
        expect(wrapper.vm.openItems).toEqual([]);
        wrapper.vm.openItem(0);
        expect(wrapper.vm.openItems).toEqual([0]);
        wrapper.vm.openItem(1);
        expect(wrapper.vm.openItems).toEqual([1]);
        wrapper.vm.openItem(1);
        expect(wrapper.vm.openItems).toEqual([]);
    });
    test('should handle multiple accordion', function () {
        var wrapper = mount(VueAccordion, {
            localVue: localVue,
            propsData: {
                multiple: true,
            },
        });
        expect(wrapper.vm.openItems).toEqual([]);
        wrapper.vm.openItem(0);
        expect(wrapper.vm.openItems).toEqual([0]);
        wrapper.vm.openItem(1);
        expect(wrapper.vm.openItems).toEqual([0, 1]);
        wrapper.vm.openItem(1);
        expect(wrapper.vm.openItems).toEqual([0]);
        wrapper.vm.openItem(0);
        expect(wrapper.vm.openItems).toEqual([]);
    });
});
//# sourceMappingURL=VueAccordion.spec.js.map