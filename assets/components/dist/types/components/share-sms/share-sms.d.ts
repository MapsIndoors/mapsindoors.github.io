import { ComponentInterface, JSX, EventEmitter } from '../../stencil-public-runtime';
export declare class ShareSms implements ComponentInterface {
    /**
     * MapsIndoors venue id.
     *
     * @type {string}
     */
    venueId: string;
    /**
     * MapsIndoors id for origin location.
     *
     * @type {string}
     */
    originLocationId: string;
    /**
     * MapsIndoors id for destination location.
     *
     * @type {string}
     */
    destinationLocationId: string;
    /**
     * Default value for country code input field.
     *
     * @type {string}
     */
    countryCode: string;
    /**
     * Placeholder text for phone number input field.
     *
     * @type {string}
     */
    phoneNumberInputPlaceholder: string;
    /**
     * Label for submit button.
     *
     * @type {string}
     */
    submitButtonLabel: string;
    /**
     * Emits a success event when the SMS is send.
     *
     * @type {EventEmitter}
     */
    successfullySent: EventEmitter;
    /**
     * Emits a error message when the SMS wasn't send.
     *
     * @type {EventEmitter<string>}
     */
    unsuccessfullySent: EventEmitter<string>;
    intersectionObserver: IntersectionObserver;
    formElement: HTMLFormElement;
    countryCodeInputElement: HTMLInputElement;
    phoneNumberInputElement: HTMLInputElement;
    submitButtonElement: HTMLButtonElement;
    miKeyboardElement: HTMLMiKeyboardElement;
    componentDidRender(): void;
    componentDidLoad(): void;
    /**
     * Observe the input field for phone number and focus it on intersection.
     */
    addIntersectionObserver(): void;
    /**
     * Set input attribute on mi-keyboard component.
     *
     * @param {FocusEvent} event
     */
    setKeyboardInputElement(event: FocusEvent): void;
    /**
     * Handle form submission event and send directions to phone if validation checks passes.
     */
    submitFormHandler: (event: Event) => void;
    /**
     * Update form validity.
     */
    updateFormValidity(): void;
    render(): JSX.Element;
}
