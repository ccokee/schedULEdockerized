import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueModal from './VueModal.vue';
import VueButton from '../VueButton/VueButton.vue';
var story = storiesOf('Molecules|Modal', module);
story.add('Default', withInfo({ propTablesExclude: [VueButton] })(function () { return ({
    components: { VueModal: VueModal, VueButton: VueButton },
    data: function () {
        return {
            show: false,
        };
    },
    template: "\n<div>\n  <vue-button @click=\"show = true\" color=\"secondary\">Show</vue-button>\n  <vue-modal :show=\"show\" @close=\"show = false\">\n    <vue-button color=\"primary\" @click=\"show = false\">Hide</vue-button>\n  </vue-modal>\n</div>\n  ",
}); }));
story.add('Fit Content', withInfo({ propTablesExclude: [VueButton] })(function () { return ({
    components: { VueModal: VueModal, VueButton: VueButton },
    data: function () {
        return {
            show: false,
        };
    },
    template: "\n<div>\n  <vue-button @click=\"show = true\" color=\"secondary\">Show</vue-button>\n  <vue-modal :show=\"show\" @close=\"show = false\" fit-content>\n    <vue-button style=\"margin: 0;\" color=\"primary\" @click=\"show = false\">Hide</vue-button>\n  </vue-modal>\n</div>\n  ",
}); }));
//# sourceMappingURL=VueModal.stories.js.map