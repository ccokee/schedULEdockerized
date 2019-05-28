import { createLocalVue, mount } from '@vue/test-utils';
import { i18n } from '../../plugins/i18n/i18n';
import VueDataTable from './VueDataTable.vue';
import VueDataTableSearch from './VueDataTableSearch/VueDataTableSearch.vue';
import VueDataTableHeader from './VueDataTableHeader/VueDataTableHeader.vue';
import VuePagination from '../VuePagination/VuePagination.vue';
import { dataTableDataFixture, dataTableHeaderFixture } from './DataTableFixtures';
var localVue = createLocalVue();
describe('VueDataTable.vue', function () {
    var header = dataTableHeaderFixture;
    var data = dataTableDataFixture;
    test('renders component', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
            },
        });
        expect(wrapper.findAll(VueDataTableSearch)).toHaveLength(1);
        expect(wrapper.findAll(VueDataTableHeader)).toHaveLength(1);
        expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(5);
        expect(wrapper.findAll(VuePagination)).toHaveLength(1);
    });
    test('renders component without search', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
                showSearch: false,
            },
        });
        expect(wrapper.findAll(VueDataTableSearch)).toHaveLength(0);
        expect(wrapper.findAll(VueDataTableHeader)).toHaveLength(1);
        expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(5);
        expect(wrapper.findAll(VuePagination)).toHaveLength(1);
    });
    test('should filter data', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
            },
        });
        wrapper.vm.searchTerm = 'julia';
        expect(wrapper.findAll(VueDataTableSearch)).toHaveLength(1);
        expect(wrapper.findAll(VueDataTableHeader)).toHaveLength(1);
        expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(4);
        wrapper.vm.searchTerm = 'z';
        expect(wrapper.findAll(VueDataTableSearch)).toHaveLength(1);
        expect(wrapper.findAll(VueDataTableHeader)).toHaveLength(1);
        expect(wrapper.findAll('.noResults')).toHaveLength(1);
        expect(wrapper.findAll('.vueDataTableRow')).toHaveLength(0);
    });
    test('should sort data', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
            },
        });
        wrapper.setProps({ sortKey: 'firstname' });
        expect(wrapper.vm.sortedData[0].firstname).toBe('Julia');
        expect(wrapper.vm.sortedData[1].firstname).toBe('Julia');
        expect(wrapper.vm.sortedData[2].firstname).toBe('Julia');
        expect(wrapper.vm.sortedData[3].firstname).toBe('Julia');
        wrapper.setProps({ sortDirection: 'desc' });
        expect(wrapper.vm.sortedData[0].firstname).toBe('Toni');
        expect(wrapper.vm.sortedData[1].firstname).toBe('Toni');
        expect(wrapper.vm.sortedData[2].firstname).toBe('Toni');
        expect(wrapper.vm.sortedData[3].firstname).toBe('Toni');
    });
    test('should change page', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
            },
        });
        wrapper.vm.paginationClick(2);
        expect(wrapper.vm.currentPage).toBe(1);
    });
    test('should emit click', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
            },
        });
        var cells = [
            { key: 'id', value: 2, visible: false, slot: undefined },
            { key: 'name', value: 'foo', visible: false, slot: undefined },
        ];
        wrapper.vm.rowClick(cells);
        expect(wrapper.emitted('click')).toBeTruthy();
        expect(wrapper.emitted('click')[0][0]).toEqual({ id: 2, name: 'foo' });
    });
    test('should sort', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
            },
        });
        expect(wrapper.vm.internalSortKey).toBe(null);
        expect(wrapper.vm.internalSortDirection).toBe('asc');
        wrapper.vm.columnClick({ sortKey: 'foo' });
        expect(wrapper.vm.internalSortKey).toBe('foo');
        expect(wrapper.vm.internalSortDirection).toBe('asc');
        wrapper.vm.columnClick({ sortKey: 'foo' });
        expect(wrapper.vm.internalSortKey).toBe('foo');
        expect(wrapper.vm.internalSortDirection).toBe('desc');
        wrapper.vm.columnClick({ sortKey: 'foo' });
        expect(wrapper.vm.internalSortKey).toBe(null);
        expect(wrapper.vm.internalSortDirection).toBe('asc');
    });
    test('should display all the data if maxRows is set to 0', function () {
        var wrapper = mount(VueDataTable, {
            i18n: i18n,
            localVue: localVue,
            propsData: {
                header: header,
                data: data,
                maxRows: 0,
            },
        });
        expect(wrapper.vm.displayData).toHaveLength(20);
        expect(wrapper.vm.maxPages).toBe(0);
    });
});
//# sourceMappingURL=VueDataTable.spec.js.map