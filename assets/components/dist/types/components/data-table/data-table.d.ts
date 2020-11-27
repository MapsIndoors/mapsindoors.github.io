export declare class DataTable {
    el: HTMLDivElement;
    columns: Array<any>;
    rows: Array<any>;
    maxRows: number;
    connectedCallback(): void;
    sort(event: any, column: any): void;
    render(): any;
}
