import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueAccordion from './VueAccordion.vue';
import VueAccordionItem from './VueAccordionItem/VueAccordionItem.vue';
var story = storiesOf('Organisms|Accordion', module);
var storySchema = [
    {
        label: 'Default',
    },
    {
        label: 'Multiple',
        props: ['multiple'],
    },
];
var _loop_1 = function (item) {
    story.add(item.label, withInfo({})(function () { return ({
        components: {
            VueAccordion: VueAccordion,
            VueAccordionItem: VueAccordionItem,
        },
        template: "<vue-accordion " + (item.props ? item.props.join(' ') : '') + ">\n  <vue-accordion-item title=\"Item 1\" :initOpen=\"true\">\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n  </vue-accordion-item>\n  <vue-accordion-item title=\"Item 2\">\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n    labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores\n    et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.\n  </vue-accordion-item>\n</vue-accordion>",
    }); }));
};
for (var _i = 0, storySchema_1 = storySchema; _i < storySchema_1.length; _i++) {
    var item = storySchema_1[_i];
    _loop_1(item);
}
//# sourceMappingURL=VueAccordion.stories.js.map