---
layout: guide
title: Live Data
guide_title: live-data
nav_weight: 330
published: true
date: 2020-09-01
permalink: /ios/v3/live-data/
---

This guide gives an overview of how to work with _Live Data_ in the MapsIndoors iOS SDK. As opposed to _static data_, which does not change unless data is synchronized, Live Data can change in real time, and these changes can be instantly reflected on the map and in searches.

Common use-cases are:

* Changing the appearance of meeting rooms or workspace desks on a map, or in a list, based on occupancy information. For example, change the icon in order to indicate that a room is occupied.
* Changing the position of a POI representing a vehicle.

Support for Live Data requires that server-side integrations are in place. For example, visualizing live occupancy data requires that a calendar or booking system integration is in place. An integration like that is set up in [collaboration with MapsPeople](https://www.mapspeople.com/mapsindoors-integrations/).

## Live Topics

All Live Data is ordered in so-called _Topics_. A MapsIndoors Topic is _hierarchical_ in the way it is defined, and its relation to MapsIndoors data is derivable by its 7 components:

1. Dataset
1. Venue
1. Building
1. Floor
1. Room
1. Location
1. Domain Type

As a minimum, all Topics relate to a Data Set (also known as a "Solution" in MapsIndoors), a Domain Type and one (or more) of the other components.

### Domain Type

The Domain Type describes what kind of conceptual Domain the Live Data belongs to. Here are some examples of Domain Types:

* Availability - The current availability state of a particular bookable room or workspace
* Occupancy - The current known occupancy of a given capacity, for example in a meeting room
* Position - The current geo-spatial position and related floor

The Domain Type is not bound to be one of the above, but could be very specific to a particular use-case, source of data and technical integration.

### Topic Criterias

Knowing that updates is ordered in Topics, it is possible to subscribe to updates using a Topic Criteria. Filtering out live updates can be done on all levels of the Topic Criteria. For example, you might want to subscribe to all position updates but only for a particular Floor in a particular Building. This can be done by setting the correct IDs on the Floor and Building component. Leaving out a component means that we will get all updates, regardless of what relation the updates have at that level. Continuing the example, leaving out the Floor component means that we get all position updates on all Floors, but still only for a particular Building.

## Live Updates

A live update is the model for a message carrying one piece of Live Data, for example that a particular room is now occupied. It contains the Topic for the live update and the actual live properties as a _dictionary_ of _strings_.

## Enable Live Data in Your App

To enable Live Data in an application, a subscription to one or more Topics is needed. Once subscribed, the application can be notified about changes and decide what to do. The application is in control of what should happen upon receiving live data updates, and the MapsIndoors SDKs provide mechanisms to efficiently make updates to the map representation of locations.

The central class to carry out the subscription tasks is the `LiveDataManager`, but the `MPMapControl` class also has some convenience methods that abstract the subscription layer, trading off some granular control.

### Enable Live Data through MPMapControl

Enabling of Live Data through `MPMapControl` can be done as simple as calling `MPMapControl.enableLiveData()` with a Domain Type.

```swift
  self.mapControl = MPMapControl.init(map: self.map!)
  
  self.mapControl.enableLiveData(MPLiveDomainType.position)
```

In the example we are enabling Live Data for the Domain Type "Occupancy". Internal processes will determine which topics are relevant for subscription based on where the map is situated. A default rendering mechanism will also alter the appearance of the relevant locations on the map. As a consequence, the SDK will set [custom display rules](https://mapsindoors.github.io/ios/v3/map-styling/#setting-display-rule-for-a-single-and-multiple-locations) for this rendering. Adding your own or resetting display rules while Live Data is enabled with default rendering may break the rendering for the current `MPMapControl` instance. Hence, you should not use custom display rules unless you are [handling the rendering of Live Data](#rendering-live-data-locations) by your own.

### Enable Live Data through MPLiveDataManager

Enabling of Live Data through `MPLiveDataManager` is done by creating one or more Topic Criterias and calling `MPLiveDataManager.subscribe()` with the topic.

Live Data updates with the "Position" Domain Type directly affects the behavior of `MPMapControl` by moving the icons belonging to the related locations. By consequense, if you have already set up your map with MapsIndoors, an additional few lines of code can enable moving locations on the map. Here is an example in Swift:

```swift
  self.mapControl = MPMapControl.init(map: self.map!)
  
  let liveManager = MapsIndoors.liveDataManager()
  
  let topic = MPLiveTopicCriteria.domainType(MPLiveDomainType.position)
  
  liveManager.subscribe(topic)
```

In the example the Topic was created with only the Domain Type. This will subscribe to all coming position updates for the dataset, and if the updates are relevant for the particular view of the map, you will see moving icons on the map.

## Rendering Live Data Locations

As mentioned, `MPMapControl` has a default way of rendering Live Data Locations if you call `MPMapControl.enableLiveData()`. If you need to show Live Data in another way, you can add handlers for this, either through `MPMapControlDelegate` or `MPMappedLocationUpdateHandler`. Here is an example of getting a `MPMapControlDelegate` callback and creating a Display Rule for a Location that has a Live Update.

```swift
extension MyClass : MPMapControlDelegate {
    func willUpdateLocationsOnMap(locations: [MPLocation]) {
        for location in locations {
            let occupied = location.getLiveValue(forKey: "occupied", domainType: MPLiveDomainType.occupancy)

            let image:UIImage

            if (occupied == "True") {
                image = UIImage.init("occupied")
            } else {
                image = UIImage.init("free")
            }

            let displayRule = MPLocationDisplayRule.init(name: nil, andIcon: image, andZoomLevelOn: 15)

            self.mapControl.setDisplayRule(myDisplayRule, for: location)
        }
    }
}
```

Likewise this can be done through the `MPMappedLocationUpdateHandler` when enabling Live Data through `MPMapControl.enableLiveData()`:

```swift
class MyClass : UIViewController {
    ...
    override func viewDidLoad() {
        self.mapControl.enableLiveData(MPLiveDomainType.occupancy, handler: self)
    }
    ...
}

extension MyClass : MPMappedLocationUpdateHandler {
    func willUpdateLocationsOnMap(locations: [MPLocation]) {
        ...
    }
}
```

As you can see, both `MPMapControlDelegate` and `MPMappedLocationUpdateHandler` has a method definition called `willUpdateLocationsOnMap` which gets all the updated locations as an input parameter.

## Handling Live Data Events

While only a few lines of code can get things moving around on a map, there are of course more handles that are relevant to create a robust and user-friendly real-time map experience.

### Listening for Live Updates

There are two ways to be notified about Live Updates.

1. On a general level through `MPLiveDataManagerDelegate`, which is suitable in scenarios where all Live Updates might potentially affect the end user's decisions, for example when searching broadly for an available meeting room.
2. On a map-specific level through `MPMapControlDelegate` or `MPMappedLocationUpdateHandler`, which is suitable in scenarios where the map is the context for the user's actions, for example when browsing the map for an available meeting room nearby.

To get Live Updates on a general level the `MPLiveDataManagerDelegate` protocol method `didReceive(_ liveUpdate: MPLiveUpdate)` must be implemented:

```swift
extension MyClass : MPLiveDataManagerDelegate {
    func didReceive(_ liveUpdate: MPLiveUpdate) {
        let numberOfPeople = liveUpdate.getLiveValue(forKey: "nrOfPeople")
        ...
    }
}
```

To get Live Updates on a map-specific level the `MPMapControlDelegate` protocol method `willUpdateLocationsOnMap(locations: [MPLocation])` must be implemented:

```swift
extension MyClass : MPMapControlDelegate {
    func willUpdateLocationsOnMap(locations: [MPLocation]) {
        for location in locations {
            let numberOfPeople = location.getLiveValue(forKey: "nrOfPeople", domainType: MPLiveDomainType.occupancy)
            ...
        }
    }
}
```

### Handling State Changes and Errors

In order to get notified about state changes and errors happening in the Live Data Manager, `MPLiveDataManagerDelegate` utilizes other methods as shown in the example below:

```swift
extension MyClass : MPLiveDataManagerDelegate {

    func didUpdate(_ state: MPLiveDataManagerState) {
        print("Manager state changed to \(state)")
    }

    func didSubscribe(_ topic: MPLiveTopicCriteria) {
        print("Started Live Updates for \(topic.topicString)")
    }

    func didUnsubscribe(_ topic: MPLiveTopicCriteria) {
        print("Stopped Live Updates for \(topic.topicString)")
    }

    func onSubscriptionError(_ error: Error, topic: MPLiveTopicCriteria) {
        print("Could not subscribe Live Updates for \(topic.topicString)")
    }

    func onError(_ error: Error) {
        print("We got an error")
    }

}
```

Live Updates are of course dependent on network connectivity, so the Live Data Manager will try to recover from common errors like network dropout. On the contrary, the Live Data Manager will not try to recover from subscription errors alone as this could be caused by a non-existing topic for a given Dataset, thus it does not make sense retrying the failing subscription.

To learn more, visit the [Live Data tutorial for iOS](/ios/v3/live-data/live-data-tutorial) and the [reference guide](https://app.mapsindoors.com/mapsindoors/reference/ios/v3/interface_m_p_live_data_manager.html).
