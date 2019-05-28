import { EventBus } from '../../services/EventBus';
export var addNotification = function (n) {
    EventBus.$emit('notification.add', n);
};
//# sourceMappingURL=utils.js.map