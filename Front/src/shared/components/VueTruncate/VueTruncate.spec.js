import { createLocalVue, mount } from '@vue/test-utils';
import VueTruncate from './VueTruncate.vue';
import { i18n } from '../../plugins/i18n/i18n';
var localVue = createLocalVue();
describe('VueTruncate.vue', function () {
    test('renders component and truncate text', function () {
        var wrapper = mount(VueTruncate, {
            i18n: i18n,
            localVue: localVue,
            slots: {
                default: "\n                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et<br/>\n  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet<br/>\n  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<br/>\n  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,<br/>\n  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,<br/>\n  no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            },
        });
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.vm.isTruncated).toBeTruthy();
    });
    test('renders component and not truncate text', function () {
        var getComputedStyle = window.getComputedStyle;
        window.getComputedStyle = function () {
            return {
                'line-height': 0,
            };
        };
        var wrapper = mount(VueTruncate, {
            i18n: i18n,
            localVue: localVue,
            slots: {
                default: "\n                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et<br/>\n  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet<br/>\n  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<br/>\n  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,<br/>\n  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,<br/>\n  no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            },
            propsData: {
                lines: 1,
            },
        });
        expect(wrapper.isVueInstance()).toBeTruthy();
        expect(wrapper.vm.isTruncated).toBeFalsy();
        window.getComputedStyle = getComputedStyle;
    });
    test('truncate text and show whole text and collapse text', function (done) {
        var wrapper = mount(VueTruncate, {
            i18n: i18n,
            localVue: localVue,
            slots: {
                default: "\n                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et<br/>\n  dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet<br/>\n  clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,<br/>\n  consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,<br/>\n  sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,<br/>\n  no sea takimata sanctus est Lorem ipsum dolor sit amet.",
            },
            propsData: {
                duration: 0,
            },
        });
        wrapper.vm.offsetHeight = 150;
        wrapper.vm.collapsedHeight = 25.6 * 3;
        wrapper.vm.lineHeight = 25.6;
        wrapper.vm.isTruncated = true;
        wrapper.vm.showMoreButton = true;
        wrapper.vm.showMore();
        setTimeout(function () {
            expect(wrapper.vm.showMoreButton).toBeFalsy();
            wrapper.vm.showLess();
            setTimeout(function () {
                expect(wrapper.vm.showMoreButton).toBeTruthy();
                done();
            }, 100);
        }, 100);
    });
});
//# sourceMappingURL=VueTruncate.spec.js.map