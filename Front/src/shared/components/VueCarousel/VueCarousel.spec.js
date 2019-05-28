import { createLocalVue, mount } from '@vue/test-utils';
import VueCarousel from './VueCarousel.vue';
var localVue = createLocalVue();
var images = [
    { alt: 'foo', copyright: 'foo', url: 'foo' },
    { alt: 'foo', copyright: 'foo', url: 'foo' },
    { alt: 'foo', copyright: 'foo', url: 'foo' },
];
describe('VueCarousel.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueCarousel, {
            localVue: localVue,
        });
        expect(wrapper.isVueInstance()).toBe(true);
        wrapper.destroy();
    });
    test('renders component with images', function (done) {
        var wrapper = mount(VueCarousel, {
            localVue: localVue,
            propsData: {
                images: images,
            },
        });
        setTimeout(function () {
            expect(wrapper.findAll('.image')).toHaveLength(1);
            done();
        }, 100);
    });
    test('should change slide', function () {
        var wrapper = mount(VueCarousel, {
            localVue: localVue,
            propsData: {
                images: images,
                intervalDuration: 10,
            },
        });
        expect(wrapper.vm.currentSlide).toBe(0);
        wrapper.vm.changeSlide();
        expect(wrapper.vm.currentSlide).toBe(1);
        wrapper.vm.changeSlide();
        expect(wrapper.vm.currentSlide).toBe(2);
        wrapper.vm.changeSlide();
        expect(wrapper.vm.currentSlide).toBe(0);
        wrapper.vm.pause = true;
        wrapper.vm.changeSlide();
        expect(wrapper.vm.currentSlide).toBe(0);
        wrapper.vm.pause = false;
        wrapper.vm.changeSlide();
        expect(wrapper.vm.currentSlide).toBe(1);
    });
});
//# sourceMappingURL=VueCarousel.spec.js.map