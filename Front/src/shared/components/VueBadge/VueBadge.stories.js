import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueBadge from './VueBadge.vue';
import { brandVariations } from '@components/utils';
var story = storiesOf('Atoms|Badge', module);
story.add('Badge Variants', withInfo({})(function () { return ({
    components: { VueBadge: VueBadge },
    data: function () {
        return {
            variations: brandVariations,
        };
    },
    template: "<div>\n<template v-for=\"variation in variations\">\n<vue-badge :color=\"variation\">{{ variation }}</vue-badge>\n<vue-badge :color=\"variation\" outlined>{{ variation }} outlined</vue-badge>\n<br />\n<br />\n</template>\n</div>",
}); }));
//# sourceMappingURL=VueBadge.stories.js.map