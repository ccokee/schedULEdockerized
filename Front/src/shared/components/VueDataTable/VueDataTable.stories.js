import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import { action } from '@storybook/addon-actions';
import VueDataTable from './VueDataTable.vue';
import { i18n } from '../../plugins/i18n/i18n';
import { dataTableDataFixture, dataTableHeaderFixture } from './DataTableFixtures';
import VueDropdownMenu from '../VueDropdownMenu/VueDropdownMenu.vue';
var story = storiesOf('Organisms|DataTable', module);
story.add('Default', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueDataTable: VueDataTable },
    data: function () {
        return {
            header: dataTableHeaderFixture,
            data: dataTableDataFixture,
        };
    },
    template: "<vue-data-table :header=\"header\" :data=\"data\" placeholder=\"Search\" @click=\"action\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('All Props', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueDataTable: VueDataTable },
    data: function () {
        return {
            header: dataTableHeaderFixture,
            data: dataTableDataFixture,
        };
    },
    template: "<vue-data-table :header=\"header\" :data=\"data\" :show-search=\"false\" :page=\"1\" :max-rows=\"0\" @click=\"action\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Custom Cell Renderer', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueDataTable: VueDataTable },
    data: function () {
        return {
            header: dataTableHeaderFixture,
            data: dataTableDataFixture,
        };
    },
    template: "<vue-data-table :header=\"header\" :data=\"data\" placeholder=\"Search\" @click=\"action\">\n  <template v-slot:date=\"{ cell }\">{{ new Date(cell.value).toDateString() }}</template>\n</vue-data-table>",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Access Row', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueDataTable: VueDataTable, VueDropdownMenu: VueDropdownMenu },
    data: function () {
        return {
            header: dataTableHeaderFixture,
            data: dataTableDataFixture,
        };
    },
    template: "<vue-data-table :header=\"header\" :data=\"data\" placeholder=\"Search\" @click=\"action\">\n  <template v-slot:actions=\"{ row }\">\n    <vue-dropdown-menu :options=\"[{label:'Delete', value:'delete'}]\" @click=\"click(row)\">Select</vue-dropdown-menu>\n  </template>\n</vue-data-table>",
    methods: {
        action: action('@onClick'),
        click: function (row) {
            alert(JSON.stringify(row));
        },
    },
}); }));
story.add('Initial sort', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueDataTable: VueDataTable },
    data: function () {
        return {
            header: dataTableHeaderFixture,
            data: dataTableDataFixture,
        };
    },
    template: "<vue-data-table :header=\"header\" :data=\"data\" sort-key=\"firstname\" sort-direction=\"desc\" @click=\"action\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
//# sourceMappingURL=VueDataTable.stories.js.map