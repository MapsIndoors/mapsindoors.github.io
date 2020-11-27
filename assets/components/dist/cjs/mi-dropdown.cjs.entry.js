'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4e7399fc.js');

const Dropdown = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        this.change = index.createEvent(this, "change", 3);
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
        return (index.h(index.Host, null, index.h("mi-card", { class: { 'open': this.open, 'closed': !this.open, 'no-select': true }, tabindex: "0" }, index.h("header", { onClick: (e) => this.toggle(e) }, index.h("span", null, headline)), index.h("section", null, index.h("hr", null), filter, multiple, index.h("ul", null, this.currentItems.map((item, index) => this.renderListItem(item, index, multiple)))))));
    }
    /**
     * Helper function for rendering the filtering UI.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    renderFiltering() {
        return (index.h("div", { class: "filter-container" }, index.h("input", { type: "text", placeholder: "Type to filter", ref: (el) => this.filterElement = el, onInput: (e) => { this.filter(); }, tabIndex: this.open ? 0 : -1 })));
    }
    /**
     * Helper function for rendering the multi select options.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    renderMultipleOptions() {
        return (index.h("div", { class: "multiple-options" }, index.h("a", { onClick: (e) => this.selectAll() }, "Select all"), index.h("a", { onClick: () => this.selectNone() }, "Select none")));
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
    renderListItem(item, index$1, showCheckBox) {
        return (index.h("li", null, index.h("label", null, index.h("input", { type: "checkbox", value: index$1, checked: item.selected, onChange: (e) => this.onSelect(e, item, index$1), class: { 'hidden': !showCheckBox } }), item.text)));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "items": ["onItemsChanged"]
    }; }
    static get style() { return "mi-dropdown-item{display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .no-select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host mi-card{-webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.125), 0 2px 2px rgba(0, 0, 0, 0.125);box-shadow:0 1px 1px rgba(0, 0, 0, 0.125), 0 2px 2px rgba(0, 0, 0, 0.125);padding:0;margin:0}:host mi-card header{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;font-weight:500;font-size:1rem;line-height:1.5rem;padding-top:8px;padding-bottom:8px;padding-left:16px;padding-right:40px;cursor:pointer}:host mi-card header span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host mi-card header::after{content:\"\";display:block;position:absolute;top:50%;right:16px;border:8px solid transparent}:host mi-card section{overflow:auto;height:auto;width:100%}:host mi-card section .filter-container{margin-left:16px;margin-right:16px;margin-bottom:16px}:host mi-card section .filter-container input[type=text]{-webkit-box-sizing:border-box;box-sizing:border-box;border-color:#c8d0e0;border-width:2px;border-style:solid;border-radius:4px;font-size:1rem;padding-left:12px;height:36px;width:100%}:host mi-card section .filter-container input[type=text]:focus{border-color:#3071d9;border-width:2px}:host mi-card section .multiple-options{margin-left:16px;margin-right:16px;margin-bottom:16px}:host mi-card section .multiple-options a{font-size:0.875rem;color:#3071d9;margin-right:12px;cursor:pointer}:host mi-card section .multiple-options a:hover{text-decoration:underline}:host mi-card section div:nth-of-type(1){margin-top:16px}:host mi-card section ul{padding:0;margin:0;border-radius:8px;list-style:none;border-top-left-radius:0;border-top-right-radius:0;max-height:384px;overflow-x:hidden;overflow-y:auto}:host mi-card section ul li{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;cursor:pointer}:host mi-card section ul li:hover{background-color:#ebeff5}:host mi-card section ul li label{font-size:1rem;padding-top:8px;padding-bottom:8px;padding-left:16px;padding-right:16px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:pointer}:host mi-card section ul li label input[type=checkbox]{margin-right:12px;margin-left:0}:host mi-card section ul li label input[type=checkbox].hidden{display:none}:host mi-card.closed header::after{border-top-color:rgba(0, 0, 0, 0.4);margin-top:-4px}:host mi-card.closed section{height:0px}:host mi-card.open header::after{border-bottom-color:rgba(0, 0, 0, 0.4);margin-top:-12px}:host mi-card.open section{height:auto}:host mi-card hr{background:rgba(0, 0, 0, 0.16);border:0;height:1px;margin:0}"; }
};

exports.mi_dropdown = Dropdown;
