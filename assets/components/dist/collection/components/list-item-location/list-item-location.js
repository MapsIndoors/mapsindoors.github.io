import { h, Host } from "@stencil/core";
import { UnitSystem } from './unit-system.enum';
export class ListItemLocation {
    constructor() {
        /**
         * @description Set imperial or metric as default unit system.
         * @type {UnitSystem}
         */
        this.unit = UnitSystem.Metric;
    }
    /**
     * @description Emits the location to event listeners.
     * @param {*} location - Location object.
     * @memberof List
     */
    locationClickedHandler(location) {
        this.locationClicked.emit(location);
    }
    componentWillLoad() {
        if (this.location.properties.geodesicDistance !== null && this.location.properties.geodesicDistance !== undefined) {
            this.distance = this.getDistanceString(this.location.properties.geodesicDistance);
        }
    }
    componentDidRender() {
        this.infoElement.location = this.location;
        this.listItemDidRender.emit();
        // IE fallback for 'object-fit' css property
        if (this.imageElement && 'objectFit' in document.documentElement.style === false) {
            this.objectFitImage(this.imageElement);
        }
    }
    /**
     * @description Set image as background image.
     * @param {HTMLImageElement} image
     */
    objectFitImage(image) {
        image.setAttribute('style', `background: no-repeat center center url("${this.location.properties.imageURL}"); background-size: cover;`);
        image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`;
    }
    /**
     * @description Get distance as a string.
     * @param {number} meters
     * @returns {string}
     */
    getDistanceString(meters) {
        if (this.unit === UnitSystem.Imperial || navigator.language === 'en-US') {
            if (Math.abs(meters) < 160.9344) {
                const ft = meters * 3.2808;
                return Math.round(ft) + ' ft';
            }
            const miles = meters / 1609.344;
            return Math.round(miles * 10) / 10 + ' mi';
        }
        else {
            if (Math.abs(meters) < 1000) {
                return `${Math.round(meters)} m`;
            }
            return Math.round((meters / 1000) * 10) / 10 + ' km';
        }
    }
    /**
     * @description Render location list-item.
     * @returns {JSX.Element}
     */
    render() {
        return (h(Host, { role: "listitem", onClick: () => this.locationClickedHandler(this.location) },
            this.location.properties.imageURL ? this.renderIcon() : null,
            h("div", { class: "details" },
                h("p", { class: "details-title" }, this.location.properties.name),
                h("mi-location-info", { ref: (el) => this.infoElement = el })),
            this.distance ? this.renderDistance() : null));
    }
    /**
     * @description Get JSX template for icon.
     * @returns {JSX.Element}
     */
    renderIcon() {
        return (h("img", { ref: (el) => this.imageElement = el, src: this.location.properties.imageURL }));
    }
    /**
     * @description Get JSX template for distance.
     * @returns {JSX.Element}
     */
    renderDistance() {
        return (h("div", { class: "distance" }, this.distance));
    }
    static get is() { return "mi-list-item-location"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["list-item-location.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["list-item-location.css"]
    }; }
    static get properties() { return {
        "location": {
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
                        "text": "MI location.",
                        "name": "description"
                    }],
                "text": ""
            },
            "attribute": "location",
            "reflect": false
        },
        "unit": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "UnitSystem",
                "resolved": "UnitSystem.Imperial | UnitSystem.Metric",
                "references": {
                    "UnitSystem": {
                        "location": "import",
                        "path": "./unit-system.enum"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "Set imperial or metric as default unit system.",
                        "name": "description"
                    }, {
                        "text": "{UnitSystem}",
                        "name": "type"
                    }],
                "text": ""
            },
            "attribute": "unit",
            "reflect": false,
            "defaultValue": "UnitSystem.Metric"
        }
    }; }
    static get events() { return [{
            "method": "locationClicked",
            "name": "locationClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "Emits the clicked MI Location.",
                        "name": "description"
                    }, {
                        "text": "{EventEmitter<Location>}",
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
