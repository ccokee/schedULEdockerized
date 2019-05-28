import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueCollapse from './VueCollapse.vue';
import VueButton from '../VueButton/VueButton.vue';
var story = storiesOf('Molecules|Collapse', module);
story.add('Default', withInfo({ propTablesExclude: [VueButton] })(function () { return ({
    components: { VueCollapse: VueCollapse, VueButton: VueButton },
    data: function () {
        return {
            show: true,
        };
    },
    template: "\n<div>\n  <vue-button @click=\"show = !show\" color=\"secondary\">Collapse toggle</vue-button>\n  <br />\n  <br />\n  <vue-collapse :show=\"show\">\n    <div>\n      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n      labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n      labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n    </div>\n  </vue-collapse>\n</div>\n  ",
}); }));
//# sourceMappingURL=VueCollapse.stories.js.map