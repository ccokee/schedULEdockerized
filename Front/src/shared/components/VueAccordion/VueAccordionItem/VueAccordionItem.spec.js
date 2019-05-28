import { createLocalVue, mount } from '@vue/test-utils';
import VueAccordionItem from './VueAccordionItem.vue';
var localVue = createLocalVue();
describe('VueAccordionItem.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueAccordionItem, {
            localVue: localVue,
            propsData: {
                title: 'foo',
            },
            provide: {
                register: jest.fn(),
                openItem: jest.fn(),
            },
        });
        expect(wrapper.find(".header").text()).toMatch('foo');
    });
    test('opens component', function () {
        var wrapper = mount(VueAccordionItem, {
            localVue: localVue,
            propsData: {
                title: 'foo',
                initOpen: false,
            },
            provide: {
                register: jest.fn(),
                openItem: jest.fn(),
            },
        });
        wrapper.setData({ idx: 0, open: true });
        expect(wrapper.findAll(".open")).toHaveLength(1);
    });
    test('calls register', function () {
        var register = jest.fn();
        var openItem = jest.fn();
        var wrapper = mount(VueAccordionItem, {
            localVue: localVue,
            propsData: {
                title: 'foo',
                initOpen: false,
            },
            provide: {
                register: register,
                openItem: openItem,
            },
        });
        wrapper.vm.click();
        expect(openItem).toHaveBeenCalled();
        expect(register).toHaveBeenCalled();
    });
});
//# sourceMappingURL=VueAccordionItem.spec.js.map