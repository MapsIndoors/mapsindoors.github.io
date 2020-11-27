import { Host, h } from "@stencil/core";
export class Spinner {
    constructor() {
        /**
         * The inverse attribute will inverse the color of the spinner.
         *
         * @type {boolean}
         * @memberof Spinner
         */
        this.inverse = false;
    }
    render() {
        return (h(Host, null,
            h("div", { class: `spinner ${this.inverse ? 'inverse' : ''}` },
                h("div", { class: "bounce1" }),
                h("div", { class: "bounce2" }),
                h("div", { class: "bounce3" }))));
    }
    static get is() { return "mi-spinner"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["spinner.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["spinner.css"]
    }; }
    static get properties() { return {
        "inverse": {
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
                        "text": "{boolean}",
                        "name": "type"
                    }, {
                        "text": "Spinner",
                        "name": "memberof"
                    }],
                "text": "The inverse attribute will inverse the color of the spinner."
            },
            "attribute": "inverse",
            "reflect": false,
            "defaultValue": "false"
        }
    }; }
}
