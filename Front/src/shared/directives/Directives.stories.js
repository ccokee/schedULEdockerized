/* tslint:disable */
import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
var story = storiesOf('Utilities|Directives', module);
story.add('sr-only', withInfo({})(function () { return ({
    components: {},
    template: "<div v-sr-only>this text is only visible for screen-readers</div>",
}); }));
//# sourceMappingURL=Directives.stories.js.map