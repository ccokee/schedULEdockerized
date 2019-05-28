import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueSlider from './VueSlider.vue';
import { action } from '@storybook/addon-actions';
var story = storiesOf('Atoms|Slider', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueSlider: VueSlider },
    template: "<vue-slider :min=\"0\" :max=\"200\" :values=\"[0]\" @change=\"action\" />",
    methods: {
        action: action('@change'),
    },
}); }));
story.add('Range', withInfo({})(function () { return ({
    components: { VueSlider: VueSlider },
    template: "<vue-slider :min=\"0\" :max=\"200\" :values=\"[0, 50]\" @change=\"action\" />",
    methods: {
        action: action('@change'),
    },
}); }));
story.add('Disabled', withInfo({})(function () { return ({
    components: { VueSlider: VueSlider },
    template: "<vue-slider disabled :min=\"0\" :max=\"200\" :values=\"[0, 50]\" @change=\"action\" />",
    methods: {
        action: action('@change'),
    },
}); }));
//# sourceMappingURL=VueSlider.stories.js.map