import { EventEmitter } from '../../stencil-public-runtime';
export declare class Dropdown {
    private filterElement;
    el: HTMLDivElement;
    currentItems: Array<HTMLMiDropdownItemElement>;
    /**
     * Triggers an event when the selection is changed.
     *
     * @type {EventEmitter}
     * @memberof Dropdown
     */
    change: EventEmitter;
    /**
     * Gets or sets the state of the dropdown.
     * If the attribute is set to true then the dropdown will be expanded.
     *
     * @type {boolean}
     * @memberof Dropdown
     */
    open: boolean;
    /**
     * Gets or sets the list items.
     *
     * @type {Array<HTMLMiDropdownItemElement>}
     * @memberof Dropdown
     */
    items: Array<HTMLMiDropdownItemElement>;
    /**
     * The label will be displayed in as the text of the dropdown if the attribute multiple is pressent.
     * *Only required if multiple is pressent.
     *
     * @type {string}
     * @memberof Dropdown
     */
    label: string;
    /**
     * This attribute indicates that the items can be filtered using the input field present at the top.
     * If it is not specified, the input field will not be visible, and filtering is not possible.
     *
     * @type {boolean}
     * @memberof Dropdown
     */
    filterable: boolean;
    /**
     * This attribute indicates that multiple items can be selected in the list. If it is not specified, then only one item can be selected at a time.
     *
     * @type {boolean}
     * @memberof Dropdown
     */
    multiple: boolean;
    /**
     * Gets the selected items
     *
     * @type {Array<HTMLMiDropdownItemElement>}
     * @memberof Dropdown
     */
    selected: Array<HTMLMiDropdownItemElement>;
    connectedCallback(): void;
    onItemsChanged(items: any): void;
    private onChangedHandler;
    private toggle;
    private selectAll;
    private selectNone;
    private onSelect;
    private filter;
    private clearFilter;
    render(): any;
    /**
     * Helper function for rendering the filtering UI.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    private renderFiltering;
    /**
     * Helper function for rendering the multi select options.
     *
     * @private
     * @returns
     * @memberof Dropdown
     */
    private renderMultipleOptions;
    /**
     * Helper function for rendering list item.
     *
     * @private
     * @param {*} item
     * @param {*} index
     * @param {*} showCheckBox
     * @returns
     * @memberof Dropdown
     */
    private renderListItem;
}
