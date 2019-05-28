import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import IconList from '../../designSystem/docs/components/IconList.vue';
var story = storiesOf('Atoms|Icons', module);
story.addParameters({ options: { showAddonPanel: false } });
story.add('Icons', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [IconList],
})(function () { return ({
    components: {
        IconList: IconList,
    },
    template: "<icon-list/>",
}); }));
//# sourceMappingURL=Icons.stories.js.map