'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4e7399fc.js');

const Card = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return (index.h("slot", null));
    }
    static get style() { return ":host{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;font-family:Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";background-color:#ffffff;-webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);box-shadow:0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);border-radius:8px;padding-top:32px;padding-bottom:32px;padding-left:32px;padding-right:32px;margin:24px}"; }
};

const Column = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() {
        return;
    }
};

function isNumber(str) {
    return str !== null && str > '' && !isNaN(Number(str));
}
function formatNumber(n) {
    return Number(n).toLocaleString(undefined, { minimumFractionDigits: 0 });
}
function isNullOrUndefined(input) {
    return (input === null || input === undefined);
}

const DataTable = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
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
        return (index.h(index.Host, null, index.h("table", null, index.h("thead", null, index.h("tr", null, this.columns.map(column => index.h("th", { onClick: (event) => column.sortable && this.sort(event, column), class: { "no-sort": !column.sortable } }, column.label)))), index.h("tbody", null, rows.map((row) => index.h("tr", null, this.columns.map((column) => {
            let template = column.template;
            if (template > '') {
                template = template.replace(/\{(.*?)\}/g, (match, capture) => {
                    return row[capture] || '';
                });
            }
            return index.h("td", { innerHTML: template || row[column.binding] });
        })))))));
    }
    get el() { return index.getElement(this); }
    static get style() { return "table{width:100%;border-collapse:collapse;font-family:Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";background-color:#ffffff;border-style:solid;border-width:1px;border-color:#8d98aa}table thead tr th{position:relative;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-weight:500;font-size:1rem;line-height:1.25rem;color:#ffffff;padding:16px;background-color:#59616e}table thead tr th:not(.no-sort){cursor:pointer}table thead tr th::before,table thead tr th::after{content:\"\";display:block;position:absolute;right:16px;top:50%;border:7px solid transparent}table thead tr th::before{border-bottom-color:#8d98aa;margin-top:-15px}table thead tr th::after{border-top-color:#8d98aa;margin-top:3px}table thead tr th.desc::after{border-top-color:#f5f7fa}table thead tr th.asc::before{border-bottom-color:#f5f7fa}table thead tr th.no-sort::before,table thead tr th.no-sort::after{border:none}table tbody tr:nth-child(even):hover{background-color:#FAFCFF}table tbody tr:nth-child(odd){background-color:#f5f7fa}table tbody tr:nth-child(odd):hover{background-color:#ebeff5}table td{font-size:1rem;padding:16px;border-right:1px solid #c8d0e0}table td:last-child{border-right:none}"; }
};
const asc = (value) => (a, b) => a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;
const desc = (value) => (b, a) => a[value] > b[value] ? 1 : a[value] < b[value] ? -1 : 0;

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var build = createCommonjsModule(function (module, exports) {
/*!
 * 
 *   simple-keyboard v2.29.45
 *   https://github.com/hodgef/simple-keyboard
 * 
 *   Copyright (c) Francisco Hodge (https://github.com/hodgef)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 *   
 */
!function(t,e){module.exports=e();}(window,(function(){return function(t){var e={};function __webpack_require__(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,__webpack_require__),o.l=!0,o.exports}return __webpack_require__.m=t,__webpack_require__.c=e,__webpack_require__.d=function(t,e,n){__webpack_require__.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n});},__webpack_require__.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0});},__webpack_require__.t=function(t,e){if(1&e&&(t=__webpack_require__(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)__webpack_require__.d(n,o,function(e){return t[e]}.bind(null,o));return n},__webpack_require__.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return __webpack_require__.d(e,"a",e),e},__webpack_require__.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=0)}([function(t,e,n){t.exports=n(2);},function(t,e,n){},function(t,e,n){n.r(e);n(1);function _createForOfIteratorHelper(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"===typeof t)return _arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(t,e)}(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var o=0,F=function(){};return {s:F,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,a=!1;return {s:function(){n=t[Symbol.iterator]();},n:function(){var t=n.next();return s=t.done,t},e:function(t){a=!0,i=t;},f:function(){try{s||null==n.return||n.return();}finally{if(a)throw i}}}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function _typeof(t){return (_typeof="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o);}}var o=function(){function Utilities(t){var e=t.getOptions,n=t.getCaretPosition,o=t.dispatch;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,Utilities),this.getOptions=e,this.getCaretPosition=n,this.dispatch=o,Utilities.bindMethods(Utilities,this);}var t,e,n;return t=Utilities,n=[{key:"bindMethods",value:function(t,e){var n,o=_createForOfIteratorHelper(Object.getOwnPropertyNames(t.prototype));try{for(o.s();!(n=o.n()).done;){var i=n.value;"constructor"===i||"bindMethods"===i||(e[i]=e[i].bind(e));}}catch(s){o.e(s);}finally{o.f();}}}],(e=[{key:"getButtonClass",value:function(t){var e=t.includes("{")&&t.includes("}")&&"{//}"!==t?"functionBtn":"standardBtn",n=t.replace("{","").replace("}",""),o="";return "standardBtn"!==e&&(o=" hg-button-".concat(n)),"hg-".concat(e).concat(o)}},{key:"getDefaultDiplay",value:function(){return {"{bksp}":"backspace","{backspace}":"backspace","{enter}":"< enter","{shift}":"shift","{shiftleft}":"shift","{shiftright}":"shift","{alt}":"alt","{s}":"shift","{tab}":"tab","{lock}":"caps","{capslock}":"caps","{accept}":"Submit","{space}":" ","{//}":" ","{esc}":"esc","{escape}":"esc","{f1}":"f1","{f2}":"f2","{f3}":"f3","{f4}":"f4","{f5}":"f5","{f6}":"f6","{f7}":"f7","{f8}":"f8","{f9}":"f9","{f10}":"f10","{f11}":"f11","{f12}":"f12","{numpaddivide}":"/","{numlock}":"lock","{arrowup}":"\u2191","{arrowleft}":"\u2190","{arrowdown}":"\u2193","{arrowright}":"\u2192","{prtscr}":"print","{scrolllock}":"scroll","{pause}":"pause","{insert}":"ins","{home}":"home","{pageup}":"up","{delete}":"del","{end}":"end","{pagedown}":"down","{numpadmultiply}":"*","{numpadsubtract}":"-","{numpadadd}":"+","{numpadenter}":"enter","{period}":".","{numpaddecimal}":".","{numpad0}":"0","{numpad1}":"1","{numpad2}":"2","{numpad3}":"3","{numpad4}":"4","{numpad5}":"5","{numpad6}":"6","{numpad7}":"7","{numpad8}":"8","{numpad9}":"9"}}},{key:"getButtonDisplayName",value:function(t,e,n){return (e=n?Object.assign({},this.getDefaultDiplay(),e):e||this.getDefaultDiplay())[t]||t}},{key:"getUpdatedInput",value:function(t,e,n,o){var i=this.getOptions(),s=e;return ("{bksp}"===t||"{backspace}"===t)&&s.length>0?s=this.removeAt(s,n,o):"{space}"===t?s=this.addStringAt(s," ",n,o):"{tab}"!==t||"boolean"===typeof i.tabCharOnTab&&!1===i.tabCharOnTab?"{enter}"!==t&&"{numpadenter}"!==t||!i.newLineOnEnter?t.includes("numpad")&&Number.isInteger(Number(t[t.length-2]))?s=this.addStringAt(s,t[t.length-2],n,o):"{numpaddivide}"===t?s=this.addStringAt(s,"/",n,o):"{numpadmultiply}"===t?s=this.addStringAt(s,"*",n,o):"{numpadsubtract}"===t?s=this.addStringAt(s,"-",n,o):"{numpadadd}"===t?s=this.addStringAt(s,"+",n,o):"{numpaddecimal}"===t?s=this.addStringAt(s,".",n,o):"{"===t||"}"===t?s=this.addStringAt(s,t,n,o):t.includes("{")||t.includes("}")||(s=this.addStringAt(s,t,n,o)):s=this.addStringAt(s,"\n",n,o):s=this.addStringAt(s,"\t",n,o),s}},{key:"updateCaretPos",value:function(t,e){var n=this.updateCaretPosAction(t,e);this.dispatch((function(t){t.caretPosition=n;}));}},{key:"updateCaretPosAction",value:function(t,e){var n=this.getOptions(),o=this.getCaretPosition();return e?o>0&&(o-=t):o+=t,n.debug&&console.log("Caret at:",o,"(".concat(this.keyboardDOMClass,")")),o}},{key:"addStringAt",value:function(t,e,n,o){var i;return n||0===n?(i=[t.slice(0,n),e,t.slice(n)].join(""),this.isMaxLengthReached()||o&&this.updateCaretPos(e.length)):i=t+e,i}},{key:"removeAt",value:function(t,e,n){var o;if(0===this.getCaretPosition())return t;var i=/([\uD800-\uDBFF][\uDC00-\uDFFF])/g;return e&&e>=0?t.substring(e-2,e).match(i)?(o=t.substr(0,e-2)+t.substr(e),n&&this.updateCaretPos(2,!0)):(o=t.substr(0,e-1)+t.substr(e),n&&this.updateCaretPos(1,!0)):t.slice(-2).match(i)?(o=t.slice(0,-2),n&&this.updateCaretPos(2,!0)):(o=t.slice(0,-1),n&&this.updateCaretPos(1,!0)),o}},{key:"handleMaxLength",value:function(t,e){var n=this.getOptions(),o=n.maxLength,i=t[n.inputName],s=e.length-1>=o;if(e.length<=i.length)return !1;if(Number.isInteger(o))return n.debug&&console.log("maxLength (num) reached:",s),s?(this.maxLengthReached=!0,!0):(this.maxLengthReached=!1,!1);if("object"===_typeof(o)){var a=i.length===o[n.inputName];return n.debug&&console.log("maxLength (obj) reached:",a),a?(this.maxLengthReached=!0,!0):(this.maxLengthReached=!1,!1)}}},{key:"isMaxLengthReached",value:function(){return Boolean(this.maxLengthReached)}},{key:"isTouchDevice",value:function(){return "ontouchstart"in window||navigator.maxTouchPoints}},{key:"pointerEventsSupported",value:function(){return window.PointerEvent}},{key:"camelCase",value:function(t){return !!t&&t.toLowerCase().trim().split(/[.\-_\s]/g).reduce((function(t,e){return e.length?t+e[0].toUpperCase()+e.slice(1):t}))}}])&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),Utilities}();function PhysicalKeyboard_defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o);}}var i=function(){function PhysicalKeyboard(t){var e=t.dispatch,n=t.getOptions;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,PhysicalKeyboard),this.dispatch=e,this.getOptions=n,o.bindMethods(PhysicalKeyboard,this);}var t,e;return t=PhysicalKeyboard,(e=[{key:"handleHighlightKeyDown",value:function(t){var e=this.getOptions(),n=this.getSimpleKeyboardLayoutKey(t);this.dispatch((function(t){var o=t.getButtonElement(n)||t.getButtonElement("{".concat(n,"}"));o&&(o.style.backgroundColor=e.physicalKeyboardHighlightBgColor||"#9ab4d0",o.style.color=e.physicalKeyboardHighlightTextColor||"white");}));}},{key:"handleHighlightKeyUp",value:function(t){var e=this.getSimpleKeyboardLayoutKey(t);this.dispatch((function(t){var n=t.getButtonElement(e)||t.getButtonElement("{".concat(e,"}"));n&&n.removeAttribute&&n.removeAttribute("style");}));}},{key:"getSimpleKeyboardLayoutKey",value:function(t){var e;return ((e=t.code.includes("Numpad")||t.code.includes("Shift")||t.code.includes("Space")||t.code.includes("Backspace")||t.code.includes("Control")||t.code.includes("Alt")||t.code.includes("Meta")?t.code:t.key)!==e.toUpperCase()||"F"===t.code[0]&&Number.isInteger(Number(t.code[1]))&&t.code.length<=3)&&(e=e.toLowerCase()),e}}])&&PhysicalKeyboard_defineProperties(t.prototype,e),PhysicalKeyboard}();function _toConsumableArray(t){return function(t){if(Array.isArray(t))return Keyboard_arrayLikeToArray(t)}(t)||function(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"===typeof t)return Keyboard_arrayLikeToArray(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Keyboard_arrayLikeToArray(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function Keyboard_arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function Keyboard_classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Keyboard_defineProperties(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o);}}function _defineProperty(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var s=function(){function SimpleKeyboard(){var t=this;Keyboard_classCallCheck(this,SimpleKeyboard),_defineProperty(this,"handleParams",(function(t){var e,n,o;if("string"===typeof t[0])e=t[0].split(".").join(""),n=document.querySelector(".".concat(e)),o=t[1];else if(t[0]instanceof HTMLDivElement){if(!t[0].className)throw console.warn("Any DOM element passed as parameter must have a class."),new Error("KEYBOARD_DOM_CLASS_ERROR");e=t[0].className.split(" ")[0],n=t[0],o=t[1];}else e="simple-keyboard",n=document.querySelector(".".concat(e)),o=t[0];return {keyboardDOMClass:e,keyboardDOM:n,options:o}})),_defineProperty(this,"getOptions",(function(){return t.options})),_defineProperty(this,"getCaretPosition",(function(){return t.caretPosition})),_defineProperty(this,"registerModule",(function(e,n){t.modules[e]||(t.modules[e]={}),n(t.modules[e]);})),_defineProperty(this,"getKeyboardClassString",(function(){for(var e=arguments.length,n=new Array(e),o=0;o<e;o++)n[o]=arguments[o];var i=[t.keyboardDOMClass].concat(n).filter((function(t){return !!t}));return i.join(" ")}));for(var e=arguments.length,n=new Array(e),s=0;s<e;s++)n[s]=arguments[s];var a=this.handleParams(n),r=a.keyboardDOMClass,u=a.keyboardDOM,c=a.options,l=void 0===c?{}:c;if(this.utilities=new o({getOptions:this.getOptions,getCaretPosition:this.getCaretPosition,dispatch:this.dispatch}),this.caretPosition=null,this.keyboardDOM=u,this.options=l,this.options.layoutName=this.options.layoutName||"default",this.options.theme=this.options.theme||"hg-theme-default",this.options.inputName=this.options.inputName||"default",this.options.preventMouseDownDefault=this.options.preventMouseDownDefault||!1,this.keyboardPluginClasses="",o.bindMethods(SimpleKeyboard,this),this.input={},this.input[this.options.inputName]="",this.keyboardDOMClass=r,this.buttonElements={},window.SimpleKeyboardInstances||(window.SimpleKeyboardInstances={}),this.currentInstanceName=this.utilities.camelCase(this.keyboardDOMClass),window.SimpleKeyboardInstances[this.currentInstanceName]=this,this.allKeyboardInstances=window.SimpleKeyboardInstances,this.keyboardInstanceNames=Object.keys(window.SimpleKeyboardInstances),this.isFirstKeyboardInstance=this.keyboardInstanceNames[0]===this.currentInstanceName,this.physicalKeyboard=new i({dispatch:this.dispatch,getOptions:this.getOptions}),!this.keyboardDOM)throw console.warn('".'.concat(r,'" was not found in the DOM.')),new Error("KEYBOARD_DOM_ERROR");this.render(),this.modules={},this.loadModules();}var t,e;return t=SimpleKeyboard,(e=[{key:"handleButtonClicked",value:function(t){var e=this.options.debug;if("{//}"===t)return !1;"function"===typeof this.options.onKeyPress&&this.options.onKeyPress(t),this.input[this.options.inputName]||(this.input[this.options.inputName]="");var n=this.utilities.getUpdatedInput(t,this.input[this.options.inputName],this.caretPosition);if(this.input[this.options.inputName]!==n&&(!this.options.inputPattern||this.options.inputPattern&&this.inputPatternIsValid(n))){if(this.options.maxLength&&this.utilities.handleMaxLength(this.input,n))return !1;this.input[this.options.inputName]=this.utilities.getUpdatedInput(t,this.input[this.options.inputName],this.caretPosition,!0),e&&console.log("Input changed:",this.input),this.options.syncInstanceInputs&&this.syncInstanceInputs(),"function"===typeof this.options.onChange&&this.options.onChange(this.input[this.options.inputName]),"function"===typeof this.options.onChangeAll&&this.options.onChangeAll(this.input);}e&&console.log("Key pressed:",t);}},{key:"handleButtonMouseDown",value:function(t,e){var n=this;this.options.preventMouseDownDefault&&e.preventDefault(),this.options.stopMouseDownPropagation&&e.stopPropagation(),e&&e.target.classList.add(this.activeButtonClass),this.isMouseHold=!0,this.holdInteractionTimeout&&clearTimeout(this.holdInteractionTimeout),this.holdTimeout&&clearTimeout(this.holdTimeout),this.options.disableButtonHold||(this.holdTimeout=setTimeout((function(){(n.isMouseHold&&(!t.includes("{")&&!t.includes("}")||"{delete}"===t||"{backspace}"===t||"{bksp}"===t||"{space}"===t||"{tab}"===t)||"{arrowright}"===t||"{arrowleft}"===t||"{arrowup}"===t||"{arrowdown}"===t)&&(n.options.debug&&console.log("Button held:",t),n.handleButtonHold(t,e)),clearTimeout(n.holdTimeout);}),500));}},{key:"handleButtonMouseUp",value:function(t){var e=this;this.recurseButtons((function(t){t.classList.remove(e.activeButtonClass);})),this.isMouseHold=!1,this.holdInteractionTimeout&&clearTimeout(this.holdInteractionTimeout),t&&"function"===typeof this.options.onKeyReleased&&this.options.onKeyReleased(t);}},{key:"handleKeyboardContainerMouseDown",value:function(t){this.options.preventMouseDownDefault&&t.preventDefault();}},{key:"handleButtonHold",value:function(t){var e=this;this.holdInteractionTimeout&&clearTimeout(this.holdInteractionTimeout),this.holdInteractionTimeout=setTimeout((function(){e.isMouseHold?(e.handleButtonClicked(t),e.handleButtonHold(t)):clearTimeout(e.holdInteractionTimeout);}),100);}},{key:"syncInstanceInputs",value:function(){var t=this;this.dispatch((function(e){e.replaceInput(t.input),e.caretPosition=t.caretPosition;}));}},{key:"clearInput",value:function(t){t=t||this.options.inputName,this.input[t]="",this.caretPosition=0,this.options.syncInstanceInputs&&this.syncInstanceInputs();}},{key:"getInput",value:function(t){return t=t||this.options.inputName,this.options.syncInstanceInputs&&this.syncInstanceInputs(),this.input[t]}},{key:"setInput",value:function(t,e){e=e||this.options.inputName,this.input[e]=t,this.options.syncInstanceInputs&&this.syncInstanceInputs();}},{key:"replaceInput",value:function(t){this.input=t;}},{key:"setOptions",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=this.changedOptions(t);this.options=Object.assign(this.options,t),e.length&&(this.options.debug&&console.log("changedOptions",e),this.onSetOptions(t),this.render());}},{key:"changedOptions",value:function(t){var e=this;return Object.keys(t).filter((function(n){return JSON.stringify(t[n])!==JSON.stringify(e.options[n])}))}},{key:"onSetOptions",value:function(t){t.inputName&&(this.options.debug&&console.log("inputName changed. caretPosition reset."),this.caretPosition=null);}},{key:"clear",value:function(){this.keyboardDOM.innerHTML="",this.keyboardDOM.className=this.keyboardDOMClass,this.buttonElements={};}},{key:"dispatch",value:function(t){if(!window.SimpleKeyboardInstances)throw console.warn("SimpleKeyboardInstances is not defined. Dispatch cannot be called."),new Error("INSTANCES_VAR_ERROR");return Object.keys(window.SimpleKeyboardInstances).forEach((function(e){t(window.SimpleKeyboardInstances[e],e);}))}},{key:"addButtonTheme",value:function(t,e){var n=this;if(!e||!t)return !1;t.split(" ").forEach((function(o){e.split(" ").forEach((function(e){n.options.buttonTheme||(n.options.buttonTheme=[]);var i=!1;n.options.buttonTheme.map((function(t){if(t.class.split(" ").includes(e)){i=!0;var n=t.buttons.split(" ");n.includes(o)||(i=!0,n.push(o),t.buttons=n.join(" "));}return t})),i||n.options.buttonTheme.push({class:e,buttons:t});}));})),this.render();}},{key:"removeButtonTheme",value:function(t,e){var n=this;if(!t&&!e)return this.options.buttonTheme=[],this.render(),!1;t&&Array.isArray(this.options.buttonTheme)&&this.options.buttonTheme.length&&(t.split(" ").forEach((function(t){n.options.buttonTheme.map((function(o,i){if(e&&e.includes(o.class)||!e){var s=o.buttons.split(" ").filter((function(e){return e!==t}));s.length?o.buttons=s.join(" "):(n.options.buttonTheme.splice(i,1),o=null);}return o}));})),this.render());}},{key:"getButtonElement",value:function(t){var e,n=this.buttonElements[t];return n&&(e=n.length>1?n:n[0]),e}},{key:"inputPatternIsValid",value:function(t){var e,n=this.options.inputPattern;if((e=n instanceof RegExp?n:n[this.options.inputName])&&t){var o=e.test(t);return this.options.debug&&console.log('inputPattern ("'.concat(e,'"): ').concat(o?"passed":"did not pass!")),o}return !0}},{key:"setEventListeners",value:function(){!this.isFirstKeyboardInstance&&this.allKeyboardInstances||(this.options.debug&&console.log("Caret handling started (".concat(this.keyboardDOMClass,")")),document.addEventListener("keyup",this.handleKeyUp),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("mouseup",this.handleMouseUp),document.addEventListener("touchend",this.handleTouchEnd));}},{key:"handleKeyUp",value:function(t){this.caretEventHandler(t),this.options.physicalKeyboardHighlight&&this.physicalKeyboard.handleHighlightKeyUp(t);}},{key:"handleKeyDown",value:function(t){this.options.physicalKeyboardHighlight&&this.physicalKeyboard.handleHighlightKeyDown(t);}},{key:"handleMouseUp",value:function(t){this.caretEventHandler(t);}},{key:"handleTouchEnd",value:function(t){this.caretEventHandler(t);}},{key:"caretEventHandler",value:function(t){var e;t.target.tagName&&(e=t.target.tagName.toLowerCase()),this.dispatch((function(n){n.isMouseHold&&(n.isMouseHold=!1),"textarea"!==e&&"input"!==e||n.options.disableCaretPositioning?n.options.disableCaretPositioning&&(n.caretPosition=null):(n.caretPosition=t.target.selectionStart,n.options.debug&&console.log("Caret at: ",t.target.selectionStart,t.target.tagName.toLowerCase(),"(".concat(n.keyboardDOMClass,")")));}));}},{key:"recurseButtons",value:function(t){var e=this;if(!t)return !1;Object.keys(this.buttonElements).forEach((function(n){return e.buttonElements[n].forEach(t)}));}},{key:"destroy",value:function(){this.options.debug&&console.log("Destroying simple-keyboard instance: ".concat(this.currentInstanceName)),document.removeEventListener("keyup",this.handleKeyUp),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("mouseup",this.handleMouseUp),document.removeEventListener("touchend",this.handleTouchEnd),document.onpointerup=null,document.ontouchend=null,document.ontouchcancel=null,document.onmouseup=null;var deleteButton=function(t){t.onpointerdown=null,t.onpointerup=null,t.onpointercancel=null,t.ontouchstart=null,t.ontouchend=null,t.ontouchcancel=null,t.onclick=null,t.onmousedown=null,t.onmouseup=null,t.remove(),t=null;};this.recurseButtons(deleteButton),this.recurseButtons=null,deleteButton=null,this.keyboardDOM.onpointerdown=null,this.keyboardDOM.ontouchstart=null,this.keyboardDOM.onmousedown=null,this.clear(),window.SimpleKeyboardInstances[this.currentInstanceName]=null,delete window.SimpleKeyboardInstances[this.currentInstanceName],this.initialized=!1;}},{key:"getButtonThemeClasses",value:function(t){var e=this.options.buttonTheme,n=[];return Array.isArray(e)&&e.forEach((function(e){if(e.class&&"string"===typeof e.class&&e.buttons&&"string"===typeof e.buttons){var o=e.class.split(" ");e.buttons.split(" ").includes(t)&&(n=[].concat(_toConsumableArray(n),_toConsumableArray(o)));}else console.warn('Incorrect "buttonTheme". Please check the documentation.',e);})),n}},{key:"setDOMButtonAttributes",value:function(t,e){var n=this.options.buttonAttributes;Array.isArray(n)&&n.forEach((function(n){n.attribute&&"string"===typeof n.attribute&&n.value&&"string"===typeof n.value&&n.buttons&&"string"===typeof n.buttons?n.buttons.split(" ").includes(t)&&e(n.attribute,n.value):console.warn('Incorrect "buttonAttributes". Please check the documentation.',n);}));}},{key:"onTouchDeviceDetected",value:function(){this.processAutoTouchEvents(),this.disableContextualWindow();}},{key:"disableContextualWindow",value:function(){window.oncontextmenu=function(t){if(t.target.classList.contains("hg-button"))return t.preventDefault(),t.stopPropagation(),!1};}},{key:"processAutoTouchEvents",value:function(){this.options.autoUseTouchEvents&&(this.options.useTouchEvents=!0,this.options.debug&&console.log("autoUseTouchEvents: Touch device detected, useTouchEvents enabled."));}},{key:"onInit",value:function(){this.options.debug&&console.log("".concat(this.keyboardDOMClass," Initialized")),this.setEventListeners(),"function"===typeof this.options.onInit&&this.options.onInit();}},{key:"beforeFirstRender",value:function(){this.utilities.isTouchDevice()&&this.onTouchDeviceDetected(),"function"===typeof this.options.beforeFirstRender&&this.options.beforeFirstRender(),this.isFirstKeyboardInstance&&this.utilities.pointerEventsSupported()&&!this.options.useTouchEvents&&!this.options.useMouseEvents&&this.options.debug&&console.log("Using PointerEvents as it is supported by this browser"),this.options.useTouchEvents&&this.options.debug&&console.log("useTouchEvents has been enabled. Only touch events will be used.");}},{key:"beforeRender",value:function(){"function"===typeof this.options.beforeRender&&this.options.beforeRender();}},{key:"onRender",value:function(){"function"===typeof this.options.onRender&&this.options.onRender();}},{key:"onModulesLoaded",value:function(){"function"===typeof this.options.onModulesLoaded&&this.options.onModulesLoaded();}},{key:"loadModules",value:function(){var t=this;Array.isArray(this.options.modules)&&(this.options.modules.forEach((function(e){var n=new e;if(n.constructor.name&&"Function"!==n.constructor.name){var o="module-".concat(t.utilities.camelCase(n.constructor.name));t.keyboardPluginClasses=t.keyboardPluginClasses+" ".concat(o);}n.init(t);})),this.keyboardPluginClasses=this.keyboardPluginClasses+" modules-loaded",this.render(),this.onModulesLoaded());}},{key:"getModuleProp",value:function(t,e){return !!this.modules[t]&&this.modules[t][e]}},{key:"getModulesList",value:function(){return Object.keys(this.modules)}},{key:"parseRowDOMContainers",value:function(t,e,n,o){var i=this,s=Array.from(t.children),a=0;return s.length&&n.forEach((function(n,r){var u=o[r];if(!u||!(u>n))return !1;var c=n-a,l=u-a,h=document.createElement("div");h.className+="hg-button-container";var d="".concat(i.options.layoutName,"-r").concat(e,"c").concat(r);h.setAttribute("data-skUID",d);var p=s.splice(c,l-c+1);a=l-c,p.forEach((function(t){return h.appendChild(t)})),s.splice(c,0,h),t.innerHTML="",s.forEach((function(e){return t.appendChild(e)})),i.options.debug&&console.log("rowDOMContainer",p,c,l,a+1);})),t}},{key:"render",value:function(){var t=this;this.clear(),this.initialized||this.beforeFirstRender(),this.beforeRender();var e="hg-layout-".concat(this.options.layoutName),n=this.options.layout||{default:["` 1 2 3 4 5 6 7 8 9 0 - = {bksp}","{tab} q w e r t y u i o p [ ] \\","{lock} a s d f g h j k l ; ' {enter}","{shift} z x c v b n m , . / {shift}",".com @ {space}"],shift:["~ ! @ # $ % ^ & * ( ) _ + {bksp}","{tab} Q W E R T Y U I O P { } |",'{lock} A S D F G H J K L : " {enter}',"{shift} Z X C V B N M < > ? {shift}",".com @ {space}"]},o=this.options.useTouchEvents||!1,i=o?"hg-touch-events":"",s=this.options.useMouseEvents||!1,a=this.options.disableRowButtonContainers;this.keyboardDOM.className=this.getKeyboardClassString(this.options.theme,e,this.keyboardPluginClasses,i),n[this.options.layoutName].forEach((function(e,n){var i=e.split(" "),r=document.createElement("div");r.className+="hg-row";var u=[],c=[];i.forEach((function(e,i){var l,h=!a&&"string"===typeof e&&e.length>1&&0===e.indexOf("["),d=!a&&"string"===typeof e&&e.length>1&&e.indexOf("]")===e.length-1;h&&(u.push(i),e=e.replace(/\[/g,"")),d&&(c.push(i),e=e.replace(/\]/g,""));var p=t.utilities.getButtonClass(e),f=t.utilities.getButtonDisplayName(e,t.options.display,t.options.mergeDisplay),y=t.options.useButtonTag?"button":"div",b=document.createElement(y);b.className+="hg-button ".concat(p),(l=b.classList).add.apply(l,_toConsumableArray(t.getButtonThemeClasses(e))),t.setDOMButtonAttributes(e,(function(t,e){b.setAttribute(t,e);})),t.activeButtonClass="hg-activeButton",!t.utilities.pointerEventsSupported()||o||s?o?(b.ontouchstart=function(n){t.handleButtonClicked(e),t.handleButtonMouseDown(e,n);},b.ontouchend=function(){t.handleButtonMouseUp(e);},b.ontouchcancel=function(){t.handleButtonMouseUp(e);}):(b.onclick=function(){t.isMouseHold=!1,t.handleButtonClicked(e);},b.onmousedown=function(n){t.handleButtonMouseDown(e,n);},b.onmouseup=function(){t.handleButtonMouseUp(e);}):(b.onpointerdown=function(n){t.handleButtonClicked(e),t.handleButtonMouseDown(e,n);},b.onpointerup=function(){t.handleButtonMouseUp(e);},b.onpointercancel=function(){t.handleButtonMouseUp(e);}),b.setAttribute("data-skBtn",e);var m="".concat(t.options.layoutName,"-r").concat(n,"b").concat(i);b.setAttribute("data-skBtnUID",m);var g=document.createElement("span");g.innerHTML=f,b.appendChild(g),t.buttonElements[e]||(t.buttonElements[e]=[]),t.buttonElements[e].push(b),r.appendChild(b);})),r=t.parseRowDOMContainers(r,n,u,c),t.keyboardDOM.appendChild(r);})),this.onRender(),this.initialized||(this.initialized=!0,!this.utilities.pointerEventsSupported()||o||s?o?(document.ontouchend=function(){return t.handleButtonMouseUp()},document.ontouchcancel=function(){return t.handleButtonMouseUp()},this.keyboardDOM.ontouchstart=function(e){return t.handleKeyboardContainerMouseDown(e)}):o||(document.onmouseup=function(){return t.handleButtonMouseUp()},this.keyboardDOM.onmousedown=function(e){return t.handleKeyboardContainerMouseDown(e)}):(document.onpointerup=function(){return t.handleButtonMouseUp()},this.keyboardDOM.onpointerdown=function(e){return t.handleKeyboardContainerMouseDown(e)}),this.onInit());}}])&&Keyboard_defineProperties(t.prototype,e),SimpleKeyboard}();e.default=s;}])}));

});

const SimpleKeyboard = unwrapExports(build);

var KeyboardLayout;
(function (KeyboardLayout) {
    KeyboardLayout["Numeric"] = "numeric";
    KeyboardLayout["Alphabetic"] = "alphabetic";
})(KeyboardLayout || (KeyboardLayout = {}));

const unitedStatesAlphabetic = {
    default: [
        '1 2 3 4 5 6 7 8 9 0',
        'q w e r t y u i o p',
        'a s d f g h j k l',
        'z x c v b n m {bksp}',
        '{space}'
    ]
};
const danishAlphabetic = {
    default: [
        '1 2 3 4 5 6 7 8 9 0',
        'q w e r t y u i o p å',
        'a s d f g h j k l æ ø',
        'z x c v b n m {bksp}',
        '{space}'
    ]
};
const defaultAlphabetic = unitedStatesAlphabetic;

const defaultNumeric = {
    default: ['1 2 3', '4 5 6', '7 8 9', '0 {bksp}']
};

const Keyboard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * The keyboard layout to use. Defaults to alphabetic.
         *
         * @type {KeyboardLayout}
         */
        this.layout = KeyboardLayout.Alphabetic;
        this.inputElements = new Set();
    }
    inputElementChange() {
        // Check for id attribute (Used by SimpleKeyboard to differ between multiple inputs for the same Mi-keyboard instance)
        if (!this.inputElement.hasAttribute('id')) {
            // eslint-disable-next-line no-console
            console.warn('MI-KEYBOARD: Invalid id attribute');
            return;
        }
        if (this.simpleKeyboard) {
            // Update SimpleKeyboards input element reference
            this.simpleKeyboard.setOptions({ inputName: this.inputElement.id });
            // Update SimpleKeyboards input value
            this.simpleKeyboard.setInput(this.inputElement.value, this.inputElement.id);
        }
        // Check to make sure that event listeners only is added to new input elements
        if (!this.inputElements.has(this.inputElement)) {
            this.inputElements.add(this.inputElement);
            // Update SimpleKeyboards input value on the following events.
            // The custom event 'inputCleared' is for manually triggering.
            const eventsToListenFor = ['input', 'focus', 'blur', 'inputCleared'];
            eventsToListenFor.forEach((event) => {
                this.inputElement.addEventListener(event, () => {
                    this.simpleKeyboard.setInput(this.inputElement.value, this.inputElement.id);
                });
            });
        }
    }
    layoutChange() {
        if (this.simpleKeyboard) {
            this.simpleKeyboard.setOptions({ layout: this.getKeyboardLayout(this.layout) });
        }
    }
    componentDidLoad() {
        this.simpleKeyboard = new SimpleKeyboard({
            onChange: (input) => {
                if (this.inputElement) {
                    this.inputElement.value = input;
                    this.inputElement.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
                }
            },
            layout: this.getKeyboardLayout(this.layout),
            display: {
                '{bksp}': '&#9003;',
                '{enter}': 'return',
                '{space}': 'space'
            },
            theme: 'hg-theme-default hg-layout-numeric numeric-theme'
        });
    }
    /**
     * Check validity of keyboard layout.
     *
     * @param {layout} string
     * @returns {boolean}
     */
    isValidLayout(layout) {
        if (!layout)
            return false;
        return Object.values(KeyboardLayout).find((keyboardLayout) => keyboardLayout === layout) ? true : false;
    }
    /**
     * Get keyboard layout. Defaults to alphabetic.
     *
     * @param {KeyboardLayout} keyboardLayout Accepts values of KeyboardLayout enum, eg. 'numeric' or 'alphabetic'
     * @returns {{ [key: string]: string[]; }}
     */
    getKeyboardLayout(keyboardLayout) {
        if (!this.isValidLayout(keyboardLayout)) {
            // eslint-disable-next-line no-console
            console.warn('MI-KEYBOARD: Invalid layout attribute');
            return defaultAlphabetic;
        }
        // Numeric layout
        if (keyboardLayout === KeyboardLayout.Numeric) {
            return defaultNumeric;
        }
        // Alphabetic layout
        const browserLanguage = window.navigator.language;
        if (!browserLanguage)
            return defaultAlphabetic; // Return defaultAlphabetic if navigator language isn't available.
        const supportedAlphabeticLayouts = [
            { layout: unitedStatesAlphabetic, languages: ['en', 'en-us'] },
            { layout: danishAlphabetic, languages: ['da'] }
        ];
        const supportedLayout = supportedAlphabeticLayouts.find((layout) => {
            return layout.languages.find((language) => language === browserLanguage.toLowerCase()) ? true : false;
        });
        return supportedLayout ? supportedLayout.layout : defaultAlphabetic;
    }
    /**
     * Render on-screen keyboard.
     *
     * @returns {JSX.Element}
     */
    render() {
        return (index.h("div", { class: 'simple-keyboard' }));
    }
    static get watchers() { return {
        "inputElement": ["inputElementChange"],
        "layout": ["layoutChange"]
    }; }
    static get style() { return ".hg-theme-default{width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden;-ms-touch-action:manipulation;touch-action:manipulation}.hg-theme-default .hg-button span{pointer-events:none}.hg-theme-default button.hg-button{border-width:0;outline:0;font-size:inherit}.hg-theme-default{font-family:HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;background-color:#ececec;padding:5px;border-radius:5px}.hg-theme-default .hg-button{display:inline-block;-ms-flex-positive:1;flex-grow:1}.hg-theme-default .hg-row{display:-ms-flexbox;display:flex}.hg-theme-default .hg-row:not(:last-child){margin-bottom:5px}.hg-theme-default .hg-row .hg-button-container,.hg-theme-default .hg-row .hg-button:not(:last-child){margin-right:5px}.hg-theme-default .hg-row>div:last-child{margin-right:0}.hg-theme-default .hg-row .hg-button-container{display:-ms-flexbox;display:flex}.hg-theme-default .hg-button{-webkit-box-shadow:0 0 3px -1px rgba(0,0,0,.3);box-shadow:0 0 3px -1px rgba(0,0,0,.3);height:40px;border-radius:5px;-webkit-box-sizing:border-box;box-sizing:border-box;padding:5px;background:#fff;border-bottom:1px solid #b5b5b5;cursor:pointer;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-webkit-tap-highlight-color:rgba(0,0,0,0)}.hg-theme-default .hg-button.hg-activeButton{background:#efefef}.hg-theme-default.hg-layout-numeric .hg-button{width:33.3%;height:60px;-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}.hg-theme-default .hg-button.hg-button-numpadadd,.hg-theme-default .hg-button.hg-button-numpadenter{height:85px}.hg-theme-default .hg-button.hg-button-numpad0{width:105px}.hg-theme-default .hg-button.hg-button-com{max-width:85px}.hg-theme-default .hg-button.hg-standardBtn.hg-button-at{max-width:45px}.hg-theme-default .hg-button.hg-selectedButton{background:rgba(5,25,70,.53);color:#fff}.hg-theme-default .hg-button.hg-standardBtn[data-skbtn=\".com\"]{max-width:82px}.hg-theme-default .hg-button.hg-standardBtn[data-skbtn=\"\@\"]{max-width:60px}mi-keyboard{display:block}mi-keyboard .hg-theme-default{background-color:transparent}"; }
};

const List = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * @description Determines if the MI Scroll Buttons Component should be rendered.
         * @type {boolean}
         */
        this.scrollButtonsEnabled = false;
        /**
         * @description Determines how far to scroll when clicking one of the buttons from the MI Scroll Buttons Component.
         * @type {number}
         */
        this.scrollLength = 100;
    }
    componentDidLoad() {
        this.addIntersectionObserver();
        if (this.scrollButtonsEnabled) {
            this.setScrollContainerElementRef();
        }
    }
    /**
     * @description Update state of scroll buttons when a "listItemDidRender" event is fired.
     * @private
     */
    updateScrollButtonsState() {
        if (this.scrollButtonsEnabled && this.miScrollButtonsElement.scrollContainerElementRef) {
            this.miScrollButtonsElement.updateScrollButtonsState();
        }
    }
    /**
     * @description Set scrollContainerElementRef attribute on miScrollButtonsElement.
     * @private
     */
    setScrollContainerElementRef() {
        this.miScrollButtonsElement.scrollContainerElementRef = this.scrollContainerElement;
    }
    /**
     * @description Add intersection observer and update scroll buttons state on intersection – workaround to avoid the element not having any dimensions before it's shown.
     * @private
     */
    addIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                return;
            }
            // Disable scroll buttons if container element doesn't have scroll
            if (this.scrollContainerElement.scrollHeight - this.scrollContainerElement.scrollTop === this.scrollContainerElement.clientHeight) {
                this.updateScrollButtonsState();
            }
            this.intersectionObserver.disconnect();
        });
        this.intersectionObserver.observe(this.scrollContainerElement);
    }
    render() {
        return (index.h("div", { class: "container" }, index.h("div", { role: "list", class: "scroll-container", ref: (el) => this.scrollContainerElement = el }, index.h("slot", null)), this.scrollButtonsEnabled ? index.h("mi-scroll-buttons", { scrollLength: this.scrollLength, ref: (el) => this.miScrollButtonsElement = el }) : null));
    }
    static get style() { return "html{-webkit-box-sizing:border-box;box-sizing:border-box}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;height:100%;width:100%}.container{height:100%;display:-ms-flexbox;display:flex}.container .scroll-container{width:100%;overflow-y:auto}"; }
};

const ListItemCategory = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * @description List orientation. Accepts the following values: 'vertical' and 'horizontal'.
         * @type {string}
         */
        this.orientation = 'vertical';
        this.categoryClicked = index.createEvent(this, "categoryClicked", 7);
        this.listItemDidRender = index.createEvent(this, "listItemDidRender", 7);
    }
    componentDidRender() {
        this.listItemDidRender.emit();
        // IE fallback for 'object-fit' css property
        if ('objectFit' in document.documentElement.style === false) {
            this.objectFitImage(this.image);
        }
    }
    /**
     * @description Emits the category object to event listeners.
     * @private
     * @param {*} category - Category object.
     * @memberof ListItemCategory
     */
    categoryClickedHandler(category) {
        this.categoryClicked.emit(category);
    }
    /**
     * @description Set image as background image.
     * @private
     * @param {HTMLImageElement} image
     */
    objectFitImage(image) {
        image.setAttribute('style', `background: no-repeat center center url("${this.category.iconUrl}"); background-size: cover;`);
        image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`;
    }
    render() {
        return (index.h(index.Host, { onClick: () => this.categoryClickedHandler(this.category) }, index.h("img", { ref: (el) => this.image = el, src: this.category.iconUrl }), index.h("p", null, this.category.name)));
    }
    static get style() { return "html{-webkit-box-sizing:border-box;box-sizing:border-box}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{color:#1e2025;-webkit-transition:300ms ease;transition:300ms ease;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;cursor:pointer}:host img{-o-object-fit:cover;object-fit:cover}:host([orientation=horizontal]){width:100%;height:100%;float:left;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center}:host([orientation=horizontal]) img{width:48px;height:48px}:host([orientation=horizontal]) p{height:16px;overflow:visible;font-size:0.875rem;line-height:1rem;text-align:center}:host([orientation=vertical]){padding:16px;-ms-flex-direction:row;flex-direction:row;font-size:1rem;font-weight:500;line-height:1.25rem}:host([orientation=vertical]) img{width:24px;height:24px}:host([orientation=vertical]) p{margin:0;padding-left:16px}:host(:hover){background-color:#fcfcfc}"; }
};

var UnitSystem;
(function (UnitSystem) {
    UnitSystem["Imperial"] = "imperial";
    UnitSystem["Metric"] = "metric";
})(UnitSystem || (UnitSystem = {}));

const ListItemLocation = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * @description Set imperial or metric as default unit system.
         * @type {UnitSystem}
         */
        this.unit = UnitSystem.Metric;
        this.locationClicked = index.createEvent(this, "locationClicked", 7);
        this.listItemDidRender = index.createEvent(this, "listItemDidRender", 7);
    }
    /**
     * @description Emits the location to event listeners.
     * @param {*} location - Location object.
     * @memberof List
     */
    locationClickedHandler(location) {
        this.locationClicked.emit(location);
    }
    componentWillLoad() {
        if (this.location.properties.geodesicDistance !== null && this.location.properties.geodesicDistance !== undefined) {
            this.distance = this.getDistanceString(this.location.properties.geodesicDistance);
        }
    }
    componentDidRender() {
        this.infoElement.location = this.location;
        this.listItemDidRender.emit();
        // IE fallback for 'object-fit' css property
        if (this.imageElement && 'objectFit' in document.documentElement.style === false) {
            this.objectFitImage(this.imageElement);
        }
    }
    /**
     * @description Set image as background image.
     * @param {HTMLImageElement} image
     */
    objectFitImage(image) {
        image.setAttribute('style', `background: no-repeat center center url("${this.location.properties.imageURL}"); background-size: cover;`);
        image.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${image.width}' height='${image.height}'%3E%3C/svg%3E`;
    }
    /**
     * @description Get distance as a string.
     * @param {number} meters
     * @returns {string}
     */
    getDistanceString(meters) {
        if (this.unit === UnitSystem.Imperial || navigator.language === 'en-US') {
            if (Math.abs(meters) < 160.9344) {
                const ft = meters * 3.2808;
                return Math.round(ft) + ' ft';
            }
            const miles = meters / 1609.344;
            return Math.round(miles * 10) / 10 + ' mi';
        }
        else {
            if (Math.abs(meters) < 1000) {
                return `${Math.round(meters)} m`;
            }
            return Math.round((meters / 1000) * 10) / 10 + ' km';
        }
    }
    /**
     * @description Render location list-item.
     * @returns {JSX.Element}
     */
    render() {
        return (index.h(index.Host, { role: "listitem", onClick: () => this.locationClickedHandler(this.location) }, this.location.properties.imageURL ? this.renderIcon() : null, index.h("div", { class: "details" }, index.h("p", { class: "details-title" }, this.location.properties.name), index.h("mi-location-info", { ref: (el) => this.infoElement = el })), this.distance ? this.renderDistance() : null));
    }
    /**
     * @description Get JSX template for icon.
     * @returns {JSX.Element}
     */
    renderIcon() {
        return (index.h("img", { ref: (el) => this.imageElement = el, src: this.location.properties.imageURL }));
    }
    /**
     * @description Get JSX template for distance.
     * @returns {JSX.Element}
     */
    renderDistance() {
        return (index.h("div", { class: "distance" }, this.distance));
    }
    static get style() { return "html{-webkit-box-sizing:border-box;box-sizing:border-box}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{padding:16px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;color:#1e2025;font-size:1rem;font-weight:500;line-height:1.25rem;-webkit-transition:300ms ease;transition:300ms ease;cursor:pointer}:host(:hover){background-color:#fcfcfc}img{width:24px;height:24px;-o-object-fit:cover;object-fit:cover}.details{padding-left:16px;padding-right:16px;-ms-flex:1;flex:1}.details-title{margin:0;padding:0}.distance{font-weight:400}"; }
};

const LocationInfo = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    /**
     * @description Get locations info as a string.
     * @private
     * @returns {string}
     */
    getInfoString() {
        const details = [];
        if (this.location && this.location.properties) {
            // External Id
            if (this.location.properties.externalId) {
                details.push(this.location.properties.externalId);
            }
            // Floor name
            if (this.location.properties.floorName) {
                details.push(`Level ${this.location.properties.floorName}`);
            }
            // Building
            if (this.location.properties.building) {
                if (this.location.properties.venue) {
                    // Check that venue and building is not named the same
                    if (this.location.properties.venue.toLowerCase() !== this.location.properties.building.toLowerCase()) {
                        details.push(this.location.properties.building);
                    }
                }
                else {
                    details.push(this.location.properties.building);
                }
            }
            // Venue
            if (this.location.properties.venue) {
                details.push(this.location.properties.venue);
            }
        }
        return details.join(' · ');
    }
    render() {
        return (index.h(index.Host, null, this.getInfoString()));
    }
    static get style() { return ":host{display:block;color:#444b55;font-weight:400}"; }
};

const miVariables = {
    miSDKUrl: 'https://app.mapsindoors.com/mapsindoors/js/sdk/3.11.0/mapsindoors-3.11.0.js.gz'
};

const Map = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * The MapsIndoors API key
         */
        this.miApiKey = '';
        /**
         * The Google Maps API key
         */
        this.gmApiKey = '';
        /**
         * Google Maps options. Defaults to zoom: 17, maxZoom: 21, mapTypeControl: false, streetViewControl: false.
         * https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
         * @type {google.maps.MapOptions}
         */
        this.gmOptions = {
            zoom: 17,
            maxZoom: 21,
            mapTypeControl: false,
            streetViewControl: false
        };
        /**
         * Set or get the current zoom level of the map.
         */
        this.zoom = '17';
        /**
         * Set to true to prevent external links on the map from opening.
         * This can be useful when running the map on a kiosk where you never want the browser to navigate away.
         */
        this.disableExternalLinks = false;
        /**
         * The stroke color of direction polyline on the map. Accepts any legal HTML color value.
         * Default: '#307ad9'.
         */
        this.polylineColor = '#3071d9';
        /**
         * The the width of the direction polyline in pixels.
         * Default: 4.
         */
        this.polylineWeight = 4;
        /**
         * The stroke opacity of directions polylines on the map. Numerical value between 0.0 and 1.0.
         * Default: 1.
         */
        this.polylineOpacity = 1;
        // A mapsindoors.DirectionsRenderer used for drawing polylines.
        this.directionsRenderer = null;
        this.fitToDirectionsRouteBounds = true;
        this.mapsIndoorsReady = index.createEvent(this, "mapsIndoorsReady", 7);
        this.locationClicked = index.createEvent(this, "locationClicked", 7);
        this.positionReceived = index.createEvent(this, "positionReceived", 7);
        this.positionError = index.createEvent(this, "positionError", 7);
        this.dragend = index.createEvent(this, "dragend", 7);
        this.idle = index.createEvent(this, "idle", 7);
    }
    apiKeyChange(newApiKey) {
        mapsindoors.MapsIndoors.setApiKey(newApiKey);
    }
    gmOptionsChange(newControlOptions) {
        this.googleMapInstance.setOptions(newControlOptions);
    }
    floorSelectorChange(newPosition, oldPosition) {
        if (this.floorSelectorInstance) {
            this.setFloorSelector(newPosition, oldPosition);
        }
    }
    positionControlChange(newPosition, oldPosition) {
        this.setPositionControl(newPosition, oldPosition);
    }
    floorChange(newFloor, oldFloor) {
        if (oldFloor === undefined) {
            // Do nothing. This will only be the case when the map is initializing and setting the floor attribute.
            return;
        }
        if (newFloor !== oldFloor && newFloor !== this.mapsIndoorsInstance.getFloor()) {
            if (newFloor === null) {
                newFloor = '0'; // Setting the DOM attribute to "0" will be passed on here as null, so we need to circumvent that.
            }
            this.mapsIndoorsInstance.setFloor(newFloor);
        }
    }
    zoomChange(newZoom, oldZoom) {
        if (newZoom !== oldZoom && newZoom !== this.googleMapInstance.getZoom()) {
            if (newZoom === null) {
                newZoom = 0; // Setting the DOM attribute to "0" will be passed on here as null, so we need to circumvent that.
            }
            this.googleMapInstance.setZoom(parseInt(newZoom, 10));
        }
    }
    disableExternalLinksChange(attributeValue) {
        this.setExternalLinkBehavior(attributeValue);
    }
    polylineColorChange(newPolylineColor) {
        if (this.directionsRenderer) {
            if (!newPolylineColor) {
                newPolylineColor = '#3071d9';
            }
            this.directionsRenderer.setOptions({ strokeColor: newPolylineColor });
        }
    }
    polylineWeightChange(newPolylineWeight) {
        if (this.directionsRenderer) {
            if (!newPolylineWeight) {
                newPolylineWeight = 4;
            }
            this.directionsRenderer.setOptions({ strokeWeight: newPolylineWeight });
        }
    }
    polylineOpacityChange(newPolylineOpacity) {
        if (this.directionsRenderer) {
            if (!newPolylineOpacity) {
                newPolylineOpacity = 1;
            }
            this.directionsRenderer.setOptions({ strokeOpacity: newPolylineOpacity });
        }
    }
    /**
     * Get the version of the MapsIndoors SDK.
     * @return {Promise<string>} SDK version
     */
    async getMapsIndoorsVersion() {
        return this.mapsIndoorsInstance.__VERSION__;
    }
    /**
     * Changes the center of the map to the given LatLng.
     * @param {google.maps.LatLng} latLng
     */
    async panTo(latLng) {
        this.googleMapInstance.panTo(latLng);
    }
    /**
     * Sets the map viewport to contain the given bounds.
     * @param {google.maps.LatLngBounds} bounds
     */
    async fitBounds(bounds) {
        this.googleMapInstance.fitBounds(bounds);
    }
    /**
     * Returns the lat/lng bounds of the current map viewport.
     * @returns {Promise<google.maps.LatLngBounds>}
     */
    async getBounds() {
        return this.googleMapInstance.getBounds();
    }
    /**
     * Set a display rule for one or more types or locations.
     * @param {(string|string[])} target - Can be a single location id or type name, or an array of locations ids and type names.
     * @param {DisplayRule} displayRule
     */
    async setDisplayRule(target, displayRule) {
        this.mapsIndoorsInstance.setDisplayRule(target, displayRule);
    }
    /**
     * Sets the venue
     * @param {string|object} venue venue id string or venue object to set
     */
    async setVenue(venue) {
        this.mapsIndoorsInstance.setVenue(venue);
    }
    /**
     * Changes the map view to show the default venue or pass in a venue ID to go to another venue.
     * @param {string} [venueId] - Venue ID
     */
    async fitVenue(venueId) {
        return this.mapsIndoorsInstance.fitVenue(venueId);
    }
    /**
     * Open info window.
     * @param {string} content - Content of the info window in clear text or HTML.
     * @param {google.maps.LatLng} anchor - The location of the info window
     * @param {string} className - A classname given to the div holding the content
     */
    async openInfoWindow(content, anchor, className = '') {
        this.infoWindow.setContent(`<div class="${className}">${content}</div>`);
        this.infoWindow.setPosition(anchor);
        this.infoWindow.open(this.googleMapInstance);
    }
    /**
     * Close info window.
     */
    async closeInfoWindow() {
        this.infoWindow.close();
    }
    /**
     * Filter the locations on the map by showing only provided location IDs.
     * @param {array} locationIds - The IDs of the locations to show. Any other locations will be hidden.
     * @param {boolean} fitView - Change the map viewport to fit the shown locations.
     */
    async filterLocations(locationIds, fitView = false) {
        this.mapsIndoorsInstance.filter(locationIds, fitView);
    }
    /**
     * Remove locations filter, thus showing all locations.
     * @param fitView  - Change the map viewport to fit all shown locations.
     */
    async clearLocationFilter(fitView = false) {
        this.mapsIndoorsInstance.filter(null, fitView);
    }
    /**
     * Show a route on the map from one location to another
     * @param {object} routeParams
     * @param {RouteLocation} routeParams.origin - Object for origin location with lat, lng, floor, eg `{ lat: 12.345, lng: 67.890, floor: 20 }`
     * @param {RouteLocation} routeParams.destination - Object for destination location with lat, lng, floor, eg `{ lat: 12.345, lng: 67.890, floor: 20 }`
     * @param {string} [routeParams.travelMode] - Travel mode, one of 'WALKING', 'BICYCLING', 'DRIVING' or 'TRANSIT'. Default is 'WALKING'
     * @param {boolean} [routeParams.avoidStairs] - If set to true stairs will be avoided if possible. Default is false.
     * @param {string[]} [routeParams.userRoles] - List of user roles to be applied to the directions.
     * @param {boolean} [routeParams.fitBounds] - Wether the map's viewport will be fitted to the bounds of the rendered route. Default is true, meaning it will be fitted.
     */
    async showRoute(routeParams) {
        if ('fitBounds' in routeParams) {
            // The fitBounds is used in the constructor for DirectionsRenderer, not in the getRoute call.
            this.fitToDirectionsRouteBounds = routeParams.fitBounds;
            delete routeParams.fitBounds;
        }
        return mapsindoors.DirectionsService.getRoute(routeParams).then(directionsResult => this.setRoute(directionsResult));
    }
    /**
     * Sets a route, and renders the first leg of the route as a polyline.
     * @param directionsResult https://app.mapsindoors.com/mapsindoors/js/sdk/latest/docs/global.html#DirectionsResult
     */
    async setRoute(directionsResult) {
        if (!this.directionsRenderer) {
            this.directionsRenderer = new mapsindoors.DirectionsRenderer({
                mapsindoors: this.mapsIndoorsInstance,
                strokeColor: this.polylineColor,
                strokeWeight: this.polylineWeight,
                strokeOpacity: this.polylineOpacity,
                fitBounds: this.fitToDirectionsRouteBounds
            });
        }
        this.directionsRenderer.setRoute(directionsResult.routes[0]);
    }
    /**
     * Clear a currently rendered route (polyline).
     */
    async clearRoute() {
        if (this.directionsRenderer) {
            this.directionsRenderer.setRoute(null);
        }
    }
    /**
     * Renders the next leg of the set route as a polyline on the map.
     */
    async nextRouteLeg() {
        if (!this.directionsRenderer) {
            return;
        }
        this.directionsRenderer.nextLeg();
    }
    /**
     * Renders the previous leg of the set route as a polyline on the map.
     */
    async previousRouteLeg() {
        if (!this.directionsRenderer) {
            return;
        }
        this.directionsRenderer.previousLeg();
    }
    /**
     * Sets the index which leg of the route to display on the map.
     * @param index Index of route leg to render on map.
     */
    async setRouteLegIndex(index) {
        if (!this.directionsRenderer) {
            return;
        }
        this.directionsRenderer.setLegIndex(index);
    }
    /**
     * Get info about the current route.
     * @returns {Promise<any>} DirectionsResult
     */
    async getRoute() {
        if (!this.directionsRenderer) {
            return;
        }
        return this.directionsRenderer.getRoute();
    }
    async componentDidLoad() {
        await this.initializeGoogleMaps();
        await this.initialiseMapsIndoorsSDK();
        await this.setupMap();
        if (this.floorSelector) {
            this.showFloorSelectorAfterUserInteraction();
        }
        if (this.positionControl) {
            this.setPositionControl(this.positionControl);
        }
        // Make sure initial zoom attribute is set
        this.zoomChange(this.zoom, undefined);
        google.maps.event.addListener(this.mapsIndoorsInstance, 'floor_changed', (floor) => {
            this.floor = floor;
        });
        google.maps.event.addListener(this.googleMapInstance, 'zoom_changed', () => {
            this.zoom = this.googleMapInstance.getZoom();
        });
    }
    /**
     * Show the floor selector after user interacts with map.
     * Sets up event listener what when invoked will set the floor selector on the map.
     */
    showFloorSelectorAfterUserInteraction() {
        const eventsToListenFor = ['touchmove', 'click', 'wheel']; // these are events we consider as user interactions with the map
        const userInteracted = () => {
            eventsToListenFor.forEach(event => this.mapDiv.removeEventListener(event, userInteracted));
            this.setFloorSelector(this.floorSelector);
        };
        eventsToListenFor.forEach(event => this.mapDiv.addEventListener(event, userInteracted));
    }
    /**
     * Ensure that Google Maps API is available.
     *
     * @returns {Promise<void>}
     */
    initializeGoogleMaps() {
        return new Promise((resolve) => {
            // If no Google Maps API is globally available, insert script tag on page to fetch it.
            if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
                this.insertGoogleMapsScript().then(() => resolve());
                return;
            }
            // Google Maps API already on page:
            // Check to see if the API key of the loaded script is different.
            // In that case, reload using the key given to the component.
            const googleMapsScriptTag = document.querySelector('script[src*="maps.googleapis.com/maps/api"]');
            if (!googleMapsScriptTag) {
                return resolve(); // API available, but could not find script to check.
            }
            const currentApiKey = new URLSearchParams(googleMapsScriptTag.getAttribute('src')).get('key');
            if (currentApiKey !== this.gmApiKey) {
                // To force reload with new key, remove the existing script tag from document and insert a new.
                googleMapsScriptTag.parentNode.removeChild(googleMapsScriptTag);
                this.insertGoogleMapsScript().then(() => resolve());
            }
            else {
                resolve();
            }
        });
    }
    /**
     * Inject script tag for Google Maps API onto the page.
     *
     * @returns {Promise<void>}
     */
    insertGoogleMapsScript() {
        return new Promise(resolve => {
            this.googleMapsApiTag = document.createElement('script');
            this.googleMapsApiTag.setAttribute('type', 'text/javascript');
            this.googleMapsApiTag.setAttribute('src', `//maps.googleapis.com/maps/api/js?v=3&key=${this.gmApiKey}&libraries=geometry,places`);
            document.body.appendChild(this.googleMapsApiTag);
            this.googleMapsApiTag.onload = () => resolve();
        });
    }
    /**
     * Ensure that MapsIndoors Web SDK is available.
     *
     * @returns {Promise<void>}
     */
    initialiseMapsIndoorsSDK() {
        return new Promise((resolve) => {
            if (typeof mapsindoors !== 'undefined') {
                mapsindoors.MapsIndoors.setApiKey(this.miApiKey);
                return resolve();
            }
            this.miSdkApiTag = document.createElement('script');
            this.miSdkApiTag.setAttribute('type', 'text/javascript');
            this.miSdkApiTag.setAttribute('src', `${miVariables.miSDKUrl}?apikey=${this.miApiKey}`);
            document.body.appendChild(this.miSdkApiTag);
            this.miSdkApiTag.onload = () => resolve();
        });
    }
    /**
     * Start Google map and MapsIndoors.
     */
    setupMap() {
        return new Promise((resolve) => {
            this.googleMapInstance = new google.maps.Map(this.mapDiv, this.gmOptions);
            this.mapsIndoorsInstance = new mapsindoors.MapsIndoors({
                map: this.googleMapInstance
            });
            google.maps.event.addListener(this.mapsIndoorsInstance, 'ready', () => {
                if (this.floor !== undefined) {
                    // Floor attribute was set in the DOM initally: Set the floor
                    this.mapsIndoorsInstance.setFloor(this.floor);
                }
                else {
                    this.floor = this.mapsIndoorsInstance.getFloor();
                }
                this.mapsIndoorsReady.emit();
                resolve();
            });
            this.setExternalLinkBehavior(this.disableExternalLinks);
            this.relayEvents();
            this.infoWindow = new google.maps.InfoWindow;
        });
    }
    /**
     * Setup listeners for some MapsIndoors and Google Map events and emit them out of component.
     */
    relayEvents() {
        google.maps.event.addListener(this.mapsIndoorsInstance, 'click', location => this.locationClicked.emit(location));
        google.maps.event.addListener(this.googleMapInstance, 'dragend', () => this.dragend.emit());
        google.maps.event.addListener(this.googleMapInstance, 'idle', () => this.idle.emit());
    }
    /**
     * Prevent external links from opening.
     * @param {MouseEvent} event
     */
    preventExternalLink(event) {
        const externalLink = event.target.closest('a[target="_blank"]');
        if (externalLink) {
            event.preventDefault();
        }
    }
    /**
     * Set or remove event listeners for external links.
     * @param {boolean} shouldDisableLinks - If true, external links on the map will be preventet from opening.
     */
    setExternalLinkBehavior(shouldDisableLinks) {
        if (shouldDisableLinks === true) {
            this.mapDiv.addEventListener('click', this.preventExternalLink);
        }
        else {
            this.mapDiv.removeEventListener('click', this.preventExternalLink);
        }
    }
    /**
     * Remove a Google Map Control from the map based on class name of the control.
     * @param {google.maps.ControlPosition} position - the position from where to remove the control
     * @param {string} className - the classname of the control to remove
     */
    removeGoogleMapControl(position, className) {
        const controls = this.googleMapInstance.controls[google.maps.ControlPosition[position]].getArray();
        const controlIndex = controls.findIndex(control => control.classList.contains(className));
        this.googleMapInstance.controls[google.maps.ControlPosition[position]].removeAt(controlIndex);
    }
    /**
     * Set, update or unset floor selector on the map.
     * @param {google.maps.ControlPosition} position
     * @param {google.maps.ControlPosition} [oldPosition]
     */
    setFloorSelector(mapControlPosition, oldMapControlPosition = undefined) {
        if (mapControlPosition === null) {
            // If attribute is not set, clear control and unset floor selector.
            this.removeGoogleMapControl(oldMapControlPosition, 'floor-selector');
            this.floorSelectorElement = null;
            this.floorSelectorInstance = null;
            return;
        }
        else if (!this.floorSelectorInstance) {
            // If there is no floor selector, create it.
            this.floorSelectorElement = document.createElement('div');
            this.floorSelectorInstance = new mapsindoors.FloorSelector(this.floorSelectorElement, this.mapsIndoorsInstance);
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.floorSelectorElement);
        }
        else {
            // If there is clear it from the old control position and add it on new control position.
            this.removeGoogleMapControl(oldMapControlPosition, 'floor-selector');
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.floorSelectorElement);
        }
    }
    /**
     * Set, update or unset position control on the map.
     * @param {google.maps.ControlPosition} mapControlPosition
     * @param {google.maps.ControlPosition} oldMapControlPosition
     */
    setPositionControl(mapControlPosition, oldMapControlPosition = undefined) {
        if (mapControlPosition === null) {
            // If attribute is not set, clear control and unset position control.
            this.clearPositionEventListeners();
            this.removeGoogleMapControl(oldMapControlPosition, 'position-control');
            this.positionControlElement = null;
            this.positionControlInstance = null;
        }
        else if (!this.positionControlInstance) {
            // If there is no position control, create it.
            this.positionControlElement = document.createElement('div');
            this.positionControlInstance = new mapsindoors.PositionControl(this.positionControlElement, { mapsIndoors: this.mapsIndoorsInstance, positionOptions: { enableHighAccuracy: false, maximumAge: 300000, timeout: 10000 } });
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.positionControlElement);
            this.setPositionEventListeners();
        }
        else {
            // If there is a position control, clear it from the old control position and add it on the new position.
            this.clearPositionEventListeners();
            this.removeGoogleMapControl(oldMapControlPosition, 'position-control');
            this.googleMapInstance.controls[google.maps.ControlPosition[mapControlPosition]].push(this.positionControlElement);
        }
    }
    /**
     * Add event listeners for position events.
     */
    setPositionEventListeners() {
        google.maps.event.addListener(this.mapsIndoorsInstance, 'position_received', (position) => {
            this.positionReceived.emit(position);
        });
        google.maps.event.addListener(this.mapsIndoorsInstance, 'position_error', (error) => {
            this.positionError.emit(error);
        });
    }
    /**
     * Remove event listeners for position events.
     */
    clearPositionEventListeners() {
        google.maps.event.clearListeners(this.mapsIndoorsInstance, 'position_received');
        google.maps.event.clearListeners(this.mapsIndoorsInstance, 'position_error');
    }
    render() {
        return (index.h("div", { ref: (el) => this.mapDiv = el }));
    }
    static get watchers() { return {
        "miApiKey": ["apiKeyChange"],
        "gmOptions": ["gmOptionsChange"],
        "floorSelector": ["floorSelectorChange"],
        "positionControl": ["positionControlChange"],
        "floor": ["floorChange"],
        "zoom": ["zoomChange"],
        "disableExternalLinks": ["disableExternalLinksChange"],
        "polylineColor": ["polylineColorChange"],
        "polylineWeight": ["polylineWeightChange"],
        "polylineOpacity": ["polylineOpacityChange"]
    }; }
    static get style() { return ":host{display:block}:host>div{height:100%}.mapsindoors.floor-selector{margin:10px;position:absolute;border-radius:2px;-webkit-box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.3);box-shadow:0 1px 2px 0 rgba(0, 0, 0, 0.3);width:40px;font-family:Roboto, Arial, sans-serif;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:18px}.mapsindoors.floor-selector a{position:relative;display:block;float:none;margin-top:-1px;text-align:center;cursor:pointer;border-radius:2px;background:#fff;z-index:0;height:40px;line-height:40px}.mapsindoors.floor-selector a:hover{background:#ddd;border-color:#999;z-index:2}.mapsindoors.floor-selector a.active{background:#ddd;border-color:#00b1ff;z-index:2}.mapsindoors.floor-selector a:not(:first-child):not(:last-child){border-radius:0}.mapsindoors.floor-selector a:first-child:not(:last-child){border-top-right-radius:2px;border-bottom-right-radius:0;border-bottom-left-radius:0}.mapsindoors.floor-selector a:last-child:not(:first-child){border-top-right-radius:0;border-bottom-left-radius:2px;border-top-left-radius:0}.mapsindoors.position-control{margin:10px;position:absolute}.mapsindoors.position-control__button{border:none;margin:0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;width:40px;height:40px;background-color:transparent;background-size:cover;outline:none;-webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);box-shadow:0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);border-radius:50%}.mapsindoors.position-control__button--unknown{background-image:url(data:image/png;base64,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)}.mapsindoors.position-control__button--requesting{background-image:url(data:image/png;base64,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)}.mapsindoors.position-control__button--known{background-image:url(data:image/png;base64,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)}.mapsindoors.position-control__button--centered{background-image:url(data:image/png;base64,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)}"; }
};

const MetricCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.showToolTip = false;
        /**
         * This is the metric title.
         * @type {string}
         * @memberof MetricCard
         */
        this.label = '';
        /**
         * This is the metric value.
         * @type {string}
         * @memberof MetricCard
         */
        this.value = '';
        /**
         * When present a loading spinner will be displayed until the value or error attribute is set or the spinner attribute is removed
         * @type {boolean}
         * @memberof MetricCard
         */
        this.spinner = false;
    }
    render() {
        return (index.h(index.Host, null, index.h("mi-card", null, this.renderContent())));
    }
    renderToolTip() {
        if (this.tip > '') {
            return index.h("p", { class: { 'tool-tip': true, 'visible': this.tip && this.showToolTip } }, this.tip);
        }
    }
    getInfoIcon() {
        if (this.tip > '') {
            return index.h("svg", { xmlns: "http://www.w3.org/2000/svg", height: "24", viewBox: "0 0 24 24", width: "24" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.5.51-.86.97-1.04 1.69-.08.32-.13.68-.13 1.14h-2v-.5c0-.46.08-.9.22-1.31.2-.58.53-1.1.95-1.52l1.24-1.26c.46-.44.68-1.1.55-1.8-.13-.72-.69-1.33-1.39-1.53-1.11-.31-2.14.32-2.47 1.27-.12.37-.43.65-.82.65h-.3C8.4 9 8 8.44 8.16 7.88c.43-1.47 1.68-2.59 3.23-2.83 1.52-.24 2.97.55 3.87 1.8 1.18 1.63.83 3.38-.19 4.4z" }));
        }
    }
    renderContent() {
        let value;
        if (this.value) {
            value = isNumber(this.value) ? formatNumber(this.value) : this.value;
        }
        else if (this.error) {
            value = this.error;
        }
        else if (this.spinner) {
            value = index.h("mi-spinner", null);
        }
        else {
            value = ' ';
        }
        return index.h("div", { class: "content" }, index.h("h1", { onMouseOver: () => this.showToolTip = true, onMouseOut: () => this.showToolTip = false }, this.label, "  ", this.getInfoIcon()), index.h("section", null, this.renderToolTip(), index.h("p", { class: { 'error': !!this.error, 'hidden': this.tip && this.showToolTip } }, value)));
    }
    static get style() { return ":host{font-family:Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:1;flex-grow:1}:host mi-card{position:relative;overflow:hidden;min-width:312px}:host mi-card .content h1{display:-ms-inline-flexbox;display:inline-flex;cursor:default;-ms-flex-align:center;align-items:center;text-transform:uppercase;white-space:nowrap;margin:0;font-size:1rem;font-weight:600;color:#8d98aa;margin-bottom:8px}:host mi-card .content h1 svg{fill:#aeb9cb;width:16px;height:16px;margin-left:8px}:host mi-card .content section{position:relative}:host mi-card .content section p{margin:0;font-size:3rem;line-height:3rem;font-weight:500;color:#1e2025}:host mi-card .content section p.error{font-size:1rem;font-weight:500;color:#8d98aa}:host mi-card .content section p.hidden{visibility:hidden}:host mi-card .content section p.tool-tip{-webkit-box-sizing:border-box;box-sizing:border-box;visibility:hidden;overflow:hidden;position:absolute;top:0px;right:0px;bottom:0px;left:0px;opacity:0;-webkit-transition:all 100ms;transition:all 100ms;z-index:700;background-color:#ffffff;font-size:0.875rem;font-weight:400;line-height:1rem;margin:0}:host mi-card .content section p.tool-tip.visible{opacity:1;visibility:visible}:host mi-card .content section mi-spinner{display:inline-block;vertical-align:middle;width:100%}"; }
};

var NotificationPosition;
(function (NotificationPosition) {
    NotificationPosition["TOP_LEFT"] = "top-left";
    NotificationPosition["TOP_CENTER"] = "top-center";
    NotificationPosition["TOP_RIGHT"] = "top-right";
    NotificationPosition["BOTTOM_CENTER"] = "bottom-center";
    NotificationPosition["BOTTOM_LEFT"] = "bottom-left";
    NotificationPosition["BOTTOM_RIGHT"] = "bottom-right";
})(NotificationPosition || (NotificationPosition = {}));

var NotificationType;
(function (NotificationType) {
    NotificationType["Error"] = "error";
    NotificationType["Info"] = "info";
    NotificationType["Success"] = "success";
    NotificationType["Warning"] = "warning";
    NotificationType["None"] = "none";
})(NotificationType || (NotificationType = {}));

const Notification = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * @description Where the notifications should be positioned.
         * @type {NotificationPosition}
         */
        this.position = NotificationPosition.BOTTOM_RIGHT;
        /**
         * @description Time the notification should be visible.
         * @type {number} - Duration in seconds.
         */
        this.duration = 3;
        /**
         * @description List of currently displayed notifications.
         * @private
         * @type {NotificationMessage[]}
         */
        this.notifications = [];
        /**
         * @description Used for setting a unique identifier for each notification.
         * @private
         */
        this.notificationId = 0;
    }
    /**
     * @description Show a notification.
     * @param {string} message - Message to display.
     * @param {string} [type='none'] - Type of notification. Available types: 'info', 'warning', 'success', 'error' and 'none'.
     * @param {boolean} [sticky=false] - Set message as sticky to prevent it from disappearing.
     * @returns {Promise<void>}
     */
    async push(message, type = 'none', sticky = false) {
        if (typeof message !== 'string' || message.length < 1) {
            return;
        }
        // Check validity of type
        const typeExist = Object.values(NotificationType)
            .some((notificationType) => notificationType === type);
        if (!typeExist) {
            // eslint-disable-next-line no-console
            console.error('Invalid notification type');
            return;
        }
        const notificationMessage = {
            id: this.notificationId,
            message: message,
            sticky: sticky,
            type: type,
        };
        if (sticky === false) {
            notificationMessage.timer = window.setTimeout(() => this.dismiss(notificationMessage.id), (this.duration * 1000));
        }
        this.notificationId++;
        this.notifications.push(notificationMessage);
        index.forceUpdate(this.hostElement);
    }
    /**
     * @description Clear all notifications.
     * @returns {Promise<void>}
     */
    async clearAll() {
        this.notifications = [];
        index.forceUpdate(this.hostElement);
    }
    /**
     * @description Dismiss a single notification.
     * @private
     * @param {number} id
     */
    dismiss(id) {
        this.notifications = this.notifications.filter((notification) => notification.id !== id);
        index.forceUpdate(this.hostElement);
    }
    render() {
        return (index.h(index.Host, { class: this.position }, this.notifications.map((notification) => this.renderNotification(notification))));
    }
    /**
     * @description Get JSX for notification.
     * @param {NotificationMessage} { id, message }
     * @returns {JSX.Element}
     */
    renderNotification({ id, message, type }) {
        return (index.h("div", { class: "notification", role: "alert" }, type && type !== 'none' ? this.renderIcon(type) : null, index.h("p", { class: "label" }, message), index.h("button", { type: "button", "aria-label": "Dismiss notification", class: "btn", onClick: () => this.dismiss(id) }, index.h("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" }, index.h("path", { d: "M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z", fill: "#1E2025" })))));
    }
    /**
     * @description Get JSX for type-icon.
     * @param {NotificationType} type
     * @returns {JSX.Element}
     */
    renderIcon(type) {
        if (type === NotificationType.Error) {
            return (index.h("div", { class: "icon icon-type--error" }, index.h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V13H11V15H9ZM9 5V11H11V5H9Z", fill: "#FCFCFC" }))));
        }
        else if (type === NotificationType.Success) {
            return (index.h("div", { class: "icon icon-type--success" }, index.h("svg", { width: "18", height: "14", viewBox: "0 0 18 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" }, index.h("path", { d: "M5.99997 11.17L1.82997 7L0.409973 8.41L5.99997 14L18 2L16.59 0.59L5.99997 11.17Z", fill: "#FCFCFC" }))));
        }
        else if (type === NotificationType.Warning) {
            return (index.h("div", { class: "icon icon-type--warning" }, index.h("svg", { width: "22", height: "19", viewBox: "0 0 22 19", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M22 19L11 0L0 19H22ZM10 16V14H12V16H10ZM10 12H12V8H10V12Z", fill: "#FCFCFC" }))));
        }
        return (index.h("div", { class: "icon icon-type--info" }, index.h("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-hidden": "true", focusable: "false" }, index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 15V9H11V15H9ZM9 5V7H11V5H9Z", fill: "#FCFCFC" }))));
    }
    get hostElement() { return index.getElement(this); }
    static get style() { return ":host{padding:16px;position:fixed;z-index:1000;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column}:host(.top-left){top:0;left:0}:host(.top-center){top:0;-ms-flex-align:center;align-items:center;left:50%;-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0)}:host(.top-right){top:0;right:0;-ms-flex-align:end;align-items:flex-end}:host(.bottom-left){bottom:0;left:0}:host(.bottom-center){bottom:0;-ms-flex-align:center;align-items:center;left:50%;-webkit-transform:translate(-50%, 0);transform:translate(-50%, 0)}:host(.bottom-right){bottom:0;right:0;-ms-flex-align:end;align-items:flex-end}.notification{margin-top:16px;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-webkit-box-shadow:0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);box-shadow:0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);border-radius:2px;background-color:#fcfcfc;overflow:hidden}.notification .icon{width:48px;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.notification .icon-type--error{background-color:#de1b1b}.notification .icon-type--success{background-color:#2a844e}.notification .icon-type--warning{background-color:#ad5f00}.notification .icon-type--info{background-color:#8d98aa}.notification .label{padding-left:16px;-ms-flex:1;flex:1;font-size:0.875rem}.notification .btn{padding-left:24px;padding-right:16px;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;border:none;background-color:#fcfcfc}.notification .btn:focus{outline:none;-webkit-box-shadow:none;box-shadow:none}"; }
};

const ScrollButtons = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * @description  Determines how far to scroll when clicking one of the buttons.
         * @type {number}
         */
        this.scrollLength = 100;
    }
    /**
     * @description Add scroll event listener to container reference.
     * @memberof ScrollButtons
     */
    addScrollEventListener() {
        this.scrollContainerElementRef.addEventListener('scroll', () => {
            this.updateScrollButtonsState();
        });
    }
    /**
     * @description Updates enable/disable state for scroll up and down buttons.
     * @returns {Promise<void>}
     * @memberof ScrollButtons
     */
    async updateScrollButtonsState() {
        // Disable or enable the scroll up button
        if (this.scrollContainerElementRef.scrollTop === 0) {
            this.upButtonElement.disabled = true;
        }
        else if (this.upButtonElement.disabled) {
            this.upButtonElement.disabled = false;
        }
        // Disable or enable the scroll down button
        if (this.scrollContainerElementRef.scrollHeight - this.scrollContainerElementRef.scrollTop === this.scrollContainerElementRef.clientHeight) {
            this.downButtonElement.disabled = true;
        }
        else if (this.downButtonElement.disabled) {
            this.downButtonElement.disabled = false;
        }
    }
    /**
     * @description Update scroll position.
     * @private
     * @param {number} value - Value to scroll.
     * @memberof ScrollButtons
     */
    updateScrollPosition(value) {
        if (!('scrollBehavior' in document.documentElement.style)) { // Internet Explorer feature check
            this.scrollContainerElementRef.scrollTop = value;
        }
        else {
            this.scrollContainerElementRef.scroll({
                top: this.scrollContainerElementRef.scrollTop + value,
                behavior: 'smooth'
            });
        }
    }
    render() {
        return (index.h("div", { class: "scroll-buttons" }, index.h("button", { class: "mi-button mi-button--base btn btn-up", type: "button", disabled: true, "aria-label": "Scroll Up", ref: (el) => this.upButtonElement = el, onClick: () => this.updateScrollPosition(-this.scrollLength) }), index.h("button", { class: "mi-button mi-button--base btn btn-down", type: "button", "aria-label": "Scroll Down", ref: (el) => this.downButtonElement = el, onClick: () => this.updateScrollPosition(this.scrollLength) })));
    }
    static get watchers() { return {
        "scrollContainerElementRef": ["addScrollEventListener"]
    }; }
    static get style() { return "\@charset \"UTF-8\";a.mi-button{cursor:default}.mi-button{border-radius:4px;border-width:1px;border-style:solid;font-size:1rem;font-weight:500;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}.mi-button:disabled{opacity:0.72;cursor:not-allowed}.mi-button object{-webkit-filter:invert(9%) sepia(13%) saturate(692%) hue-rotate(185deg) brightness(98%) contrast(91%);filter:invert(9%) sepia(13%) saturate(692%) hue-rotate(185deg) brightness(98%) contrast(91%);width:16px;height:16px}.mi-button--small{padding-left:12px;padding-right:12px;padding-top:8px;padding-bottom:8px;font-size:0.875rem;height:32px}.mi-button--small object{width:16px;height:16px}.mi-button--large{padding-left:16px;padding-right:16px;font-size:1.25rem}.mi-button--large object{width:20px;height:20px}.mi-button--icon-left{padding-left:12px}.mi-button--icon-left object{margin-right:8px}.mi-button--icon-right{padding-right:12px}.mi-button--icon-right object{margin-left:8px}.mi-button--icon-both{padding-top:12px;padding-bottom:12px}.mi-button--icon-both object:first-of-type{margin-right:8px}.mi-button--icon-both object:last-of-type{margin-left:8px}.mi-button--base,.mi-button--danger{background:-webkit-gradient(linear, left top, left bottom, from(#f5f7fa), to(#ebeff5));background:linear-gradient(#f5f7fa, #ebeff5);color:#1e2025;border-color:#c8d0e0}.mi-button--base:not(:disabled):hover,.mi-button--danger:not(:disabled):hover{background:-webkit-gradient(linear, left top, left bottom, from(#ebeff5), to(#dee3ed));background:linear-gradient(#ebeff5, #dee3ed);border-color:#aeb9cb}.mi-button--base:not(:disabled):active,.mi-button--danger:not(:disabled):active{background:-webkit-gradient(linear, left top, left bottom, from(#dee3ed), to(#ebeff5));background:linear-gradient(#dee3ed, #ebeff5)}.mi-button--primary{color:#ffffff;border-color:#20693e;background:-webkit-gradient(linear, left top, left bottom, from(#3ba064), to(#2a844e));background:linear-gradient(#3ba064, #2a844e)}.mi-button--primary object{-webkit-filter:invert(100%) sepia(93%) saturate(0%) hue-rotate(201deg) brightness(106%) contrast(106%);filter:invert(100%) sepia(93%) saturate(0%) hue-rotate(201deg) brightness(106%) contrast(106%)}.mi-button--primary:not(:disabled):hover{background:-webkit-gradient(linear, left top, left bottom, from(#2a844e), to(#20693e));background:linear-gradient(#2a844e, #20693e)}.mi-button--primary:not(:disabled):active{background:-webkit-gradient(linear, left top, left bottom, from(#20693e), to(#2a844e));background:linear-gradient(#20693e, #2a844e)}.mi-button--danger{color:#de1b1b}.mi-button--danger object{-webkit-filter:invert(29%) sepia(76%) saturate(4633%) hue-rotate(347deg) brightness(85%) contrast(108%);filter:invert(29%) sepia(76%) saturate(4633%) hue-rotate(347deg) brightness(85%) contrast(108%)}.mi-button--outline{color:#3071d9;border-color:#3071d9;background-color:transparent}.mi-button--outline object{-webkit-filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%);filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%)}.mi-button--outline:not(:disabled):hover{color:#1d5bbf;border-color:#1d5bbf;background-color:#eef4fc}.mi-button--outline:not(:disabled):active{color:#1d5bbf;border-color:#1d5bbf;background-color:#cfe0fc}.mi-button--link{color:#3071d9;border-style:none;background-color:transparent;cursor:pointer}.mi-button--link object{-webkit-filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%);filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%)}.mi-button--link:not(:disabled):hover{color:#1d5bbf;border-color:#1d5bbf;background-color:#eef4fc}.mi-button--link:disabled:hover{cursor:not-allowed}.mi-button--link:not(:disabled):active{color:#1d5bbf;border-color:#1d5bbf;background-color:#cfe0fc}html{-webkit-box-sizing:border-box;box-sizing:border-box}*,*:before,*:after{-webkit-box-sizing:inherit;box-sizing:inherit}.scroll-buttons{height:100%;width:64px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.scroll-buttons .btn{margin:8px}.scroll-buttons .btn-up::after{content:\"↑\"}.scroll-buttons .btn-down::after{content:\"↓\"}"; }
};

var Debounce = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = outerDecorator;
exports.debounce = debounce;
var DEFAULT_DEBOUNCE_DURATION = 500;

exports.DEFAULT_DEBOUNCE_DURATION = DEFAULT_DEBOUNCE_DURATION;
/** Decorates a class method so that it is debounced by the specified duration */

function outerDecorator(duration) {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        // Attach this function to the instance (not the class)
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounce(descriptor.value, duration)
        });

        return this[key];
      }
    };
  };
}

/** Debounces the specified function and returns a wrapper function */

function debounce(method) {
  var duration = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_DEBOUNCE_DURATION : arguments[1];

  var timeoutId = undefined;

  function debounceWrapper() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    debounceWrapper.clear();

    timeoutId = setTimeout(function () {
      timeoutId = null;
      method.apply(_this, args);
    }, duration);
  }

  debounceWrapper.clear = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounceWrapper;
}
});

unwrapExports(Debounce);

var dist = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopExportWildcard(obj, defaults) { var newObj = defaults({}, obj); delete newObj['default']; return newObj; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



var _DebounceJs2 = _interopRequireDefault(Debounce);

exports['default'] = _DebounceJs2['default'];

_defaults(exports, _interopExportWildcard(Debounce, _defaults));
});

const Debounce$1 = unwrapExports(dist);

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const Search = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Placeholder for the input field.
         */
        this.placeholder = '';
        /**
         * Id for the input field.
         */
        this.idAttribute = '';
        /**
         * Data attributes for the input field.
         */
        this.dataAttributes = {};
        /**
         * If searching should include MapsIndoors locations.
         */
        this.mapsindoors = false;
        /**
         * If searching should include Google Places autocomplete suggestions.
         *
         * Remember to comply to Google's policy by showing a "Power By Google" badge somewhere on your
         * page if not already showing a Google map: https://developers.google.com/places/web-service/policies
         */
        this.google = false;
        /**
         * Which fields on MapsIndoors locations to search in. Comma separated string.
         */
        this.miFields = 'name,description,aliases,categories,externalid';
        this.results = index.createEvent(this, "results", 7);
        this.cleared = index.createEvent(this, "cleared", 7);
        this.componentRendered = index.createEvent(this, "componentRendered", 7);
    }
    valueChange(newValue) {
        if (!newValue || !this.inputElement) {
            return;
        }
        if (newValue !== this.inputElement.value) {
            // If newValue is different from what is in the input element, we know it's set from outside the component.
            this.inputElement.value = newValue;
            this.inputChanged();
        }
    }
    /**
     * Clear the input field.
     */
    async clear() {
        this.inputElement.value = '';
        this.value = '';
        this.cleared.emit();
    }
    /**
     * Handles incoming input change event, eg. input field value has changed.
     * The function is debounced 500ms to avoid firing too many requests while typing.
     */
    inputChanged() {
        const inputValue = this.inputElement.value;
        this.value = inputValue; // reflect on value attribute
        if (inputValue.length < 2) {
            this.lastRequested = null;
            inputValue.length === 0 ? this.clear() : this.pushResults([]);
            return;
        }
        if (inputValue.length > 1 && inputValue !== this.lastRequested) {
            Promise.all([
                this.makeMapsIndoorsQuery(inputValue),
                this.makeGooglePlacesQuery(inputValue)
            ])
                .then(results => {
                this.lastRequested = inputValue;
                this.pushResults(results[0].concat(results[1]));
            });
        }
    }
    /**
     * Push the results via the results event.
     * @param object[] Locations
     */
    pushResults(locations) {
        this.results.emit(locations);
    }
    /**
     * Make MapsIndoors locations request based on given search query.
     * @param {string} query
     * @return {Promise<any[]>}
     */
    makeMapsIndoorsQuery(query) {
        if (!this.mapsindoors) {
            return Promise.resolve([]);
        }
        // Transform miNear string attribute to object if it matches a latlng
        let miNear;
        if (this.miNear) {
            miNear = this.miNear;
            if (/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.test(this.miNear)) {
                const near = this.miNear.split(',');
                miNear = { lat: parseFloat(near[0]), lng: parseFloat(near[1]) };
            }
        }
        return mapsindoors.LocationsService.getLocations({
            q: query.trim(),
            fields: this.miFields,
            take: this.miTake,
            skip: this.miSkip,
            orderBy: this.miOrder,
            near: miNear,
            categories: this.miCategories
        });
    }
    /**
     * Make Google Places autocomplete suggestion request.
     * @param {string} query
     * @return {Promise<any>}
     */
    makeGooglePlacesQuery(query) {
        if (this.google) {
            if (!this.googleAutocompleteService) {
                this.googleAutocompleteService = new google.maps.places.AutocompleteService();
            }
        }
        else {
            this.googleAutocompleteService = null;
        }
        if (!this.googleAutocompleteService) {
            return Promise.resolve([]);
        }
        return new Promise((resolve) => {
            const params = {
                input: query
            };
            if (this.gmCountryCode) {
                params.componentRestrictions = { country: this.gmCountryCode };
            }
            this.googleAutocompleteService.getPlacePredictions(params, (results) => {
                const places = (results || []).map((result) => ({
                    type: 'Feature',
                    properties: {
                        type: 'google_places',
                        placeId: result.place_id,
                        name: result.structured_formatting.main_text,
                        subtitle: result.structured_formatting.secondary_text || '',
                        floor: 0
                    }
                }));
                resolve(places);
            });
        });
    }
    componentDidRender() {
        if (this.value) {
            this.inputElement.value = this.value;
            this.inputChanged();
        }
        if (this.dataAttributes) {
            for (const key in this.dataAttributes) {
                this.inputElement.setAttribute(key, this.dataAttributes[key]);
            }
        }
        this.componentRendered.emit();
    }
    render() {
        return (index.h("input", { id: this.idAttribute ? this.idAttribute : null, type: "search", ref: (el) => this.inputElement = el, onInput: () => this.inputChanged(), placeholder: this.placeholder, autocomplete: "off" }));
    }
    static get watchers() { return {
        "value": ["valueChange"]
    }; }
    static get style() { return "mi-search{display:block}mi-search input[type=search]{width:100%;background-color:#ffffff;border-style:solid;border-width:1px;border-radius:8px;height:48px;font-size:1.25rem;color:#1e2025;padding-right:12px;padding-left:32px;position:relative;background-image:url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMS43MSAxMUgxMi41TDE3LjQ5IDE2TDE2IDE3LjQ5TDExIDEyLjVWMTEuNzFMMTAuNzMgMTEuNDNDOS41OSAxMi40MSA4LjExIDEzIDYuNSAxM0MyLjkxIDEzIDAgMTAuMDkgMCA2LjVDMCAyLjkxIDIuOTEgMCA2LjUgMEMxMC4wOSAwIDEzIDIuOTEgMTMgNi41QzEzIDguMTEgMTIuNDEgOS41OSAxMS40MyAxMC43M0wxMS43MSAxMVpNMiA2LjVDMiA4Ljk5IDQuMDEgMTEgNi41IDExQzguOTkgMTEgMTEgOC45OSAxMSA2LjVDMTEgNC4wMSA4Ljk5IDIgNi41IDJDNC4wMSAyIDIgNC4wMSAyIDYuNVoiIGZpbGw9IiM4RDk4QUEiLz4KPC9zdmc+Cg==\");background-repeat:no-repeat;background-position:8px center}mi-search input[type=search]:focus{border-color:#3071d9;-webkit-box-shadow:0 0 0 2px #cfe0fc;box-shadow:0 0 0 2px #cfe0fc;}"; }
};
__decorate([
    Debounce$1(500)
], Search.prototype, "inputChanged", null);

const ShareSms = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Default value for country code input field.
         *
         * @type {string}
         */
        this.countryCode = '1';
        /**
         * Placeholder text for phone number input field.
         *
         * @type {string}
         */
        this.phoneNumberInputPlaceholder = 'Enter phone number';
        /**
         * Label for submit button.
         *
         * @type {string}
         */
        this.submitButtonLabel = 'Send SMS';
        /**
         * Handle form submission event and send directions to phone if validation checks passes.
         */
        this.submitFormHandler = (event) => {
            event.preventDefault();
            const isParametersValid = this.venueId && this.originLocationId && this.destinationLocationId ? true : false;
            if (!this.formElement.checkValidity() || !isParametersValid) {
                if (!this.countryCodeInputElement.validity.valid) {
                    this.countryCodeInputElement.focus();
                }
                if (!this.phoneNumberInputElement.validity.valid) {
                    this.phoneNumberInputElement.focus();
                }
                return;
            }
            mapsindoors.ShareService.directionsToPhone(this.venueId, this.originLocationId, this.destinationLocationId, this.countryCodeInputElement.value, this.phoneNumberInputElement.value)
                .then(() => this.successfullySent.emit())
                .catch((err) => this.unsuccessfullySent.emit(err));
        };
        this.successfullySent = index.createEvent(this, "successfullySent", 7);
        this.unsuccessfullySent = index.createEvent(this, "unsuccessfullySent", 7);
    }
    componentDidRender() {
        this.countryCodeInputElement.value = this.countryCode;
    }
    componentDidLoad() {
        this.addIntersectionObserver();
    }
    /**
     * Observe the input field for phone number and focus it on intersection.
     */
    addIntersectionObserver() {
        this.intersectionObserver = new IntersectionObserver((entries) => {
            if (entries[0].intersectionRatio <= 0) {
                return;
            }
            this.phoneNumberInputElement.focus();
            this.intersectionObserver.disconnect();
        });
        this.intersectionObserver.observe(this.phoneNumberInputElement);
    }
    /**
     * Set input attribute on mi-keyboard component.
     *
     * @param {FocusEvent} event
     */
    setKeyboardInputElement(event) {
        this.miKeyboardElement.inputElement = event.target;
    }
    /**
     * Update form validity.
     */
    updateFormValidity() {
        // Form validity check
        if (!this.formElement.checkValidity()) {
            this.submitButtonElement.disabled = true;
            return;
        }
        this.submitButtonElement.disabled = false;
    }
    render() {
        return (index.h("form", { onSubmit: this.submitFormHandler, ref: (el) => this.formElement = el }, index.h("div", { class: "inputs" }, index.h("span", { class: "plus-sign" }, "\uFF0B"), index.h("input", { id: "country-code", class: "country-code", pattern: "[0-9]{1,3}", required: true, autocomplete: "off", type: "text", placeholder: this.countryCode, ref: (el) => this.countryCodeInputElement = el, onInput: () => this.updateFormValidity(), onFocus: (e) => this.setKeyboardInputElement(e) }), index.h("input", { id: "phone-number", class: "phone-number", pattern: "[0-9]{6,10}", required: true, autocomplete: "off", type: "text", placeholder: this.phoneNumberInputPlaceholder, ref: (el) => this.phoneNumberInputElement = el, onInput: () => this.updateFormValidity(), onFocus: (e) => this.setKeyboardInputElement(e) })), index.h("mi-keyboard", { layout: "numeric", ref: (el) => this.miKeyboardElement = el }), index.h("div", { class: "flex justify-center" }, index.h("button", { type: "submit", disabled: true, class: "mi-button mi-button--primary", ref: (el) => this.submitButtonElement = el }, this.submitButtonLabel))));
    }
    static get style() { return "a.mi-button{cursor:default}.mi-button{border-radius:4px;border-width:1px;border-style:solid;font-size:1rem;font-weight:500;padding-left:16px;padding-right:16px;padding-top:12px;padding-bottom:12px;display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center}.mi-button:disabled{opacity:0.72;cursor:not-allowed}.mi-button object{-webkit-filter:invert(9%) sepia(13%) saturate(692%) hue-rotate(185deg) brightness(98%) contrast(91%);filter:invert(9%) sepia(13%) saturate(692%) hue-rotate(185deg) brightness(98%) contrast(91%);width:16px;height:16px}.mi-button--small{padding-left:12px;padding-right:12px;padding-top:8px;padding-bottom:8px;font-size:0.875rem;height:32px}.mi-button--small object{width:16px;height:16px}.mi-button--large{padding-left:16px;padding-right:16px;font-size:1.25rem}.mi-button--large object{width:20px;height:20px}.mi-button--icon-left{padding-left:12px}.mi-button--icon-left object{margin-right:8px}.mi-button--icon-right{padding-right:12px}.mi-button--icon-right object{margin-left:8px}.mi-button--icon-both{padding-top:12px;padding-bottom:12px}.mi-button--icon-both object:first-of-type{margin-right:8px}.mi-button--icon-both object:last-of-type{margin-left:8px}.mi-button--base,.mi-button--danger{background:-webkit-gradient(linear, left top, left bottom, from(#f5f7fa), to(#ebeff5));background:linear-gradient(#f5f7fa, #ebeff5);color:#1e2025;border-color:#c8d0e0}.mi-button--base:not(:disabled):hover,.mi-button--danger:not(:disabled):hover{background:-webkit-gradient(linear, left top, left bottom, from(#ebeff5), to(#dee3ed));background:linear-gradient(#ebeff5, #dee3ed);border-color:#aeb9cb}.mi-button--base:not(:disabled):active,.mi-button--danger:not(:disabled):active{background:-webkit-gradient(linear, left top, left bottom, from(#dee3ed), to(#ebeff5));background:linear-gradient(#dee3ed, #ebeff5)}.mi-button--primary{color:#ffffff;border-color:#20693e;background:-webkit-gradient(linear, left top, left bottom, from(#3ba064), to(#2a844e));background:linear-gradient(#3ba064, #2a844e)}.mi-button--primary object{-webkit-filter:invert(100%) sepia(93%) saturate(0%) hue-rotate(201deg) brightness(106%) contrast(106%);filter:invert(100%) sepia(93%) saturate(0%) hue-rotate(201deg) brightness(106%) contrast(106%)}.mi-button--primary:not(:disabled):hover{background:-webkit-gradient(linear, left top, left bottom, from(#2a844e), to(#20693e));background:linear-gradient(#2a844e, #20693e)}.mi-button--primary:not(:disabled):active{background:-webkit-gradient(linear, left top, left bottom, from(#20693e), to(#2a844e));background:linear-gradient(#20693e, #2a844e)}.mi-button--danger{color:#de1b1b}.mi-button--danger object{-webkit-filter:invert(29%) sepia(76%) saturate(4633%) hue-rotate(347deg) brightness(85%) contrast(108%);filter:invert(29%) sepia(76%) saturate(4633%) hue-rotate(347deg) brightness(85%) contrast(108%)}.mi-button--outline{color:#3071d9;border-color:#3071d9;background-color:transparent}.mi-button--outline object{-webkit-filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%);filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%)}.mi-button--outline:not(:disabled):hover{color:#1d5bbf;border-color:#1d5bbf;background-color:#eef4fc}.mi-button--outline:not(:disabled):active{color:#1d5bbf;border-color:#1d5bbf;background-color:#cfe0fc}.mi-button--link{color:#3071d9;border-style:none;background-color:transparent;cursor:pointer}.mi-button--link object{-webkit-filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%);filter:invert(38%) sepia(97%) saturate(742%) hue-rotate(188deg) brightness(86%) contrast(97%)}.mi-button--link:not(:disabled):hover{color:#1d5bbf;border-color:#1d5bbf;background-color:#eef4fc}.mi-button--link:disabled:hover{cursor:not-allowed}.mi-button--link:not(:disabled):active{color:#1d5bbf;border-color:#1d5bbf;background-color:#cfe0fc}.width-none{width:0}.width-xxx-small{width:2px}.width-xx-small{width:4px}.width-x-small{width:8px}.width-small{width:12px}.width-medium{width:16px}.width-large{width:24px}.width-x-large{width:32px}.width-xx-large{width:40px}.width-xxx-large{width:48px}.width-xxxx-large{width:64px}.min-width-none{min-width:0}.min-width-xxx-small{min-width:2px}.min-width-xx-small{min-width:4px}.min-width-x-small{min-width:8px}.min-width-small{min-width:12px}.min-width-medium{min-width:16px}.min-width-large{min-width:24px}.min-width-x-large{min-width:32px}.min-width-xx-large{min-width:40px}.min-width-xxx-large{min-width:48px}.min-width-xxxx-large{min-width:64px}.max-width-none{max-width:0}.max-width-xxx-small{max-width:2px}.max-width-xx-small{max-width:4px}.max-width-x-small{max-width:8px}.max-width-small{max-width:12px}.max-width-medium{max-width:16px}.max-width-large{max-width:24px}.max-width-x-large{max-width:32px}.max-width-xx-large{max-width:40px}.max-width-xxx-large{max-width:48px}.max-width-xxxx-large{max-width:64px}.height-none{height:0}.height-xxx-small{height:2px}.height-xx-small{height:4px}.height-x-small{height:8px}.height-small{height:12px}.height-medium{height:16px}.height-large{height:24px}.height-x-large{height:32px}.height-xx-large{height:40px}.height-xxx-large{height:48px}.height-xxxx-large{height:64px}.min-height-none{min-height:0}.min-height-xxx-small{min-height:2px}.min-height-xx-small{min-height:4px}.min-height-x-small{min-height:8px}.min-height-small{min-height:12px}.min-height-medium{min-height:16px}.min-height-large{min-height:24px}.min-height-x-large{min-height:32px}.min-height-xx-large{min-height:40px}.min-height-xxx-large{min-height:48px}.min-height-xxxx-large{min-height:64px}.max-height-none{max-height:0}.max-height-xxx-small{max-height:2px}.max-height-xx-small{max-height:4px}.max-height-x-small{max-height:8px}.max-height-small{max-height:12px}.max-height-medium{max-height:16px}.max-height-large{max-height:24px}.max-height-x-large{max-height:32px}.max-height-xx-large{max-height:40px}.max-height-xxx-large{max-height:48px}.max-height-xxxx-large{max-height:64px}.debug *{outline:1px solid gold}.flex{display:-ms-flexbox;display:flex;-ms-flex:1;flex:1}.inline-flex{display:-ms-inline-flexbox;display:inline-flex}.items-center{-ms-flex-align:center;align-items:center}.justify-end{-ms-flex-pack:end;justify-content:flex-end}.justify-center{-ms-flex-pack:center;justify-content:center}.display-block{display:block}.display-inline-block{display:inline-block}.display-inline{display:inline}.display-none{display:none}.text-decoration-none{text-decoration:none}.text-right{text-align:right}.text-left{text-align:left}.text-center{text-align:center}.margin-auto{margin-left:auto;margin-right:auto}form .inputs{margin:0 auto;width:80%;padding-top:32px;padding-bottom:32px;position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center}form .inputs span.plus-sign{position:absolute;left:16px;display:block;font-size:1rem;color:#1e2025;top:50%;-webkit-transform:translateY(-50%);transform:translateY(-50%)}form .inputs input{padding-left:12px;padding-right:12px;background-color:#ffffff;border-style:solid;border-width:1px;border-radius:8px;height:48px;font-size:1.25rem;color:#1e2025;-webkit-box-sizing:border-box;box-sizing:border-box}form .inputs input:focus{border-color:#3071d9;-webkit-box-shadow:0 0 0 2px #cfe0fc;box-shadow:0 0 0 2px #cfe0fc}form .inputs input.country-code{width:15%;min-width:88px;margin-right:16px;padding-left:32px}form .inputs input.phone-number{width:85%}form button{margin-top:32px;margin-bottom:24px}"; }
};

const Spinner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * The inverse attribute will inverse the color of the spinner.
         *
         * @type {boolean}
         * @memberof Spinner
         */
        this.inverse = false;
    }
    render() {
        return (index.h(index.Host, null, index.h("div", { class: `spinner ${this.inverse ? 'inverse' : ''}` }, index.h("div", { class: "bounce1" }), index.h("div", { class: "bounce2" }), index.h("div", { class: "bounce3" }))));
    }
    static get style() { return ".spinner{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.spinner>div{width:16px;height:16px;background-color:#8d98aa;margin:4px;border-radius:100%;display:inline-block;-webkit-animation:bouncedelay 1.4s infinite ease-in-out both;animation:bouncedelay 1.4s infinite ease-in-out both}.spinner.inverse>div{background-color:#ffffff}.spinner .bounce1{-webkit-animation-delay:-0.32s;animation-delay:-0.32s}.spinner .bounce2{-webkit-animation-delay:-0.16s;animation-delay:-0.16s}\@-webkit-keyframes bouncedelay{0%,80%,100%{-webkit-transform:scale(0)}40%{-webkit-transform:scale(1)}}\@keyframes bouncedelay{0%,80%,100%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}"; }
};

const StepSwitcher = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        /**
         * Steps to display dots for.
         *
         * @type {any[]}
         */
        this.steps = [];
        /**
         * Step index to show. Defaults to first step.
         *
         * @type {number}
         */
        this.stepIndex = 0;
        this.stepIndexChanged = index.createEvent(this, "stepIndexChanged", 7);
    }
    /**
     * Set step index and emit stepIndexChanged event.
     *
     * @param {number} index
     */
    setStepIndex(index) {
        this.stepIndex = index;
        this.stepIndexChanged.emit(this.stepIndex);
    }
    render() {
        return (index.h(index.Host, null, index.h("button", { type: "button", disabled: this.steps.length === 0 || this.stepIndex === 0, onClick: () => this.setStepIndex(this.stepIndex - 1) }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24px", height: "24px" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" }))), index.h("div", { class: "steps" }, this.heading ? index.h("p", null, this.heading) : null, index.h("div", { class: "steps__dots" }, this.steps.map((item, index$1) => {
            const isActive = this.stepIndex === index$1 ? true : false;
            return index.h("span", { class: { 'active': isActive } });
        }))), index.h("button", { type: "button", disabled: this.steps.length === 0 || this.stepIndex === this.steps.length - 1, onClick: () => this.setStepIndex(this.stepIndex + 1) }, index.h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", width: "24px", height: "24px" }, index.h("path", { d: "M0 0h24v24H0V0z", fill: "none" }), index.h("path", { d: "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" })))));
    }
    static get style() { return ":host{display:-ms-flexbox;display:flex}button{padding:16px;background-color:transparent;border:none}button:disabled svg{fill:#c8d0e0}button svg{fill:#444b55}div.steps{padding-top:12px;padding-bottom:12px;padding-left:4px;padding-right:4px;display:-ms-flexbox;display:flex;-ms-flex-positive:1;flex-grow:1;-ms-flex-direction:column;flex-direction:column;vertical-align:center;-ms-flex-pack:center;justify-content:center}div.steps p{margin:0;padding-bottom:8px;color:#1e2025;font-size:1rem;font-weight:500;line-height:1.25rem;text-align:center}div.steps__dots{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center}div.steps__dots span{width:8px;height:8px;margin-right:8px;float:left;background-color:#c8d0e0;border-radius:50%}div.steps__dots span.active{background-color:#444b55}div.steps__dots span:last-child{margin-right:0px}"; }
};

const Tab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    render() { return; }
};

const TabPanel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.isActive = false;
    }
    async active(active) {
        if (active !== undefined) {
            this.isActive = !!active;
        }
        return this.isActive;
    }
    render() {
        const classList = {
            'active': this.isActive
        };
        return (index.h("div", { class: classList }, index.h("slot", null)));
    }
    static get style() { return "div{display:none}div.active{font-family:Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:1;flex-grow:1;display:block}"; }
};

const Tabs = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.active = 0;
    }
    connectedCallback() {
        const tabs = this.el.querySelectorAll('mi-tab');
        this.tabs = Array.from(tabs).reduce((tabs, tab, index) => {
            const content = Array.from(this.el.getElementsByTagName('mi-tab-panel')).find(el => el.id === tab.tabFor);
            if (content) {
                tabs.push({ label: tab.label, content: content });
            }
            return tabs;
        }, []);
    }
    componentDidLoad() {
        this.selectTab(this.active);
    }
    async selectTab(index) {
        const isTabActive = await this.tabs[index].content.active();
        if (!isTabActive) {
            this.active = index;
            this.tabs.forEach((tab, tabIndex) => tab.content.active(tabIndex === index));
        }
    }
    render() {
        return (index.h(index.Host, null, index.h("nav", null, index.h("ul", null, this.tabs.map((tab, index$1) => {
            return index.h("li", { class: this.active === index$1 ? 'active' : '', onClick: () => { this.selectTab(index$1); } }, tab.label);
        }))), index.h("section", null, index.h("slot", null))));
    }
    get el() { return index.getElement(this); }
    static get style() { return ":host{font-family:Inter, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\";-ms-flex-negative:0;flex-shrink:0;-ms-flex-positive:1;flex-grow:1}:host nav{border:none;border-bottom:solid;border-color:#c8d0e0;border-width:1px;padding-left:24px}:host nav ul{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;padding:0;margin:0;margin-bottom:-1px}:host nav ul li{list-style:none;text-align:center;cursor:pointer;padding:16px;border-width:1px;border-style:solid;border-color:rgba(0, 0, 0, 0)}:host nav ul li.active{background-color:#f5f7fa;border-color:#c8d0e0;border-width:1px;border-style:solid;border-bottom:none;font-weight:600;border-top-left-radius:4px;border-top-right-radius:4px}:host section{display:block;padding:16px;background-color:#f5f7fa}"; }
};

exports.mi_card = Card;
exports.mi_column = Column;
exports.mi_data_table = DataTable;
exports.mi_keyboard = Keyboard;
exports.mi_list = List;
exports.mi_list_item_category = ListItemCategory;
exports.mi_list_item_location = ListItemLocation;
exports.mi_location_info = LocationInfo;
exports.mi_map = Map;
exports.mi_metric_card = MetricCard;
exports.mi_notification = Notification;
exports.mi_scroll_buttons = ScrollButtons;
exports.mi_search = Search;
exports.mi_share_sms = ShareSms;
exports.mi_spinner = Spinner;
exports.mi_step_switcher = StepSwitcher;
exports.mi_tab = Tab;
exports.mi_tab_panel = TabPanel;
exports.mi_tabs = Tabs;
