import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueSidebar from './VueSidebar.vue';
import VueSidebarGroup from './VueSidebarGroup/VueSidebarGroup.vue';
import VueSidebarGroupItem from './VueSidebarGroupItem/VueSidebarGroupItem.vue';
import VueIconCode from '../icons/VueIconCode/VueIconCode.vue';
var story = storiesOf('Organisms|Sidebar', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueSidebar: VueSidebar },
    template: "<vue-sidebar>VueSidebar</vue-sidebar>",
}); }));
story.add('Internal Navigation', withInfo({})(function () { return ({
    components: { VueSidebar: VueSidebar, VueSidebarGroup: VueSidebarGroup, VueSidebarGroupItem: VueSidebarGroupItem, VueIconCode: VueIconCode },
    template: "<vue-sidebar>\n  <vue-sidebar-group title=\"Navigation\">\n  <vue-sidebar-group-item to=\"/\">\n  <vue-icon-code />\n  Home\n</vue-sidebar-group-item>\n  <vue-sidebar-group-item to=\"/docs\">\n  Docs\n</vue-sidebar-group-item>\n  </vue-sidebar-group>\n</vue-sidebar>",
}); }));
story.add('External Navigation', withInfo({})(function () { return ({
    components: { VueSidebar: VueSidebar, VueSidebarGroup: VueSidebarGroup, VueSidebarGroupItem: VueSidebarGroupItem, VueIconCode: VueIconCode },
    template: "<vue-sidebar>\n  <vue-sidebar-group title=\"Navigation\">\n        <vue-sidebar-group-item>\n          <a href=\"https://github.com/vuesion/vuesion\" target=\"_blank\" rel=\"noopener\">\n            <vue-icon-code />\n            Github\n          </a>\n        </vue-sidebar-group-item>\n  </vue-sidebar-group>\n</vue-sidebar>",
}); }));
//# sourceMappingURL=VueSidebar.stories.js.map