export declare class ScrollButtons {
    /**
     * @description Reference to the element with scroll on parent element.
     * @type {HTMLDivElement}
     */
    scrollContainerElementRef: HTMLDivElement;
    /**
     * @description  Determines how far to scroll when clicking one of the buttons.
     * @type {number}
     */
    scrollLength: number;
    private upButtonElement;
    private downButtonElement;
    /**
     * @description Add scroll event listener to container reference.
     * @memberof ScrollButtons
     */
    addScrollEventListener(): void;
    /**
     * @description Updates enable/disable state for scroll up and down buttons.
     * @returns {Promise<void>}
     * @memberof ScrollButtons
     */
    updateScrollButtonsState(): Promise<void>;
    /**
     * @description Update scroll position.
     * @private
     * @param {number} value - Value to scroll.
     * @memberof ScrollButtons
     */
    private updateScrollPosition;
    render(): void;
}
