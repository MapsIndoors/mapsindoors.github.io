import { EventEmitter } from '../../stencil-public-runtime';
export declare class ListItemCategory {
    /**
     * @description Array of Categories.
     * @type {Array<Category>}
     */
    category: any;
    /**
     * @description List orientation. Accepts the following values: 'vertical' and 'horizontal'.
     * @type {string}
     */
    orientation: string;
    /**
     * @description Emits the clicked category.
     * @type {EventEmitter<Category>}
     */
    categoryClicked: EventEmitter;
    /**
     * @description Emits a component render event.
     * @type {EventEmitter}
     */
    listItemDidRender: EventEmitter;
    private image;
    componentDidRender(): void;
    /**
     * @description Emits the category object to event listeners.
     * @private
     * @param {*} category - Category object.
     * @memberof ListItemCategory
     */
    private categoryClickedHandler;
    /**
     * @description Set image as background image.
     * @private
     * @param {HTMLImageElement} image
     */
    private objectFitImage;
    render(): any;
}
