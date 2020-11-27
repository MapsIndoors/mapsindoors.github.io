import { Host, h } from "@stencil/core";
export class Tabs {
    constructor() {
        this.active = 0;
    }
    connectedCallback() {
        const tabs = this.el.querySelectorAll('mi-tab');
        this.tabs = Array.from(tabs).reduce((tabs, tab, index) => {
            const content = Array.from(this.el.getElementsByTagName('mi-tab-panel')).find(el => el.id === tab.tabFor);
            if (content) {
                tabs.push({ label: tab.label, content: content });
            }
            return tabs;
        }, []);
    }
    componentDidLoad() {
        this.selectTab(this.active);
    }
    async selectTab(index) {
        const isTabActive = await this.tabs[index].content.active();
        if (!isTabActive) {
            this.active = index;
            this.tabs.forEach((tab, tabIndex) => tab.content.active(tabIndex === index));
        }
    }
    render() {
        return (h(Host, null,
            h("nav", null,
                h("ul", null, this.tabs.map((tab, index) => {
                    return h("li", { class: this.active === index ? 'active' : '', onClick: () => { this.selectTab(index); } }, tab.label);
                }))),
            h("section", null,
                h("slot", null))));
    }
    static get is() { return "mi-tabs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["tabs.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["tabs.css"]
    }; }
    static get properties() { return {
        "active": {
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
                "tags": [],
                "text": ""
            },
            "attribute": "active",
            "reflect": false,
            "defaultValue": "0"
        }
    }; }
    static get elementRef() { return "el"; }
}
