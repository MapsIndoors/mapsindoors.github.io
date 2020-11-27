import { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import { JSX } from '../../stencil-public-runtime';
export declare class Search implements ComponentInterface {
    /**
     * Event emitted when searching is complete.
     */
    results: EventEmitter<object[]>;
    /**
     * Event emitted when the search field is emptied.
     */
    cleared: EventEmitter<void>;
    /**
     * Event emitted after every component rendering.
     */
    componentRendered: EventEmitter<void>;
    /**
     * Placeholder for the input field.
     */
    placeholder: string;
    /**
     * Id for the input field.
     */
    idAttribute: string;
    /**
     * Data attributes for the input field.
     */
    dataAttributes: {
        [key: string]: string;
    };
    /**
     * If searching should include MapsIndoors locations.
     */
    mapsindoors: boolean;
    /**
     * If searching should include Google Places autocomplete suggestions.
     *
     * Remember to comply to Google's policy by showing a "Power By Google" badge somewhere on your
     * page if not already showing a Google map: https://developers.google.com/places/web-service/policies
     */
    google: boolean;
    /**
     * Which fields on MapsIndoors locations to search in. Comma separated string.
     */
    miFields: string;
    /**
     * Restrict how many Mapsindoors results to request.
     */
    miTake: number;
    /**
     * Tell Mapsindoors to skip a number of results. Combine with miTake for pagination purposes.
     */
    miSkip: number;
    /**
     * Specify Mapsindoors search ordering
     */
    miOrder: string;
    /**
     * Search only Mapsindoors locations within given categories.
     * Accepts comma separated list of categories, eg. 'toilet,office'
     */
    miCategories: string;
    /**
     * Search for MapsIndoors locations near a point.
     * Can either be lat,lng coordinate as a string, eg. '-12.3456,45.6789' or a string in the format "type:id" e.g. "venue:586ca9f1bc1f5702406442b6"
     */
    miNear: string;
    /**
     * Restrict Google Places search to a specific country (two-character, ISO 3166-1 Alpha-2 compatible country code)
     */
    gmCountryCode: string;
    /**
     * Get or set the entered value
     */
    value: string;
    valueChange(newValue: any): void;
    /**
     * Clear the input field.
     */
    clear(): Promise<void>;
    /**
     * The input element
     */
    private inputElement;
    /**
     * Holds the input value of the last fired request.
     * Used to prevent firing the same requests subsequently.
     */
    private lastRequested;
    /**
     * Holds a Google Places AutocompleteService.
     */
    private googleAutocompleteService;
    /**
     * Handles incoming input change event, eg. input field value has changed.
     * The function is debounced 500ms to avoid firing too many requests while typing.
     */
    private inputChanged;
    /**
     * Push the results via the results event.
     * @param object[] Locations
     */
    private pushResults;
    /**
     * Make MapsIndoors locations request based on given search query.
     * @param {string} query
     * @return {Promise<any[]>}
     */
    private makeMapsIndoorsQuery;
    /**
     * Make Google Places autocomplete suggestion request.
     * @param {string} query
     * @return {Promise<any>}
     */
    private makeGooglePlacesQuery;
    componentDidRender(): void;
    render(): JSX.Element;
}
