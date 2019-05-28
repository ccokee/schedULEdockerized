import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueTruncate from './VueTruncate.vue';
import { i18n } from '../../plugins/i18n/i18n';
var story = storiesOf('Molecules|Truncate', module);
story.add('Default', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueTruncate: VueTruncate },
    template: "<vue-truncate>\n  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et<br/>\n  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet<br/>\n  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<br/>\n  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,<br/>\n  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,<br/>\n  no sea takimata sanctus est Lorem ipsum dolor sit amet.\n</vue-truncate>",
}); }));
story.add('Without truncation', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueTruncate: VueTruncate },
    template: "<vue-truncate :lines=\"6\">\n  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et<br/>\n  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet<br/>\n  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<br/>\n  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,<br/>\n  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,<br/>\n  no sea takimata sanctus est Lorem ipsum dolor sit amet.\n</vue-truncate>",
}); }));
story.add('Lines and Duration', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueTruncate: VueTruncate },
    template: "<vue-truncate :lines=\"2\" :duration=\"500\">\n  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et<br/>\n  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet<br/>\n  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<br/>\n  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,<br/>\n  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,<br/>\n  no sea takimata sanctus est Lorem ipsum dolor sit amet.\n</vue-truncate>",
}); }));
//# sourceMappingURL=VueTruncate.stories.js.map