import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueCalendar from './VueCalendar.vue';
import { i18n } from '../../plugins/i18n/i18n';
var story = storiesOf('Organisms|Calendar', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueCalendar: VueCalendar },
    template: "<vue-calendar />",
    i18n: i18n,
}); }));
//# sourceMappingURL=VueCalendar.stories.js.map