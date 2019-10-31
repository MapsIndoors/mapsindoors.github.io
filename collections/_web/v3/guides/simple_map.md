---
title: How to create a simple map with MapsIndoors
guide_title: guides
layout: guide
nav_weight: 100
published: false
date: 2019-09-30
permalink: /web/v3/guides/
---

## Simple Map

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
        #map {
            height: 100%;
        }
        
        html, body {
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
    </head>
    <body>
        <div id="map"></div>
        <script src="https://maps.googleapis.com/maps/api/js?libraries=geometry&key=YOUR_GOOGLE_API_KEY"></script>
        <script src="https://app.mapsindoors.com/mapsindoors/js/sdk/3.4.1/mapsindoors-3.4.1.js.gz?apiKey=YOUR_MAPSINDOORS_API_KEY"></script>
        <script>
            const googleMap = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 57.0588892, lng: 9.9479535 },
                zoom: 19,
                maxZoom: 21
            });

            const mapsIndoors = new mapsindoors.MapsIndoors({
                map: googleMap,
            });

            const floorSelector = document.createElement('div');
            new mapsindoors.FloorSelector(floorSelector, mapsIndoors);
            googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);
        </script>
    </body>
</html>
```




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
```JavaScript
const googleMap = new google.maps.Map(document.getElementById('googleMap'), {
    center: { lat: 57.0588892, lng: 9.9479535 },
    zoom: 19,
    maxZoom: 21
});
```
First we need a DOM element for the map. `document.getElementById('googleMap')`
Next we will configure the map by setting the center and a zoom level. The `maxZoom` parameter is set to disable the map from zooming further in that level 21.  

## Adding MapsIndoors
```JavaScript
const mapsIndoors = new mapsindoors.MapsIndoors({
    map: googleMap,
});
```
Now we create a new instance of the MapsIndoors class and assign the Google Map to the `map` parameter.

## Adding a floor selector
```JavaScript
const floorSelector = document.createElement('div');
new mapsindoors.FloorSelector(floorSelector, mapsIndoors);
googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);
```
First a DOM element is needed for the floor selector, next a new instance of the FloorSelector is created  by parssing the DOM element and an instnace of MapsIndoors.
Then it's added to the map.

[jsfiddle](https://jsfiddle.net/gs0y9417/)
