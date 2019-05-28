import { mount, createLocalVue } from '@vue/test-utils';
import VueNotificationStack from './VueNotificationStack.vue';
import { addNotification } from './utils';
var localVue = createLocalVue();
describe('VueNotificationStack.vue', function () {
    test('renders component', function () {
        var wrapper = mount(VueNotificationStack, {
            localVue: localVue,
        });
        var notification = {
            title: 'this is a test',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
        };
        expect(wrapper.vm.notifications).toHaveLength(0);
    });
    test('add and remove notification', function () {
        var wrapper = mount(VueNotificationStack, {
            localVue: localVue,
        });
        var notification = {
            title: 'this is a test',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
        };
        expect(wrapper.vm.notifications).toHaveLength(0);
        addNotification(Object.assign({}, notification));
        addNotification(Object.assign({}, notification));
        addNotification(Object.assign({}, notification));
        expect(wrapper.vm.notifications).toHaveLength(3);
        wrapper.vm.removeNotification({ id: 1 });
        expect(wrapper.vm.notifications).toHaveLength(2);
    });
    test('should remove notification after 100 ms', function (done) {
        var wrapper = mount(VueNotificationStack, {
            localVue: localVue,
            propsData: {
                duration: 100,
            },
        });
        var notification = {
            title: 'this is a test',
            text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod',
        };
        expect(wrapper.vm.notifications).toHaveLength(0);
        addNotification(Object.assign({}, notification));
        addNotification(Object.assign({}, notification));
        addNotification(Object.assign({}, notification));
        expect(wrapper.vm.notifications).toHaveLength(3);
        setTimeout(function () {
            expect(wrapper.vm.notifications).toHaveLength(0);
            done();
        }, 200);
    });
});
//# sourceMappingURL=VueNotificationStack.spec.js.map