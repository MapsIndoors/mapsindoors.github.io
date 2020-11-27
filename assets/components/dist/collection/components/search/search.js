var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { h } from "@stencil/core";
import { Prop, Method } from '@stencil/core/internal';
import Debounce from 'debounce-decorator';
/**
 * The MapsIndoors SDK must be available as a global variable.
 */
export class Search {
    constructor() {
        /**
         * Placeholder for the input field.
         */
        this.placeholder = '';
        /**
         * Id for the input field.
         */
        this.idAttribute = '';
        /**
         * Data attributes for the input field.
         */
        this.dataAttributes = {};
        /**
         * If searching should include MapsIndoors locations.
         */
        this.mapsindoors = false;
        /**
         * If searching should include Google Places autocomplete suggestions.
         *
         * Remember to comply to Google's policy by showing a "Power By Google" badge somewhere on your
         * page if not already showing a Google map: https://developers.google.com/places/web-service/policies
         */
        this.google = false;
        /**
         * Which fields on MapsIndoors locations to search in. Comma separated string.
         */
        this.miFields = 'name,description,aliases,categories,externalid';
    }
    valueChange(newValue) {
        if (!newValue || !this.inputElement) {
            return;
        }
        if (newValue !== this.inputElement.value) {
            // If newValue is different from what is in the input element, we know it's set from outside the component.
            this.inputElement.value = newValue;
            this.inputChanged();
        }
    }
    /**
     * Clear the input field.
     */
    async clear() {
        this.inputElement.value = '';
        this.value = '';
        this.cleared.emit();
    }
    /**
     * Handles incoming input change event, eg. input field value has changed.
     * The function is debounced 500ms to avoid firing too many requests while typing.
     */
    inputChanged() {
        const inputValue = this.inputElement.value;
        this.value = inputValue; // reflect on value attribute
        if (inputValue.length < 2) {
            this.lastRequested = null;
            inputValue.length === 0 ? this.clear() : this.pushResults([]);
            return;
        }
        if (inputValue.length > 1 && inputValue !== this.lastRequested) {
            Promise.all([
                this.makeMapsIndoorsQuery(inputValue),
                this.makeGooglePlacesQuery(inputValue)
            ])
                .then(results => {
                this.lastRequested = inputValue;
                this.pushResults(results[0].concat(results[1]));
            });
        }
    }
    /**
     * Push the results via the results event.
     * @param object[] Locations
     */
    pushResults(locations) {
        this.results.emit(locations);
    }
    /**
     * Make MapsIndoors locations request based on given search query.
     * @param {string} query
     * @return {Promise<any[]>}
     */
    makeMapsIndoorsQuery(query) {
        if (!this.mapsindoors) {
            return Promise.resolve([]);
        }
        // Transform miNear string attribute to object if it matches a latlng
        let miNear;
        if (this.miNear) {
            miNear = this.miNear;
            if (/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.test(this.miNear)) {
                const near = this.miNear.split(',');
                miNear = { lat: parseFloat(near[0]), lng: parseFloat(near[1]) };
            }
        }
        return mapsindoors.LocationsService.getLocations({
            q: query.trim(),
            fields: this.miFields,
            take: this.miTake,
            skip: this.miSkip,
            orderBy: this.miOrder,
            near: miNear,
            categories: this.miCategories
        });
    }
    /**
     * Make Google Places autocomplete suggestion request.
     * @param {string} query
     * @return {Promise<any>}
     */
    makeGooglePlacesQuery(query) {
        if (this.google) {
            if (!this.googleAutocompleteService) {
                this.googleAutocompleteService = new google.maps.places.AutocompleteService();
            }
        }
        else {
            this.googleAutocompleteService = null;
        }
        if (!this.googleAutocompleteService) {
            return Promise.resolve([]);
        }
        return new Promise((resolve) => {
            const params = {
                input: query
            };
            if (this.gmCountryCode) {
                params.componentRestrictions = { country: this.gmCountryCode };
            }
            this.googleAutocompleteService.getPlacePredictions(params, (results) => {
                const places = (results || []).map((result) => ({
                    type: 'Feature',
                    properties: {
                        type: 'google_places',
                        placeId: result.place_id,
                        name: result.structured_formatting.main_text,
                        subtitle: result.structured_formatting.secondary_text || '',
                        floor: 0
                    }
                }));
                resolve(places);
            });
        });
    }
    componentDidRender() {
        if (this.value) {
            this.inputElement.value = this.value;
            this.inputChanged();
        }
        if (this.dataAttributes) {
            for (const key in this.dataAttributes) {
                this.inputElement.setAttribute(key, this.dataAttributes[key]);
            }
        }
        this.componentRendered.emit();
    }
    render() {
        return (h("input", { id: this.idAttribute ? this.idAttribute : null, type: "search", ref: (el) => this.inputElement = el, onInput: () => this.inputChanged(), placeholder: this.placeholder, autocomplete: "off" }));
    }
    static get is() { return "mi-search"; }
    static get originalStyleUrls() { return {
        "$": ["search.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["search.css"]
    }; }
    static get properties() { return {
        "placeholder": {
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
                "tags": [],
                "text": "Placeholder for the input field."
            },
            "attribute": "placeholder",
            "reflect": false,
            "defaultValue": "''"
        },
        "idAttribute": {
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
                "tags": [],
                "text": "Id for the input field."
            },
            "attribute": "id-attribute",
            "reflect": false,
            "defaultValue": "''"
        },
        "dataAttributes": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "{ [key: string]: string }",
                "resolved": "{ [key: string]: string; }",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Data attributes for the input field."
            },
            "defaultValue": "{}"
        },
        "mapsindoors": {
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
                "tags": [],
                "text": "If searching should include MapsIndoors locations."
            },
            "attribute": "mapsindoors",
            "reflect": false,
            "defaultValue": "false"
        },
        "google": {
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
                "tags": [],
                "text": "If searching should include Google Places autocomplete suggestions.\n\nRemember to comply to Google's policy by showing a \"Power By Google\" badge somewhere on your\npage if not already showing a Google map: https://developers.google.com/places/web-service/policies"
            },
            "attribute": "google",
            "reflect": false,
            "defaultValue": "false"
        },
        "miFields": {
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
                "tags": [],
                "text": "Which fields on MapsIndoors locations to search in. Comma separated string."
            },
            "attribute": "mi-fields",
            "reflect": false,
            "defaultValue": "'name,description,aliases,categories,externalid'"
        },
        "miTake": {
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
                "text": "Restrict how many Mapsindoors results to request."
            },
            "attribute": "mi-take",
            "reflect": false
        },
        "miSkip": {
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
                "text": "Tell Mapsindoors to skip a number of results. Combine with miTake for pagination purposes."
            },
            "attribute": "mi-skip",
            "reflect": false
        },
        "miOrder": {
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
                "tags": [],
                "text": "Specify Mapsindoors search ordering"
            },
            "attribute": "mi-order",
            "reflect": false
        },
        "miCategories": {
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
                "tags": [],
                "text": "Search only Mapsindoors locations within given categories.\nAccepts comma separated list of categories, eg. 'toilet,office'"
            },
            "attribute": "mi-categories",
            "reflect": false
        },
        "miNear": {
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
                "tags": [],
                "text": "Search for MapsIndoors locations near a point.\nCan either be lat,lng coordinate as a string, eg. '-12.3456,45.6789' or a string in the format \"type:id\" e.g. \"venue:586ca9f1bc1f5702406442b6\""
            },
            "attribute": "mi-near",
            "reflect": false
        },
        "gmCountryCode": {
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
                "tags": [],
                "text": "Restrict Google Places search to a specific country (two-character, ISO 3166-1 Alpha-2 compatible country code)"
            },
            "attribute": "gm-country-code",
            "reflect": false
        },
        "value": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Get or set the entered value"
            },
            "attribute": "value",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "results",
            "name": "results",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event emitted when searching is complete."
            },
            "complexType": {
                "original": "object[]",
                "resolved": "object[]",
                "references": {}
            }
        }, {
            "method": "cleared",
            "name": "cleared",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event emitted when the search field is emptied."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }, {
            "method": "componentRendered",
            "name": "componentRendered",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Event emitted after every component rendering."
            },
            "complexType": {
                "original": "void",
                "resolved": "void",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "clear": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Clear the input field.",
                "tags": []
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChange"
        }]; }
}
__decorate([
    Debounce(500)
], Search.prototype, "inputChanged", null);
