---
title: Show the Blue Dot with MapsIndoors - Part 1
parent: tutorials
nav_weight: 130
date: 2019-09-30
published: true
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

In this tutorial we will show how you can show a blue dot on the map, representing the users location. The position will be served from a mocked positioning provider and displayed on a map in a view controller.

We will start by creating our implementation of a positioning provider.

Create a class `MyPositionProvider` that inherits from NSObject and implements `MPPositionProvider`.

```swift
class MyPositionProvider : NSObject, MPPositionProvider {
```

Add some member variables to `MyPositionProvider`.

* `delegate`: The delegate object
* `running`: A running state boolean flag
* `latestPositionResult`: The latest positioning result
* `preferAlwaysLocationPermission`: A boolean that indicates whether this provider requires Apple Location Services to always be active
* `locationServicesActive`: A boolean that indicates whether Apple Location Services is currently active
* `providerType`: A provider type enum, convenient when working with multiple positioning providers in the same application

```swift
var delegate: MPPositionProviderDelegate?
private var running = false
var latestPositionResult: MPPositionResult?
var preferAlwaysLocationPermission: Bool = false
var locationServicesActive: Bool = false
var providerType: MPPositionProviderType = .GPS_POSITION_PROVIDER
```

Create a method called `updatePosition`. This will be our "loop" constantly posting a new position to the delegate.

* Check if the provider has a running state
* Assign a new `MPPositionResult` to `latestPositionResult`
* Notify the delegate by calling `onPositionUpdate` passing the new position as argument
* Schedule a new delayed call of this method

```swift
private func updatePosition() {
    if running {
        latestPositionResult = MPPositionResult.init()
        latestPositionResult?.geometry = MPPoint.init(lat: 57.057964, lon: 9.9504112)
        latestPositionResult?.provider = self

        if let delegate = self.delegate, let latestPositionResult = self.latestPositionResult {
            delegate.onPositionUpdate(latestPositionResult)
        }

        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            self.updatePosition()
        }
    }
}
```

Implement the `requestLocationPermissions` method. In this example we will just set the `locationServicesActive` to true.

```swift
func requestLocationPermissions() {
    locationServicesActive = true
}
```

Implement the `updateLocationPermissionStatus` method. In this example we will just set the `locationServicesActive` to true.

```swift
func updateLocationPermissionStatus() {
    locationServicesActive = true
}
```

Implement the `startPositioning` method. We set the `running` boolean to true and call `updatePos`.

```swift
func startPositioning(_ arg: String?) {
    running = true
    updatePosition()
}
```

Implement the `stopPositioning` method. We set the `running` boolean to false.

```swift
func stopPositioning(_ arg: String?) {
    running = false
}
```

Implement the `startPositioningAfter` method. This is just a convenience method that should support a delayed start.

```swift
func startPositioning(after millis: Int32, arg: String?) {
    DispatchQueue.main.asyncAfter(deadline: .now() + (0.001 * Double(millis))) {
        self.startPositioning(arg)
    }
}
```

Implement the `isRunning` method. Return the value of `running`.

```swift
func isRunning() -> Bool {
    return running
}
```

In [Part 2](../showmylocationshowmylocationcontroller) we will create the map view controller that displays the blue dot.

[See the sample in MyPositionProvider.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show%20My%20Location/MyPositionProvider.swift)
