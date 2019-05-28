import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueHeadline from './VueHeadline.vue';
var story = storiesOf('Atoms|Headline', module);
story.add('Headlines regular', withInfo({})(function () { return ({
    components: { VueHeadline: VueHeadline },
    template: "<div>\n<vue-headline level=\"1\">Headline 1</vue-headline>\n<vue-headline level=\"2\">Headline 2</vue-headline>\n<vue-headline level=\"3\">Headline 3</vue-headline>\n<vue-headline level=\"4\">Headline 4</vue-headline>\n<vue-headline level=\"5\">Headline 5</vue-headline>\n<vue-headline level=\"6\">Headline 6</vue-headline>\n</div>",
}); }));
story.add('Semantic headline with different style', withInfo({})(function () { return ({
    components: { VueHeadline: VueHeadline },
    template: "<div>\n<vue-headline level=\"1\" appearance-level=\"6\">Headline 1 with Headline 6 style</vue-headline>\n</div>",
}); }));
story.add('DIV as headline', withInfo({})(function () { return ({
    components: { VueHeadline: VueHeadline },
    template: "<div>\n<vue-headline level=\"1\" :native=\"false\">Headline 1 without semantics</vue-headline>\n</div>",
}); }));
//# sourceMappingURL=VueHeadline.stories.js.map