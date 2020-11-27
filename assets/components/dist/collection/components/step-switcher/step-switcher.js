import { Host, h } from "@stencil/core";
export class StepSwitcher {
    constructor() {
        /**
         * Steps to display dots for.
         *
         * @type {any[]}
         */
        this.steps = [];
        /**
         * Step index to show. Defaults to first step.
         *
         * @type {number}
         */
        this.stepIndex = 0;
    }
    /**
     * Set step index and emit stepIndexChanged event.
     *
     * @param {number} index
     */
    setStepIndex(index) {
        this.stepIndex = index;
        this.stepIndexChanged.emit(this.stepIndex);
    }
    render() {
        return (h(Host, null,
            h("button", { type: "button", disabled: this.steps.length === 0 || this.stepIndex === 0, onClick: () => this.setStepIndex(this.stepIndex - 1) },
                h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24px", height: "24px" },
                    h("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
                    h("path", { d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }))),
            h("div", { class: "steps" },
                this.heading ? h("p", null, this.heading) : null,
                h("div", { class: "steps__dots" }, this.steps.map((item, index) => {
                    const isActive = this.stepIndex === index ? true : false;
                    return h("span", { class: { 'active': isActive } });
                }))),
            h("button", { type: "button", disabled: this.steps.length === 0 || this.stepIndex === this.steps.length - 1, onClick: () => this.setStepIndex(this.stepIndex + 1) },
                h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24px", height: "24px" },
                    h("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
                    h("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" })))));
    }
    static get is() { return "mi-step-switcher"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["step-switcher.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["step-switcher.css"]
    }; }
    static get properties() { return {
        "heading": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "Heading to display."
            },
            "attribute": "heading",
            "reflect": false
        },
        "steps": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "any[]",
                "resolved": "any[]",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{any[]}",
                        "name": "type"
                    }],
                "text": "Steps to display dots for."
            },
            "defaultValue": "[]"
        },
        "stepIndex": {
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
                        "text": "{number}",
                        "name": "type"
                    }],
                "text": "Step index to show. Defaults to first step."
            },
            "attribute": "step-index",
            "reflect": true,
            "defaultValue": "0"
        }
    }; }
    static get events() { return [{
            "method": "stepIndexChanged",
            "name": "stepIndexChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "{EventEmitter}",
                        "name": "type"
                    }],
                "text": "Emits the new step index as a number."
            },
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            }
        }]; }
}
