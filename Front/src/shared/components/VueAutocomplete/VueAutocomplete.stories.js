import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withInfo } from 'storybook-addon-vue-info';
import VueAutocomplete from './VueAutocomplete.vue';
import { AutocompleteOptionsFixture } from './fixtures/IAutocompleteFixture';
import { i18n } from '../../plugins/i18n/i18n';
var story = storiesOf('Organisms|Autocomplete', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueAutocomplete: VueAutocomplete },
    data: function () {
        return {
            autocompleteOptions: [],
        };
    },
    methods: {
        onRequest: function (query) {
            action('@request');
            var returnOptions = Math.random() > 0.5 || query.indexOf('foo') > -1;
            if (returnOptions) {
                this.autocompleteOptions = AutocompleteOptionsFixture;
            }
            else {
                this.autocompleteOptions = [];
            }
        },
        request: action('@request'),
        change: action('@change'),
    },
    template: "<vue-autocomplete\n            :options=\"autocompleteOptions\"\n            :max-options=\"3\"\n            placeholder=\"Type something (e.g. foo)\"\n            @request=\"onRequest($event);request($event)\"\n            @change=\"change\"/>",
    i18n: i18n,
}); }));
story.add('Loading', withInfo({})(function () { return ({
    components: { VueAutocomplete: VueAutocomplete },
    data: function () {
        return {
            isLoading: false,
            autocompleteOptions: [],
        };
    },
    methods: {
        onRequest: function (query) {
            var _this = this;
            action('@request');
            this.isLoading = true;
            setTimeout(function () {
                var returnOptions = Math.random() > 0.5 || query.indexOf('foo') > -1;
                if (returnOptions) {
                    _this.autocompleteOptions = AutocompleteOptionsFixture;
                }
                else {
                    _this.autocompleteOptions = [];
                }
                _this.isLoading = false;
            }, 2000);
        },
        request: action('@request'),
        change: action('@change'),
    },
    template: "<vue-autocomplete\n            :options=\"autocompleteOptions\"\n            :max-options=\"3\"\n            :is-loading=\"isLoading\"\n            placeholder=\"Type something (e.g. foo)\"\n            @request=\"onRequest($event);request($event)\"\n            @change=\"change\"/>",
    i18n: i18n,
}); }));
//# sourceMappingURL=VueAutocomplete.stories.js.map