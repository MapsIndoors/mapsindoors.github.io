import { Host, h } from "@stencil/core";
import { isNullOrUndefined, isNumber } from '../../utils/utils';
export class DataTable {
    constructor() {
        this.columns = [];
        this.rows = [];
    }
    connectedCallback() {
        const columns = this.el.querySelectorAll('mi-column');
        this.columns = Array.from(columns).map(column => {
            return {
                label: !isNullOrUndefined(column.label) ? column.label : column.binding,
                binding: column.binding || null,
                sortable: !!column.sortable,
                /* All HTML comments are removed from the template to avoid the issues with the table not displaying any data in IE11  */
                template: column.innerHTML.replace(/<!--[\s\S]*?-->/g, '')
            };
        });
    }
    sort(event, column) {
        if (column.sortable) {
            const th = event.currentTarget;
            const tr = th.parentElement;
            const sortOrder = th.classList.contains('asc') ? 'desc' : th.classList.contains('desc') ? 'asc' : 'desc';
            const method = sortOrder === 'desc' ? desc(column.binding) : asc(column.binding);
            tr.querySelectorAll('th').forEach(td => {
                td.classList.remove('desc');
                td.classList.remove('asc');
            });
            th.classList.add(sortOrder);
            this.rows = [...this.rows.sort(method)];
        }
    }
    render() {
        const rows = isNumber(this.maxRows) && this.maxRows > 0 ? this.rows.slice(0, this.maxRows) : this.rows;
        return (h(Host, null,
            h("table", null,
                h("thead", null,
                    h("tr", null, this.columns.map(column => h("th", { onClick: (event) => column.sortable && this.sort(event, column), class: { "no-sort": !column.sortable } }, column.label)))),
                h("tbody", null, rows.map((row) => h("tr", null, this.columns.map((column) => {
                    let template = column.template;
                    if (template > '') {
                        template = template.replace(/\{(.*?)\}/g, (match, capture) => {
                            return row[capture] || '';
                        });
                    }
                    return h("td", { innerHTML: template || row[column.binding] });
                })))))));
    }
    static get is() { return "mi-data-table"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["data-table.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["data-table.css"]
    }; }
    static get properties() { return {
        "columns": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<any>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "rows": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Array<any>",
                "resolved": "any[]",
                "references": {
                    "Array": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "defaultValue": "[]"
        },
        "maxRows": {
            "type": "number",
            "mutable": false,
            "complexType": {
                "original": "number",
                "resolved": "number",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "max-rows",
            "reflect": false
        }
    }; }
    static get elementRef() { return "el"; }
}
const asc = (value) => (a, b) => a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
const desc = (value) => (b, a) => a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
