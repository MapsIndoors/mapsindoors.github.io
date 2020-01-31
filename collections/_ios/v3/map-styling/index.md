---
layout: guide
title: Map Styling
guide_title: map-styling
nav_weight: 330
published: true
date: 2019-12-05
permalink: /ios/v3/map-styling/
---

{% include toc.md %}

There are 2 ways to change the appearance of the map content in MapsIndoors and Google Maps.

* Using Display Rules
* Using Google Maps styling

Each have its own purpose which will be explained below.

## Style the Map using Display Rules

In the [MapsIndoors CMS](https://cms.mapsindoors.com/types) you can set display settings for the different types of locations in your MapsIndoors content. The changes you make in the CMS will take effect whenever you app reboots or when you call `MapsIndoors.synchroniseContent()` within the app session.

In some cases, you may also want to programmatically set display settings that defines when and how to show a location. Display settings are defined in a Display Rule object.

```swift
let myDisplayRule = MPLocationDisplayRule(name: "info", andIcon: UIImage(named : "info"), andZoomLevelOn: 17)
```

You can set display settings programatically in 3 ways:

* Set a Display Rule for a type of Location
* Set a Display Rule for a single specific Location
* Set a Display Rule for a multiple specific Location

### Setting Display Rule for a Type

To set new display rules for a type of Location, you need to know the types of Locations in your Location dataset, so you may look these up in the CMS. The types can also be retrieved in code with `MPSolutionsProvider().getSolution()`. The type objects can be read from `mySolution.types`. The display rule name corresponds to the Location Type we want the rule to apply for. So in order to style a specific type of Locations differently, just put in the type name as the Display Rule name.

```swift
myMapControl.setDisplayRule(MPLocationDisplayRule(name: "info", andIcon: UIImage(named : "info"), andZoomLevelOn: 17))
myMapControl.setDisplayRule(MPLocationDisplayRule(name: "parking", andIcon: UIImage(named : "parking"), andZoomLevelOn: 17))
myMapControl.setDisplayRule(MPLocationDisplayRule(name: "staircase", andIcon: UIImage(named : "staircase"), andZoomLevelOn: 18))
```

Setting a display rule for a type will persist the new display rule for that type throughout the whole app session and across instances of `MPMapControl`.

### Setting Display Rule for a Single and Multiple Locations

To set new display rules for a Location, you need to have the Location at hand. Locations can be queried for using the  `MPLocationService`.

```swift
MPLocationService.sharedInstance().getLocationsUsing(myQuery, filter: myFilter) { (locations, error) in
    let myLocation = locations?.first()
}
```

Once you have a location, you can set a custom display rule for it.

```swift
let myDisplayRule = MPLocationDisplayRule.init(name: nil, andIcon: myImage, andZoomLevelOn: 15)!
myMapControl.setDisplayRule(myDisplayRule, for: myLocation)
```

And for multiple locations, this is as simple as providing an array instead:

```swift
let myDisplayRule = MPLocationDisplayRule.init(name: nil, andIcon: myImage, andZoomLevelOn: 15)!
myMapControl.setDisplayRule(myDisplayRule, for: myLocations)
```

Setting a display rule for specific locations will *not* persist the new display rule for that type throughout the whole app session and across instances of `MPMapControl`. In other words, as soon as your instance of `MPMapControl` is deallocated, the overridden display rules for specific locations will reset to its original display rule.

## Style the Map using Google Maps Styling

MapsIndoors is built on top of Google Maps which has its own way of styling the map. Google Maps styling will only affect the MapsIndoors map if Google Maps has Points of Interest placed inside or near the buildings that you build a MapsIndoors solution for. By default, MapsIndoors applies a Google Maps styling that hides most POI icons that may collide with MapsIndoors content.

You can apply your own styling to Google Maps using `mapStyle` on `GMSMapView`.

```swift
myMapView.mapStyle = GMSMapStyle.init(jsonString: myStyleJSON)
```

The JSON string that you apply in this case can be built using the [Google Maps Styling Wizard](https://mapstyle.withgoogle.com/). Read more about styling the Google Map in the [Google Maps iOS SDK Docs](https://developers.google.com/maps/documentation/ios-sdk/styling).
