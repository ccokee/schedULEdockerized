import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueToggle from './VueToggle.vue';
var story = storiesOf('Atoms|Toggle', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueToggle: VueToggle },
    data: function () {
        return {
            checked: false,
        };
    },
    template: "<vue-toggle name=\"toggle\" id=\"toggle\" v-model=\"checked\" label=\"toggle me\">VueToggle</vue-toggle>",
}); }));
story.add('Disabled', withInfo({})(function () { return ({
    components: { VueToggle: VueToggle },
    data: function () {
        return {
            checked: false,
        };
    },
    template: "<vue-toggle disabled name=\"toggle\" id=\"toggle\" v-model=\"checked\" label=\"toggle me\">VueToggle</vue-toggle>",
}); }));
//# sourceMappingURL=VueToggle.stories.js.map