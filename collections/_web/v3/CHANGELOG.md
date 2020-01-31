---
title: Changelog
layout: default
published: true
nav_weight: 1000
---

Changelog for MapsIndoors SDK for JavaScript. This document structure is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and the project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [3.6.0] - 2020-01-02

### Changed

- `ShareService.directionsToPhone` now requires country code to be provided separately.

## [3.5.1] - 2019-12-19

### Changed

- Changed the locations service to utilize the new backend APIs' new URL structure.

### Fixed

- Fixed a bug where `VenuesService.getBuildings` calls for Solutions/Venues with no Buildings caused rejection.

## [3.5.0] - 2019-12-17

### Added

- Share service with function to send route directions via text message to phone.

### Fixed

- Fixed a bug where user roles were not passed along to distance matrix call.
- Fixed bug where `getBuilding` returned `undefined` until the map had been moved.

## [3.4.1] - 2019-10-30

### Added

- Client-side caching. Most requests are now cached in the browser.
- Added support for separate visibility control of Label and Icon

### Fixed

- The `DirectionsService` will now return a route object with the status `ZERO_RESULTS` if no route could be calculated. Previously it threw an error.
- Fixed a bug where the `imageURL` property on Locations sometimes would be named `imageurl`.

## [3.4.0] - 2019-08-28

### Changed

- Floor calculation when Building comes into focus according to agreed upon strategy, including respecting default Floor of a Building.
- The `filter` method now respects the `fitView` boolean also when clearing filter.

### Fixed

- Make sure selected/highlighted Floor is always visible (no need to scroll) when focusing Building.

## [3.3.2] - 2019-08-15

### Fixed

- App config cache is now based on solution to avoid misconfiguration when switching solution.

## [3.3.1] - 2019-07-31

### Fixed

- No longer assume that location `imageURL` always is received in lowercase from the backend.

## [3.3.0] - 2019-07-15

### Added

- `SolutionsService.getUserRoles()` gets a list of user roles that can be used for filtering the directions result. This prevents routes from going through restriced areas.

### Changed

- userRoles parameter added to DirectionsService.getRoute() for filtering the directions result. The userRoles paramter takes a array of user role ids.
- Directions to a venue can now make directions via a parking lot when driving or bicycling.

## [3.2.3] - 2019-06-27

### Fixed

- Fixed a bug in `mapsindoors.DirectionsRenderer`.
  When `setRoute(null)` was called to remove the route from map it would throw an error.
- Fixed the "Cannot read property 'toJSON()' of null" error caused by looking for buildings in view before the map has a bounding box.

## [3.2.2] - 2019-06-24

### Changed

- Fixed build toolchain to prevent IE11 crash.

## [3.2.1] - 2019-05-24

### Added

- Added the ability to change the API key at runtime via `mapsindoors.MapsIndoors.setApiKey(key);`
- Added the functions to get and set the language at runtime:
  - `mapsindoors.MapsIndoors.setLanguage(language);`
  - `mapsindoors.MapsIndoors.getLanguage();`

### Changed

- The SDK now selects the fastest backend server based on a latency test.
- A list of known backends is stored in localStorage for the SDK to choose from.
  The list of known backends are updated automatically as part of the latency test.

## [3.1.1] - 2019-03-14

### Fixed

- Fixed a crash caused by setting mapStyle via the MapsIndoors constructor.

## [3.1.0] - 2019-03-13

### Changed

- It's now posible to set a displayRule for a list of location ids or types. `myMapsIndoors.setDisplayRule(["abc", "cde", "fgh"], { visible: false });`

### Added

- Added the functions setMapStyle, getMapStyle and getMapStyles to MapsIndoors.
  - setMapStyle() set a new indoor map style.
  - getMapStyle() get the current style of the indoors map.
  - getMapStyles() get a list of availeble indoor map styles.

## [3.0.5] - 2019-02-27

### Fixed

- Optimized map performance by reducing the amount POIs

## [3.0.2] - 2019-02-19

### Fixed

- Support for IE 11

## [3.0.0] - 2018-10-23

### Changed

- Script must now be loaded with apikey parameter instead of solutionId, e.g. `https://app.mapsindoors.com/mapsindoors/js/sdk/mapsindoors-3.0.0-rc0.js?apikey=57e4e4992e74800ef8b69718`
- All services are now shared instances, so they cannot be newed. E.g. you must rewrite `let directionsService = new mapsindoors.DirectionsService();` to `let miDirectionsService =  mapsindoors.DirectionsService;`
- Location click events for a MapsIndoors instance are now subscribable with the event name `click` instead of `location_click`, e.g.         `google.maps.event.addListener(myMapsIndoors, 'click', (poi) => { console.log(poi.id); });`
- `DirectionService.route()` has been renamed to `DirectionService.getRoute()`.
- `DirectionRenderer.setDirections()` has been renamed to `DirectionRenderer.setRoute()`.
- `DirectionService.getRoute()` request parameter `travelMode` has been renamed to `mode`.
- `DirectionRenderer.setDirections()` now only accepts a single route instead of a route result, e.g. `DirectionRenderer.setRoute(myRouteResult.routes[0])`.
- To highlight locations on a map through a `MapsIndoors` instance, instead of providing a query object to `MapsIndoors.find()`, you must now pass a list of `locationId`'s to `MapsIndoors.filter()`.

### Removed

- Removed `MapsIndoors.find()`, use `MapsIndoors.filter()` instead
- Removed `MapsIndoors.locate()`, use `MapsIndoors.filter()` instead

### Added

- Icons for single Locations can now be updated independantly, by referencing the location id. E.g. `myMapsIndoors.setDisplayRule('some-location-id', { icon: { url: 'https://icon.url' } });`

### Fixed

- Fixed a rendering bug that was causing MapsIndoors' map markers to occasionally disappear
