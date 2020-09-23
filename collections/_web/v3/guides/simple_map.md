---
title: How to create a simple map with MapsIndoors
parent: guides
layout: tutorial
nav_weight: 1000
published: true
date: 2019-09-30
---

## Simple Map

<script async src="//jsfiddle.net/mapspeople/asr3mnzb/embed/html,result/"></script>

## Loading the Maps JavaScript API

The Google Maps API are loaded using a script tag like so:

```html
<script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=YOUR_GOOGLE_API_KEY"></script>
```

The `libraries` parameter is for loading additional libraries for Google Maps. The MapsIndoors SDK has a dependency on the geometry library.
The `key` parameter contains your application's Google Maps API key. Look [here](https://developers-dot-devsite-v2-prod.appspot.com/maps/documentation/javascript/get-api-key) For more information about how to obtain a key.

## Loading the MapsIndoors SDK

The MapsIndoors SDK are loaded afther the Google Maps API using a script tag like so:

```html
<script src="https://app.mapsindoors.com/mapsindoors/js/sdk/mapsindoors-3.4.1.js.gz?apiKey=YOUR_MAPSINDOORS_API_KEY"></script>
```

The `apiKey` parameter contains your application's MapsIndoors API key.

## Setting up the map

```javascript
const googleMap = new google.maps.Map(document.getElementById('map'), {
    center: {
        lat: 38.8976067,
        lng: -77.0365872
    },
    zoom: 19,
    maxZoom: 21
});
```

First we need a DOM element for the map. `document.getElementById('googleMap')`
Next we will configure the map by setting the center and a zoom level. The `maxZoom` parameter is set to disable the map from zooming further in that level 21.

## Adding MapsIndoors

```javascript
const mapsIndoors = new mapsindoors.MapsIndoors({
    map: googleMap,
});
```

Now we create a new instance of the MapsIndoors class and assign the Google Map to the `map` parameter.

## Adding a floor selector

```javascript
const floorSelector = document.createElement('div');
new mapsindoors.FloorSelector(floorSelector, mapsIndoors);
googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);
```

A FloorSelector is created by calling the `new mapsindoors.FloorSelector(floorSelector, mapsIndoors);` passing in a DOM element and an instance of MapsIndoors.
This `googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);` adds the floor selector to the maps upper right corner as a map control.
