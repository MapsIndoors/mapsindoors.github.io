---
layout: tutorial
title: Get Directions and Show the Result on a Map
parent: directions
nav_weight: 430
published: true
date: 2019-09-30
---
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

[See the sample in ShowRouteOnMapController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show%20Route/ShowRouteOnMapController.swift)

## Create the controller that requests the route, and list the route in a table

A MapsIndoors route is made of one or more legs, each containing one or more steps.

Start by creating a `UIViewController` implementation

```swift
class ShowRouteController: UITableViewController {
```

Add a `MPRoute` property to the class

```swift
var route:MPRoute? = nil
```

Inside `viewDidLoad`, setup a directions service, call the directions service and save the route result to your `MPRoute` property

```swift
let directions = MPDirectionsService.init()

let origin = MPPoint.init(lat: 57.057917, lon: 9.950361, zValue:0)
let destination = MPPoint.init(lat: 57.058038, lon: 9.950509, zValue:1)

let directionsQuery = MPDirectionsQuery.init(originPoint: origin!, destination: destination!)

directions.routing(with: directionsQuery) { (route, error) in
    self.route = route
    self.tableView.reloadData()
}
```

Override `numberOfRowsInSection` to return the number of steps in the current leg plus the leg itself

```swift
override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    if let leg:MPRouteLeg = route?.legs?[section] as? MPRouteLeg {
        return leg.steps!.count + 1
    }
    return 0
}
```

Override `numberOfSections` to return the number of legs

```swift
override func numberOfSections(in tableView: UITableView) -> Int {
    if let legs = route?.legs?.count {
        return legs
    }
    return 0
}
```

Override `titleForHeaderInSection` to return the leg index

```swift
override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
    return "Route Leg \(section)"
}
```

Override `tableView:cellForRowAt` to return leg index and step index if applicable

```swift
override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let cell = UITableViewCell.init()

    if indexPath.row > 0 {
        cell.textLabel?.text = "Show leg \(indexPath.section), step \(indexPath.row - 1)"
    } else {
        cell.textLabel?.text = "Show leg \(indexPath.section), all steps"
    }
    cell.accessibilityIdentifier = cell.textLabel?.text

    return cell
}
```

Override `tableView:didSelectRowAt` to push a new view controller

```swift
override func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    let vc = ShowRouteOnMapController.init(route!, indexPath.section, indexPath.row - 1)
    navigationController?.pushViewController(vc, animated: true)
}
```

[See the sample in ShowRouteController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show%20Route/ShowRouteController.swift)
