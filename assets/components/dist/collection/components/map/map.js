import { h } from "@stencil/core";
import miVariables from './../../utils/mi-variables';
export class Map {
    constructor() {
        /**
         * The MapsIndoors API key
         */
        this.miApiKey = '';
        /**
         * The Google Maps API key
         */
        this.gmApiKey = '';
        /**
         * Google Maps options. Defaults to zoom: 17, maxZoom: 21, mapTypeControl: false, streetViewControl: false.
         * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
         * @type {google.maps.MapOptions}
         */
        this.gmOptions = {
            zoom: 17,
            maxZoom: 21,
            mapTypeControl: false,
            streetViewControl: false
        };
        /**
         * Set or get the current zoom level of the map.
         */
        this.zoom = '17';
        /**
         * Set to true to prevent external links on the map from opening.
         * This can be useful when running the map on a kiosk where you never want the browser to navigate away.
         */
        this.disableExternalLinks = false;
        /**
         * The stroke color of direction polyline on the map. Accepts any legal HTML color value.
         * Default: '#307ad9'.
         */
        this.polylineColor = '#3071d9';
        /**
         * The the width of the direction polyline in pixels.
         * Default: 4.
         */
        this.polylineWeight = 4;
        /**
         * The stroke opacity of directions polylines on the map. Numerical value between 0.0 and 1.0.
         * Default: 1.
         */
        this.polylineOpacity = 1;
        // A mapsindoors.DirectionsRenderer used for drawing polylines.
        this.directionsRenderer = null;
        this.fitToDirectionsRouteBounds = true;
    }
    apiKeyChange(newApiKey) {
        mapsindoors.MapsIndoors.setApiKey(newApiKey);
    }
    gmOptionsChange(newControlOptions) {
        this.googleMapInstance.setOptions(newControlOptions);
    }
    floorSelectorChange(newPosition, oldPosition) {
        if (this.floorSelectorInstance) {
            this.setFloorSelector(newPosition, oldPosition);
        }
    }
    positionControlChange(newPosition, oldPosition) {
        this.setPositionControl(newPosition, oldPosition);
    }
    floorChange(newFloor, oldFloor) {
        if (oldFloor === undefined) {
            // Do nothing. This will only be the case when the map is initializing and setting the floor attribute.
            return;
        }
        if (newFloor !== oldFloor && newFloor !== this.mapsIndoorsInstance.getFloor()) {
            if (newFloor === null) {
                newFloor = '0'; // Setting the DOM attribute to "0" will be passed on here as null, so we need to circumvent that.
            }
            this.mapsIndoorsInstance.setFloor(newFloor);
        }
    }
    zoomChange(newZoom, oldZoom) {
        if (newZoom !== oldZoom && newZoom !== this.googleMapInstance.getZoom()) {
            if (newZoom === null) {
                newZoom = 0; // Setting the DOM attribute to "0" will be passed on here as null, so we need to circumvent that.
            }
            this.googleMapInstance.setZoom(parseInt(newZoom, 10));
        }
    }
    disableExternalLinksChange(attributeValue) {
        this.setExternalLinkBehavior(attributeValue);
    }
    polylineColorChange(newPolylineColor) {
        if (this.directionsRenderer) {
            if (!newPolylineColor) {
                newPolylineColor = '#3071d9';
            }
            this.directionsRenderer.setOptions({ strokeColor: newPolylineColor });
        }
    }
    polylineWeightChange(newPolylineWeight) {
        if (this.directionsRenderer) {
            if (!newPolylineWeight) {
                newPolylineWeight = 4;
            }
            this.directionsRenderer.setOptions({ strokeWeight: newPolylineWeight });
        }
    }
    polylineOpacityChange(newPolylineOpacity) {
        if (this.directionsRenderer) {
            if (!newPolylineOpacity) {
                newPolylineOpacity = 1;
            }
            this.directionsRenderer.setOptions({ strokeOpacity: newPolylineOpacity });
        }
    }
    /**
     * Get the version of the MapsIndoors SDK.
     * @return {Promise<string>} SDK version
     */
    async getMapsIndoorsVersion() {
        return this.mapsIndoorsInstance.__VERSION__;
    }
    /**
     * Changes the center of the map to the given LatLng.
     * @param {google.maps.LatLng} latLng
     */
    async panTo(latLng) {
        this.googleMapInstance.panTo(latLng);
    }
    /**
     * Sets the map viewport to contain the given bounds.
     * @param {google.maps.LatLngBounds} bounds
     */
    async fitBounds(bounds) {
        this.googleMapInstance.fitBounds(bounds);
    }
    /**
     * Returns the lat/lng bounds of the current map viewport.
     * @returns {Promise<google.maps.LatLngBounds>}
     */
    async getBounds() {
        return this.googleMapInstance.getBounds();
    }
    /**
     * Set a display rule for one or more types or locations.
     * @param {(string|string[])} target - Can be a single location id or type name, or an array of locations ids and type names.
     * @param {DisplayRule} displayRule
     */
    async setDisplayRule(target, displayRule) {
        this.mapsIndoorsInstance.setDisplayRule(target, displayRule);
    }
    /**
     * Sets the venue
     * @param {string|object} venue venue id string or venue object to set
     */
    async setVenue(venue) {
        this.mapsIndoorsInstance.setVenue(venue);
    }
    /**
     * Changes the map view to show the default venue or pass in a venue ID to go to another venue.
     * @param {string} [venueId] - Venue ID
     */
    async fitVenue(venueId) {
        return this.mapsIndoorsInstance.fitVenue(venueId);
    }
    /**
     * Open info window.
     * @param {string} content - Content of the info window in clear text or HTML.
     * @param {google.maps.LatLng} anchor - The location of the info window
     * @param {string} className - A classname given to the div holding the content
     */
    async openInfoWindow(content, anchor, className = '') {
        this.infoWindow.setContent(`<div class="${className}">${content}</div>`);
        this.infoWindow.setPosition(anchor);
        this.infoWindow.open(this.googleMapInstance);
    }
    /**
     * Close info window.
     */
    async closeInfoWindow() {
        this.infoWindow.close();
    }
    /**
     * Filter the locations on the map by showing only provided location IDs.
     * @param {array} locationIds - The IDs of the locations to show. Any other locations will be hidden.
     * @param {boolean} fitView - Change the map viewport to fit the shown locations.
     */
    async filterLocations(locationIds, fitView = false) {
        this.mapsIndoorsInstance.filter(locationIds, fitView);
    }
    /**
     * Remove locations filter, thus showing all locations.
     * @param fitView  - Change the map viewport to fit all shown locations.
     */
    async clearLocationFilter(fitView = false) {
        this.mapsIndoorsInstance.filter(null, fitView);
    }
    /**
     * Show a route on the map from one location to another
     * @param {object} routeParams
     * @param {RouteLocation} routeParams.origin - Object for origin location with lat, lng, floor, eg `{ lat: 12.345, lng: 67.890, floor: 20 }`
     * @param {RouteLocation} routeParams.destination - Object for destination location with lat, lng, floor, eg `{ lat: 12.345, lng: 67.890, floor: 20 }`
     * @param {string} [routeParams.travelMode] - Travel mode, one of 'WALKING', 'BICYCLING', 'DRIVING' or 'TRANSIT'. Default is 'WALKING'
     * @param {boolean} [routeParams.avoidStairs] - If set to true stairs will be avoided if possible. Default is false.
     * @param {string[]} [routeParams.userRoles] - List of user roles to be applied to the directions.
     * @param {boolean} [routeParams.fitBounds] - Wether the map's viewport will be fitted to the bounds of the rendered route. Default is true, meaning it will be fitted.
     */
    async showRoute(routeParams) {
        if ('fitBounds' in routeParams) {
            // The fitBounds is used in the constructor for DirectionsRenderer, not in the getRoute call.
            this.fitToDirectionsRouteBounds = routeParams.fitBounds;
            delete routeParams.fitBounds;
        }
        return mapsindoors.DirectionsService.getRoute(routeParams).then(directionsResult => this.setRoute(directionsResult));
    }
    /**
     * Sets a route, and renders the first leg of the route as a polyline.
     * @param directionsResult https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DirectionsResult
     */
    async setRoute(directionsResult) {
        if (!this.directionsRenderer) {
            this.directionsRenderer = new mapsindoors.DirectionsRenderer({
                mapsindoors: this.mapsIndoorsInstance,
                strokeColor: this.polylineColor,
                strokeWeight: this.polylineWeight,
                strokeOpacity: this.polylineOpacity,
                fitBounds: this.fitToDirectionsRouteBounds
            });
        }
        this.directionsRenderer.setRoute(directionsResult.routes[0]);
    }
    /**
     * Clear a currently rendered route (polyline).
     */
    async clearRoute() {
        if (this.directionsRenderer) {
            this.directionsRenderer.setRoute(null);
        }
    }
    /**
     * Renders the next leg of the set route as a polyline on the map.
     */
    async nextRouteLeg() {
        if (!this.directionsRenderer) {
            return;
        }
        this.directionsRenderer.nextLeg();
    }
    /**
     * Renders the previous leg of the set route as a polyline on the map.
     */
    async previousRouteLeg() {
        if (!this.directionsRenderer) {
            return;
        }
        this.directionsRenderer.previousLeg();
    }
    /**
     * Sets the index which leg of the route to display on the map.
     * @param index Index of route leg to render on map.
     */
    async setRouteLegIndex(index) {
        if (!this.directionsRenderer) {
            return;
        }
        this.directionsRenderer.setLegIndex(index);
    }
    /**
     * Get info about the current route.
     * @returns {Promise<any>} DirectionsResult
     */
    async getRoute() {
        if (!this.directionsRenderer) {
            return;
        }
        return this.directionsRenderer.getRoute();
    }
    async componentDidLoad() {
        await this.initializeGoogleMaps();
        await this.initialiseMapsIndoorsSDK();
        await this.setupMap();
        if (this.floorSelector) {
            this.showFloorSelectorAfterUserInteraction();
        }
        if (this.positionControl) {
            this.setPositionControl(this.positionControl);
        }
        // Make sure initial zoom attribute is set
        this.zoomChange(this.zoom, undefined);
        google.maps.event.addListener(this.mapsIndoorsInstance, 'floor_changed', (floor) => {
            this.floor = floor;
        });
        google.maps.event.addListener(this.googleMapInstance, 'zoom_changed', () => {
            this.zoom = this.googleMapInstance.getZoom();
        });
    }
    /**
     * Show the floor selector after user interacts with map.
     * Sets up event listener what when invoked will set the floor selector on the map.
     */
    showFloorSelectorAfterUserInteraction() {
        const eventsToListenFor = ['touchmove', 'click', 'wheel']; // these are events we consider as user interactions with the map
        const userInteracted = () => {
            eventsToListenFor.forEach(event => this.mapDiv.removeEventListener(event, userInteracted));
            this.setFloorSelector(this.floorSelector);
        };
        eventsToListenFor.forEach(event => this.mapDiv.addEventListener(event, userInteracted));
    }
    /**
     * Ensure that Google Maps API is available.
     *
     * @returns {Promise<void>}
     */
    initializeGoogleMaps() {
        return new Promise((resolve) => {
            // If no Google Maps API is globally available, insert script tag on page to fetch it.
            if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
                this.insertGoogleMapsScript().then(() => resolve());
                return;
            }
            // Google Maps API already on page:
            // Check to see if the API key of the loaded script is different.
            // In that case, reload using the key given to the component.
            const googleMapsScriptTag = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
            if (!googleMapsScriptTag) {
                return resolve(); // API available, but could not find script to check.
            }
            const currentApiKey = new URLSearchParams(googleMapsScriptTag.getAttribute('src')).get('key');
            if (currentApiKey !== this.gmApiKey) {
                // To force reload with new key, remove the existing script tag from document and insert a new.
                googleMapsScriptTag.parentNode.removeChild(googleMapsScriptTag);
                this.insertGoogleMapsScript().then(() => resolve());
            }
            else {
                resolve();
            }
        });
    }
    /**
     * Inject script tag for Google Maps API onto the page.
     *
     * @returns {Promise<void>}
     */
    insertGoogleMapsScript() {
        return new Promise(resolve => {
            this.googleMapsApiTag = document.createElement('script');
            this.googleMapsApiTag.setAttribute('type', 'text/javascript');
            this.googleMapsApiTag.setAttribute('src', `//maps.googleapis.com/maps/api/js?v=3&key=${this.gmApiKey}&libraries=geometry,places`);
            document.body.appendChild(this.googleMapsApiTag);
            this.googleMapsApiTag.onload = () => resolve();
        });
    }
    /**
     * Ensure that MapsIndoors Web SDK is available.
     *
     * @returns {Promise<void>}
     */
    initialiseMapsIndoorsSDK() {
        return new Promise((resolve) => {
            if (typeof mapsindoors !== 'undefined') {
                mapsindoors.MapsIndoors.setApiKey(this.miApiKey);
                return resolve();
            }
            this.miSdkApiTag = document.createElement('script');
            this.miSdkApiTag.setAttribute('type', 'text/javascript');
            this.miSdkApiTag.setAttribute('src', `${miVariables.miSDKUrl}?apikey=${this.miApiKey}`);
            document.body.appendChild(this.miSdkApiTag);
            this.miSdkApiTag.onload = () => resolve();
        });
    }
    /**
     * Start Google map and MapsIndoors.
     */
    setupMap() {
        return new Promise((resolve) => {
            this.googleMapInstance = new google.maps.Map(this.mapDiv, this.gmOptions);
            this.mapsIndoorsInstance = new mapsindoors.MapsIndoors({
                map: this.googleMapInstance
            });
            google.maps.event.addListener(this.mapsIndoorsInstance, 'ready', () => {
                if (this.floor !== undefined) {
                    // Floor attribute was set in the DOM initally: Set the floor
                    this.mapsIndoorsInstance.setFloor(this.floor);
                }
                else {
                    this.floor = this.mapsIndoorsInstance.getFloor();
                }
                this.mapsIndoorsReady.emit();
                resolve();
            });
            this.setExternalLinkBehavior(this.disableExternalLinks);
            this.relayEvents();
            this.infoWindow = new google.maps.InfoWindow;
        });
    }
    /**
     * Setup listeners for some MapsIndoors and Google Map events and emit them out of component.
     */
    relayEvents() {
        google.maps.event.addListener(this.mapsIndoorsInstance, 'click', location => this.locationClicked.emit(location));
        google.maps.event.addListener(this.googleMapInstance, 'dragend', () => this.dragend.emit());
        google.maps.event.addListener(this.googleMapInstance, 'idle', () => this.idle.emit());
    }
    /**
     * Prevent external links from opening.
     * @param {MouseEvent} event
     */
    preventExternalLink(event) {
        const externalLink = event.target.closest('a[target="_blank"]');
        if (externalLink) {
            event.preventDefault();
        }
    }
    /**
     * Set or remove event listeners for external links.
     * @param {boolean} shouldDisableLinks - If true, external links on the map will be preventet from opening.
     */
    setExternalLinkBehavior(shouldDisableLinks) {
        if (shouldDisableLinks === true) {
            this.mapDiv.addEventListener('click', this.preventExternalLink);
        }
        else {
            this.mapDiv.removeEventListener('click', this.preventExternalLink);
        }
    }
    /**
     * Remove a Google Map Control from the map based on class name of the control.
     * @param {google.maps.ControlPosition} position - the position from where to remove the control
     * @param {string} className - the classname of the control to remove
     */
    removeGoogleMapControl(position, className) {
        const controls = this.googleMapInstance.controls[google.maps.ControlPosition[position]].getArray();
        const controlIndex = controls.findIndex(control => control.classList.contains(className));
        this.googleMapInstance.controls[google.maps.ControlPosition[position]].removeAt(controlIndex);
    }
    /**
     * Set, update or unset floor selector on the map.
     * @param {google.maps.ControlPosition} position
     * @param {google.maps.ControlPosition} [oldPosition]
     */
    setFloorSelector(mapControlPosition, oldMapControlPosition = undefined) {
        if (mapControlPosition === null) {
            // If attribute is not set, clear control and unset floor selector.
            this.removeGoogleMapControl(oldMapControlPosition, 'floor-selector');
            this.floorSelectorElement = null;
            this.floorSelectorInstance = null;
            return;
        }
        else if (!this.floorSelectorInstance) {
            // If there is no floor selector, create it.
            this.floorSelectorElement = document.createElement('div');
            this.floorSelectorInstance = new mapsindoors.FloorSelector(this.floorSelectorElement, this.mapsIndoorsInstance);
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.floorSelectorElement);
        }
        else {
            // If there is clear it from the old control position and add it on new control position.
            this.removeGoogleMapControl(oldMapControlPosition, 'floor-selector');
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.floorSelectorElement);
        }
    }
    /**
     * Set, update or unset position control on the map.
     * @param {google.maps.ControlPosition} mapControlPosition
     * @param {google.maps.ControlPosition} oldMapControlPosition
     */
    setPositionControl(mapControlPosition, oldMapControlPosition = undefined) {
        if (mapControlPosition === null) {
            // If attribute is not set, clear control and unset position control.
            this.clearPositionEventListeners();
            this.removeGoogleMapControl(oldMapControlPosition, 'position-control');
            this.positionControlElement = null;
            this.positionControlInstance = null;
        }
        else if (!this.positionControlInstance) {
            // If there is no position control, create it.
            this.positionControlElement = document.createElement('div');
            this.positionControlInstance = new mapsindoors.PositionControl(this.positionControlElement, { mapsIndoors: this.mapsIndoorsInstance, positionOptions: { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 } });
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.positionControlElement);
            this.setPositionEventListeners();
        }
        else {
            // If there is a position control, clear it from the old control position and add it on the new position.
            this.clearPositionEventListeners();
            this.removeGoogleMapControl(oldMapControlPosition, 'position-control');
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.positionControlElement);
        }
    }
    /**
     * Add event listeners for position events.
     */
    setPositionEventListeners() {
        google.maps.event.addListener(this.mapsIndoorsInstance, 'position_received', (position) => {
            this.positionReceived.emit(position);
        });
        google.maps.event.addListener(this.mapsIndoorsInstance, 'position_error', (error) => {
            this.positionError.emit(error);
        });
    }
    /**
     * Remove event listeners for position events.
     */
    clearPositionEventListeners() {
        google.maps.event.clearListeners(this.mapsIndoorsInstance, 'position_received');
        google.maps.event.clearListeners(this.mapsIndoorsInstance, 'position_error');
    }
    render() {
        return (h("div", { ref: (el) => this.mapDiv = el }));
    }
    static get is() { return "mi-map"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["map.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["map.css"]
    }; }
    static get properties() { return {
        "miApiKey": {
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
                "text": "The MapsIndoors API key"
            },
            "attribute": "mi-api-key",
            "reflect": false,
            "defaultValue": "''"
        },
        "gmApiKey": {
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
                "text": "The Google Maps API key"
            },
            "attribute": "gm-api-key",
            "reflect": false,
            "defaultValue": "''"
        },
        "gmOptions": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "google.maps.MapOptions",
                "resolved": "any",
                "references": {
                    "google": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{google.maps.MapOptions}",
                        "name": "type"
                    }],
                "text": "Google Maps options. Defaults to zoom: 17, maxZoom: 21, mapTypeControl: false, streetViewControl: false.\nhttps://developers.google.com/maps/documentation/javascript/reference/map#MapOptions"
            },
            "attribute": "gm-options",
            "reflect": false,
            "defaultValue": "{\n        zoom: 17,\n        maxZoom: 21,\n        mapTypeControl: false,\n        streetViewControl: false\n    }"
        },
        "floorSelector": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "google.maps.ControlPosition",
                "resolved": "any",
                "references": {
                    "google": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If given, will render a floor selector as a Google Map Control.\nPass a string corresponding to a Google Maps Control position: https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning"
            },
            "attribute": "floor-selector",
            "reflect": false
        },
        "positionControl": {
            "type": "any",
            "mutable": false,
            "complexType": {
                "original": "google.maps.ControlPosition",
                "resolved": "any",
                "references": {
                    "google": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "position-control",
            "reflect": false
        },
        "floor": {
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
                "text": "Set or get the current floor shown on the map."
            },
            "attribute": "floor",
            "reflect": true
        },
        "zoom": {
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
                "text": "Set or get the current zoom level of the map."
            },
            "attribute": "zoom",
            "reflect": true,
            "defaultValue": "'17'"
        },
        "disableExternalLinks": {
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
                "text": "Set to true to prevent external links on the map from opening.\nThis can be useful when running the map on a kiosk where you never want the browser to navigate away."
            },
            "attribute": "disable-external-links",
            "reflect": false,
            "defaultValue": "false"
        },
        "polylineColor": {
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
                "text": "The stroke color of direction polyline on the map. Accepts any legal HTML color value.\nDefault: '#307ad9'."
            },
            "attribute": "polyline-color",
            "reflect": false,
            "defaultValue": "'#3071d9'"
        },
        "polylineWeight": {
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
                "text": "The the width of the direction polyline in pixels.\nDefault: 4."
            },
            "attribute": "polyline-weight",
            "reflect": false,
            "defaultValue": "4"
        },
        "polylineOpacity": {
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
                "text": "The stroke opacity of directions polylines on the map. Numerical value between 0.0 and 1.0.\nDefault: 1."
            },
            "attribute": "polyline-opacity",
            "reflect": false,
            "defaultValue": "1"
        }
    }; }
    static get events() { return [{
            "method": "mapsIndoorsReady",
            "name": "mapsIndoorsReady",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "ready",
                        "name": "event"
                    }],
                "text": "Ready event emitted when the MapsIndoors has been initialized and is ready."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "locationClicked",
            "name": "locationClicked",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "locationClicked",
                        "name": "event"
                    }, {
                        "text": "{object}",
                        "name": "type"
                    }, {
                        "text": "Object<Location>",
                        "name": "properties"
                    }],
                "text": "Location clicked event."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "positionReceived",
            "name": "positionReceived",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "positionReceived",
                        "name": "event"
                    }, {
                        "text": "{object}",
                        "name": "type"
                    }],
                "text": "Position received event emitted when the device location has been determined."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "positionError",
            "name": "positionError",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "positionError",
                        "name": "event"
                    }, {
                        "text": "{object}",
                        "name": "type"
                    }],
                "text": "Position error event emitted if position determination fails."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "dragend",
            "name": "dragend",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "dragend",
                        "name": "event"
                    }],
                "text": "Emitted when the user stops dragging the map."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "idle",
            "name": "idle",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "idle",
                        "name": "event"
                    }],
                "text": "Emitted when the map becomes idle after panning or zooming."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }]; }
    static get methods() { return {
        "getMapsIndoorsVersion": {
            "complexType": {
                "signature": "() => Promise<string>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<string>"
            },
            "docs": {
                "text": "Get the version of the MapsIndoors SDK.",
                "tags": [{
                        "name": "return",
                        "text": "SDK version"
                    }]
            }
        },
        "panTo": {
            "complexType": {
                "signature": "(latLng: any) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "latLng",
                                "name": "param"
                            }],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "google": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Changes the center of the map to the given LatLng.",
                "tags": [{
                        "name": "param",
                        "text": "latLng"
                    }]
            }
        },
        "fitBounds": {
            "complexType": {
                "signature": "(bounds: any) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "bounds",
                                "name": "param"
                            }],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "google": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets the map viewport to contain the given bounds.",
                "tags": [{
                        "name": "param",
                        "text": "bounds"
                    }]
            }
        },
        "getBounds": {
            "complexType": {
                "signature": "() => Promise<Object>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Object": {
                        "location": "global"
                    }
                },
                "return": "Promise<Object>"
            },
            "docs": {
                "text": "Returns the lat/lng bounds of the current map viewport.",
                "tags": [{
                        "name": "returns",
                        "text": undefined
                    }]
            }
        },
        "setDisplayRule": {
            "complexType": {
                "signature": "(target: string | string[], displayRule: object) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "target - Can be a single location id or type name, or an array of locations ids and type names.",
                                "name": "param"
                            }],
                        "text": "- Can be a single location id or type name, or an array of locations ids and type names."
                    }, {
                        "tags": [{
                                "text": "displayRule",
                                "name": "param"
                            }],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Set a display rule for one or more types or locations.",
                "tags": [{
                        "name": "param",
                        "text": "target - Can be a single location id or type name, or an array of locations ids and type names."
                    }, {
                        "name": "param",
                        "text": "displayRule"
                    }]
            }
        },
        "setVenue": {
            "complexType": {
                "signature": "(venue: any) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "venue venue id string or venue object to set",
                                "name": "param"
                            }],
                        "text": "venue id string or venue object to set"
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets the venue",
                "tags": [{
                        "name": "param",
                        "text": "venue venue id string or venue object to set"
                    }]
            }
        },
        "fitVenue": {
            "complexType": {
                "signature": "(venueId?: string) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "venueId - Venue ID",
                                "name": "param"
                            }],
                        "text": "- Venue ID"
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Changes the map view to show the default venue or pass in a venue ID to go to another venue.",
                "tags": [{
                        "name": "param",
                        "text": "venueId - Venue ID"
                    }]
            }
        },
        "openInfoWindow": {
            "complexType": {
                "signature": "(content: string, anchor: any, className?: string) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "content - Content of the info window in clear text or HTML.",
                                "name": "param"
                            }],
                        "text": "- Content of the info window in clear text or HTML."
                    }, {
                        "tags": [{
                                "text": "anchor - The location of the info window",
                                "name": "param"
                            }],
                        "text": "- The location of the info window"
                    }, {
                        "tags": [{
                                "text": "className - A classname given to the div holding the content",
                                "name": "param"
                            }],
                        "text": "- A classname given to the div holding the content"
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "google": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Open info window.",
                "tags": [{
                        "name": "param",
                        "text": "content - Content of the info window in clear text or HTML."
                    }, {
                        "name": "param",
                        "text": "anchor - The location of the info window"
                    }, {
                        "name": "param",
                        "text": "className - A classname given to the div holding the content"
                    }]
            }
        },
        "closeInfoWindow": {
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
                "text": "Close info window.",
                "tags": []
            }
        },
        "filterLocations": {
            "complexType": {
                "signature": "(locationIds: string[], fitView?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "locationIds - The IDs of the locations to show. Any other locations will be hidden.",
                                "name": "param"
                            }],
                        "text": "- The IDs of the locations to show. Any other locations will be hidden."
                    }, {
                        "tags": [{
                                "text": "fitView - Change the map viewport to fit the shown locations.",
                                "name": "param"
                            }],
                        "text": "- Change the map viewport to fit the shown locations."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "Array": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Filter the locations on the map by showing only provided location IDs.",
                "tags": [{
                        "name": "param",
                        "text": "locationIds - The IDs of the locations to show. Any other locations will be hidden."
                    }, {
                        "name": "param",
                        "text": "fitView - Change the map viewport to fit the shown locations."
                    }]
            }
        },
        "clearLocationFilter": {
            "complexType": {
                "signature": "(fitView?: boolean) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "fitView - Change the map viewport to fit all shown locations.",
                                "name": "param"
                            }],
                        "text": "- Change the map viewport to fit all shown locations."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Remove locations filter, thus showing all locations.",
                "tags": [{
                        "name": "param",
                        "text": "fitView - Change the map viewport to fit all shown locations."
                    }]
            }
        },
        "showRoute": {
            "complexType": {
                "signature": "(routeParams: RouteParams) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "routeParams",
                                "name": "param"
                            }],
                        "text": ""
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    },
                    "RouteParams": {
                        "location": "import",
                        "path": "./route-params.interface"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Show a route on the map from one location to another",
                "tags": [{
                        "name": "param",
                        "text": "routeParams"
                    }]
            }
        },
        "setRoute": {
            "complexType": {
                "signature": "(directionsResult: any) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "directionsResult https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DirectionsResult",
                                "name": "param"
                            }],
                        "text": "https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DirectionsResult"
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets a route, and renders the first leg of the route as a polyline.",
                "tags": [{
                        "name": "param",
                        "text": "directionsResult https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DirectionsResult"
                    }]
            }
        },
        "clearRoute": {
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
                "text": "Clear a currently rendered route (polyline).",
                "tags": []
            }
        },
        "nextRouteLeg": {
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
                "text": "Renders the next leg of the set route as a polyline on the map.",
                "tags": []
            }
        },
        "previousRouteLeg": {
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
                "text": "Renders the previous leg of the set route as a polyline on the map.",
                "tags": []
            }
        },
        "setRouteLegIndex": {
            "complexType": {
                "signature": "(index: number) => Promise<void>",
                "parameters": [{
                        "tags": [{
                                "text": "index Index of route leg to render on map.",
                                "name": "param"
                            }],
                        "text": "Index of route leg to render on map."
                    }],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<void>"
            },
            "docs": {
                "text": "Sets the index which leg of the route to display on the map.",
                "tags": [{
                        "name": "param",
                        "text": "index Index of route leg to render on map."
                    }]
            }
        },
        "getRoute": {
            "complexType": {
                "signature": "() => Promise<any>",
                "parameters": [],
                "references": {
                    "Promise": {
                        "location": "global"
                    }
                },
                "return": "Promise<any>"
            },
            "docs": {
                "text": "Get info about the current route.",
                "tags": [{
                        "name": "returns",
                        "text": "DirectionsResult"
                    }]
            }
        }
    }; }
    static get watchers() { return [{
            "propName": "miApiKey",
            "methodName": "apiKeyChange"
        }, {
            "propName": "gmOptions",
            "methodName": "gmOptionsChange"
        }, {
            "propName": "floorSelector",
            "methodName": "floorSelectorChange"
        }, {
            "propName": "positionControl",
            "methodName": "positionControlChange"
        }, {
            "propName": "floor",
            "methodName": "floorChange"
        }, {
            "propName": "zoom",
            "methodName": "zoomChange"
        }, {
            "propName": "disableExternalLinks",
            "methodName": "disableExternalLinksChange"
        }, {
            "propName": "polylineColor",
            "methodName": "polylineColorChange"
        }, {
            "propName": "polylineWeight",
            "methodName": "polylineWeightChange"
        }, {
            "propName": "polylineOpacity",
            "methodName": "polylineOpacityChange"
        }]; }
}
