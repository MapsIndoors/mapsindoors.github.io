import { h, Host, forceUpdate } from "@stencil/core";
import { NotificationPosition } from './notification-position.enum';
import { NotificationType } from './notification-type.enum';
export class Notification {
    constructor() {
        /**
         * @description Where the notifications should be positioned.
         * @type {NotificationPosition}
         */
        this.position = NotificationPosition.BOTTOM_RIGHT;
        /**
         * @description Time the notification should be visible.
         * @type {number} - Duration in seconds.
         */
        this.duration = 3;
        /**
         * @description List of currently displayed notifications.
         * @private
         * @type {NotificationMessage[]}
         */
        this.notifications = [];
        /**
         * @description Used for setting a unique identifier for each notification.
         * @private
         */
        this.notificationId = 0;
    }
    /**
     * @description Show a notification.
     * @param {string} message - Message to display.
     * @param {string} [type='none'] - Type of notification. Available types: 'info', 'warning', 'success', 'error' and 'none'.
     * @param {boolean} [sticky=false] - Set message as sticky to prevent it from disappearing.
     * @returns {Promise<void>}
     */
    async push(message, type = 'none', sticky = false) {
        if (typeof message !== 'string' || message.length < 1) {
            return;
        }
        // Check validity of type
        const typeExist = Object.values(NotificationType)
            .some((notificationType) => notificationType === type);
        if (!typeExist) {
            // eslint-disable-next-line no-console
            console.error('Invalid notification type');
            return;
        }
        const notificationMessage = {
            id: this.notificationId,
            message: message,
            sticky: sticky,
            type: type,
        };
        if (sticky === false) {
            notificationMessage.timer = window.setTimeout(() => this.dismiss(notificationMessage.id), (this.duration * 1000));
        }
        this.notificationId++;
        this.notifications.push(notificationMessage);
        forceUpdate(this.hostElement);
    }
    /**
     * @description Clear all notifications.
     * @returns {Promise<void>}
     */
    async clearAll() {
        this.notifications = [];
        forceUpdate(this.hostElement);
    }
    /**
     * @description Dismiss a single notification.
     * @private
     * @param {number} id
     */
    dismiss(id) {
        this.notifications = this.notifications.filter((notification) => notification.id !== id);
        forceUpdate(this.hostElement);
    }
    render() {
        return (h(Host, { class: this.position }, this.notifications.map((notification) => this.renderNotification(notification))));
    }
    /**
     * @description Get JSX for notification.
     * @param {NotificationMessage} { id, message }
     * @returns {JSX.Element}
     */
    renderNotification({ id, message, type }) {
        return (h("div", { class: "notification", role: "alert" },
            type && type !== 'none' ? this.renderIcon(type) : null,
            h("p", { class: "label" }, message),
            h("button", { type: "button", "aria-label": "Dismiss notification", class: "btn", onClick: () => this.dismiss(id) },
                h("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" },
                    h("path", { d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z", fill: "#1E2025" })))));
    }
    /**
     * @description Get JSX for type-icon.
     * @param {NotificationType} type
     * @returns {JSX.Element}
     */
    renderIcon(type) {
        if (type === NotificationType.Error) {
            return (h("div", { class: "icon icon-type--error" },
                h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" },
                    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V13H11V15H9ZM9 5V11H11V5H9Z", fill: "#FCFCFC" }))));
        }
        else if (type === NotificationType.Success) {
            return (h("div", { class: "icon icon-type--success" },
                h("svg", { width: "18", height: "14", viewBox: "0 0 18 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" },
                    h("path", { d: "M5.99997 11.17L1.82997 7L0.409973 8.41L5.99997 14L18 2L16.59 0.59L5.99997 11.17Z", fill: "#FCFCFC" }))));
        }
        else if (type === NotificationType.Warning) {
            return (h("div", { class: "icon icon-type--warning" },
                h("svg", { width: "22", height: "19", viewBox: "0 0 22 19", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" },
                    h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M22 19L11 0L0 19H22ZM10 16V14H12V16H10ZM10 12H12V8H10V12Z", fill: "#FCFCFC" }))));
        }
        return (h("div", { class: "icon icon-type--info" },
            h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" },
                h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V9H11V15H9ZM9 5V7H11V5H9Z", fill: "#FCFCFC" }))));
    }
    static get is() { return "mi-notification"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["notification.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["notification.css"]
    }; }
    static get properties() { return {
        "position": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "NotificationPosition",
                "resolved": "NotificationPosition.BOTTOM_CENTER | NotificationPosition.BOTTOM_LEFT | NotificationPosition.BOTTOM_RIGHT | NotificationPosition.TOP_CENTER | NotificationPosition.TOP_LEFT | NotificationPosition.TOP_RIGHT",
                "references": {
                    "NotificationPosition": {
                        "location": "import",
                        "path": "./notification-position.enum"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Where the notifications should be positioned.",
                        "name": "description"
                    }, {
                        "text": "{NotificationPosition}",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "position",
            "reflect": false,
            "defaultValue": "NotificationPosition.BOTTOM_RIGHT"
        },
        "duration": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Time the notification should be visible.",
                        "name": "description"
                    }, {
                        "text": "{number} - Duration in seconds.",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "duration",
            "reflect": false,
            "defaultValue": "3"
        }
    }; }
    static get methods() { return {
        "push": {
            "complexType": {
                "signature": "(message: string, type?: string, sticky?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "message - Message to display.",
                                "name": "param"
                            }],
                        "text": "- Message to display."
                    }, {
                        "tags": [{
                                "text": "type - Type of notification. Available types: 'info', 'warning', 'success', 'error' and 'none'.",
                                "name": "param"
                            }],
                        "text": "- Type of notification. Available types: 'info', 'warning', 'success', 'error' and 'none'."
                    }, {
                        "tags": [{
                                "text": "sticky - Set message as sticky to prevent it from disappearing.",
                                "name": "param"
                            }],
                        "text": "- Set message as sticky to prevent it from disappearing."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "NotificationMessage": {
                        "location": "import",
                        "path": "./notification-message.interface"
                    },
                    "NotificationType": {
                        "location": "import",
                        "path": "./notification-type.enum"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "description",
                        "text": "Show a notification."
                    }, {
                        "name": "param",
                        "text": "message - Message to display."
                    }, {
                        "name": "param",
                        "text": "type - Type of notification. Available types: 'info', 'warning', 'success', 'error' and 'none'."
                    }, {
                        "name": "param",
                        "text": "sticky - Set message as sticky to prevent it from disappearing."
                    }, {
                        "name": "returns",
                        "text": undefined
                    }]
            }
        },
        "clearAll": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": [{
                        "name": "description",
                        "text": "Clear all notifications."
                    }, {
                        "name": "returns",
                        "text": undefined
                    }]
            }
        }
    }; }
    static get elementRef() { return "hostElement"; }
}
