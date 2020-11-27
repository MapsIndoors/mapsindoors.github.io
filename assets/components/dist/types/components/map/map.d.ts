/// <reference types="googlemaps" />
import { EventEmitter } from '../../stencil-public-runtime';
import { JSX } from '../../stencil-public-runtime';
import { RouteParams } from './route-params.interface';
export declare class Map {
    /**
     * The MapsIndoors API key
     */
    miApiKey: string;
    apiKeyChange(newApiKey: any): void;
    /**
     * The Google Maps API key
     */
    gmApiKey: string;
    /**
     * Google Maps options. Defaults to zoom: 17, maxZoom: 21, mapTypeControl: false, streetViewControl: false.
     * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
     * @type {google.maps.MapOptions}
     */
    gmOptions: google.maps.MapOptions;
    gmOptionsChange(newControlOptions: any): void;
    /**
     * If given, will render a floor selector as a Google Map Control.
     * Pass a string corresponding to a Google Maps Control position: https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning
     */
    floorSelector: google.maps.ControlPosition;
    floorSelectorChange(newPosition: any, oldPosition: any): void;
    positionControl: google.maps.ControlPosition;
    positionControlChange(newPosition: any, oldPosition: any): void;
    /**
     * Set or get the current floor shown on the map.
     */
    floor: string;
    floorChange(newFloor: any, oldFloor: any): void;
    /**
     * Set or get the current zoom level of the map.
     */
    zoom: string;
    zoomChange(newZoom: any, oldZoom: any): void;
    /**
     * Set to true to prevent external links on the map from opening.
     * This can be useful when running the map on a kiosk where you never want the browser to navigate away.
     */
    disableExternalLinks: boolean;
    disableExternalLinksChange(attributeValue: any): void;
    /**
     * The stroke color of direction polyline on the map. Accepts any legal HTML color value.
     * Default: '#307ad9'.
     */
    polylineColor: string;
    polylineColorChange(newPolylineColor: any): void;
    /**
     * The the width of the direction polyline in pixels.
     * Default: 4.
     */
    polylineWeight: number;
    polylineWeightChange(newPolylineWeight: any): void;
    /**
     * The stroke opacity of directions polylines on the map. Numerical value between 0.0 and 1.0.
     * Default: 1.
     */
    polylineOpacity: number;
    polylineOpacityChange(newPolylineOpacity: any): void;
    /**
     * Ready event emitted when the MapsIndoors has been initialized and is ready.
     * @event ready
     */
    mapsIndoorsReady: EventEmitter;
    /**
     * Location clicked event.
     * @event locationClicked
     * @type {object}
     * @properties Object<Location>
     */
    locationClicked: EventEmitter;
    /**
     * Position received event emitted when the device location has been determined.
     * @event positionReceived
     * @type {object}
     */
    positionReceived: EventEmitter;
    /**
     * Position error event emitted if position determination fails.
     * @event positionError
     * @type {object}
     */
    positionError: EventEmitter;
    /**
     * Emitted when the user stops dragging the map.
     * @event dragend
     */
    dragend: EventEmitter;
    /**
     * Emitted when the map becomes idle after panning or zooming.
     * @event idle
     */
    idle: EventEmitter;
    /**
     * Get the version of the MapsIndoors SDK.
     * @return {Promise<string>} SDK version
     */
    getMapsIndoorsVersion(): Promise<string>;
    /**
     * Changes the center of the map to the given LatLng.
     * @param {google.maps.LatLng} latLng
     */
    panTo(latLng: google.maps.LatLng): Promise<void>;
    /**
     * Sets the map viewport to contain the given bounds.
     * @param {google.maps.LatLngBounds} bounds
     */
    fitBounds(bounds: google.maps.LatLngBounds): Promise<void>;
    /**
     * Returns the lat/lng bounds of the current map viewport.
     * @returns {Promise<google.maps.LatLngBounds>}
     */
    getBounds(): Promise<Object>;
    /**
     * Set a display rule for one or more types or locations.
     * @param {(string|string[])} target - Can be a single location id or type name, or an array of locations ids and type names.
     * @param {DisplayRule} displayRule
     */
    setDisplayRule(target: string | string[], displayRule: object): Promise<void>;
    /**
     * Sets the venue
     * @param {string|object} venue venue id string or venue object to set
     */
    setVenue(venue: any): Promise<void>;
    /**
     * Changes the map view to show the default venue or pass in a venue ID to go to another venue.
     * @param {string} [venueId] - Venue ID
     */
    fitVenue(venueId?: string): Promise<void>;
    /**
     * Open info window.
     * @param {string} content - Content of the info window in clear text or HTML.
     * @param {google.maps.LatLng} anchor - The location of the info window
     * @param {string} className - A classname given to the div holding the content
     */
    openInfoWindow(content: string, anchor: google.maps.LatLng, className?: string): Promise<void>;
    /**
     * Close info window.
     */
    closeInfoWindow(): Promise<void>;
    /**
     * Filter the locations on the map by showing only provided location IDs.
     * @param {array} locationIds - The IDs of the locations to show. Any other locations will be hidden.
     * @param {boolean} fitView - Change the map viewport to fit the shown locations.
     */
    filterLocations(locationIds: Array<string>, fitView?: boolean): Promise<void>;
    /**
     * Remove locations filter, thus showing all locations.
     * @param fitView  - Change the map viewport to fit all shown locations.
     */
    clearLocationFilter(fitView?: boolean): Promise<void>;
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
    showRoute(routeParams: RouteParams): Promise<void>;
    /**
     * Sets a route, and renders the first leg of the route as a polyline.
     * @param directionsResult https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DirectionsResult
     */
    setRoute(directionsResult: any): Promise<void>;
    /**
     * Clear a currently rendered route (polyline).
     */
    clearRoute(): Promise<void>;
    /**
     * Renders the next leg of the set route as a polyline on the map.
     */
    nextRouteLeg(): Promise<void>;
    /**
     * Renders the previous leg of the set route as a polyline on the map.
     */
    previousRouteLeg(): Promise<void>;
    /**
     * Sets the index which leg of the route to display on the map.
     * @param index Index of route leg to render on map.
     */
    setRouteLegIndex(index: number): Promise<void>;
    /**
     * Get info about the current route.
     * @returns {Promise<any>} DirectionsResult
     */
    getRoute(): Promise<any>;
    private mapDiv;
    private googleMapsApiTag;
    private miSdkApiTag;
    private googleMapInstance;
    private mapsIndoorsInstance;
    private floorSelectorInstance;
    private floorSelectorElement;
    private positionControlInstance;
    private positionControlElement;
    private infoWindow;
    private directionsRenderer;
    private fitToDirectionsRouteBounds;
    componentDidLoad(): Promise<void>;
    /**
     * Show the floor selector after user interacts with map.
     * Sets up event listener what when invoked will set the floor selector on the map.
     */
    showFloorSelectorAfterUserInteraction(): void;
    /**
     * Ensure that Google Maps API is available.
     *
     * @returns {Promise<void>}
     */
    initializeGoogleMaps(): Promise<void>;
    /**
     * Inject script tag for Google Maps API onto the page.
     *
     * @returns {Promise<void>}
     */
    insertGoogleMapsScript(): Promise<void>;
    /**
     * Ensure that MapsIndoors Web SDK is available.
     *
     * @returns {Promise<void>}
     */
    initialiseMapsIndoorsSDK(): Promise<void>;
    /**
     * Start Google map and MapsIndoors.
     */
    setupMap(): Promise<void>;
    /**
     * Setup listeners for some MapsIndoors and Google Map events and emit them out of component.
     */
    relayEvents(): void;
    /**
     * Prevent external links from opening.
     * @param {MouseEvent} event
     */
    preventExternalLink(event: MouseEvent): void;
    /**
     * Set or remove event listeners for external links.
     * @param {boolean} shouldDisableLinks - If true, external links on the map will be preventet from opening.
     */
    setExternalLinkBehavior(shouldDisableLinks: any): void;
    /**
     * Remove a Google Map Control from the map based on class name of the control.
     * @param {google.maps.ControlPosition} position - the position from where to remove the control
     * @param {string} className - the classname of the control to remove
     */
    removeGoogleMapControl(position: google.maps.ControlPosition, className: string): void;
    /**
     * Set, update or unset floor selector on the map.
     * @param {google.maps.ControlPosition} position
     * @param {google.maps.ControlPosition} [oldPosition]
     */
    setFloorSelector(mapControlPosition: google.maps.ControlPosition, oldMapControlPosition?: google.maps.ControlPosition): void;
    /**
     * Set, update or unset position control on the map.
     * @param {google.maps.ControlPosition} mapControlPosition
     * @param {google.maps.ControlPosition} oldMapControlPosition
     */
    setPositionControl(mapControlPosition: google.maps.ControlPosition, oldMapControlPosition?: google.maps.ControlPosition): void;
    /**
     * Add event listeners for position events.
     */
    setPositionEventListeners(): void;
    /**
     * Remove event listeners for position events.
     */
    clearPositionEventListeners(): void;
    render(): JSX.Element;
}
