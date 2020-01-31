---
title: Get Directions and Show the Result on a Map - Part 1
parent: tutorials
nav_weight: 150
date: 2019-09-30
published: true
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

In this tutorial we will request a route, list the route parts and render these on a Google Map. A MapsIndoors route is made of one or more legs, each containing one or more steps.

We will start by making the controller that renders the route from the input of a route, a leg index and optionally a step index. Start by creating a `UIViewController` implementation that conforms to `MPDirectionsRendererDelegate`

```swift
class ShowRouteOnMapController: UIViewController, MPDirectionsRendererDelegate {
```

Setup member variables for `MySearchController`:

* An instance of type `GMSMapView`
* An instance of type `MPMapControl`
* An instance of type `MPRoute` (the route object)
* A leg index
* A step index

```swift
var map: GMSMapView? = nil
var mapControl: MPMapControl? = nil
var route:MPRoute? = nil
var leg:Int = -1
var step:Int = -1
```

Create an initializer for your input parameters

```swift
convenience init(_ route:MPRoute, _ leg:Int, _ step:Int) {
    self.init(nibName:nil, bundle:nil)
    self.route = route
    self.leg = leg
    self.step = step
}
```

Setup the Google map and your `MPMapControl` instance

```swift
self.map = GMSMapView.init(frame: CGRect.zero)
self.view = self.map
self.map?.camera = .camera(withLatitude: 57.057964, longitude: 9.9504112, zoom: 20)
self.mapControl = MPMapControl.init(map: self.map!)
```

Inside `viewDidAppear`, setup a directions renderer and assign the Google map, route object and leg/step indices. Eventually, call the animate method to make it animate from the start to end of the leg/step

```swift
let renderer = MPDirectionsRenderer.init()

renderer.delegate = self
renderer.fitBounds = true

renderer.map = self.map
renderer.route = route

renderer.routeLegIndex = leg
renderer.routeStepIndex = step
renderer.animate(5)
```

In the `floorDidChange` delegate method change the floor on your `MPMapControl instance`

```swift
func floorDidChange(_ floor: NSNumber) {
    mapControl?.currentFloor = floor
}
```

 In [Part 2](../showrouteshowroutecontroller) we will create the map view controller that displays the blue dot.

[See the sample in ShowRouteOnMapController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show%20Route/ShowRouteOnMapController.swift)
