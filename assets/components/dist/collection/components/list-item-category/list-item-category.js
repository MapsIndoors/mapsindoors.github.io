import { h, Host } from "@stencil/core";
export class ListItemCategory {
    constructor() {
        /**
         * @description List orientation. Accepts the following values: 'vertical' and 'horizontal'.
         * @type {string}
         */
        this.orientation = 'vertical';
    }
    componentDidRender() {
        this.listItemDidRender.emit();
        // IE fallback for 'object-fit' css property
        if ('objectFit' in document.documentElement.style === false) {
            this.objectFitImage(this.image);
        }
    }
    /**
     * @description Emits the category object to event listeners.
     * @private
     * @param {*} category - Category object.
     * @memberof ListItemCategory
     */
    categoryClickedHandler(category) {
        this.categoryClicked.emit(category);
    }
    /**
     * @description Set image as background image.
     * @private
     * @param {HTMLImageElement} image
     */
    objectFitImage(image) {
        image.setAttribute('style', `background: no-repeat center center url("${this.category.iconUrl}"); background-size: cover;`);
        image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`;
    }
    render() {
        return (h(Host, { onClick: () => this.categoryClickedHandler(this.category) },
            h("img", { ref: (el) => this.image = el, src: this.category.iconUrl }),
            h("p", null, this.category.name)));
    }
    static get is() { return "mi-list-item-category"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["list-item-category.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["list-item-category.css"]
    }; }
    static get properties() { return {
        "category": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Array of Categories.",
                        "name": "description"
                    }, {
                        "text": "{Array<Category>}",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "category",
            "reflect": false
        },
        "orientation": {
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
                        "text": "List orientation. Accepts the following values: 'vertical' and 'horizontal'.",
                        "name": "description"
                    }, {
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "orientation",
            "reflect": true,
            "defaultValue": "'vertical'"
        }
    }; }
    static get events() { return [{
            "method": "categoryClicked",
            "name": "categoryClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "Emits the clicked category.",
                        "name": "description"
                    }, {
                        "text": "{EventEmitter<Category>}",
                        "name": "type"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "listItemDidRender",
            "name": "listItemDidRender",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "Emits a component render event.",
                        "name": "description"
                    }, {
                        "text": "{EventEmitter}",
                        "name": "type"
                    }],
                "text": ""
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
}
