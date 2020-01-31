---
title: SDK Features
layout: tutorial
permalink: /sdk-features/
date: 2019-09-30
---

{% include toc.md %}

The MapsIndoors SDK is a collection of software libraries, guides and documentation that enables developers to create applications with the indoor wayfinding capabilities facilitated by MapsIndoors from MapsPeople. MapsIndoors SDK is available on iOS, Android and Web platforms.

## Platform Support and Requirements

### Android

- Supports all newer Android phones and tablets
- Minimum supported Android Platform is Android 4.4 KitKat (API level 19) (as of version 2.0 of MapsIndoors SDK)
- Rely on Java 8 features
- Available through a remote Maven repository, integrated with Gradle
- Depends on Google Maps Android API

### iOS

- Supports all newer Apple phones and tablets
- Minimum supported iOS Platform SDK version is 9 (as of version 2.0 of MapsIndoors SDK)
- Available as a remote framework library, through the CocoaPods package dependency manager
- Depends on Google Maps iOS SDK

### Web

- Supports all modern phones, tablets and desktop PCs

Supports the following desktop browsers:

- Current version of Microsoft Edge (Windows)
- Internet Explorer 11 (Windows)
- Current and previous version of Firefox (Windows, macOS, Linux)
- Current and previous version of Chrome (Windows, macOS, Linux)
- Current and previous version of Safari (macOS)

Supports the following mobile browsers:

- Current version of Chrome on Android 4.1+
- Chrome WebView on Android 4.4+
- Safari on the current and previous major version of iOS
- UIWebView and WKWebView on the current and previous major version of iOS
- Current version of Chrome for iOS
- Available as one or more remote script references
- Depends on Google Maps API for JavaScript v3

## Feature specifications

The MapsIndoors SDK feature set is grouped into the following scopes:

- Mapping
- Search
- Directions
- Assisting functionality

The following table lists the features of the MapsIndoors SDK, which scope the feature belongs to, and which of the Android, iOS and Web SDKs that support this feature:

|---
| #|Scope|Feature|Android|iOS|Web
|---
| 1|Mapping|Display a map of a venue|Yes|Yes|Yes
| 2|Mapping|Display a map of a building at a specific floor level|Yes|Yes|Yes
| 3|Mapping|Display a specific location on a map|Yes|Yes|Yes
| 4|Mapping|Display multiple specific locations on a map|Yes|Yes|Yes
| 5|Mapping|Display icons for every location on a map|Yes|Yes|Yes
| 6|Mapping|Display labels for every location on a map|Yes|Yes|Yes
| 7|Mapping|Control icon and label visibility based on map zoom levels|Yes|Yes|Yes
| 8|Mapping|Subscribe to events on the map{::nomarkdown}<ul><li>When map content loading finishes</li><li>When the visible floor level changes for a building on the map</li><li>When user clicks/taps on the map</li><li>When user clicks/taps on a marker</li><li>When user selects another floor level</li></ul>{:/}|Yes|Yes|Yes
| 9|Mapping|Create custom infowindows on a map|Yes|Yes|Yes
| 10|Mapping|Display a location on a map that represents the end users location|Yes|Yes|Yes
| 11|Mapping|Display a floor selector making it possible for the end user to choose which floor level to inspect|Yes|Yes|Yes
| 12|Mapping|Render a route on a map|Yes|Yes|Yes
| 13|Search|Get a full list of venue objects for a data set|Yes|Yes|Yes
| 14|Search|Get a full list of building objects for a data set|Yes|Yes|Yes
| 15|Search|Get a full list of location objects for a data set|Yes|Yes|Yes
| 16|Search|Define search and filtering criteria{::nomarkdown}<ul><li>Query text</li><li>Categories</li><li>Floor level</li><li>Geographical proximity to any given point</li><li>Ordering</li><ul><li>Relevance, meaning textual match and geographical proximity</li><li>Alphabetical</li><li>Distance</li></ul></ul>{:/}|Yes|Yes|Yes
| 17|Search|Get a ordered subset of location objects based on defined search and filtering criteria|Yes|Yes|Yes
| 18|Directions|Get a route from a origin location to a destination location|Yes|Yes|Yes
| 19|Directions|Define routing options{::nomarkdown}<ul><li>Specify travel mode defined as walking, cycling, car driving and using public transportation</li><li>Avoiding stairs</li><li>Setting departure time or arrival time{:/}|Yes|Yes|Yes
| 20|Assisting functionality|Error handling{::nomarkdown}<ul><li>When locations could not be retrieved</li><li>When buildings could not be retrieved</li><li></li><li>When venues could not be retrieved</li><li>When route could not be retrieved or calculated</li></ul>{:/}|Yes|Yes|Yes
| 21|Assisting functionality|Offline handling{::nomarkdown}<ul><li>Offline search</li><li>Offline directions</li><li>Offline mapping</li></ul><b>Note:</b> Google Maps may not display the surround world map in offline scenarios{:/}|Yes|Yes|<b>No</b>
{:.mw7 .center .collapse .stripe-light .pa2}

## Release Procedure

MapsIndoors SDK follows an internal release process. We generally publish releases as soon as there are new features, bug-fixes or performance improvements ready. Public releases are made available through the following platform specific channels:

|---
| Platform | Availability
|---
| Android | Available through a remote *Maven* repository, integrated with *Gradle*
| iOS | Available as a remote framework library, through the *CocoaPods* package dependency manager
| Web | Available as one or more remote script references
{:.mw7 .center .collapse .stripe-light .pa2}

## Pre-releases

MapsPeople may publicly distribute releases that are not intended for production use and publish information about this. In this case the release will be tagged with a pre-release tag like alpha, beta, rc1, alpha3 or like-wise.
