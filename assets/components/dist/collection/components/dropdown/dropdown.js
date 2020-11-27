import { Host, h } from "@stencil/core";
export class Dropdown {
    constructor() {
        this.currentItems = [];
        /**
         * Gets or sets the state of the dropdown.
         * If the attribute is set to true then the dropdown will be expanded.
         *
         * @type {boolean}
         * @memberof Dropdown
         */
        this.open = false;
        /**
         * Gets or sets the list items.
         *
         * @type {Array<HTMLMiDropdownItemElement>}
         * @memberof Dropdown
         */
        this.items = [];
        /**
         * This attribute indicates that the items can be filtered using the input field present at the top.
         * If it is not specified, the input field will not be visible, and filtering is not possible.
         *
         * @type {boolean}
         * @memberof Dropdown
         */
        this.filterable = false;
        /**
         * This attribute indicates that multiple items can be selected in the list. If it is not specified, then only one item can be selected at a time.
         *
         * @type {boolean}
         * @memberof Dropdown
         */
        this.multiple = false;
    }
    connectedCallback() {
        const items = this.el.querySelectorAll('mi-dropdown-item');
        if (items.length > 0) {
            this.items = Array.from(items);
            this.currentItems = Array.from(items);
        }
        if (!this.multiple) {
            const selectedIndex = this.items.findIndex((item) => { return item.selected; });
            this.selected = [this.items[selectedIndex > -1 ? selectedIndex : 0]];
        }
        this.el.addEventListener('focusout', (e) => {
            const relatedTarget = e.relatedTarget;
            /* IE11: Check if the element getting focus is a child element, if not then close the dropdown. */
            if (!relatedTarget || !this.el.contains(relatedTarget)) {
                this.open = false;
            }
        });
        this.el.addEventListener('keypress', (e) => {
            if (e.keyCode === 13) {
                this.open = true;
            }
        });
    }
    onItemsChanged(items) {
        if (items.some(item => item.tagName.toLowerCase() !== 'mi-dropdown-item')) {
            throw new Error('Items contains unknown element(s).');
        }
        this.currentItems = [...items];
        this.filter();
    }
    onChangedHandler() {
        this.selected = [...this.items.filter(item => {
                return item.selected;
            })];
        this.change.emit(this);
    }
    toggle(e) {
        this.open = !this.open;
    }
    selectAll() {
        const items = Array.from(this.currentItems);
        for (let item of items) {
            item.selected = true;
        }
        this.onChangedHandler();
    }
    selectNone() {
        const items = Array.from(this.currentItems);
        for (let item of items) {
            item.selected = false;
        }
        this.onChangedHandler();
    }
    onSelect(event, item, index) {
        if (!this.multiple) {
            const items = Array.from(this.items);
            items.forEach((item) => { item.selected = false; });
            this.open = false;
            this.clearFilter();
        }
        item.selected = !item.selected;
        this.onChangedHandler();
    }
    filter() {
        if (this.filterElement) {
            const str = this.filterElement.value;
            const items = this.items;
            if (str === '') {
                return this.currentItems = [...items];
            }
            this.currentItems = [...items.filter(el => {
                    return el.text.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) > -1;
                })];
        }
    }
    clearFilter() {
        if (this.filterElement) {
            this.filterElement.value = '';
            this.currentItems = this.items;
        }
    }
    render() {
        const filter = this.filterable ? this.renderFiltering() : null;
        const multiple = this.multiple ? this.renderMultipleOptions() : null;
        const headline = this.multiple ? this.label : this.selected[0] ? this.selected[0].text : '';
        return (h(Host, null,
            h("mi-card", { class: { 'open': this.open, 'closed': !this.open, 'no-select': true }, tabindex: "0" },
                h("header", { onClick: (e) => this.toggle(e) },
                    h("span", null, headline)),
                h("section", null,
                    h("hr", null),
                    filter,
                    multiple,
                    h("ul", null, this.currentItems.map((item, index) => this.renderListItem(item, index, multiple)))))));
    }
    /**
     * Helper function for rendering the filtering UI.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    renderFiltering() {
        return (h("div", { class: "filter-container" },
            h("input", { type: "text", placeholder: "Type to filter", ref: (el) => this.filterElement = el, onInput: (e) => { this.filter(); }, tabIndex: this.open ? 0 : -1 })));
    }
    /**
     * Helper function for rendering the multi select options.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    renderMultipleOptions() {
        return (h("div", { class: "multiple-options" },
            h("a", { onClick: (e) => this.selectAll() }, "Select all"),
            h("a", { onClick: () => this.selectNone() }, "Select none")));
    }
    /**
     * Helper function for rendering list item.
     *
     * @private
     * @param {*} item
     * @param {*} index
     * @param {*} showCheckBox
     * @returns
     * @memberof Dropdown
     */
    renderListItem(item, index, showCheckBox) {
        return (h("li", null,
            h("label", null,
                h("input", { type: "checkbox", value: index, checked: item.selected, onChange: (e) => this.onSelect(e, item, index), class: { 'hidden': !showCheckBox } }),
                item.text)));
    }
    static get is() { return "mi-dropdown"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["dropdown.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["dropdown.css"]
    }; }
    static get properties() { return {
        "open": {
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
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "Gets or sets the state of the dropdown.\nIf the attribute is set to true then the dropdown will be expanded."
            },
            "attribute": "open",
            "reflect": false,
            "defaultValue": "false"
        },
        "items": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<HTMLMiDropdownItemElement>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "HTMLMiDropdownItemElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{Array<HTMLMiDropdownItemElement>}",
                        "name": "type"
                    }, {
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "Gets or sets the list items."
            },
            "defaultValue": "[]"
        },
        "label": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": true,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{string}",
                        "name": "type"
                    }, {
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "The label will be displayed in as the text of the dropdown if the attribute multiple is pressent.\n*Only required if multiple is pressent."
            },
            "attribute": "label",
            "reflect": false
        },
        "filterable": {
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
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "This attribute indicates that the items can be filtered using the input field present at the top.\nIf it is not specified, the input field will not be visible, and filtering is not possible."
            },
            "attribute": "filterable",
            "reflect": false,
            "defaultValue": "false"
        },
        "multiple": {
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
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "This attribute indicates that multiple items can be selected in the list. If it is not specified, then only one item can be selected at a time."
            },
            "attribute": "multiple",
            "reflect": false,
            "defaultValue": "false"
        },
        "selected": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<HTMLMiDropdownItemElement>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    },
                    "HTMLMiDropdownItemElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{Array<HTMLMiDropdownItemElement>}",
                        "name": "type"
                    }, {
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "Gets the selected items"
            }
        }
    }; }
    static get states() { return {
        "currentItems": {}
    }; }
    static get events() { return [{
            "method": "change",
            "name": "change",
            "bubbles": false,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "{EventEmitter}",
                        "name": "type"
                    }, {
                        "text": "Dropdown",
                        "name": "memberof"
                    }],
                "text": "Triggers an event when the selection is changed."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "items",
            "methodName": "onItemsChanged"
        }]; }
}
