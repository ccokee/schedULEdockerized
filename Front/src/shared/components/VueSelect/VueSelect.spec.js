import { createLocalVue, mount } from '@vue/test-utils';
import VueSelect from './VueSelect.vue';
var localVue = createLocalVue();
describe('VueSelect.vue', function () {
    var options = [
        {
            label: 'Foo',
            value: 'foo',
        },
        {
            label: 'Bar',
            value: 'bar',
        },
        {
            label: 'Baz',
            value: 'baz',
        },
        {
            label: 'Bla Bla Bla Bla Bla',
            value: 'bla',
        },
        {
            label: 'Lorem Ipsum la la la',
            value: 'lorem',
        },
    ];
    test('renders component', function () {
        var wrapper = mount(VueSelect, {
            localVue: localVue,
            propsData: {
                options: options,
                name: 'name',
                id: 'id',
            },
            mocks: {
                errors: null,
            },
        });
        expect(wrapper.findAll('option')).toHaveLength(5);
        expect(wrapper.find('select').attributes().multiple).toBe(undefined);
    });
    test('renders multi component', function () {
        var wrapper = mount(VueSelect, {
            localVue: localVue,
            propsData: {
                options: options,
                multiple: true,
                name: 'name',
                id: 'id',
            },
        });
        expect(wrapper.findAll('option')).toHaveLength(5);
        expect(wrapper.find('select').attributes().multiple).toBe('multiple');
    });
    test('renders disabled component', function () {
        var wrapper = mount(VueSelect, {
            localVue: localVue,
            propsData: {
                options: options,
                disabled: true,
                name: 'name',
                id: 'id',
            },
        });
        expect(wrapper.findAll('option')).toHaveLength(5);
        expect(wrapper.findAll('.disabled')).toHaveLength(1);
    });
    it('should return list of options', function () {
        var wrapper = mount(VueSelect, {
            localVue: localVue,
            propsData: {
                options: options,
                multiple: true,
                name: 'name',
                id: 'id',
            },
        });
        var event = {
            target: {
                options: [
                    {
                        selected: true,
                        text: 'foo',
                        value: 'foo2',
                    },
                    {
                        selected: false,
                        text: 'bar',
                        value: 'bar2',
                    },
                ],
            },
        };
        wrapper.vm.onInput(event);
        expect(wrapper.emitted().input[0][0]).toBe('foo2');
    });
    test('should display error state', function () {
        var wrapper = mount(VueSelect, {
            localVue: localVue,
            mocks: {
                errors: {
                    first: function () {
                        return true;
                    },
                },
            },
            propsData: {
                options: options,
                multiple: true,
                name: 'name',
                id: 'id',
            },
        });
        expect(wrapper.findAll(".error")).toHaveLength(1);
    });
});
//# sourceMappingURL=VueSelect.spec.js.map