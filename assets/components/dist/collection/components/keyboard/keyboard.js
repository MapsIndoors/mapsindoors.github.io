import { h } from "@stencil/core";
import { Prop, Watch } from '@stencil/core/internal';
import SimpleKeyboard from 'simple-keyboard';
import { KeyboardLayout } from './keyboard-layout.enum';
import { defaultAlphabetic, danishAlphabetic, unitedStatesAlphabetic } from './keyboard-alphabetic-layouts';
import { defaultNumeric } from './keyboard-numeric-layouts';
export class Keyboard {
    constructor() {
        /**
         * The keyboard layout to use. Defaults to alphabetic.
         *
         * @type {KeyboardLayout}
         */
        this.layout = KeyboardLayout.Alphabetic;
        this.inputElements = new Set();
    }
    inputElementChange() {
        // Check for id attribute (Used by SimpleKeyboard to differ between multiple inputs for the same Mi-keyboard instance)
        if (!this.inputElement.hasAttribute('id')) {
            // eslint-disable-next-line no-console
            console.warn('MI-KEYBOARD: Invalid id attribute');
            return;
        }
        if (this.simpleKeyboard) {
            // Update SimpleKeyboards input element reference
            this.simpleKeyboard.setOptions({ inputName: this.inputElement.id });
            // Update SimpleKeyboards input value
            this.simpleKeyboard.setInput(this.inputElement.value, this.inputElement.id);
        }
        // Check to make sure that event listeners only is added to new input elements
        if (!this.inputElements.has(this.inputElement)) {
            this.inputElements.add(this.inputElement);
            // Update SimpleKeyboards input value on the following events.
            // The custom event 'inputCleared' is for manually triggering.
            const eventsToListenFor = ['input', 'focus', 'blur', 'inputCleared'];
            eventsToListenFor.forEach((event) => {
                this.inputElement.addEventListener(event, () => {
                    this.simpleKeyboard.setInput(this.inputElement.value, this.inputElement.id);
                });
            });
        }
    }
    layoutChange() {
        if (this.simpleKeyboard) {
            this.simpleKeyboard.setOptions({ layout: this.getKeyboardLayout(this.layout) });
        }
    }
    componentDidLoad() {
        this.simpleKeyboard = new SimpleKeyboard({
            onChange: (input) => {
                if (this.inputElement) {
                    this.inputElement.value = input;
                    this.inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                }
            },
            layout: this.getKeyboardLayout(this.layout),
            display: {
                '{bksp}': '&#9003;',
                '{enter}': 'return',
                '{space}': 'space'
            },
            theme: 'hg-theme-default hg-layout-numeric numeric-theme'
        });
    }
    /**
     * Check validity of keyboard layout.
     *
     * @param {layout} string
     * @returns {boolean}
     */
    isValidLayout(layout) {
        if (!layout)
            return false;
        return Object.values(KeyboardLayout).find((keyboardLayout) => keyboardLayout === layout) ? true : false;
    }
    /**
     * Get keyboard layout. Defaults to alphabetic.
     *
     * @param {KeyboardLayout} keyboardLayout Accepts values of KeyboardLayout enum, eg. 'numeric' or 'alphabetic'
     * @returns {{ [key: string]: string[]; }}
     */
    getKeyboardLayout(keyboardLayout) {
        if (!this.isValidLayout(keyboardLayout)) {
            // eslint-disable-next-line no-console
            console.warn('MI-KEYBOARD: Invalid layout attribute');
            return defaultAlphabetic;
        }
        // Numeric layout
        if (keyboardLayout === KeyboardLayout.Numeric) {
            return defaultNumeric;
        }
        // Alphabetic layout
        const browserLanguage = window.navigator.language;
        if (!browserLanguage)
            return defaultAlphabetic; // Return defaultAlphabetic if navigator language isn't available.
        const supportedAlphabeticLayouts = [
            { layout: unitedStatesAlphabetic, languages: ['en', 'en-us'] },
            { layout: danishAlphabetic, languages: ['da'] }
        ];
        const supportedLayout = supportedAlphabeticLayouts.find((layout) => {
            return layout.languages.find((language) => language === browserLanguage.toLowerCase()) ? true : false;
        });
        return supportedLayout ? supportedLayout.layout : defaultAlphabetic;
    }
    /**
     * Render on-screen keyboard.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (h("div", { class: 'simple-keyboard' }));
    }
    static get is() { return "mi-keyboard"; }
    static get originalStyleUrls() { return {
        "$": ["keyboard.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["keyboard.css"]
    }; }
    static get properties() { return {
        "inputElement": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "HTMLInputElement",
                "resolved": "HTMLInputElement",
                "references": {
                    "HTMLInputElement": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [{
                        "text": "{HTMLInputElement}",
                        "name": "type"
                    }],
                "text": "The active input element."
            }
        },
        "layout": {
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
                        "text": "{KeyboardLayout}",
                        "name": "type"
                    }],
                "text": "The keyboard layout to use. Defaults to alphabetic."
            },
            "attribute": "layout",
            "reflect": false,
            "defaultValue": "KeyboardLayout.Alphabetic"
        }
    }; }
    static get watchers() { return [{
            "propName": "inputElement",
            "methodName": "inputElementChange"
        }, {
            "propName": "layout",
            "methodName": "layoutChange"
        }]; }
}
