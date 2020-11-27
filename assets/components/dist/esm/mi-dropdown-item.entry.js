import { r as registerInstance, g as getElement } from './index-426ce5ad.js';

const DropdownItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.selected = false;
    }
    get el() { return getElement(this); }
};

export { DropdownItem as mi_dropdown_item };
