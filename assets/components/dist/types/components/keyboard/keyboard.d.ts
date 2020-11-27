import { ComponentInterface } from '../../stencil-public-runtime';
import { JSX } from '../../stencil-public-runtime';
import { KeyboardLayout } from './keyboard-layout.enum';
export declare class Keyboard implements ComponentInterface {
    /**
     * The active input element.
     *
     * @type {HTMLInputElement}
     */
    inputElement: HTMLInputElement;
    inputElementChange(): void;
    /**
     * The keyboard layout to use. Defaults to alphabetic.
     *
     * @type {KeyboardLayout}
     */
    layout: string;
    layoutChange(): void;
    private simpleKeyboard;
    private inputElements;
    componentDidLoad(): void;
    /**
     * Check validity of keyboard layout.
     *
     * @param {layout} string
     * @returns {boolean}
     */
    isValidLayout(layout: string): boolean;
    /**
     * Get keyboard layout. Defaults to alphabetic.
     *
     * @param {KeyboardLayout} keyboardLayout Accepts values of KeyboardLayout enum, eg. 'numeric' or 'alphabetic'
     * @returns {{ [key: string]: string[]; }}
     */
    getKeyboardLayout(keyboardLayout: KeyboardLayout): {
        [key: string]: string[];
    };
    /**
     * Render on-screen keyboard.
     *
     * @returns {JSX.Element}
     */
    render(): JSX.Element;
}
