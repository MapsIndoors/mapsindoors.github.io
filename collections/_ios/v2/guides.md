---
title: iOS v2 - Guides
permalink: /ios/v2/guides/
date: 2019-09-30
published: true
nav_weight: 2
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

## Searching for Locations and Displaying the Results on a Map

Use the `MPLocationsProvider` class to search for content in your MapsIndoors solution.

This example shows how to setup a query for the nearest single best matching location and display the result on the map:

```swift
let locations = MPLocationsProvider.init()
let queryObj = MPLocationQuery.init()

queryObj.query = "Toilet"
queryObj.near = MPPoint.init(lat: 57.057964, lon: 9.9504112)
queryObj.max = 1

locations.getLocationsUsing(queryObj) { (locationData, error) in
    if error == nil {
        let location = locationData?.list.first
        self.mapControl?.go(to: location)
    }
}
```

This example shows how to setup a query for a group of locations and display the result on the map:

```swift
let locations = MPLocationsProvider.init()
let queryObj = MPLocationQuery.init()

queryObj.categories = ["Toilet"]
queryObj.max = 50

locations.getLocationsUsing(queryObj) { (locationData, error) in
    if error == nil {
        self.mapControl?.searchResult = locationData!.list
        let firstLocation = locationData?.list.first
        self.mapControl?.currentFloor = firstLocation.floor
    }
}
```

Please note that you are not guaranteed that the visible floor contains any search results, so that is why we change floor in the above example.

## Getting Directions and Displaying a Route Result on a Map

Use the `MPDirectionsService` class to search for directions. You need to build a query using the `MPDirectionsQuery` class.

This example shows how to setup a query for a route and display the result on the map:

```swift
let directions = MPDirectionsService.init()
let renderer = MPDirectionsRenderer.init()
renderer.delegate = self

let origin = MPPoint.init(lat: 57.057917, lon: 9.950361, zValue:0)
let destination = MPPoint.init(lat: 57.058038, lon: 9.950509, zValue:0)

let directionsQuery = MPDirectionsQuery.init(originPoint: origin!, destination: destination!)

directions.routing(with: directionsQuery) { (route, error) in
    renderer.map = self.map
    renderer.route = route
    renderer.routeLegIndex = 0
    renderer.animate(5)
}
```

The route object is seperated into objects of `MPRouteLeg` and these legs are again seperated indo objects of `MPRouteStep`. A specific part of the route can be rendered by setting the `routeLegIndex` and/or `routeStepIndex` properties.

```swift
let renderer = MPDirectionsRenderer.init()
renderer.routeLegIndex = 0
renderer.routeStepIndex = 1
```

The length of the `legs` and `steps` arrays determines the possible values of `routeLegIndex` and `routeStepIndex` (`0 ..< length`).

### Subscribing to Floor Changes in the Rendering

Assigning a `MPDirectionsRenderer` delegate will make it possible to know which floor the currently rendered part of the route belongs to:

```swift
func floorDidChange(_ floor: NSNumber!) {
    mapControl?.currentFloor = floor
}
```

### Working with Directions Settings

Avoid certain **way types** on the route using the `avoidWayTypes` property.

```swift
let directionsQuery = MPDirectionsQuery.init(originPoint: origin!, destination: destination!)
directionsQuery.avoidWayTypes = ["stairs"]
```

Set a **departure date** or an **arrival date** on the route using the `departure` or `arrival` property. It will only make sense to set one of these properties at a time.

```swift
let directionsQuery = MPDirectionsQuery.init(originPoint: origin!, destination: destination!)
directionsQuery.departure = Date.init()
```

## Working with Events

The MapControl delegate can inform you when the various data from the MapsIndoors services are loaded through it's `MPMapControlDelegate` so you should set the delegate, in most of the cases with the current UIViewController:

```swift
myMapControl.delegate = self
```

Implement the `onMapDataReady` method :

```swift
class ViewController: UIViewController, MPMapControlDelegate
```

Then implementing the methods below :

```swift
func onMapDataReady(){

}
```

### Handling marker selections and other user events

Detecting the user tapping a marker or an infowindow is part of the Google Maps SDK for iOS. Assign `myGMSMapView.delegate` and implementing the methods: `mapView.didTapMarker(marker: GMSMarker)` and `mapView.didTapInfoWindowOfMarker(marker: GMSMarker)`

```swift
func mapView(_ mapView: GMSMapView, didTap marker: GMSMarker) -> Bool {
    let location = mapControl?.getLocation(marker)
    if location != nil {
        myTextLabel.text = location!.name
    }
    return false
}

func mapView(_ mapView: GMSMapView, didTapInfoWindowOf marker: GMSMarker) -> Bool {
    let location = mapControl?.getLocation(marker)
    if location != nil {
        myTextLabel.text = location!.name
    }
    return false
}
```

### Getting a marker from a location and vice versa

If a `MPLocation` has been displayed on a map, the marker can be retrieved using `location.marker`. On the opposite, get a `MPLocation` from a `GMSMarker` using `getLocation(marker: GMSMarker)` on `MPMapControl`:

```swift
myMapControl.getLocation(marker : GMSMarker!)
```

## Using Display Rules

In the [MapsIndoors CMS](https://cms.mapsindoors.com/types) you can set display settings for the different types of locations in your MapsIndoors content.

In some cases, you may also want to programmatically set display rules that defines when and how to show a location.

To add display rules, you need to know the types in your location dataset, so look these up in the CMS. The display rule name corresponds to the location type we want the rule to apply for.

```swift
// Adding a rule with name nil, will apply generally to all type of locations
myMapControl.add(MPLocationDisplayRule(name: nil, andIcon: UIImage(named : "info"), andZoomLevelOn: 17))

// Adding a rule with a name, will override a more general rule
myMapControl.add(MPLocationDisplayRule(name: "info", andIcon: UIImage(named : "info"), andZoomLevelOn: 17))
myMapControl.add(MPLocationDisplayRule(name: "parking", andIcon: UIImage(named : "parking"), andZoomLevelOn: 17))
myMapControl.add(MPLocationDisplayRule(name: "staircase", andIcon: UIImage(named : "staircase"), andZoomLevelOn: 18))
```

## Create Custom UI

You can create your own UI based on the MapsIndoors data models given from `MPDirectionsService` or `MPLocationsProvider`. E.g. build a list of instructions based on the `MPRouteLeg` and `MPRouteStep` models given from a `MPRoute` object. Or build a content page based on the properties on an `MPLocation` object. You can see an example of this in the `DetailsViewController` and `DirectionsController` classes in the app code that is [distributed along with the MapsIndoors SDK](https://github.com/MapsIndoors/MapsIndoorsIOS/tree/master/Example).
