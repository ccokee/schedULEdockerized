import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueInput from './VueInput.vue';
import VueButton from '../VueButton/VueButton.vue';
import VueModal from '../VueModal/VueModal.vue';
var story = storiesOf('Atoms|Input', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueInput: VueInput },
    data: function () {
        return {
            model: '',
        };
    },
    template: "<vue-input placeholder=\"Name\" name=\"name\" id=\"name\" v-model=\"model\" />",
}); }));
story.add('Disabled', withInfo({})(function () { return ({
    components: { VueInput: VueInput },
    data: function () {
        return {
            model: '',
        };
    },
    template: "<vue-input placeholder=\"Name\" name=\"name\" id=\"name\" v-model=\"model\" :disabled=\"true\" />",
}); }));
story.add('Hint', withInfo({})(function () { return ({
    components: { VueInput: VueInput },
    data: function () {
        return {
            model: '',
        };
    },
    template: "<vue-input placeholder=\"Name\" name=\"name\" id=\"name\" v-model=\"model\" message=\"description\" />",
}); }));
story.add('Validation/Error state', withInfo({})(function () { return ({
    components: { VueInput: VueInput },
    data: function () {
        return {
            model: '',
        };
    },
    template: "<vue-input placeholder=\"Name\" name=\"name\" id=\"name\" v-model=\"model\" validation=\"required|integer\" required message=\"please enter a number\" errorMessage=\"This is not a number\" />",
}); }));
story.add('Readonly', withInfo({})(function () { return ({
    components: { VueInput: VueInput },
    data: function () {
        return {
            model: '',
        };
    },
    template: "<vue-input placeholder=\"Name\" name=\"name\" id=\"name\" value=\"foo\" readonly />",
}); }));
story.add('SPA autofocus', withInfo({ propTablesExclude: [VueButton, VueModal] })(function () { return ({
    components: { VueInput: VueInput, VueButton: VueButton, VueModal: VueModal },
    data: function () {
        return {
            model: '',
            show: false,
        };
    },
    template: "<div>\n  <vue-button @click=\"show = !show\" color=\"primary\">Login</vue-button>\n\n  <vue-modal :show=\"show\" @close=\"show = false\">\n    <vue-input autofocus placeholder=\"Name\" name=\"name\" id=\"name\" v-model=\"model\" />\n    <vue-button ghost @click=\"show = !show\">Close</vue-button>\n  </vue-modal>\n</div>",
}); }));
//# sourceMappingURL=VueInput.stories.js.map