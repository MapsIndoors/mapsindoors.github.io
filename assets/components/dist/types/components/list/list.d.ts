import { JSX } from '../../stencil-public-runtime';
export declare class List {
    /**
     * @description Determines if the MI Scroll Buttons Component should be rendered.
     * @type {boolean}
     */
    scrollButtonsEnabled: boolean;
    /**
     * @description Determines how far to scroll when clicking one of the buttons from the MI Scroll Buttons Component.
     * @type {number}
     */
    scrollLength: number;
    private intersectionObserver;
    private scrollContainerElement;
    private miScrollButtonsElement;
    componentDidLoad(): void;
    /**
     * @description Update state of scroll buttons when a "listItemDidRender" event is fired.
     * @private
     */
    private updateScrollButtonsState;
    /**
     * @description Set scrollContainerElementRef attribute on miScrollButtonsElement.
     * @private
     */
    private setScrollContainerElementRef;
    /**
     * @description Add intersection observer and update scroll buttons state on intersection – workaround to avoid the element not having any dimensions before it's shown.
     * @private
     */
    private addIntersectionObserver;
    render(): JSX.Element;
}
