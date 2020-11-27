import { EventEmitter, JSX } from '../../stencil-public-runtime';
import { UnitSystem } from './unit-system.enum';
export declare class ListItemLocation {
    /**
     * @description MI location.
     */
    location: any;
    /**
     * @description Set imperial or metric as default unit system.
     * @type {UnitSystem}
     */
    unit: UnitSystem;
    /**
     * @description Emits the clicked MI Location.
     * @type {EventEmitter<Location>}
     */
    locationClicked: EventEmitter;
    /**
     * @description Emits a component render event.
     * @type {EventEmitter}
     */
    listItemDidRender: EventEmitter;
    private imageElement;
    private distance;
    private infoElement;
    /**
     * @description Emits the location to event listeners.
     * @param {*} location - Location object.
     * @memberof List
     */
    locationClickedHandler(location: any): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    /**
     * @description Set image as background image.
     * @param {HTMLImageElement} image
     */
    objectFitImage(image: HTMLImageElement): void;
    /**
     * @description Get distance as a string.
     * @param {number} meters
     * @returns {string}
     */
    getDistanceString(meters: number): string;
    /**
     * @description Render location list-item.
     * @returns {JSX.Element}
     */
    render(): JSX.Element;
    /**
     * @description Get JSX template for icon.
     * @returns {JSX.Element}
     */
    renderIcon(): JSX.Element;
    /**
     * @description Get JSX template for distance.
     * @returns {JSX.Element}
     */
    renderDistance(): JSX.Element;
}
