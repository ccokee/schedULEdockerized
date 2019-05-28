import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueMarkdown from './VueMarkdown.vue';
var story = storiesOf('Organisms|Markdown', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueMarkdown: VueMarkdown },
    template: "\n<vue-markdown>\n# headline 1\n## headline 2\n\n- test\n- test\n  - test\n</vue-markdown>",
}); }));
//# sourceMappingURL=VueMarkdown.stories.js.map