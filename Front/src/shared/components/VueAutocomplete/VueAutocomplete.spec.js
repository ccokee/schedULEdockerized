import { createLocalVue, mount, shallowMount } from '@vue/test-utils';
import VueAutocomplete from './VueAutocomplete.vue';
import VueLoader from '../VueLoader/VueLoader.vue';
import { AutocompleteOptionsFixture } from './fixtures/IAutocompleteFixture';
import { i18n } from '../../plugins/i18n/i18n';
var localVue = createLocalVue();
describe('VueAutocomplete.vue', function () {
    test('renders and destroys component', function () {
        var wrapper = shallowMount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.$destroy();
        expect(wrapper.props().placeholder).toBe('Type something');
    });
    test('renders component with loader', function () {
        var wrapper = shallowMount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
                isLoading: true,
            },
        });
        expect(wrapper.findAll(VueLoader)).toHaveLength(1);
    });
    test('onFocus', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.searchQuery = 'Te';
        wrapper.vm.onFocus();
        expect(wrapper.vm.isOpen).toBe(false);
        wrapper.vm.searchQuery = 'Test123';
        wrapper.vm.onFocus();
        expect(wrapper.vm.isOpen).toBe(true);
    });
    test('onArrowDown', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.isOpen = false;
        wrapper.vm.onArrowDown();
        expect(wrapper.vm.selectedOptionIndex).toBe(0);
        wrapper.vm.isOpen = true;
        wrapper.vm.onArrowDown();
        expect(wrapper.vm.selectedOptionIndex).toBe(1);
        wrapper.vm.isOpen = true;
        wrapper.vm.selectedOptionIndex = AutocompleteOptionsFixture.length;
        wrapper.vm.onArrowDown();
        expect(wrapper.vm.selectedOptionIndex).toBe(0);
    });
    test('onArrowUp', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.isOpen = false;
        wrapper.vm.onArrowUp();
        expect(wrapper.vm.selectedOptionIndex).toBe(0);
        wrapper.vm.isOpen = true;
        wrapper.vm.onArrowUp();
        expect(wrapper.vm.selectedOptionIndex).toBe(8);
        wrapper.vm.isOpen = true;
        wrapper.vm.onArrowUp();
        expect(wrapper.vm.selectedOptionIndex).toBe(7);
    });
    test('handleClickOutside', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.search = 'Test';
        wrapper.vm.handleOutsideClick({ target: null });
        expect(wrapper.vm.isOpen).toBeFalsy();
        wrapper.vm.isOpen = true;
        wrapper.vm.handleOutsideClick({ target: wrapper.find('div').element });
        expect(wrapper.vm.isOpen).toBeTruthy();
    });
    test('onEnterKeyPress', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.onEnterKeyPress();
        wrapper.vm.searchQuery = 'Test';
        wrapper.vm.selectedOptionIndex = -1;
        wrapper.vm.onEnterKeyPress();
        expect(wrapper.emitted().change[0][0]).toEqual(AutocompleteOptionsFixture[0]);
        wrapper.vm.searchQuery = 'Test2';
        wrapper.vm.selectedOptionIndex = 1;
        wrapper.vm.onEnterKeyPress();
        expect(wrapper.emitted().change[1][0]).toEqual(AutocompleteOptionsFixture[1]);
    });
    test('onOptionClick', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.searchQuery = 'foo2';
        wrapper.vm.onOptionClick(1);
        expect(wrapper.emitted().change).toHaveLength(1);
        wrapper.vm.onOptionClick(1);
        expect(wrapper.emitted().change).toHaveLength(2);
        wrapper.vm.searchQuery = 'Test';
        wrapper.vm.onOptionClick(1);
        expect(wrapper.emitted().change[0][0]).toEqual(AutocompleteOptionsFixture[1]);
    });
    test('onInput', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.searchQuery = '';
        wrapper.vm.onInput('');
        expect(wrapper.vm.isOpen).toBe(false);
        wrapper.vm.searchQuery = 'Test';
        wrapper.vm.emitRequest = jest.fn();
        wrapper.vm.onInput('Test');
        expect(wrapper.vm.emitRequest).toHaveBeenCalled();
    });
    test('emitRequest', function (done) {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                options: AutocompleteOptionsFixture,
            },
        });
        wrapper.vm.searchQuery = 'Test';
        wrapper.vm.emitRequest();
        setTimeout(function () {
            expect(wrapper.emitted().request).toBeTruthy();
            done();
        }, 300);
    });
    test('setResultContainerHeight', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                maxOptions: 10,
            },
        });
        wrapper.vm.isOpen = true;
        wrapper.vm.$refs.resultContainer = {
            firstChild: {
                offsetHeight: 10,
            },
        };
        wrapper.vm.setResultContainerHeight();
        expect(wrapper.vm.resultContainerHeight).toBe(10);
        wrapper.setProps({ options: AutocompleteOptionsFixture });
        wrapper.vm.setResultContainerHeight();
        expect(wrapper.vm.resultContainerHeight).toBe(90);
        wrapper.setProps({ maxOptions: 5 });
        wrapper.vm.setResultContainerHeight();
        expect(wrapper.vm.resultContainerHeight).toBe(55);
    });
    test('onFocusItem', function () {
        var wrapper = mount(VueAutocomplete, {
            localVue: localVue,
            i18n: i18n,
            propsData: {
                placeholder: 'Type something',
                maxOptions: 10,
            },
        });
        wrapper.vm.isOpen = true;
        wrapper.vm.$refs.resultContainer = {
            clientHeight: 100,
            scrollHeight: 0,
            scrollTop: 0,
        };
        wrapper.vm.onFocusItem();
        expect(wrapper.vm.$refs.resultContainer.scrollTop).toBe(0);
        wrapper.vm.$refs.resultContainer = {
            clientHeight: 100,
            scrollHeight: 101,
            scrollTop: 0,
        };
        document.querySelector = function () {
            return {
                offsetTop: 100,
                offsetHeight: 10,
            };
        };
        wrapper.vm.onFocusItem();
        expect(wrapper.vm.$refs.resultContainer.scrollTop).toBe(10);
        wrapper.vm.$refs.resultContainer = {
            clientHeight: 100,
            scrollHeight: 101,
            scrollTop: 100,
        };
        document.querySelector = function () {
            return {
                offsetTop: 10,
                offsetHeight: 10,
            };
        };
        wrapper.vm.onFocusItem();
        expect(wrapper.vm.$refs.resultContainer.scrollTop).toBe(10);
        wrapper.vm.$refs.resultContainer = {
            clientHeight: 100,
            scrollHeight: 101,
            scrollTop: 100,
        };
        document.querySelector = function () {
            return {
                offsetTop: 100,
                offsetHeight: 10,
            };
        };
        wrapper.vm.onFocusItem();
        expect(wrapper.vm.$refs.resultContainer.scrollTop).toBe(100);
    });
});
//# sourceMappingURL=VueAutocomplete.spec.js.map