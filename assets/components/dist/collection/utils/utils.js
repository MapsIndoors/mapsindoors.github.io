export function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}
export function isNumber(str) {
    return str !== null && str > '' && !isNaN(Number(str));
}
export function formatNumber(n) {
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: 0 });
}
export function isNullOrUndefined(input) {
    return (input === null || input === undefined);
}
