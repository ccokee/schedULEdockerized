import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueFooter from './VueFooter.vue';
var story = storiesOf('Organisms|Footer', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueFooter: VueFooter },
    template: "<vue-footer />",
}); }));
//# sourceMappingURL=VueFooter.stories.js.map