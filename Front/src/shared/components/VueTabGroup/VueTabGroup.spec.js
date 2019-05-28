import { createLocalVue, mount } from '@vue/test-utils';
import VueTabGroup from './VueTabGroup.vue';
import VueTabItem from './VueTabItem/VueTabItem.vue';
var localVue = createLocalVue();
localVue.component('vue-tab-item', VueTabItem);
describe('VueTabGroup.vue', function () {
    test('renders component with a tab', function () {
        var wrapper = mount(VueTabGroup, {
            localVue: localVue,
            slots: {
                default: '<vue-tab-item title="foo" />',
            },
        });
        var tabWrapper = wrapper.find(VueTabItem);
        tabWrapper.vm.$parent = wrapper.vm;
        tabWrapper.vm.$options.created[1].call(tabWrapper.vm);
        expect(wrapper.find('li').text()).toMatch('foo');
        wrapper.destroy();
    });
    test('should change tab', function () {
        var wrapper = mount(VueTabGroup, {
            localVue: localVue,
            slots: {
                default: ['<vue-tab-item title="foo" />', '<vue-tab-item title="foo2" />'],
            },
        });
        var tabWrapper = wrapper.findAll(VueTabItem).at(0);
        var tabWrapper2 = wrapper.findAll(VueTabItem).at(1);
        tabWrapper.vm.$parent = wrapper.vm;
        tabWrapper.vm.$options.created[1].call(tabWrapper.vm);
        tabWrapper2.vm.$parent = wrapper.vm;
        tabWrapper2.vm.$options.created[1].call(tabWrapper2.vm);
        expect(wrapper.find('li').text()).toMatch('foo');
        expect(wrapper.find('li').classes()).toEqual(['active']);
        expect(wrapper
            .findAll('li')
            .at(1)
            .text()).toMatch('foo2');
        expect(wrapper
            .findAll('li')
            .at(1)
            .classes()).toEqual([]);
        wrapper.vm.changeTab(1);
        expect(wrapper.find('li').text()).toMatch('foo');
        expect(wrapper.find('li').classes()).toEqual([]);
        expect(wrapper
            .findAll('li')
            .at(1)
            .text()).toMatch('foo2');
        expect(wrapper
            .findAll('li')
            .at(1)
            .classes()).toEqual(['active']);
    });
    test('should select second tab because of its properties', function () {
        var wrapper = mount(VueTabGroup, {
            localVue: localVue,
            slots: {
                default: '<vue-tab-item title="foo" /><vue-tab-item title="foo" :is-active="true" />',
            },
        });
        expect(wrapper.vm.currentTab).toBe(1);
        wrapper.destroy();
    });
    test('should update props when required', function () {
        var wrapper = mount(VueTabGroup, {
            localVue: localVue,
            slots: {
                default: '<vue-tab-item title="foo" /><vue-tab-item title="foo" :is-active="true" />',
            },
        });
        wrapper.vm.updateHeader(0, { title: 'bar' });
        expect(wrapper.vm.tabHeader[0].title).toEqual('bar');
        wrapper.destroy();
    });
});
//# sourceMappingURL=VueTabGroup.spec.js.map