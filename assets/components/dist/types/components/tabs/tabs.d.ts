export declare class Tabs {
    el: HTMLDivElement;
    active: number;
    private tabs;
    connectedCallback(): void;
    componentDidLoad(): void;
    selectTab(index: any): Promise<void>;
    render(): any;
}
