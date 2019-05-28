import { createLocalVue, mount } from '@vue/test-utils';
import VueDataTableHeader from './VueDataTableHeader.vue';
import VueIconSort from '../../icons/VueIconSort/VueIconSort.vue';
import VueIconSortDown from '../../icons/VueIconSortDown/VueIconSortDown.vue';
import VueIconSortUp from '../../icons/VueIconSortUp/VueIconSortUp.vue';
var localVue = createLocalVue();
describe('VueDataTableHeader.vue', function () {
    var columns = [
        { title: 'foo', visible: true, sortKey: 'foo', sortable: true },
        { title: 'bar', visible: true, sortKey: 'bar', sortable: true },
        { title: 'baz', visible: true, sortKey: 'baz', sortable: true },
        { title: 'baz', visible: true, sortKey: 'baz', sortable: false },
    ];
    test('renders component', function () {
        var wrapper = mount(VueDataTableHeader, {
            localVue: localVue,
            propsData: {
                columns: columns,
                columnWidth: '33.3333%',
                sortDirection: 'asc',
            },
        });
        expect(wrapper.findAll('.column')).toHaveLength(4);
        expect(wrapper.findAll(VueIconSort)).toHaveLength(3);
    });
    test('renders component with active sorting asc', function () {
        var wrapper = mount(VueDataTableHeader, {
            localVue: localVue,
            propsData: {
                columns: columns,
                columnWidth: '33.3333%',
                sortDirection: 'asc',
                sortKey: 'foo',
            },
        });
        expect(wrapper.findAll(VueIconSort)).toHaveLength(0);
        expect(wrapper.findAll(VueIconSortUp)).toHaveLength(1);
    });
    test('renders component with active sorting desc', function () {
        var wrapper = mount(VueDataTableHeader, {
            localVue: localVue,
            propsData: {
                columns: columns,
                columnWidth: '33.3333%',
                sortDirection: 'desc',
                sortKey: 'foo',
            },
        });
        expect(wrapper.findAll(VueIconSort)).toHaveLength(0);
        expect(wrapper.findAll(VueIconSortDown)).toHaveLength(1);
    });
    test('should populate sortKey on click', function () {
        var wrapper = mount(VueDataTableHeader, {
            localVue: localVue,
            propsData: {
                columns: columns,
                columnWidth: '33.3333%',
                sortDirection: 'desc',
                sortKey: 'foo',
            },
        });
        wrapper.vm.onClick(columns[3]);
        expect(wrapper.emitted('click')).toBeFalsy();
        wrapper.vm.onClick(columns[0]);
        expect(wrapper.emitted('click')).toBeTruthy();
    });
});
//# sourceMappingURL=VueDataTableHeader.spec.js.map