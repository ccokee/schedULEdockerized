import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueNavigationProgress from './VueNavigationProgress.vue';
import VueCheckbox from '../VueCheckbox/VueCheckbox.vue';
var story = storiesOf('Atoms|NavigationProgress', module);
story.add('Default', withInfo({ propTablesExclude: [VueCheckbox] })(function () { return ({
    components: { VueNavigationProgress: VueNavigationProgress, VueCheckbox: VueCheckbox },
    data: function () {
        return {
            isNavigating: true,
        };
    },
    template: "\n<div>\n  <vue-checkbox id=\"isNavigating\" name=\"isNavigating\" label=\"isNavigating\" v-model=\"isNavigating\" />\n  <vue-navigation-progress :isNavigating=\"isNavigating\" />\n</div>",
}); }));
//# sourceMappingURL=VueNavigationProgress.stories.js.map