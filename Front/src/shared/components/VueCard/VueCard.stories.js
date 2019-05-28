import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueCard from './VueCard.vue';
import VueCardHeader from './VueCardHeader/VueCardHeader.vue';
import VueCardBody from './VueCardBody/VueCardBody.vue';
import VueCardFooter from './VueCardFooter/VueCardFooter.vue';
import VueButton from '../VueButton/VueButton.vue';
var story = storiesOf('Molecules|Card', module);
story.add('Default', withInfo({ propTablesExclude: [VueButton] })(function () { return ({
    components: {
        VueCard: VueCard,
        VueCardHeader: VueCardHeader,
        VueCardBody: VueCardBody,
        VueCardFooter: VueCardFooter,
        VueButton: VueButton,
    },
    template: "<vue-card>\n  <vue-card-header title=\"Title\" subtitle=\"subtitle\" image=\"https://avatars2.githubusercontent.com/u/1667598?s=460&v=4\" />\n  <vue-card-body>\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n  </vue-card-body>\n  <vue-card-footer>\n    <vue-button color=\"danger\">Delete</vue-button>\n    <vue-button ghost>Cancel</vue-button>\n  </vue-card-footer>\n</vue-card>",
}); }));
//# sourceMappingURL=VueCard.stories.js.map