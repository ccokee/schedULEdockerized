import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueTooltip from './VueTooltip.vue';
var story = storiesOf('Molecules|Tooltip', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueTooltip: VueTooltip },
    template: "\n<vue-tooltip tip=\"This is a tooltip!\">consetetur sadipscing elitr</vue-tooltip>",
}); }));
story.add('Programmatically disable', withInfo({})(function () { return ({
    components: { VueTooltip: VueTooltip },
    data: function () {
        return {
            disabled: false,
        };
    },
    template: "<div>\n<vue-tooltip tip=\"This is a tooltip!\" :disabled=\"disabled\">consetetur sadipscing elitr</vue-tooltip>\n<br/>\n<br/>\n<button @click=\"disabled = !disabled\">Toogle tooltip</button>\n</div>",
}); }));
//# sourceMappingURL=VueTooltip.stories.js.map