import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withInfo } from 'storybook-addon-vue-info';
import VueDropdownMenu from './VueDropdownMenu.vue';
var story = storiesOf('Atoms|DropdownMenu', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueDropdownMenu: VueDropdownMenu },
    template: "<div>This is a dropdown menu within\n<vue-dropdown-menu @click=\"action\"\n:options=\"[{ label: 'Save', value: 'save' }, { label: '', value: 'separator' }, { label: 'Open', value: 'open' }, { label: 'Delete', value: 'delete' }]\">\nFile\n</vue-dropdown-menu>\na normal text. It should perfectly fit.</div>",
    methods: {
        action: action('@onClick'),
    },
}); }));
story.add('Custom option renderer', withInfo({})(function () { return ({
    components: { VueDropdownMenu: VueDropdownMenu },
    template: "<div>This is a dropdown menu within\n<vue-dropdown-menu @click=\"action\"\n:options=\"[{ label: 'Save', value: 'save' }, { label: '', value: 'separator' }, { label: 'Open', value: 'open' }, { label: 'Delete', value: 'delete' }]\">\n  File\n\n  <template v-slot:option=\"{ option }\">\n    [icon placeholder] {{ option.label }}\n  </template>\n</vue-dropdown-menu>\na normal text. It should perfectly fit.</div>",
    methods: {
        action: action('@onClick'),
    },
}); }));
//# sourceMappingURL=VueDropdownMenu.stories.js.map