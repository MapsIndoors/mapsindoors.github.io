import { h } from "@stencil/core";
export class ShareSms {
    constructor() {
        /**
         * Default value for country code input field.
         *
         * @type {string}
         */
        this.countryCode = '1';
        /**
         * Placeholder text for phone number input field.
         *
         * @type {string}
         */
        this.phoneNumberInputPlaceholder = 'Enter phone number';
        /**
         * Label for submit button.
         *
         * @type {string}
         */
        this.submitButtonLabel = 'Send SMS';
        /**
         * Handle form submission event and send directions to phone if validation checks passes.
         */
        this.submitFormHandler = (event) => {
            event.preventDefault();
            const isParametersValid = this.venueId && this.originLocationId && this.destinationLocationId ? true : false;
            if (!this.formElement.checkValidity() || !isParametersValid) {
                if (!this.countryCodeInputElement.validity.valid) {
                    this.countryCodeInputElement.focus();
                }
                if (!this.phoneNumberInputElement.validity.valid) {
                    this.phoneNumberInputElement.focus();
                }
                return;
            }
            mapsindoors.ShareService.directionsToPhone(this.venueId, this.originLocationId, this.destinationLocationId, this.countryCodeInputElement.value, this.phoneNumberInputElement.value)
                .then(() => this.successfullySent.emit())
                .catch((err) => this.unsuccessfullySent.emit(err));
        };
    }
    componentDidRender() {
        this.countryCodeInputElement.value = this.countryCode;
    }
    componentDidLoad() {
        this.addIntersectionObserver();
    }
    /**
     * Observe the input field for phone number and focus it on intersection.
     */
    addIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                return;
            }
            this.phoneNumberInputElement.focus();
            this.intersectionObserver.disconnect();
        });
        this.intersectionObserver.observe(this.phoneNumberInputElement);
    }
    /**
     * Set input attribute on mi-keyboard component.
     *
     * @param {FocusEvent} event
     */
    setKeyboardInputElement(event) {
        this.miKeyboardElement.inputElement = event.target;
    }
    /**
     * Update form validity.
     */
    updateFormValidity() {
        // Form validity check
        if (!this.formElement.checkValidity()) {
            this.submitButtonElement.disabled = true;
            return;
        }
        this.submitButtonElement.disabled = false;
    }
    render() {
        return (h("form", { onSubmit: this.submitFormHandler, ref: (el) => this.formElement = el },
            h("div", { class: "inputs" },
                h("span", { class: "plus-sign" }, "\uFF0B"),
                h("input", { id: "country-code", class: "country-code", pattern: "[0-9]{1,3}", required: true, autocomplete: "off", type: "text", placeholder: this.countryCode, ref: (el) => this.countryCodeInputElement = el, onInput: () => this.updateFormValidity(), onFocus: (e) => this.setKeyboardInputElement(e) }),
                h("input", { id: "phone-number", class: "phone-number", pattern: "[0-9]{6,10}", required: true, autocomplete: "off", type: "text", placeholder: this.phoneNumberInputPlaceholder, ref: (el) => this.phoneNumberInputElement = el, onInput: () => this.updateFormValidity(), onFocus: (e) => this.setKeyboardInputElement(e) })),
            h("mi-keyboard", { layout: "numeric", ref: (el) => this.miKeyboardElement = el }),
            h("div", { class: "flex justify-center" },
                h("button", { type: "submit", disabled: true, class: "mi-button mi-button--primary", ref: (el) => this.submitButtonElement = el }, this.submitButtonLabel))));
    }
    static get is() { return "mi-share-sms"; }
    static get originalStyleUrls() { return {
        "$": ["share-sms.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["share-sms.css"]
    }; }
    static get properties() { return {
        "venueId": {
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
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "MapsIndoors venue id."
            },
            "attribute": "venue",
            "reflect": false
        },
        "originLocationId": {
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
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "MapsIndoors id for origin location."
            },
            "attribute": "origin",
            "reflect": false
        },
        "destinationLocationId": {
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
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "MapsIndoors id for destination location."
            },
            "attribute": "destination",
            "reflect": false
        },
        "countryCode": {
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
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "Default value for country code input field."
            },
            "attribute": "country-code",
            "reflect": false,
            "defaultValue": "'1'"
        },
        "phoneNumberInputPlaceholder": {
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
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "Placeholder text for phone number input field."
            },
            "attribute": "inputplaceholder",
            "reflect": false,
            "defaultValue": "'Enter phone number'"
        },
        "submitButtonLabel": {
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
                        "text": "{string}",
                        "name": "type"
                    }],
                "text": "Label for submit button."
            },
            "attribute": "submit-button-label",
            "reflect": false,
            "defaultValue": "'Send SMS'"
        }
    }; }
    static get events() { return [{
            "method": "successfullySent",
            "name": "successfullySent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "{EventEmitter}",
                        "name": "type"
                    }],
                "text": "Emits a success event when the SMS is send."
            },
            "complexType": {
                "original": "any",
                "resolved": "any",
                "references": {}
            }
        }, {
            "method": "unsuccessfullySent",
            "name": "unsuccessfullySent",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [{
                        "text": "{EventEmitter<string>}",
                        "name": "type"
                    }],
                "text": "Emits a error message when the SMS wasn't send."
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
