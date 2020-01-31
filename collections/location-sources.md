---
title: Location Sources in MapsIndoors
published: true
date: 2019-09-30
permalink: /location-sources-in-mapsindoors/
---

Location Sources is a new feature introduced in version 3 of MapsIndoors SDK for Android and iOS. Basically we are making it possible to register your own custom location data source, adhering to a very simple interface.

## The Concepts

The central concepts in this feature are Location Sources and Location Observers, and they are best described in the following illustration:

![Location Data Sources, Observers and their relation](assets/source_observer.png)

### Location Source

Maintains an array of locations and notifies its Location Observers about location and status updates.

### Location Observer

Can observe a Location Source for status changes and location updates.

## Creating your own Location Source

See a [demo and tutorial of this feature for iOS](/ios/v3/locations/creating-own-location-sources). Of course there is more to it than just these interfaces, but assuming that working with the actual 3rd party data is an isolated problem, the setup steps is as follows:

1. Implement a `LocationSource` that pulls data from your own or a 3rd party database, API or backend and convert this data into MapsIndoors `Location`'s
2. Pass the Locations as updates to MapsIndoors through the interface methods of the subscribing `LocationObserver`'s in your `LocationSource` implementation.

This feature is present in the MapsIndoors SDK for iOS version 3.0.0-alpha. To install this version, just follow the [latest version 2.1.6 install guide](/ios/v2). Replace the pod version to `3.0.0-alpha18` and run `pod install`.

Create an implementation of the `MPLocationSource` interface, implementing all the required methods. When you call `MPLocationObserver.onLocationsUpdate()` and provide results in `MPLocationSource.getLocations()` you need to create instances of `MPLocation`'s. This is done using a builder called `MPLocationUpdate`. See an example here:

```swift
let locationUpdate = MPLocationUpdate.init(id: 134, from: self)                         //Set unique id
locationUpdate.setType("ViewPoints")                                                    //Set type
locationUpdate.addPropertyValue("Empire State Building", forKey: MPLocationFieldName)   //Set name
locationUpdate.setFloor(86)                                                             //Set floor index
locationUpdate.setPosition(CLLocationCoordinate2DMake(40.7484445, -73.9878584))         //Set position
let location = locationUpdate.location()                                                //Generate location
```

While the location ID needs to be unique within your own Location Source, the ID does not need to be unique across all Location Sources.

When you have implemented all methods of your Location Source, you must register the source using the static method `MapsIndoors.register()`. The following example adds the MapsIndoors default location source as well:

```swift
MapsIndoors.register([
            MPMapsIndoorsLocationSource.init(),
            MyLocationsDataSource.init()
        ])
```

## IOS Demo and Tutorial for Location Sources

A full demo example and tutorial is available [here](/ios/v3/locations/creating-own-location-sources).
