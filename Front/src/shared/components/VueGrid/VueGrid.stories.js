import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueGrid from './VueGrid.vue';
import VueGridItem from '../VueGridItem/VueGridItem.vue';
import VueGridRow from '../VueGridRow/VueGridRow.vue';
var story = storiesOf('Molecules|Grid', module);
story.add('Default', withInfo({})(function () { return ({
    components: { VueGrid: VueGrid },
    template: "<vue-grid>VueGrid</vue-grid>",
}); }));
story.add('With rows and items', withInfo({})(function () { return ({
    components: { VueGrid: VueGrid, VueGridItem: VueGridItem, VueGridRow: VueGridRow },
    template: "<vue-grid>\n                 <vue-grid-row>\n                   <vue-grid-item>item 1</vue-grid-item>\n                 </vue-grid-row>\n                 <vue-grid-row>\n                   <vue-grid-item>item 2</vue-grid-item>\n                   <vue-grid-item>item 3</vue-grid-item>\n                 </vue-grid-row>\n               </vue-grid>",
}); }));
story.add('With row inside a row', withInfo({})(function () { return ({
    components: { VueGrid: VueGrid, VueGridItem: VueGridItem, VueGridRow: VueGridRow },
    template: "<vue-grid>\n                 <vue-grid-row>\n                   <vue-grid-item>item 1</vue-grid-item>\n                 </vue-grid-row>\n                 <vue-grid-row>\n                   <vue-grid-item>\n                     <vue-grid-row>\n                       <vue-grid-item>item 2</vue-grid-item>\n                       <vue-grid-item>item 3</vue-grid-item>\n                     </vue-grid-row>\n                     <vue-grid-row>\n                       <vue-grid-item>item 4</vue-grid-item>\n                       <vue-grid-item>item 5</vue-grid-item>\n                     </vue-grid-row>\n                   </vue-grid-item>\n                   <vue-grid-item>item 6</vue-grid-item>\n                 </vue-grid-row>\n               </vue-grid>",
}); }));
//# sourceMappingURL=VueGrid.stories.js.map