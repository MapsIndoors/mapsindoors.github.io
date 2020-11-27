'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-4e7399fc.js');

const defineCustomElements = (win, options) => {
  if (typeof window !== 'undefined') {
    return index.patchEsm().then(() => {
      index.bootstrapLazy([["mi-card_19.cjs",[[1,"mi-metric-card",{"label":[1],"value":[1],"tip":[1],"spinner":[4],"error":[1],"showToolTip":[32]}],[1,"mi-list",{"scrollButtonsEnabled":[4,"scroll-buttons-enabled"],"scrollLength":[2,"scroll-length"]},[[0,"listItemDidRender","updateScrollButtonsState"]]],[1,"mi-list-item-location",{"location":[8],"unit":[1]}],[0,"mi-share-sms",{"venueId":[1,"venue"],"originLocationId":[1,"origin"],"destinationLocationId":[1,"destination"],"countryCode":[1,"country-code"],"phoneNumberInputPlaceholder":[1,"inputplaceholder"],"submitButtonLabel":[1,"submit-button-label"]}],[1,"mi-column",{"label":[1],"sortable":[4],"binding":[1]}],[1,"mi-data-table",{"columns":[16],"rows":[16],"maxRows":[2,"max-rows"]}],[1,"mi-list-item-category",{"category":[8],"orientation":[513]}],[1,"mi-map",{"miApiKey":[1,"mi-api-key"],"gmApiKey":[1,"gm-api-key"],"gmOptions":[8,"gm-options"],"floorSelector":[8,"floor-selector"],"positionControl":[8,"position-control"],"floor":[1537],"zoom":[1537],"disableExternalLinks":[4,"disable-external-links"],"polylineColor":[1,"polyline-color"],"polylineWeight":[2,"polyline-weight"],"polylineOpacity":[2,"polyline-opacity"],"getMapsIndoorsVersion":[64],"panTo":[64],"fitBounds":[64],"getBounds":[64],"setDisplayRule":[64],"setVenue":[64],"fitVenue":[64],"openInfoWindow":[64],"closeInfoWindow":[64],"filterLocations":[64],"clearLocationFilter":[64],"showRoute":[64],"setRoute":[64],"clearRoute":[64],"nextRouteLeg":[64],"previousRouteLeg":[64],"setRouteLegIndex":[64],"getRoute":[64]}],[1,"mi-notification",{"position":[1],"duration":[2],"push":[64],"clearAll":[64]}],[0,"mi-search",{"placeholder":[1],"idAttribute":[1,"id-attribute"],"dataAttributes":[16],"mapsindoors":[4],"google":[4],"miFields":[1,"mi-fields"],"miTake":[2,"mi-take"],"miSkip":[2,"mi-skip"],"miOrder":[1,"mi-order"],"miCategories":[1,"mi-categories"],"miNear":[1,"mi-near"],"gmCountryCode":[1,"gm-country-code"],"value":[1537],"clear":[64]}],[1,"mi-step-switcher",{"heading":[1],"steps":[16],"stepIndex":[514,"step-index"]}],[1,"mi-tab",{"label":[1],"tabFor":[1,"tab-for"]}],[1,"mi-tab-panel",{"isActive":[32],"active":[64]}],[1,"mi-tabs",{"active":[2]}],[0,"mi-keyboard",{"inputElement":[16],"layout":[1]}],[1,"mi-location-info",{"location":[8]}],[1,"mi-scroll-buttons",{"scrollContainerElementRef":[16],"scrollLength":[2,"scroll-length"],"updateScrollButtonsState":[64]}],[1,"mi-spinner",{"inverse":[4]}],[1,"mi-card"]]],["mi-dropdown.cjs",[[1,"mi-dropdown",{"open":[4],"items":[16],"label":[1],"filterable":[4],"multiple":[4],"selected":[16],"currentItems":[32]}]]],["mi-dropdown-item.cjs",[[0,"mi-dropdown-item",{"selected":[4],"value":[1],"text":[1]}]]]], options);
    });
  }
  return Promise.resolve();
};

exports.defineCustomElements = defineCustomElements;
