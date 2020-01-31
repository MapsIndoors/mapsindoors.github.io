---
title: Get Directions and Show the Result on a Map - Part 2
parent: tutorials
nav_weight: 160
date: 2019-09-30
published: true
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

This is part 2 of the tutorial of requesting directions and showing the route result on a map. In [Part 1](../showrouteshowrouteonmapcontroller) we created the controller that can display the map and route, and in this part we will create the controller that requests the route and list the route in a table. A MapsIndoors route is made of one or more legs, each containing one or more steps.

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
