---
layout: tutorial
title: Show the user's location aka. Blue Dot
parent: mapsindoors
nav_weight: 240
published: true
date: 2019-09-30
---

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
var heading:Double = 0
```

Create a method called `updatePosition`. This will be our "loop" constantly posting a new position to the delegate.

* Check if the provider has a running state
* Assign a new `MPPositionResult` to `latestPositionResult`
* Assign a new position point
* Optionally specify that heading is available and set a heading
* Notify the delegate by calling `onPositionUpdate` passing the new position as argument
* Schedule a new delayed call of this method

```swift
private func updatePosition() {
    if running {
        latestPositionResult = MPPositionResult.init()
        latestPositionResult?.geometry = MPPoint.init(lat: 57.057964, lon: 9.9504112)
        latestPositionResult?.provider = self
        latestPositionResult?.headingAvailable = true
        heading = (heading + 10).truncatingRemainder(dividingBy: 360)
        latestPositionResult?.setHeadingDegrees(heading)

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

[See the sample in MyPositionProvider.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show> My Location/MyPositionProvider.swift)

## Create a view controller displaying a map that shows the user's "mocked" location

Create a class `ShowMyLocationController` that inherits from `UIViewController`.

```swift
class ShowMyLocationController: UIViewController {
```

Add a `GMSMapView` and a `MPMapControl` to the class

```swift
var map: GMSMapView? = nil
var mapControl: MPMapControl? = nil

override func viewDidLoad() {

    super.viewDidLoad()
```

Inside `viewDidLoad`, setup the map so that it shows the demo venue and initialise mapControl

```swift
self.map = GMSMapView.init(frame: CGRect.zero)
self.view = self.map
self.map?.camera = .camera(withLatitude: 57.057964, longitude: 9.9504112, zoom: 20)
self.mapControl = MPMapControl.init(map: self.map!)
```

Inside `viewDidLoad`, optionally add a special icon for the user location

```swift
let myLocationRule = MPLocationDisplayRule.init(name: "my-location", andIcon: UIImage.init(named: "MyLocationDirection"), andZoomLevelOn: 0)
myLocationRule?.iconSize = CGSize(width: 30, height: 30)
self.mapControl?.add(myLocationRule!)
```

Inside `viewDidLoad`, finally

* Tell mapControl to show the users location
* Assign your position provider `MyPositionProvider` to `MapsIndoors.positionProvider`
* Start positioning

```swift
self.mapControl?.showUserPosition(true)
MapsIndoors.positionProvider = MyPositionProvider()
MapsIndoors.positionProvider.startPositioning(nil)
```

[See the sample in ShowMyLocationController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show%20My%20Location/ShowMyLocationController.swift)
