import { h } from "@stencil/core";
export class List {
    constructor() {
        /**
         * @description Determines if the MI Scroll Buttons Component should be rendered.
         * @type {boolean}
         */
        this.scrollButtonsEnabled = false;
        /**
         * @description Determines how far to scroll when clicking one of the buttons from the MI Scroll Buttons Component.
         * @type {number}
         */
        this.scrollLength = 100;
    }
    componentDidLoad() {
        this.addIntersectionObserver();
        if (this.scrollButtonsEnabled) {
            this.setScrollContainerElementRef();
        }
    }
    /**
     * @description Update state of scroll buttons when a "listItemDidRender" event is fired.
     * @private
     */
    updateScrollButtonsState() {
        if (this.scrollButtonsEnabled && this.miScrollButtonsElement.scrollContainerElementRef) {
            this.miScrollButtonsElement.updateScrollButtonsState();
        }
    }
    /**
     * @description Set scrollContainerElementRef attribute on miScrollButtonsElement.
     * @private
     */
    setScrollContainerElementRef() {
        this.miScrollButtonsElement.scrollContainerElementRef = this.scrollContainerElement;
    }
    /**
     * @description Add intersection observer and update scroll buttons state on intersection – workaround to avoid the element not having any dimensions before it's shown.
     * @private
     */
    addIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                return;
            }
            // Disable scroll buttons if container element doesn't have scroll
            if (this.scrollContainerElement.scrollHeight - this.scrollContainerElement.scrollTop === this.scrollContainerElement.clientHeight) {
                this.updateScrollButtonsState();
            }
            this.intersectionObserver.disconnect();
        });
        this.intersectionObserver.observe(this.scrollContainerElement);
    }
    render() {
        return (h("div", { class: "container" },
            h("div", { role: "list", class: "scroll-container", ref: (el) => this.scrollContainerElement = el },
                h("slot", null)),
            this.scrollButtonsEnabled ? h("mi-scroll-buttons", { scrollLength: this.scrollLength, ref: (el) => this.miScrollButtonsElement = el }) : null));
    }
    static get is() { return "mi-list"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["list.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["list.css"]
    }; }
    static get properties() { return {
        "scrollButtonsEnabled": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Determines if the MI Scroll Buttons Component should be rendered.",
                        "name": "description"
                    }, {
                        "text": "{boolean}",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "scroll-buttons-enabled",
            "reflect": false,
            "defaultValue": "false"
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
                        "text": "Determines how far to scroll when clicking one of the buttons from the MI Scroll Buttons Component.",
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
    static get listeners() { return [{
            "name": "listItemDidRender",
            "method": "updateScrollButtonsState",
            "target": undefined,
            "capture": false,
            "passive": false
        }]; }
}
