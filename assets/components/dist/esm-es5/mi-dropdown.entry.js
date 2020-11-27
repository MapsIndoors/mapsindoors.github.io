var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-426ce5ad.js';
var Dropdown = /** @class */ (function () {
    function Dropdown(hostRef) {
        registerInstance(this, hostRef);
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
        this.change = createEvent(this, "change", 3);
    }
    Dropdown.prototype.connectedCallback = function () {
        var _this = this;
        var items = this.el.querySelectorAll('mi-dropdown-item');
        if (items.length > 0) {
            this.items = Array.from(items);
            this.currentItems = Array.from(items);
        }
        if (!this.multiple) {
            var selectedIndex = this.items.findIndex(function (item) { return item.selected; });
            this.selected = [this.items[selectedIndex > -1 ? selectedIndex : 0]];
        }
        this.el.addEventListener('focusout', function (e) {
            var relatedTarget = e.relatedTarget;
            /* IE11: Check if the element getting focus is a child element, if not then close the dropdown. */
            if (!relatedTarget || !_this.el.contains(relatedTarget)) {
                _this.open = false;
            }
        });
        this.el.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) {
                _this.open = true;
            }
        });
    };
    Dropdown.prototype.onItemsChanged = function (items) {
        if (items.some(function (item) { return item.tagName.toLowerCase() !== 'mi-dropdown-item'; })) {
            throw new Error('Items contains unknown element(s).');
        }
        this.currentItems = __spreadArrays(items);
        this.filter();
    };
    Dropdown.prototype.onChangedHandler = function () {
        this.selected = __spreadArrays(this.items.filter(function (item) {
            return item.selected;
        }));
        this.change.emit(this);
    };
    Dropdown.prototype.toggle = function (e) {
        this.open = !this.open;
    };
    Dropdown.prototype.selectAll = function () {
        var items = Array.from(this.currentItems);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            item.selected = true;
        }
        this.onChangedHandler();
    };
    Dropdown.prototype.selectNone = function () {
        var items = Array.from(this.currentItems);
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            item.selected = false;
        }
        this.onChangedHandler();
    };
    Dropdown.prototype.onSelect = function (event, item, index) {
        if (!this.multiple) {
            var items = Array.from(this.items);
            items.forEach(function (item) { item.selected = false; });
            this.open = false;
            this.clearFilter();
        }
        item.selected = !item.selected;
        this.onChangedHandler();
    };
    Dropdown.prototype.filter = function () {
        if (this.filterElement) {
            var str_1 = this.filterElement.value;
            var items = this.items;
            if (str_1 === '') {
                return this.currentItems = __spreadArrays(items);
            }
            this.currentItems = __spreadArrays(items.filter(function (el) {
                return el.text.toLocaleLowerCase().indexOf(str_1.toLocaleLowerCase()) > -1;
            }));
        }
    };
    Dropdown.prototype.clearFilter = function () {
        if (this.filterElement) {
            this.filterElement.value = '';
            this.currentItems = this.items;
        }
    };
    Dropdown.prototype.render = function () {
        var _this = this;
        var filter = this.filterable ? this.renderFiltering() : null;
        var multiple = this.multiple ? this.renderMultipleOptions() : null;
        var headline = this.multiple ? this.label : this.selected[0] ? this.selected[0].text : '';
        return (h(Host, null, h("mi-card", { class: { 'open': this.open, 'closed': !this.open, 'no-select': true }, tabindex: "0" }, h("header", { onClick: function (e) { return _this.toggle(e); } }, h("span", null, headline)), h("section", null, h("hr", null), filter, multiple, h("ul", null, this.currentItems.map(function (item, index) { return _this.renderListItem(item, index, multiple); }))))));
    };
    /**
     * Helper function for rendering the filtering UI.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    Dropdown.prototype.renderFiltering = function () {
        var _this = this;
        return (h("div", { class: "filter-container" }, h("input", { type: "text", placeholder: "Type to filter", ref: function (el) { return _this.filterElement = el; }, onInput: function (e) { _this.filter(); }, tabIndex: this.open ? 0 : -1 })));
    };
    /**
     * Helper function for rendering the multi select options.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    Dropdown.prototype.renderMultipleOptions = function () {
        var _this = this;
        return (h("div", { class: "multiple-options" }, h("a", { onClick: function (e) { return _this.selectAll(); } }, "Select all"), h("a", { onClick: function () { return _this.selectNone(); } }, "Select none")));
    };
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
    Dropdown.prototype.renderListItem = function (item, index, showCheckBox) {
        var _this = this;
        return (h("li", null, h("label", null, h("input", { type: "checkbox", value: index, checked: item.selected, onChange: function (e) { return _this.onSelect(e, item, index); }, class: { 'hidden': !showCheckBox } }), item.text)));
    };
    Object.defineProperty(Dropdown.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "watchers", {
        get: function () {
            return {
                "items": ["onItemsChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dropdown, "style", {
        get: function () { return "mi-dropdown-item{display:none}:host{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host .no-select{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}:host mi-card{-webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.125), 0 2px 2px rgba(0, 0, 0, 0.125);box-shadow:0 1px 1px rgba(0, 0, 0, 0.125), 0 2px 2px rgba(0, 0, 0, 0.125);padding:0;margin:0}:host mi-card header{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;font-weight:500;font-size:1rem;line-height:1.5rem;padding-top:8px;padding-bottom:8px;padding-left:16px;padding-right:40px;cursor:pointer}:host mi-card header span{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}:host mi-card header::after{content:\"\";display:block;position:absolute;top:50%;right:16px;border:8px solid transparent}:host mi-card section{overflow:auto;height:auto;width:100%}:host mi-card section .filter-container{margin-left:16px;margin-right:16px;margin-bottom:16px}:host mi-card section .filter-container input[type=text]{-webkit-box-sizing:border-box;box-sizing:border-box;border-color:#c8d0e0;border-width:2px;border-style:solid;border-radius:4px;font-size:1rem;padding-left:12px;height:36px;width:100%}:host mi-card section .filter-container input[type=text]:focus{border-color:#3071d9;border-width:2px}:host mi-card section .multiple-options{margin-left:16px;margin-right:16px;margin-bottom:16px}:host mi-card section .multiple-options a{font-size:0.875rem;color:#3071d9;margin-right:12px;cursor:pointer}:host mi-card section .multiple-options a:hover{text-decoration:underline}:host mi-card section div:nth-of-type(1){margin-top:16px}:host mi-card section ul{padding:0;margin:0;border-radius:8px;list-style:none;border-top-left-radius:0;border-top-right-radius:0;max-height:384px;overflow-x:hidden;overflow-y:auto}:host mi-card section ul li{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;cursor:pointer}:host mi-card section ul li:hover{background-color:#ebeff5}:host mi-card section ul li label{font-size:1rem;padding-top:8px;padding-bottom:8px;padding-left:16px;padding-right:16px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:pointer}:host mi-card section ul li label input[type=checkbox]{margin-right:12px;margin-left:0}:host mi-card section ul li label input[type=checkbox].hidden{display:none}:host mi-card.closed header::after{border-top-color:rgba(0, 0, 0, 0.4);margin-top:-4px}:host mi-card.closed section{height:0px}:host mi-card.open header::after{border-bottom-color:rgba(0, 0, 0, 0.4);margin-top:-12px}:host mi-card.open section{height:auto}:host mi-card hr{background:rgba(0, 0, 0, 0.16);border:0;height:1px;margin:0}"; },
        enumerable: true,
        configurable: true
    });
    return Dropdown;
}());
export { Dropdown as mi_dropdown };
