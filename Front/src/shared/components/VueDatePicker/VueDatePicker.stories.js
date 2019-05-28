import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueDatePicker from './VueDatePicker.vue';
import { i18n } from '../../plugins/i18n/i18n';
import { action } from '@storybook/addon-actions';
var story = storiesOf('Organisms|DatePicker', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueDatePicker: VueDatePicker },
    template: "<vue-date-picker name=\"date\" id=\"date\" @change=\"action\" :first-day-of-week=\"1\" placeholder=\"Select a date\" />",
    i18n: i18n,
    methods: {
        action: action('@change'),
    },
}); }));
//# sourceMappingURL=VueDatePicker.stories.js.map