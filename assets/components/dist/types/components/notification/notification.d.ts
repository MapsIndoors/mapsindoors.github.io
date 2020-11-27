import { JSX } from '../../stencil-public-runtime';
import { NotificationPosition } from './notification-position.enum';
import { NotificationType } from './notification-type.enum';
import { NotificationMessage } from './notification-message.interface';
export declare class Notification {
    /**
     * @description Host element containing the component.
     * @private
     * @type {HTMLElement}
     */
    private hostElement;
    /**
     * @description Where the notifications should be positioned.
     * @type {NotificationPosition}
     */
    position: NotificationPosition;
    /**
     * @description Time the notification should be visible.
     * @type {number} - Duration in seconds.
     */
    duration: number;
    /**
     * @description List of currently displayed notifications.
     * @private
     * @type {NotificationMessage[]}
     */
    private notifications;
    /**
     * @description Used for setting a unique identifier for each notification.
     * @private
     */
    private notificationId;
    /**
     * @description Show a notification.
     * @param {string} message - Message to display.
     * @param {string} [type='none'] - Type of notification. Available types: 'info', 'warning', 'success', 'error' and 'none'.
     * @param {boolean} [sticky=false] - Set message as sticky to prevent it from disappearing.
     * @returns {Promise<void>}
     */
    push(message: string, type?: string, sticky?: boolean): Promise<void>;
    /**
     * @description Clear all notifications.
     * @returns {Promise<void>}
     */
    clearAll(): Promise<void>;
    /**
     * @description Dismiss a single notification.
     * @private
     * @param {number} id
     */
    private dismiss;
    render(): JSX.Element;
    /**
     * @description Get JSX for notification.
     * @param {NotificationMessage} { id, message }
     * @returns {JSX.Element}
     */
    renderNotification({ id, message, type }: NotificationMessage): JSX.Element;
    /**
     * @description Get JSX for type-icon.
     * @param {NotificationType} type
     * @returns {JSX.Element}
     */
    renderIcon(type: NotificationType): JSX.Element;
}
