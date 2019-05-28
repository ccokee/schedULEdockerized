import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueTabGroup from './VueTabGroup.vue';
import VueTabItem from './VueTabItem/VueTabItem.vue';
var story = storiesOf('Organisms|TabGroup', module);
story.add('Default', withInfo({})(function () { return ({
    components: {
        VueTabGroup: VueTabGroup,
        VueTabItem: VueTabItem,
    },
    template: "\n<vue-tab-group>\n  <vue-tab-item title=\"Profile\">\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n  </vue-tab-item>\n  <vue-tab-item title=\"Settings\" :is-active=\"true\">\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n  </vue-tab-item>\n  <vue-tab-item title=\"Upload\">\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n  </vue-tab-item>\n</vue-tab-group>",
}); }));
//# sourceMappingURL=VueTabGroup.stories.js.map