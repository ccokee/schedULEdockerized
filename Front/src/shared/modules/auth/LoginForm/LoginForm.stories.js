import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import { action } from '@storybook/addon-actions';
import LoginForm from './LoginForm.vue';
import { i18n } from '@shared/plugins/i18n/i18n';
var story = storiesOf('Organisms|LoginForm', module);
story.add('Default', withInfo({})(function () { return ({
    i18n: i18n,
    components: { LoginForm: LoginForm },
    template: "<login-form @submit=\"onSubmit\" />",
    methods: {
        onSubmit: action('@submit'),
    },
}); }));
//# sourceMappingURL=LoginForm.stories.js.map