import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueSelect from './VueSelect.vue';
var story = storiesOf('Atoms|Select', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueSelect: VueSelect },
    data: function () {
        return {
            options: [{ label: 'foo', value: 'foo' }, { label: 'bar', value: 'bar' }, { label: 'baz', value: 'baz' }],
            model: '',
        };
    },
    template: "<vue-select name=\"select\" id=\"select\" placeholder=\"Select\" :options=\"options\" v-model=\"model\" />",
}); }));
story.add('Multi', withInfo({})(function () { return ({
    components: { VueSelect: VueSelect },
    data: function () {
        return {
            options: [{ label: 'foo', value: 'foo' }, { label: 'bar', value: 'bar' }, { label: 'baz', value: 'baz' }],
            model: '',
        };
    },
    template: "<vue-select name=\"select\" id=\"select\" placeholder=\"Select\" :options=\"options\" multiple v-model=\"model\" />",
}); }));
//# sourceMappingURL=VueSelect.stories.js.map