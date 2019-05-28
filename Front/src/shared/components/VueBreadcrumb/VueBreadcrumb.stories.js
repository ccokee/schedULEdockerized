import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueBreadcrumb from './VueBreadcrumb.vue';
var story = storiesOf('Molecules|Breadcrumb', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueBreadcrumb: VueBreadcrumb },
    template: "<vue-breadcrumb :items=\"[{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb', href: '/components/breadcrumb' }]\" />",
}); }));
//# sourceMappingURL=VueBreadcrumb.stories.js.map