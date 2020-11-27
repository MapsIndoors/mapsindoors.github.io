import { h, Host } from "@stencil/core";
export class LocationInfo {
    /**
     * @description Get locations info as a string.
     * @private
     * @returns {string}
     */
    getInfoString() {
        const details = [];
        if (this.location && this.location.properties) {
            // External Id
            if (this.location.properties.externalId) {
                details.push(this.location.properties.externalId);
            }
            // Floor name
            if (this.location.properties.floorName) {
                details.push(`Level ${this.location.properties.floorName}`);
            }
            // Building
            if (this.location.properties.building) {
                if (this.location.properties.venue) {
                    // Check that venue and building is not named the same
                    if (this.location.properties.venue.toLowerCase() !== this.location.properties.building.toLowerCase()) {
                        details.push(this.location.properties.building);
                    }
                }
                else {
                    details.push(this.location.properties.building);
                }
            }
            // Venue
            if (this.location.properties.venue) {
                details.push(this.location.properties.venue);
            }
        }
        return details.join(' · ');
    }
    render() {
        return (h(Host, null, this.getInfoString()));
    }
    static get is() { return "mi-location-info"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["location-info.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["location-info.css"]
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
        }
    }; }
}
