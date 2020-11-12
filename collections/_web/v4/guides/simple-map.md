---
title: Create a simple map with MapsIndoors
guide_title: guides
nav_weight: 200
published: true
date: 2020-11-05
---

## Overview

In this guide you will learn to load a Google map with a MapsIndoors map on top. The full code example is shown in the JSFiddle below, but will be run through bit by bit in this guide.

<script async src="https://jsfiddle.net/mapspeople/resg59jp/embed/html,result/"></script>

### Loading the MapsIndoors SDK

The MapsIndoors SDK is loaded by using a script tag like the one below:

```html
<script src="https://app.mapsindoors.com/mapsindoors/js/sdk/DevelopmentReleases/4.0.0-rc.1/mapsindoors-4.0.0-rc.1.js?apikey=YOUR_MAPSINDOORS_API_KEY"></script>
```

The `apikey` parameter contains your application's MapsIndoors API key.

For IE11 it's critical to load the MapsIndoors SDK before the Google Maps API due to conflicting polyfills.

### Loading the Google Maps JavaScript API

The Google Maps API is loaded by using a script tag like the one below:

```html
<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=YOUR_GOOGLE_API_KEY"></script>
```

The `libraries` parameter is for loading additional libraries for the Google Maps API. The MapsIndoors SDK is dependent on the Geometry Library from Google.

The `key` parameter contains your Google Maps API key. Look [here](https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/get-api-key) For more information about how to obtain a key.

### Setting up the MapView

```javascript
const mapView = new mapsindoors.mapView.GoogleMapsView({
    element: document.getElementById("map"),
    center: {
        lat: 38.8976067,
        lng: -77.0365872,
    },
    zoom: 19,
    maxZoom: 21,
});
```

- `element` is the DOM element on the page that will contain the map. `document.getElementById('map')`
- `center` is the geographical point on which the map is centered.
- `zoom` is the initial zoom level the map will be displayed at.
- The `maxZoom` parameter is set to disable the map from zooming further in that level 21, which is the current maximum.

### Initializing MapsIndoors

```javascript
const mapsIndoors = new mapsindoors.MapsIndoors({
    mapView: mapView,
});
```

A new instance of the MapsIndoors class is created and assigns the GoogleMapsView to the `mapView` parameter.

### Adding a Floor Selector

```javascript
const googleMap = mapView.getMap();
const floorSelector = document.createElement("div");
new mapsindoors.FloorSelector(floorSelector, mapsIndoors);
googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);
```

A reference to the Google Map is obtained by calling `getMap` on the `mapView`.

The `floorSelector` is created by calling the `new mapsindoors.FloorSelector(floor selector, mapsIndoors);` passing in a DOM element and an instance of MapsIndoors.

`googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);` adds the Floor Selector to upper right corner of the map as a map control.

---

## Guides

- [Upgrade Guide]({{ site.url }}/web/v4/upgrade-guide/)
- [Create a simple map with MapsIndoors]({{ site.url }}/web/v4/guides/simple-map/)
- [Introduction to DispayRules]({{ site.url }}/web/v4/guides/display-rules-intro/)
- [Event handling]({{ site.url }}/web/v4/guides/using-events/)
- [Search and filtering]({{ site.url }}/web/v4/guides/search-and-filtering/)
