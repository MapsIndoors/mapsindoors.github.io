'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4e7399fc.js');

const DropdownItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.selected = false;
    }
    get el() { return index.getElement(this); }
};

exports.mi_dropdown_item = DropdownItem;
