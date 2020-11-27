import { h } from "@stencil/core";
export class ScrollButtons {
    constructor() {
        /**
         * @description  Determines how far to scroll when clicking one of the buttons.
         * @type {number}
         */
        this.scrollLength = 100;
    }
    /**
     * @description Add scroll event listener to container reference.
     * @memberof ScrollButtons
     */
    addScrollEventListener() {
        this.scrollContainerElementRef.addEventListener('scroll', () => {
            this.updateScrollButtonsState();
        });
    }
    /**
     * @description Updates enable/disable state for scroll up and down buttons.
     * @returns {Promise<void>}
     * @memberof ScrollButtons
     */
    async updateScrollButtonsState() {
        // Disable or enable the scroll up button
        if (this.scrollContainerElementRef.scrollTop === 0) {
            this.upButtonElement.disabled = true;
        }
        else if (this.upButtonElement.disabled) {
            this.upButtonElement.disabled = false;
        }
        // Disable or enable the scroll down button
        if (this.scrollContainerElementRef.scrollHeight - this.scrollContainerElementRef.scrollTop === this.scrollContainerElementRef.clientHeight) {
            this.downButtonElement.disabled = true;
        }
        else if (this.downButtonElement.disabled) {
            this.downButtonElement.disabled = false;
        }
    }
    /**
     * @description Update scroll position.
     * @private
     * @param {number} value - Value to scroll.
     * @memberof ScrollButtons
     */
    updateScrollPosition(value) {
        if (!('scrollBehavior' in document.documentElement.style)) { // Internet Explorer feature check
            this.scrollContainerElementRef.scrollTop = value;
        }
        else {
            this.scrollContainerElementRef.scroll({
                top: this.scrollContainerElementRef.scrollTop + value,
                behavior: 'smooth'
            });
        }
    }
    render() {
        return (h("div", { class: "scroll-buttons" },
            h("button", { class: "mi-button mi-button--base btn btn-up", type: "button", disabled: true, "aria-label": "Scroll Up", ref: (el) => this.upButtonElement = el, onClick: () => this.updateScrollPosition(-this.scrollLength) }),
            h("button", { class: "mi-button mi-button--base btn btn-down", type: "button", "aria-label": "Scroll Down", ref: (el) => this.downButtonElement = el, onClick: () => this.updateScrollPosition(this.scrollLength) })));
    }
    static get is() { return "mi-scroll-buttons"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["scroll-buttons.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["scroll-buttons.css"]
    }; }
    static get properties() { return {
        "scrollContainerElementRef": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLDivElement",
                "resolved": "HTMLDivElement",
                "references": {
                    "HTMLDivElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Reference to the element with scroll on parent element.",
                        "name": "description"
                    }, {
                        "text": "{HTMLDivElement}",
                        "name": "type"
                    }],
                "text": ""
            }
        },
        "scrollLength": {
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
                        "text": "Determines how far to scroll when clicking one of the buttons.",
                        "name": "description"
                    }, {
                        "text": "{number}",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "scroll-length",
            "reflect": false,
            "defaultValue": "100"
        }
    }; }
    static get methods() { return {
        "updateScrollButtonsState": {
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
                        "text": "Updates enable/disable state for scroll up and down buttons."
                    }, {
                        "name": "returns",
                        "text": undefined
                    }, {
                        "name": "memberof",
                        "text": "ScrollButtons"
                    }]
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "scrollContainerElementRef",
            "methodName": "addScrollEventListener"
        }]; }
}
