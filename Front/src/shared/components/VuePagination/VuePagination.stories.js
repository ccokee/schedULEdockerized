import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VuePagination from './VuePagination.vue';
import { action } from '@storybook/addon-actions';
import { i18n } from '../../plugins/i18n/i18n';
var story = storiesOf('Molecules|Pagination', module);
story.add('Default', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VuePagination: VuePagination },
    data: function () {
        return {
            page: 1,
        };
    },
    template: "<vue-pagination :pages=\"10 \" :current=\"page\" @change=\"action($event);page=$event\" />",
    methods: {
        action: action('@change'),
    },
}); }));
//# sourceMappingURL=VuePagination.stories.js.map