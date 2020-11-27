import { r as registerInstance, g as getElement } from './index-426ce5ad.js';
var DropdownItem = /** @class */ (function () {
    function DropdownItem(hostRef) {
        registerInstance(this, hostRef);
        this.selected = false;
    }
    Object.defineProperty(DropdownItem.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    return DropdownItem;
}());
export { DropdownItem as mi_dropdown_item };
