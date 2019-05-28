import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withInfo } from 'storybook-addon-vue-info';
import VueButton from './VueButton.vue';
import { brandVariations } from '@components/utils';
var story = storiesOf('Atoms|Button', module);
story.add('Button Variants', withInfo({})(function () { return ({
    components: { VueButton: VueButton },
    data: function () {
        return {
            variations: brandVariations,
        };
    },
    template: "<div>\n<template v-for=\"variation in variations\">\n<vue-button @click=\"action\" :color=\"variation\">{{ variation }}</vue-button>\n<vue-button @click=\"action\" :color=\"variation\" disabled>{{ variation }} disabled</vue-button>\n<vue-button @click=\"action\" :color=\"variation\" outlined>{{ variation }} outlined</vue-button>\n<vue-button @click=\"action\" :color=\"variation\" ghost>{{ variation }} ghost</vue-button>\n<vue-button @click=\"action\" :color=\"variation\" loading>{{ variation }} loading</vue-button>\n<br />\n<br />\n</template>\n</div>\n",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Button as Link', withInfo({})(function () { return ({
    components: { VueButton: VueButton },
    template: "<div>\nRouter-Link<br/>\n<vue-button @click=\"action\" as=\"router-link\" color=\"primary\" target=\"/\">Router Link</vue-button>\n<vue-button @click=\"action\" as=\"router-link\" color=\"primary\" target=\"/\" disabled>Router Link</vue-button>\n<vue-button @click=\"action\" as=\"router-link\" color=\"primary\" target=\"/\" outlined>Router Link</vue-button>\n<vue-button @click=\"action\" as=\"router-link\" color=\"primary\" target=\"/\" ghost>Router Link</vue-button>\n<vue-button @click=\"action\" as=\"router-link\" color=\"primary\" target=\"/\" loading>Router Link</vue-button>\n<br/>\n<br/>\nA-Element: <br/>\n<vue-button @click=\"action\" as=\"a\" color=\"primary\" target=\"/\">Anchor</vue-button>\n<vue-button @click=\"action\" as=\"a\" color=\"primary\" target=\"/\" disabled>Anchor</vue-button>\n<vue-button @click=\"action\" as=\"a\" color=\"primary\" target=\"/\" outlined>Anchor</vue-button>\n<vue-button @click=\"action\" as=\"a\" color=\"primary\" target=\"/\" ghost>Anchor</vue-button>\n<vue-button @click=\"action\" as=\"a\" color=\"primary\" target=\"/\" loading>Anchor</vue-button>\n</div>\n",
    methods: {
        action: action('@onClick'),
    },
}); }));
//# sourceMappingURL=VueButton.stories.js.map