import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueNotificationStack from './VueNotificationStack.vue';
import VueButton from '../VueButton/VueButton.vue';
import { addNotification } from './utils';
var story = storiesOf('Molecules|NotificationStack', module);
story.add('Default', withInfo({ propTablesExclude: [VueButton] })(function () { return ({
    components: { VueNotificationStack: VueNotificationStack, VueButton: VueButton },
    template: "\n<div>\n  <vue-notification-stack />\n  <vue-button color=\"secondary\" @click=\"addNotificationClick\">add notification</vue-button>\n</div>\n",
    methods: {
        addNotificationClick: function () {
            addNotification({
                title: 'this is a test',
                text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
            });
        },
    },
}); }));
//# sourceMappingURL=VueNotificationStack.stories.js.map