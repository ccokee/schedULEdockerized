import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueImage from './VueImage.vue';
var story = storiesOf('Atoms|Image', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueImage: VueImage },
    template: "<vue-image src=\"https://via.placeholder.com/512\" alt=\"foo\" />",
}); }));
story.add('As DIV', withInfo({})(function () { return ({
    components: { VueImage: VueImage },
    template: "<vue-image src=\"https://via.placeholder.com/512\" alt=\"foo\" :native=\"false\" :style=\"{width:'320px',height:'320px',backgroundSize:'cover'}\" />",
}); }));
//# sourceMappingURL=VueImage.stories.js.map