---
title: Show the Blue Dot with MapsIndoors - Part 2
parent: tutorials
nav_weight: 140
date: 2019-09-30
published: true
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

This is part 2 of the tutorial of managing a blue dot on the map. [In Part 1 we created the position provider](../showmylocationmypositionprovider). Now we will create a view controller displaying a map that shows the users (mock) location.

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

Inside `viewDidLoad`

* Tell mapControl to show the users location
* Assign your position provider `MyPositionProvider` to `MapsIndoors.positionProvider`
* Start positioning

```swift
self.mapControl?.showUserPosition(true)
MapsIndoors.positionProvider = MyPositionProvider()
MapsIndoors.positionProvider.startPositioning(nil)
```

[See the sample in ShowMyLocationController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Show%20My%20Location/ShowMyLocationController.swift)
