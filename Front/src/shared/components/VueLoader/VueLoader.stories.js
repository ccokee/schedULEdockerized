import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueLoader from './VueLoader.vue';
import { brandVariations } from '@components/utils';
var story = storiesOf('Atoms|Loader', module);
story.add('Loader Variants', withInfo({})(function () { return ({
    components: { VueLoader: VueLoader },
    data: function () {
        return {
            variations: brandVariations,
        };
    },
    template: "<div>\n<template v-for=\"variation in variations\">\n<vue-loader :color=\"variation\" />\n<vue-loader :color=\"variation\" medium />\n<vue-loader :color=\"variation\" large />\n<br />\n<br />\n</template>\n</div>",
}); }));
//# sourceMappingURL=VueLoader.stories.js.map