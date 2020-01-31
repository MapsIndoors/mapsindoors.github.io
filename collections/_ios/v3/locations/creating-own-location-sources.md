---
layout: tutorial
title: Creating your own Location Sources
parent: locations
nav_weight: 330
published: true
date: 2019-09-30
---

In this tutorial we will show how you can build a custom Location Source, representing locations of people. The people locations will be served from a mocked list in the source and displayed on a map in a view controller.

We will start by creating our implementation of a location source.

Create a class `PeopleLocationsDataSource` that inherits from NSObject and implements `MPLocationSource`.

```swift
class PeopleLocationSource : NSObject, MPLocationSource {
```

Add some member variables to `PeopleLocationsDataSource`.

* `observers`: The observer objects that we will notify about changes
* `locationUpdates`: A list of MPLocationUpdate - the MPLocation builders
* `locationPoints`: A list of MPPoint - the positions that we will mock
* `locationDirs`: A list of directions - the walking direction for each "person"
* `queue`: A backround queue
* `numberOfPeople`: The number of people to mock

```swift
private var observers = [MPLocationsObserver]()
private var locationUpdates = [MPLocationUpdate]()
private var locationPoints = [MPPoint]()
private var locationDirs = [Double]()
private let queue = DispatchQueue.init(label: "UpdatePositions")
private let numberOfPeople = 100
```

Create a method called `getRandomPoint` that simply just returns a random point (here within proximity of the demo venue)

```swift
func getRandomPoint() -> MPPoint {
    let lat = 57.058037 + Double.random(in: -0.0004 ..< 0.0004)
    let lng = 9.950572 + Double.random(in: -0.0004 ..< 0.0004)
    return MPPoint.init(lat: lat, lon: lng, zValue: 1)
}
```

Create a method called `createPeople` that takes a type string. Iterate numberOfPeople and for each iteration create:

* An MPLocationUpdate with an id and a source (self)
* A type - later used to style the location
* A floor
* A random point and initial direction for the person

```swift
func createPeople(_ type: String) {
    for locId in 0 ..< numberOfPeople {

        let locationUpdate = MPLocationUpdate.init(id: locId, from: self)

        locationUpdate.type = type
        locationUpdate.addPropertyValue("John Doe #\(locId)", forKey: MPLocationFieldName)
        locationUpdate.floor = 1
        let p = getRandomPoint()
        locationPoints.append(p)
        locationDirs.append(Double.random(in: 0 ..< 360))
        locationUpdate.position = p.getCoordinate()
        locationUpdates.append(locationUpdate)

    }
}
```

Create a method called `updatePositions`. Iterate numberOfPeople again and for each iteration:

* Get the corresponding MPLocationUpdate
* Set a new position using Google Maps' offsetting function
* Save a new heading and position
* Generate MPLocation from the MPLocationUpdate
After iteration, notify each observer about the updates locations

```swift
func updatePositions() {
    var updatedLocations = [MPLocation]()
    for locId in 0 ..< numberOfPeople {
        let locationUpdate = locationUpdates[locId]
        let newPos = GMSGeometryOffset(locationPoints[locId].getCoordinate(), 0.5, locationDirs[locId])
        locationUpdate.position = newPos
        locationDirs[locId] = locationDirs[locId] + Double.random(in: -22 ..< 22)
        locationPoints[locId] = MPPoint.init(lat: newPos.latitude, lon: newPos.longitude)
        updatedLocations.append(locationUpdate.location())
    }
    for observer in observers {
        observer.onLocationsUpdate(updatedLocations, source: self)
    }
    queue.asyncAfter(deadline: .now() + 0.5) {
        self.updatePositions()
    }
}
```

Create a method called `startMockingPositions` that simply just calls `updatePositions` in the future.

```swift
func startMockingPositions() {
    DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
        self.updatePositions()
    }
}
```

Create an initialiser that takes a type string. Call `createPeople` and `startMockingPositions`.

```swift
convenience init(type:String) {

    self.init()

    createPeople(type)

    startMockingPositions()
}
```

Implement the MPLocationSource method `getAllLocations`. For this demo just return an empty array as each update will also contain the full list of locations.

```swift
func getLocations() -> [MPLocation] {
    return []
}
```

Implement the MPLocationSource method `addLocationObserver`.

```swift
func add(_ observer: MPLocationsObserver) {
    observers.append(observer)
}
```

Implement the MPLocationSource method `removeLocationObserver`.

```swift
func remove(_ observer: MPLocationsObserver) {
    observers = observers.filter({ (obsvr) -> Bool in
        return obsvr === observer
    })
}
```

Implement the MPLocationSource method `sourceStatus`.

```swift
func status() -> MPLocationSourceStatus {
    return .available
}
```

Implement the MPLocationSource method `sourceIdentifier`.

```swift
func sourceId() -> Int32 {
    return 0;
}
```

[See the sample in PeopleLocationSource.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Location> Sources/PeopleLocationSource.swift)

## Create another location source that mocks the availability of meeting rooms or work desks

This location source rely on MapsIndoors data, so we will consume the locations of `MPMapsIndoorsLocationSource` and relay them as this source's own locations. Thus we need to observe the `MPMapsIndoorsLocationSource` and act as a LocationSource at the same time.

Create a class `RoomAvailabilitySource` that inherits from NSObject and implements `MPLocationSource` and `MPLocationsObserver`.

```swift
class RoomAvailabilitySource : NSObject, MPLocationSource, MPLocationsObserver {
```

Add some member variables to `RoomAvailabilitySource`.

* `observers`: The observer objects that we will notify about changes
* `locationUpdates`: A dictionary of reusable `MPLocationUpdate` models
* `miMapsIndoorsSource`: The MapsIndoors source to observe

```swift
private var observers = [MPLocationsObserver]()
private var locationUpdates = Dictionary<String, MPLocationUpdate>()
private let miMapsIndoorsSource:MPLocationSource = MPMapsIndoorsLocationSource()
```

In the initialiser, add this instance as observer for The MapsIndoors source.

```swift
override init() {
    super.init()
    self.miMapsIndoorsSource.add(self)
}
```

Create a method `updateIconForLocation` that takes a location and grabs or creates a location update object. Randomly modify the icon of that location so it looks occupied.

```swift
func updateIconForLocation(location:MPLocation) -> MPLocationUpdate? {
    if locationUpdates[location.locationId!] == nil {
        locationUpdates[location.locationId!] = MPLocationUpdate.init(location: location)
    }
    let locUpdate = locationUpdates[location.locationId!]

    if (Int.random(in: 0...1) == 0) {
        locUpdate?.icon = UIImage(named: "closed")!
    }
    return locUpdate
}
```

Create a method `updateLocations` that runs through a list of locations add creates location update objects.

```swift
func updateLocations(locations:[MPLocation]) -> [MPLocation] {

    var updatedLocations = [MPLocation]()

    for location in locations {
        if let locUpdate = updateIconForLocation(location: location) {
            updatedLocations.append(locUpdate.location())
        }
    }

    return updatedLocations
}
```

Implement the MPLocationSource method `getLocations`. For this demo just return the full list of MapsIndoors' locations.

```swift
func getLocations() -> [MPLocation] {
    return miMapsIndoorsSource.getLocations()
}
```

Implement the MPLocationSource method `addLocationObserver`.

```swift
func add(_ observer: MPLocationsObserver) {
    observers.append(observer)
}
```

Implement the MPLocationSource method `removeLocationObserver`.

```swift
func remove(_ observer: MPLocationsObserver) {
    observers = observers.filter({ (obsvr) -> Bool in
        return obsvr !== observer
    })
}
```

Implement the MPLocationSource method `sourceStatus`.

```swift
func status() -> MPLocationSourceStatus {
    return .available
}
```

Implement the MPLocationSource method `sourceIdentifier`.

```swift
func sourceId() -> Int32 {
    return 2;
}
```

Relay `onLocationsDelete` events to this sources own observers.

```swift
func onLocationsDelete(_ locations: [String], source: MPLocationSource) {
    for obsvr in observers {
        obsvr.onLocationsDelete(locations, source: self)
    }
}
```

In `onLocationsUpdate` create new modified locations objects and call the observers.

```swift
func onLocationsUpdate(_ locationUpdates: [MPLocation], source: MPLocationSource) {
    let locations = updateLocations(locations: locationUpdates)
    for obsvr in observers {
        obsvr.onLocationsUpdate(locations, source: self)
    }
}
```

Relay `onStatusChange` events to this sources own observers.

```swift
func onStatusChange(_ status: MPLocationSourceStatus, source: MPLocationSource) {
    for obsvr in observers {
        obsvr.onStatusChange(status, source: self)
    }
}
```

[See the sample in RoomAvailabilitySource.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Location> Sources/RoomAvailabilitySource.swift)

## Create a view controller displaying a map that shows the mocked people locations and the mocked room availability on top of a MapsIndoors map

Create a class `LocationSourcesController` that inherits from `UIViewController`.

```swift
class LocationSourcesController: UIViewController {
```

Add a `GMSMapView` and a `MPMapControl` to the class

```swift
var map: GMSMapView? = nil
var mapControl: MPMapControl? = nil

override func viewDidLoad() {

    super.viewDidLoad()
```

Inside `viewDidLoad`, register the sources `PeopleLocationSource` and `RoomAvailabilitySource`

```swift
MapsIndoors.register([
    PeopleLocationSource.init(type: "People"),
    RoomAvailabilitySource.init()
])
```

Inside `viewDidLoad`, setup the map so that it shows the demo venue and initialise mapControl

```swift
self.map = GMSMapView.init(frame: CGRect.zero)
self.view = self.map
self.map?.camera = .camera(withLatitude: 57.057964, longitude: 9.9504112, zoom: 20)
self.mapControl = MPMapControl.init(map: self.map!)
```

Inside `viewDidLoad`, setup a display setting that refers to the type of locations that your people location source operates with.

```swift
let dr = MPLocationDisplayRule.init(name: "People", andIcon: UIImage.init(named: "user.png"), andZoomLevelOn: 17)!
self.mapControl?.add(dr)
```

Optionally, when you leave this controller. Remove the custom Location Source by adding back the `MPMapsIndoorsLocationSource` as the only one.

```swift
override func viewDidDisappear(_ animated: Bool) {
    MapsIndoors.register([MPMapsIndoorsLocationSource()])
}
```

[See the sample in LocationSourcesController.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Location> Sources/LocationSourcesController.swift)
