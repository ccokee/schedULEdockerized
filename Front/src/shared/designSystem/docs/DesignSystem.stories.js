/* tslint:disable */
import { storiesOf } from '@storybook/vue';
import { withInfo } from 'storybook-addon-vue-info';
import VueMarkdown from '@components/VueMarkdown/VueMarkdown.vue';
import BrandColors from './components/BrandColors.vue';
import ColorPalette from './components/ColorPalette.vue';
var story = storiesOf('Design System|Design System', module);
story.addParameters({ options: { showAddonPanel: false } });
story.add('Intro', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [VueMarkdown],
})(function () { return ({
    components: { VueMarkdown: VueMarkdown },
    template: "<vue-markdown>\n# Design System\n\nVuesion comes with a Design System that you can 100% customize.\n\n**_The files for customizing the Design System are located in `./src/app/shared/design-system`._**\n\nDesign Systems are really complex and the key to a good Design System is\nconsistency.\n\nIt is hard to achieve a unique Brand Identity with a UI toolkit that is already build on top of another Design System (e.g. Material Design).\nIt is also hard to achieve consistency if you have to combine multiple UI libraries without forking\nand customizing them to fit your Brand Identity.\n\n_Over the years we discovered that it's much harder to maintain all of these forks for a project than\nbuilding our own set of components that are **100% customizable** because the code is 100% accessible._\n\nThis Design System is the next step, it is a blueprint that enables you to create your very own Design System that perfectly fits your\nBrand or your clients Corporate Identity.\n\nWe are aware that not everyone has to implement their own professional Design System.\nIf this is the case for you, you might be interested in [integrating a 3rd party UI library](/docs/tutorials/third-party.html)\n</vue-markdown>\n",
}); }));
story = storiesOf('Design System|Branding', module);
story.addParameters({ options: { showAddonPanel: false } });
story.add('1. Color Palette', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [VueMarkdown, ColorPalette],
})(function () { return ({
    components: { VueMarkdown: VueMarkdown, ColorPalette: ColorPalette },
    template: "<div>\n<vue-markdown>\n### Color Palette\n</vue-markdown>\n<color-palette />\n</div>\n",
}); }));
story.add('2. Brand Colors', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [VueMarkdown, BrandColors],
})(function () { return ({
    components: { VueMarkdown: VueMarkdown, BrandColors: BrandColors },
    template: "<div>\n<vue-markdown>\n### Brand Colors\nEvery brand color is related to a color of the color palette.\n</vue-markdown>\n<brand-colors/>\n</div>\n",
}); }));
story = storiesOf('Design System|Typography', module);
story.addParameters({ options: { showAddonPanel: false } });
story.add('Typography', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [VueMarkdown],
})(function () { return ({
    components: { VueMarkdown: VueMarkdown },
    template: "<vue-markdown>\n## Typography\nInter is the standard type face for the Design System blueprint.\n\n### Font Weights\nVariable             | Weight\n---------------------|-------\n$font-weight-light   | 200\n$font-weight-regular | 400\n$font-weight-bold    | 600\n\n### Font Sizes\nLevel          | Font-size   | Font-weight\n---------------|-------------|------------\nSmall Text     | 80%         | $font-weight-light\nParagraph      | 1.6rem      | $font-weight-light\nH1             | 4.8rem      | $font-weight-regular\nH2             | 3.2rem      | $font-weight-regular\nH3             | 2.4rem      | $font-weight-regular\nH4             | 2rem        | $font-weight-regular\nH5             | 1.6rem      | $font-weight-regular\nH4             | 1.6rem      | $font-weight-regular\n\n### Line heights\nLine height is measured by taking the font size and adding 0.8rem. \n\n### List Style\nLists are indented by 1.6rem.\n</vue-markdown>\n",
}); }));
story = storiesOf('Design System|Layout', module);
story.addParameters({ options: { showAddonPanel: false } });
story.add('Layout', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [VueMarkdown],
})(function () { return ({
    components: { VueMarkdown: VueMarkdown },
    template: "<vue-markdown>\n## Layout\nThe Grid-System is based on Flex box and comes in form of three included components.\n\nComponent     | Purpose\n--------------|-------\nVueGrid       | Container that is limited in the width, general page layout\nVueGridRow    | Row that is always 100% width and will be stacked on the page\nVueGridItem   | Item in the row that will be distributed equally on the page \n\n### Spacing\nTo keep the spacing consistent we have a couple of variables with the prefix `$space-`\n\nVariable   | Space in pixel\n-----------|---------------\n$space-2   |   2px\n$space-4   |   4px\n$space-8   |   8px\n$space-12  |  12px\n$space-16  |  16px\n$space-20  |  20px\n$space-24  |  24px\n$space-32  |  32px\n$space-40  |  40px\n$space-48  |  48px\n$space-52  |  52px\n$space-84  |  84px\n</vue-markdown>\n",
}); }));
story = storiesOf('Design System|Break points', module);
story.addParameters({ options: { showAddonPanel: false } });
story.add('Break points', withInfo({
    header: false,
    source: false,
    propTables: false,
    styles: { propTableHead: { display: 'none' } },
    propTablesExclude: [VueMarkdown],
})(function () { return ({
    components: { VueMarkdown: VueMarkdown },
    template: "<vue-markdown>\n## Break points\nIf you want to use a break point inside one of your components, we provide you width\nmixins to keep everything consistent and to avoid unnecessary media definitions:\n\n`@include mediaMin(break-point-id)`\n\n`@include mediaMax(break-point-id)`\n\nBreak Point Id   | MinWidth | MaxWidth | GutterWidth\n-----------------|----------|----------|------------\nphone            | 320px    | 319px    | 3.2rem\ntabletPortrait   | 768px    | 767px    | 3.2rem\ntabletLandscape  | 1024px   | 1023px   | 3.2rem\nsmallDesktop     | 1280px   | 1279px   | 3.2rem\nlargeDesktop     | 1440px   | 1439px   | 3.2rem\n</vue-markdown>\n",
}); }));
//# sourceMappingURL=DesignSystem.stories.js.map