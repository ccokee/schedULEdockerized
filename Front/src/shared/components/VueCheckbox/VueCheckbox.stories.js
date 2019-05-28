import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueCheckbox from './VueCheckbox.vue';
import { action } from '@storybook/addon-actions';
var story = storiesOf('Atoms|Checkbox', module);
story.add('Checkbox', withInfo({})(function () { return ({
    components: { VueCheckbox: VueCheckbox },
    data: function () {
        return {
            model: false,
        };
    },
    template: "<vue-checkbox label=\"checkbox\" name=\"checkbox\" id=\"checkbox\" @click=\"action\" v-model=\"model\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Checkbox Disabled', withInfo({})(function () { return ({
    components: { VueCheckbox: VueCheckbox },
    data: function () {
        return {
            model: false,
        };
    },
    template: "<vue-checkbox label=\"checkbox\" name=\"checkbox\" id=\"checkbox\" disabled @click=\"action\" v-model=\"model\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Radio Button', withInfo({})(function () { return ({
    components: { VueCheckbox: VueCheckbox },
    data: function () {
        return {
            model: false,
        };
    },
    template: "<vue-checkbox label=\"radio button\" name=\"radio\" id=\"radio\" radio @click=\"action\" v-model=\"model\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Radio Button disabled', withInfo({})(function () { return ({
    components: { VueCheckbox: VueCheckbox },
    data: function () {
        return {
            model: false,
        };
    },
    template: "<vue-checkbox label=\"radio button\" name=\"radio\" id=\"radio\" radio disabled @click=\"action\" v-model=\"model\" />",
    methods: {
        action: action('@onClick'),
    },
}); }));
//# sourceMappingURL=VueCheckbox.stories.js.map