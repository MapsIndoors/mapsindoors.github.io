---
title: Web SDK v4 Upgrade Guide
permalink: /web/v4/upgrade-guide/
nav_weight: 20
published: true
date: 2019-09-30
---

This guide will help you upgrade the MapsIndoors JavaScript SDK from v3.x to v4.

With the introduction of MapsIndoors JavaScript SDK v4, there are some changes to the structure of the APIs:

- With the added support for Mapbox, we have introduced a new concept called a Map View. A Map View is an adapter layer between the SDK and the Map itself. When initializing the SDK, a reference to a Map View is passed instead of a reference to a Map.
- The *Directions service* now takes a reference to an external *Directions provider* when initialized. The external provider can either be a Google Maps or a Mapbox provider.
- All services have been moved to the `mapsindoors.services` namespace, for example, mapsindoors.service.LocationsService. See [mapsindoors.services](https://app.mapsindoors.com/mapsindoors/js/sdk/4.0.0/docs/mapsindoors.services.html).

## Initialization

How to initialize the SDK has changed. In version 3 of the SDK, MapsIndoors could be initialized directly with the Google Maps map object. In version 4 the map object is created for you by the `mapView`. You must create a `mapView` either as `GoogleMap` or `MapBox` and hand this `mapView` to MapsIndoors. You can retrieve the created instance of the map using `mapsIndoors.getMap();`.

### V3

```javascript
const element = document.getElementById("map");

const googleMap = new google.maps.Map(element, {
    center: { lat: 38.8976067, lng: -77.0365872 },
    zoom: 19,
    maxZoom: 21,
});

const mapsIndoors = new mapsindoors.MapsIndoors({
    map: googleMap,
});
```

### V4

#### Google Maps

```javascript
const element = document.getElementById("map");

const mapView = new mapsindoors.mapView.GoogleMapView({
    element: element,
    center: { lat: 38.8976067, lng: -77.0365872 },
    zoom: 19,
    maxZoom: 21,
});

const mapsIndoors = new mapsindoors.MapsIndoors({ mapView: mapView });
```

See [mapsindoors.mapView.GoogleMapView](https://app.mapsindoors.com/mapsindoors/js/sdk/4.0.0/docs/mapsindoors.mapView.GoogleMapView.html) and [mapsindoors.MapsIndoors](https://app.mapsindoors.com/mapsindoors/js/sdk/4.0.0/docs/mapsindoors.MapsIndoors.html)

#### Mapbox

```javascript
const element = document.getElementById("map");

const mapView = new mapsindoors.mapView.MapboxView({
    element: element,
    center: { lat: 38.8976067, lng: -77.0365872 },
    zoom: 19,
    maxZoom: 21,
});

const mapsIndoors = new mapsindoors.MapsIndoors({ mapView: mapView });
```

See [mapsindoors.mapView.MapboxView](https://app.mapsindoors.com/mapsindoors/js/sdk/4.0.0/docs/mapsindoors.mapView.MapboxView.html) and [mapsindoors.MapsIndoors](https://app.mapsindoors.com/mapsindoors/js/sdk/4.0.0/docs/mapsindoors.MapsIndoors.html)

## Events

SDK Version 4 supports multiple map providers and provides a generic interface for registering events. In version 3 the event listeners were set up directly on the map provider. The SDK will take care of setting the correct listeners in the map for which the SDK has been initialized. This makes sure that the App will have the same interface no matter what map provider is used. It will also make it easier to swich map provider at a later date.

### V3

```javascript
google.maps.event.addListener(mapsIndoors, 'event_name', function() {...});
```

### V4

```javascript
mapsIndoors.addListener('event_name', function() {...});
```

The following events can be set up for subscription:
See [MapsIndoors#events](https://app.mapsindoors.com/mapsindoors/js/sdk/4.0.0/docs/mapsindoors.MapsIndoors.html#event:building_changed)

## Zoom levels

In v4 of the SDK, we have introduced a MapsIndoors zoom level. The reason for this is Mapbox uses 512x512 as the base tile size, where Google Maps uses 256x256. Because of this difference, a Mapbox at zoom level 1 displays the same geographical areas as a Google Map at zoom level 2.

The MapsIndoors instance now has a `setZoom` function to set a new zoom level for the map and a `getZoom` to get the current zoom level. It also emits a `zoom_changed` event when the zoom level has changed. We recommend using the `getZoom`, `setZoom`, and the `zoom_changed` event on the MapsIndoors instance because we use those internally when evaluating display rules.

### V3

```javascript
google.maps.events.addListener(googleMap, 'zoom_changed', function() {...});

googleMap.setZoom(18);

googleMap.getZoom();
```

### V4

```javascript
mapsIndoors.addListener('zoom_changed', function() {...});

mapsIndoors.setZoom(18);

mapsIndoors.getZoom();
```

## Adding Floor Selector to the Map

Both SDK version 3 and 4 supports addding a Floor Selector to the map. When using Google Maps as map provider, the method of working with the Floor Selector is unchanged, except that the `GoogleMap` object is now created by the SDK, and is retrieved using the `getMap()` method. See initialization for more information.

For MapBox the specification of controls is a bit different than for Google. For Google, the control setup takes a `div` where MapBox takes an object containing functions returning the `div`.

### V3

```javascript
const floorSelector = document.createElement("div");
new mapsindoors.FloorSelector(floorSelector, mapsIndoors);
googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(floorSelector);
```

### V4

#### Google Maps

```javascript
const googleMap = mapsIndoors.getMap();
const floorSelectorDiv = document.createElement("div");
new mapsindoors.FloorSelector(floorSelectorDiv, mapsIndoors);
googleMap.controls[google.maps.ControlPosition.RIGHT_TOP].push(
    floorSelectorDiv
);
```

#### Mapbox

```javascript
const map = mapsIndoors.getMap();
const floorSelectorDiv = document.createElement("div");
new mapsindoors.FloorSelector(floorSelectorDiv, mapsIndoors);
map.addControl({
    onAdd: function () {
        return floorSelectorDiv;
    },
    onRemove: function () {},
});
```

## Directions

When working with Directions, two different elements are needed:

- A "Provider" to calculate routes
- A "Renderer" to display a given route on the map

In SDK version 3, the "Provider" was automatically given by Google Maps which has a Directions service built-in. In version 4 the mapping and the directions service has been separated, as it cannot be assumed that all mapping providers will have a built-in direction service.

This means that for version 4 a "`DirectionsProvider`" must be registered. Currently it is possible to create a `directionsService` either from Google Maps or MapBox, but in the future other Direction services could be supported.

The `directionsRenderer` is created in the same way in version 4 as it was done in version 3.

Calculating and displaying a route is still done using the `getRoute()` call, however, the response of this call has been changed for convenience. In version 4 the actual route is returned. In version 3 an array of the route (which always only contained 1 element) was returned, hence the "`response.routes[0]`" can be omitted and the returned route can be sent directly to the renderer for displaying.

### V3

```javascript
const directionsRenderer = new mapsindoors.DirectionsRenderer({
    mapsindoors: mapsIndoors,
});

mapsindoors.DirectionsService.getRoute({
    origin: origin,
    destination: destination,
    travelMode: "DRIVING",
}).then(function (response) {
    directionsRenderer.setRoute(response.routes[0]);
});
```

### V4

#### Google Maps

```javascript
const externalProvider = new mapsindoors.directions.GoogleMapsProvider();
const directionsService = new mapsindoors.services.DirectionsService(
    externalProvider
);
const directionsRenderer = new mapsindoors.directions.DirectionsRenderer({
    mapsIndoors: mapsIndoors,
});

directionsService
    .getRoute({
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
    })
    .then(function (route) {
        directionsRenderer.setRoute(route);
    });
```

#### Mapbox

```javascript
const externalProvider = new mapsindoors.directions.MapboxProvider();
const directionsService = new mapsindoors.services.DirectionsService(
    externalProvider
);
const directionsRenderer = new mapsindoors.directions.DirectionsRenderer({
    mapsIndoors: mapsIndoors,
});

directionsService
    .getRoute({
        origin: origin,
        destination: destination,
        travelMode: "DRIVING",
    })
    .then(function (route) {
        directionsRenderer.setRoute(route);
    });
```

We hope you will enjoy the verion 4 of the MapsPeople Javascript SDK and appriciate the enhancements.

---

## Guides

- [Upgrade Guide]({{ site.url }}/web/v4/upgrade-guide/)
- [Create a simple map with MapsIndoors]({{ site.url }}/web/v4/guides/simple-map/)
- [Introduction to DispayRules]({{ site.url }}/web/v4/guides/display-rules-intro/)
- [Event handling]({{ site.url }}/web/v4/guides/using-events/)
- [Search and filtering]({{ site.url }}/web/v4/guides/search-and-filtering/)
