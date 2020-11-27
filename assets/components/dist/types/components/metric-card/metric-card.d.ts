export declare class MetricCard {
    showToolTip: boolean;
    /**
     * This is the metric title.
     * @type {string}
     * @memberof MetricCard
     */
    label: string;
    /**
     * This is the metric value.
     * @type {string}
     * @memberof MetricCard
     */
    value: string;
    /**
     * When present a info icon will be shown in the upper right corner of the card. When the mouse hovers over the icon tooltip will display the tip.
     * @type {string}
     * @memberof MetricCard
     */
    tip: string;
    /**
     * When present a loading spinner will be displayed until the value or error attribute is set or the spinner attribute is removed
     * @type {boolean}
     * @memberof MetricCard
     */
    spinner: boolean;
    /**
     * This can be used for displaying an error message if there are no data to be displayed.
     * @type {string}
     * @memberof MetricCard
     */
    error: string;
    render(): any;
    renderToolTip(): any;
    getInfoIcon(): any;
    renderContent(): any;
}
