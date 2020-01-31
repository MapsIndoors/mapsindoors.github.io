---
title: Changelog
published: true
date: 2019-09-30
---

Changelog for the MapsIndoors Android SDK. This document structure is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and the project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

<!--
### Added        for new features.
### Changed      for changes in existing functionality.
### Deprecated   for soon-to-be removed features.
### Removed      for now removed features.
### Fixed        for any bug fixes.
### Security     in case of vulnerabilities.
-->

## [2.0.7] - 2018-09-05

### Added

- `MapControl.setDisplayRuleDefaultIconSize()`: Overwrites the display rules default icon size. Applies only to those display rules that don't specify the size.
- `LocationDisplayRule.Builder.setVectorDrawableIcon(  vectorDrawableResId  )`: Sets the icon using a `VectorDrawable` at the default size (either the current base - 20dp or the one set with `MapControl.setDisplayRuleDefaultIconSize()`)
- Exposed `PositionIndicator.USER_POSITION_DISPLAY_RULE_NAME`

## [2.0.6] - 2018-08-31

### Added

- `LocationDisplayRule.Builder.setLabel()`.
- `MapControl.refreshMap()`: Triggers a refresh on the visible part of the map (POIs, etc.).

### Changed

- Moved all classes under the `com.mapsindoors.mapssdk.models` package up to `com.mapsindoors.mapssdk`.
- `DisplayRule` fields are now public for internal reasons. To read their values, please use the provided getters.
- Made `LocationDisplayRule.setZoomLevelOn()` and `LocationDisplayRule.setZoomLevelOff()` package private.

- Proguard rules:

```java
-keep interface com.mapsindoors.mapssdk.** { *; }
-keepclassmembers class * implements com.mapsindoors.mapssdk.MIModelBase { \<fields>; }
```

### Deprecated

- `LocationDisplayRule.Builder.setPoiTypeDisplayRuleLabel()`: Use `LocationDisplayRule.Builder.setLabel()` instead.

### Removed

- `BitmapLoader` which was already replaced by `MIImageProvider`

## [2.0.5] - 2018-08-27

### Added

- `Mapcontrol.setGoogleMap( GoogleMap, View )`: Sets the GoogleMap object and its parent view. Use it along the basic constructor (`MapControl( Context )`)

### Changed

- Annotated `MapControl.selectFloor()` as to be run on the UIThread
- The user's location marker (aka blue dot) will fade 50% when the current floor the user is at is different than the one highlighted in the floor selector

### Deprecated

- `LocationQuery.getFloor()`, `LocationQuery.setFloor()`, `LocationQuery.Builder.setFloor()`: Use the floor index getters/setters instead
- `Mapcontrol.MapControl( Context, SupportMapFragment, GoogleMap )`: Use `MapControl( Context )` together with `MapControl.setGoogleMap( GoogleMap, View )`
- `Mapcontrol.setGoogleMap( GoogleMap, SupportMapFragment )`, `Mapcontrol.setGoogleMap( GoogleMap, MapView )`: Use `MapControl.setGoogleMap( GoogleMap, View )` instead

## [2.0.4] - 2018-07-26

### Added

- `MapsIndoors.getMessages()`: Gets all the localized messages (beacon related) for the current solution
- `MapsIndoors.synchronizeMessages()`: Will pull message data from MapsIndoors backend servers
- `Venue.getGeometry()`: added missing getter

### Changed

- `MapControl.selectFloor()`: added validation of the given parameter (floor Z index). It will now throw `IllegalArgumentException` (if `dbglog.useDebug( true )`) if an invalid floor Z index was used.

### Fixed

- `MapControl.displaySearchResults()` did show all POIs on the current floor shown regardless their own
- MapsPeople watermark not keeping the same padding on both portrait and landscape modes

## [2.0.3] - 2018-07-11

### Added

- `MapsIndoors.getAvailableLanguages()` returns a list of the solution's available languages or just `null` if data isn't available
- `MIConnectivityUtils.isOnline()` replaces `UrlLoader.isOnline()`
- `MapControl.setOnMarkerInfoWindowLongClickListener()`
- `LocationDisplayRule.Builder.setBitmapDrawableIcon( bitmapDrawableResId )`
- `LocationDisplayRule.Builder.setBitmapDrawableIcon( bitmapDrawableResId, with, height )`
- `LocationDisplayRule.Builder.setVectorDrawableIcon( bitmapDrawableResId, with, height )`
- `LocationDisplayRule.Builder.setIconSize( size )`
- `MapControl.setUserLocationIconFromDisplayRule( locationDisplayRule )`

### Changed

- `MapsIndoors.getDefaultLanguage()` will return now the solution's default language instead of the library's fallback one. If there is no data available yet, this method will now return `null`
- `LocationDisplayRule.Builder.setIconURL( iconURL )` is now an "internal" method and should not be used. Please use any of the other ways to set display rule icon

### Deprecated

- `UrlLoader.isOnline()`. Use `MIConnectivityUtils.isOnline()` instead
- `LocationDisplayRule.Builder.setIcon( bitmapDrawableResId )`. Use `LocationDisplayRule.Builder.setBitmapDrawableIcon( bitmapDrawableResId )` or `LocationDisplayRule.Builder.setBitmapDrawableIcon( bitmapDrawableResId, with, height )` instead
- `LocationDisplayRule.Builder.setIcon( vectorDrawableResId, with, height )`. Use `LocationDisplayRule.Builder.setVectorDrawableIcon( vectorDrawableResId, with, height )` instead
- `LocationDisplayRule.Builder.setPOISize( size )`. Use `LocationDisplayRule.Builder.setIconSize( size )` instead
- `MapControl.setUserLocationIcon( bitmapDrawableResId )` and `MapControl.setUserLocationIcon( vectorDrawableResId, color, width, height )`. Use `MapControl.setUserLocationIconFromDisplayRule( locationDisplayRule )` instead

### Fixed

- Custom display rules set on locations now working

## [2.0.2] - 2018-06-20

### Changed

- `Point.equals()` will return true if the distance between them is less than 1m. It also takes into account its Z value (altitude)
- Graph data is be now available by default. This will enable offline routing when indoors

### Fixed

- Fixed a crash in `MapsIndoors.setLocationsProvider` when trying to set a custom locations provider

## [2.0.1] - 2018-06-11

### Fixed

- The blue dot (current user location) didn't move after the first time it was set.

## [2.0.0] - 2018-06-07

## [2.0.0-rc9] - 2018-06-07

### Deprecated

- `MPRoutingProvider.setGoogleServerKey()`: Set the Google API Key with `MapsIndoors.setGoogleAPIKey()` and retrieve it via `MapsIndoors.getGoogleAPIKey()`

## [2.0.0-rc8] - 2018-06-04

### Fixed

- `MPLocationsAsyncLoader`: Internal cache not properly updated on multi-solution projects

## [2.0.0-rc7] - 2018-06-04

### Added

- `LocationQuery.Builder.setDataSync()`: Sets the location provider in "data sync mode"

## [2.0.0-rc6] - 2018-05-30

### Added

- `MapsIndoors.enableOfflineTilesUpdates()`: Only used in projects with offline data enabled and set to get indoor tiles embedded in the app
- `MapControl.setDisplayRuleLabelDefaultMaxCharLength()`: This caps all display rule label string lenghts at the given value at render time

### Deprecated

- Use the new `MPDirectionsRenderer( Context context, GoogleMap map, MapControl mapControl, OnLegSelectedListener legSelectedListener )` which takes an instance of MapControl

### Fixed

- Routing: "Next" labels on the map not clickable

## [2.0.0-rc5] - 2018-05-28

### Changed

- Changed MapsPeople's logo (watermark) to the right (right side in LTR, left on RTL languages)

## [2.0.0-rc4] - 2018-05-23

### Fixed

- Fixed issue in `MapsIndoors.MIImageProvider`

### Deprecated

- In the `dbglog` class deprecated `SetLoglevel()`, `startTimer()` and `startTimer()`
- Use the Kotlin friendly `MPDirectionsRenderer( Context context, GoogleMap map, OnLegSelectedListener legSelectedListener )` constructor instead of `MPDirectionsRenderer( Context context, OnLegSelectedListener legSelectedListener, GoogleMap map )`

## [2.0.0-rc3] - 2018-05-17

### Added

- Implemented `MapsIndoors.getLocationById()`

- Added `MapsIndoors.isOnline()`
- Added `MapsIndoors.allowToDownloadData()` and `MapsIndoors.isAllowedToDownloadData()`

### Changed

- Non-sync backend location queries will now return a list of local data references

## [2.0.0-rc2] - 2018-05-15

### Fixed

- Fixed crash in `MapControl` when a devices's orientation changed (portrait <-> landscape)

### Added

- Added two new methods to the `Floor` model (`getOutline()` and `getOutlineAsLatLngList()`)

## [2.0.0-rc1] - 2018-05-14

### Added

- Floorplan tile sizes can be now set with `MapControl.setTileSize( tileSize )`. Tile sizes depend on the Solution (it is not mandatory for all MapsIndoors solutions to support all tile sizes)

### Changed

- Changed `MPRoutingProvider` method signature from `setDateTime( Calendar date, boolean isDeparture )` to `setDateTime( int date, boolean isDeparture )`.

### Deprecated

- All `MapControl.setMapPosition`. These were just wrapper methods around `GoogleMap.animateCamera` and `MapControl.moveCamera`
