import { createLocalVue, mount } from '@vue/test-utils';
import VueMarkdown from './VueMarkdown.vue';
var localVue = createLocalVue();
describe('VueMarkdown.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueMarkdown, {
            localVue: localVue,
            slots: {
                default: ['<img src="/test.jpg"/># foo\n ## bar\n ### baz'],
            },
        });
        expect(wrapper.find('h1').text()).toBe('foo');
        expect(wrapper.find('h2').text()).toBe('bar');
        expect(wrapper.find('h3').text()).toBe('baz');
        wrapper.vm.$forceUpdate();
        wrapper.destroy();
    });
    test('renders component with trimmed text', function () {
        var wrapper = mount(VueMarkdown, {
            localVue: localVue,
            slots: {
                default: ['       foo bar'],
            },
        });
        expect(wrapper.contains('code')).toBe(false);
        expect(wrapper.find('div').text()).toBe('foo bar');
    });
    test('renders component with trimmed text and shows as code', function () {
        var wrapper = mount(VueMarkdown, {
            localVue: localVue,
            slots: {
                default: ["       `foo bar`"],
            },
        });
        expect(wrapper.find('code').text()).toBe('foo bar');
    });
    test('click on a link should use the router', function () {
        var $router = {
            push: jest.fn(),
        };
        var wrapper = mount(VueMarkdown, {
            localVue: localVue,
            mocks: {
                $router: $router,
            },
            slots: {
                default: ['[test](/test)'],
            },
        });
        var actual = $router.push;
        var expected = '/test';
        wrapper.find('a').trigger('click');
        expect(actual).toHaveBeenCalledWith(expected);
    });
});
//# sourceMappingURL=VueMarkdown.spec.js.map