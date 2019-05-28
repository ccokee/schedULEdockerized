import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withInfo } from 'storybook-addon-vue-info';
import VueCookieConsent from './VueCookieConsent.vue';
import { i18n } from '../../plugins/i18n/i18n';
var story = storiesOf('Organisms|CookieConsent', module);
story.add('Default', withInfo({})(function () { return ({
    i18n: i18n,
    components: { VueCookieConsent: VueCookieConsent },
    template: "<vue-cookie-consent current-version=\"1.0.0\" cookie-consent-version=\"\" :set-cookie-consent-version=\"action\">\n                  VueCookieConsent\n                </vue-cookie-consent>",
    methods: {
        action: action('@onClick'),
    },
}); }));
//# sourceMappingURL=VueCookieConsent.stories.js.map