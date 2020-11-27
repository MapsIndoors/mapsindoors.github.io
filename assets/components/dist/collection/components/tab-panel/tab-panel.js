import { h } from "@stencil/core";
export class TabPanel {
    constructor() {
        this.isActive = false;
    }
    async active(active) {
        if (active !== undefined) {
            this.isActive = !!active;
        }
        return this.isActive;
    }
    render() {
        const classList = {
            'active': this.isActive
        };
        return (h("div", { class: classList },
            h("slot", null)));
    }
    static get is() { return "mi-tab-panel"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./tab-panel.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tab-panel.css"]
    }; }
    static get states() { return {
        "isActive": {}
    }; }
    static get methods() { return {
        "active": {
            "complexType": {
                "signature": "(active?: boolean) => Promise<boolean>",
                "parameters": [{
                        "tags": [],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<boolean>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
