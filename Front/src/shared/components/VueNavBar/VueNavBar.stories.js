import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueNavBar from './VueNavBar.vue';
var story = storiesOf('Organisms|NavBar', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueNavBar: VueNavBar },
    template: "<vue-nav-bar />",
}); }));
//# sourceMappingURL=VueNavBar.stories.js.map