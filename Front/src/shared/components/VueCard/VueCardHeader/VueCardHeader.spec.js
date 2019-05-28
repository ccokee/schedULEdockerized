import { mount, createLocalVue } from '@vue/test-utils';
import VueCardHeader from './VueCardHeader.vue';
var localVue = createLocalVue();
describe('VueCardHeader.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCardHeader, {
            localVue: localVue,
        });
        expect(wrapper.findAll(".vueCardHeader")).toHaveLength(1);
    });
    test('renders component with title', function () {
        var wrapper = mount(VueCardHeader, {
            localVue: localVue,
            propsData: {
                title: 'foo',
            },
        });
        expect(wrapper.findAll(".title")).toHaveLength(1);
        expect(wrapper.find(".title").text()).toBe('foo');
    });
    test('renders component with subtitle', function () {
        var wrapper = mount(VueCardHeader, {
            localVue: localVue,
            propsData: {
                subtitle: 'foo',
            },
        });
        expect(wrapper.findAll(".subtitle")).toHaveLength(1);
        expect(wrapper.find(".subtitle").text()).toBe('foo');
    });
    test('renders component with image', function () {
        var wrapper = mount(VueCardHeader, {
            localVue: localVue,
            propsData: {
                image: 'foo',
            },
        });
        expect(wrapper.findAll("img")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueCardHeader.spec.js.map