import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueDonutChart from './VueDonutChart.vue';
var story = storiesOf('Organisms|DonutChart', module);
story.add('Donut', withInfo({})(function () { return ({
    components: { VueDonutChart: VueDonutChart },
    data: function () {
        return {
            data: [
                { label: 'Ironman', value: 892 },
                { label: 'Vision', value: 480 },
                { label: 'Hulk', value: 1506 },
                { label: 'Spiderman', value: 795 },
                { label: 'Thor', value: 579 },
                { label: 'Ant-man', value: 230 },
            ],
        };
    },
    template: "\n<div style=\"width:50%\">\n  <vue-donut-chart title=\"Who would win?\" :data=\"data\" unit=\"Votes\" />\n</div>\n",
}); }));
story.add('Pie', withInfo({})(function () { return ({
    components: { VueDonutChart: VueDonutChart },
    data: function () {
        return {
            data: [
                { label: 'Ironman', value: 892 },
                { label: 'Vision', value: 480 },
                { label: 'Hulk', value: 1506 },
                { label: 'Spiderman', value: 795 },
                { label: 'Thor', value: 579 },
                { label: 'Ant-man', value: 230 },
            ],
        };
    },
    template: "\n<div style=\"width:50%\">\n  <vue-donut-chart title=\"Who would win?\" :data=\"data\" unit=\"Votes\" type=\"pie\" />\n</div>\n",
}); }));
//# sourceMappingURL=VueDonutChart.stories.js.map