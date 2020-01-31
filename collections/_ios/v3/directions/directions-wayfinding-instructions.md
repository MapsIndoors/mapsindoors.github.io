---
layout: tutorial
title: Get Directions and Show Wayfinding Instructions
parent: directions
nav_weight: 410
published: true
date: 2019-09-30
---
In this tutorial we will show how to work with the route model returned from a directions service call. We will also show how you can utilize interaction between the route rendering on the map and textual instructions showed in another view.

We will start by creating our implementation of a custom `UICollectionViewCell` that will hold the instructions for a single segment of a route.

In the route model there are some text properties that we will interpret as enum values, so start out by creating enums `RouteContext` describing whether we are outside or inside and `WayType` describing what kind of facility we are walking/travelling through.

```swift
enum RouteContext : String
{
    case insideBuilding = "InsideBuilding"
    case outsideOnVenue = "OutsideOnVenue"
}

enum WayType : String
{
    case stairs = "steps"
    case elevator = "elevator"
    case travellator = "travellator"
    case escalator = "escalator"
    case footway = "footway"
    case residential = "residential"
}

```

Create a subclass of `UICollectionViewCell` called `RouteSegmentView`

```swift
class RouteSegmentView : UITableViewCell {
```

Add a property called `route` that holds entire route model.

```swift
private var route:MPRoute = MPRoute()
```

Add a property called `segment` that holds the actual segment of `route` that this view is going to reflect.

```swift
private var segment:MPRouteSegmentPath = MPRouteSegmentPath()
```

Add a method called `renderRouteInstructions` that updates `segment` and `route`. Call the method `updateViews` when set.

```swift
func renderRouteInstructions(_ route:MPRoute, for segment:MPRouteSegmentPath) {
    self.route = route
    self.segment = segment
    updateViews()
}
```

## Helper methods

We will need some helper methods. First create a method that can get us the previous step for later comparison.

```swift
fileprivate func getPreviousStep(_ stepIndex: Int, _ legIndex: Int, _ route: MPRoute) -> MPRouteStep? {

    var previousStep: MPRouteStep?
    if stepIndex-1 < 0 {
        if segment.legIndex-1 >= 0 {
            let previousLeg = route.legs?[segment.legIndex-1] as? MPRouteLeg
            previousStep = previousLeg?.steps?.lastObject as? MPRouteStep
        }
    } else if let leg = route.legs?[segment.legIndex] as? MPRouteLeg {
        previousStep = leg.steps?[stepIndex-1] as? MPRouteStep
    }
    return previousStep
}
```

Create a method `getOutsideInsideInstructions` that can get us instructions for walking inside or out of a building. This is determined by the `routeContext` property of an `MPRouteStep`

```swift
fileprivate func getOutsideInsideInstructions(_ previousStep: MPRouteStep, _ currentStep: MPRouteStep) -> String? {
    var instructions:String?
    if let previousContext = previousStep.routeContext {
        if previousContext != currentStep.routeContext {

            let ctx = RouteContext.init(rawValue: currentStep.routeContext ?? "")

            if ctx == .insideBuilding {
                instructions = "Walk inside"
            } else if ctx == .outsideOnVenue {
                instructions = "Walk outside"
            }

        }
    }
    return instructions
}
```

Create a method `getElevationInstructions` that can get us instructions for taking the stairs or elevator to another floor. This is determined by the `highway` and `end_location.zLevel` properties of a `MPRouteStep`.

```swift
fileprivate func getElevationInstructions(_ currentStep: MPRouteStep) -> String? {
    var instructions:String?
    if currentStep.start_location?.zLevel?.intValue != currentStep.end_location?.zLevel?.intValue {

        let floor = currentStep.end_location?.floor_name ?? ""
        let wayType = WayType.init(rawValue: currentStep.highway ?? "") ?? .footway

        switch (wayType) {
            case .elevator, .escalator, .stairs, .travellator:
                instructions = "Take the \(wayType.rawValue) to floor \(floor)"
            default:
                instructions = "Go to level \(floor)"
        }
    }
    return instructions
}
```

Create a method `getDefaultInstructions` that can get us information about the default instructions in a route step. In some cases they are html formatted, so we need to pass it through an interpreter.

```swift
fileprivate func getDefaultInstructions(_ currentStep: MPRouteStep) -> String? {
    if let html = currentStep.html_instructions {
        return String(htmlEncodedString: html)
    }
    return nil
}
```

Create a method `getDistanceInstructions` that can get us information about the travelling distance. This is determined by the `duration` property of a `MPRouteLeg`. The distance is returned in meters so if you require imperial units, make a conversion.

```swift
fileprivate func getDistanceInstructions(_ distance:NSNumber?) -> String {
    let feet = Int((distance?.doubleValue ?? 0) * 3.28)
    return "Continue for \(feet) feet"
}
```

## Suggested logic for generating meaningful instructions

Obviously it is up to your application to present some instructions to the end user, but here a suggestion. Add a method called `updateViews` that will fire whenever our models change.

```swift
func updateViews() {
```

Initialise an array of textual instructions and check for existence of a current leg.

```swift
if route.legs?.count ?? 0 > 0 {
    var instructions = [String]()
    if let currentLeg = route.legs?[segment.legIndex] as? MPRouteLeg {
```

Add instructions for inside/outside as well as elevation instruction if applicable.

```swift
if segment.stepIndex >= 0, let currentStep = currentLeg.steps?[segment.stepIndex] as? MPRouteStep {
    if let previousStep = getPreviousStep(segment.stepIndex, segment.legIndex, route) {
        if let outsideInsideInstructions = getOutsideInsideInstructions(previousStep, currentStep) {
            instructions.append(outsideInsideInstructions)
        }
    }
    if let elevationInstructions = getElevationInstructions(currentStep) {
        instructions.append(elevationInstructions)
    }
    if let defaultInstructions = getDefaultInstructions(currentStep) {
        instructions.append(defaultInstructions)
    }
    instructions.append(getDistanceInstructions(currentStep.distance))
}
```

We need a method to parse html because the directions instructions from Google contains html.

```swift
extension String {

    init?(htmlEncodedString: String) {

        guard let data = htmlEncodedString.data(using: .utf8) else {
            return nil
        }

        let options: [NSAttributedString.DocumentReadingOptionKey: Any] = [
            NSAttributedString.DocumentReadingOptionKey.documentType: NSAttributedString.DocumentType.html,
            NSAttributedString.DocumentReadingOptionKey.characterEncoding: String.Encoding.utf8.rawValue
        ]

        guard let attributedString = try? NSAttributedString(data: data, options: options, documentAttributes: nil) else {
            return nil
        }

        self.init(attributedString.string)
    }

}
```

[See the sample in RouteSegmentView.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Advanced> Directions/RouteSegmentView.swift)

## Create the controller that displays generated textual instructions segment by segment

We use a collection view to do this but you can of course use whatever view that fits your use case best.

First we will define a protocol called `RouteSegmentsControllerDelegate` that will be used to handle the selection of each represented route segment. The method `didSelectRouteSegment` will be delegating the handling of route segment selections.

```swift
protocol RouteSegmentsControllerDelegate {
    func didSelectRouteSegment(segment:MPRouteSegmentPath)
}
```

## The Route Segments Controller

Create a controller class called `RouteSegmentsController` that inherits from `UIViewController`.

```swift
class RouteSegmentsController : UIViewController {
```

Add some properties to the controller

* `startingScrollingOffset` We will do a side-ways scroll in the collection, so we will add a private point property to keep track of that
* `tableView` the actual table view property.
* `delegate` the delegate property.

```swift
private var startingScrollingOffset = CGPoint.zero
private var tableView:UITableView!
var delegate:RouteSegmentsControllerDelegate?
```

Add a `route` property to the class

```swift
var route:MPRoute = MPRoute() {
    didSet {
        self.tableView.reloadData()
    }
}
```

Add a `currentSegment` property to the class

```swift
var currentSegment:MPRouteSegmentPath = MPRouteSegmentPath() {
    didSet {
        if oldValue.legIndex != currentSegment.legIndex {
            self.tableView.reloadData()
        }
    }
}
```

Implement `viewDidLoad` method, creating the horizontal collection view and assigning delegates to the collection view. Make sure that you register your own custom `RouteSegmentView` here.

```swift
override func viewDidLoad() {
    self.tableView = UITableView.init(frame: view.frame)
```

Create a method 'updateRouteSegmentSelection' that notifies the delegate

```swift
func updateRouteSegmentSelection(segment: MPRouteSegmentPath) {
    delegate?.didSelectRouteSegment(segment: segment)
    currentSegment = segment
}
```

## The Route Segments Controller Data Source

Create an extension of `RouteSegmentsController` that implements `UICollectionViewDataSource` protocol.

```swift
extension RouteSegmentsController : UITableViewDataSource {
```

In the `collectionView numberOfItemsInSection` method, let the item count reflect the number of legs in the current route.

```swift
func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
    let leg = route.legs?[section] as? MPRouteLeg
    return leg?.steps?.count ?? 0
}
```

In the `collectionView cellForItemAt indexPath` method, create a segment based on the index paths row (leg) index. Dequeue a cell view and update the `route` and `segment` properties accordingly.

```swift
func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
    let segment = MPRouteSegmentPath(legIndex: indexPath.section, stepIndex: indexPath.row)
    let tvCell:RouteSegmentView = tableView.dequeueReusableCell(withIdentifier: "TVC", for: indexPath) as! RouteSegmentView
    tvCell.renderRouteInstructions(route, for: segment)
    return tvCell
}
```

In the `titleForHeaderInSection` method, return the number of legs in the current route.

```swift
func numberOfSections(in tableView: UITableView) -> Int {
    return route.legs?.count ?? 0
}
```

Implement the `heightForRowAtIndexPath` method.

```swift
func tableView(_ tableView: UITableView, heightForRowAt indexPath: IndexPath) -> CGFloat {
    return 80
}
```

Optionally implement the `titleForHeaderInSection` method.

```swift
func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
    if let leg = route.legs?[section] as? MPRouteLeg {
        let meters = leg.distance?.intValue ?? 0
        return "\(meters) meters"
    }
    return ""
}
```

## Table View Delegate

Create an extension of `RouteSegmentsController` that implements `UITableViewDelegate` protocol. In method `didSelectRowAtIndexPath` update the current route segment.

```swift
extension RouteSegmentsController : UITableViewDelegate {
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        updateRouteSegmentSelection(segment: MPRouteSegmentPath(legIndex: indexPath.section, stepIndex: indexPath.row))
    }
```

[See the sample in RouteSegmentsController.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Advanced> Directions/RouteSegmentsController.swift)

## Create a controller that renders a map and utilizes interaction between a route rendered on the map and the selected instructions

Start by creating a controller class `AdvancedDirectionsController` that inherits from `UIViewController`

```swift
class AdvancedDirectionsController: UIViewController {
```

Setup map-related member variables for `AdvancedDirectionsController`:

* A Google Maps `map` property
* A MapsIndoors `mapControl` property
* A MapsIndoors `renderer` property
* A `routeVC` property used as a child view controller to this VC

```swift
var map: GMSMapView! = nil
var mapControl: MPMapControl! = nil
var renderer: MPDirectionsRenderer! = nil
var stepWiseRenderer: MPDirectionsRenderer! = nil
```

Setup directions related member variables for `AdvancedDirectionsController`:

* A `routeVC` property used as a child view controller to this VC
* A `heightConstraintForRouteView` property that can control the visibility of the route view
* A `directionsVisible` bool that can control the visibility of the route view by affecting the height of the route view
* A `searchButton` that will open a search controller to choose your destination

```swift
var routeVC: RouteSegmentsController! = nil
var heightConstraintForRouteView:NSLayoutConstraint! = nil
var directionsVisible:Bool! {
    didSet {
        heightConstraintForRouteView.constant = directionsVisible ? 240 : 0
        UIView.animate(withDuration: 0.3) {
            self.view.layoutIfNeeded()
        }
    }
}
var searchButton:UIButton! = nil
let directions = MPDirectionsService.init()
var destinationLocation:MPLocation? {
    didSet {
        updateDirections()
        searchButton.setTitle(destinationLocation?.name, for: .normal)
    }
}
var originLocation:MPLocation?
```

Create a `setupMap` method that sets up the Google map and MapsIndoors Map Control object.

```swift
fileprivate func setupMap() {
    self.map = GMSMapView.init(frame: CGRect.zero)
    self.map.camera = .camera(withLatitude: 57.057964, longitude: 9.9504112, zoom: 20)
    self.mapControl = MPMapControl.init(map: self.map!)
    view.addSubview(self.map)
}
```

Create a `setupSearchButton` method that sets up a button that can trigger the destination location selection.

```swift
fileprivate func setupSearchButton() {
    searchButton = UIButton.init()
    searchButton.setTitle("Search Destination", for: .normal)
    searchButton.addTarget(self, action: #selector(selectDestination), for: .touchUpInside)
    searchButton.backgroundColor = .blue
    view.addSubview(searchButton)
}
```

Create a `setupConstraints` method that sets up all the layout constraints. In your projects you might do all this in a storyboard.

```swift
fileprivate func setupConstraints() {

    map.translatesAutoresizingMaskIntoConstraints = false
    map.widthAnchor.constraint(equalTo:view.widthAnchor).isActive = true
    map.topAnchor.constraint(equalTo:view.topAnchor).isActive = true

    searchButton.translatesAutoresizingMaskIntoConstraints = false
    searchButton.heightAnchor.constraint(equalToConstant: 68).isActive = true
    searchButton.widthAnchor.constraint(equalTo:view.widthAnchor).isActive = true
    searchButton.topAnchor.constraint(equalTo: map.bottomAnchor).isActive = true

    routeVC.view.translatesAutoresizingMaskIntoConstraints = false
    routeVC.view.widthAnchor.constraint(equalTo:view.widthAnchor).isActive = true
    routeVC.view.bottomAnchor.constraint(equalTo:view.bottomAnchor).isActive = true
    routeVC.view.topAnchor.constraint(equalTo:searchButton.bottomAnchor).isActive = true

    heightConstraintForRouteView = routeVC.view.heightAnchor.constraint(equalToConstant:0)
    heightConstraintForRouteView.isActive = true
}
```

Create a `setupRouteNav` method that instantiates `RouteSegmentsController` and adds it as a child view controller. Assign this controller as its delegate.

```swift
fileprivate func setupRouteNav() {
    routeVC = RouteSegmentsController.init()
    self.addChildViewController(routeVC!)
    view.addSubview(routeVC.view)
    routeVC.didMove(toParentViewController: self)
    routeVC.delegate = self as RouteSegmentsControllerDelegate
}
```

Create a `selectDestination` method that instantiates and presents `MySearchController`. Assign this controller as its delegate.

```swift
@objc fileprivate func selectDestination() {
    let searchController = MySearchController.init(near: nil)
    searchController.delegate = self
    self.present(searchController, animated: true, completion: nil)
}
```

Create a `setupRenderer` method that instantiates `MPDirectionsRenderer` and adds it as a child view controller. Assign this controller as its delegate.

```swift
fileprivate func setupRenderer() {
    self.renderer = MPDirectionsRenderer.init()
    self.renderer.delegate = self as MPDirectionsRendererDelegate
    self.renderer.fitBounds = true
    self.renderer.solidColor = .clear
    self.renderer.map = self.map

    self.stepWiseRenderer = MPDirectionsRenderer.init()
    self.stepWiseRenderer.fitBounds = false
    self.stepWiseRenderer.map = self.map
    self.stepWiseRenderer.nextRouteLegButton?.isHidden = true
    self.stepWiseRenderer.previousRouteLegButton?.isHidden = true
}
```

Create a `setOriginLocation` method that mocks a origin location by searching for a random venue in MapsIndoors.

```swift
fileprivate func setOriginLocation() {
    let q = MPQuery()
    q.query = "venue"
    MPLocationService.sharedInstance().getLocationsUsing(q, filter: MPFilter()) { (locations, err) in
        if let loc = locations?.first {
            self.originLocation = loc
            self.mapControl.go(to: loc)
        }
    }
}
```

In the `viewDidLoad` put the pieces together by calling the above methods.

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    setupMap()
    setupSearchButton()
    setupRouteNav()
    setupRenderer()
    setupConstraints()
    setOriginLocation()
}
```

Create a `updateDirections` method that sets up a MapsIndoors directions query. Execute a query and pass the resulting route object to the renderer.

```swift
fileprivate func updateDirections() {
    if let origin = originLocation, let destination = destinationLocation {
        let directionsQuery = MPDirectionsQuery.init(origin: origin, destination: destination)
        directions.routing(with: directionsQuery) { (route, error) in
            if let route = route {
                self.directionsVisible = true
                self.routeVC!.route = route
                self.renderer.route = route
                self.renderer.routeLegIndex = 0
                self.stepWiseRenderer.route = route
            }
        }
    }
}
```

## Map interactions

Let's do a couple of extensions for the map interactions. First implement the `RouteSegmentsControllerDelegate` through an extension. In `didSelectRouteSegment` update the leg index for the directions renderer.

```swift
extension AdvancedDirectionsController : RouteSegmentsControllerDelegate {
    func didSelectRouteSegment(segment: MPRouteSegmentPath) {
        renderer.routeLegIndex = segment.legIndex
        renderer.fitBounds = false
        stepWiseRenderer.routeLegIndex = segment.legIndex
        stepWiseRenderer.routeStepIndex = segment.stepIndex
        stepWiseRenderer.animate(3)
        stepWiseRenderer.fitBounds = true
    }
}
```

Implement the `MPDirectionsRendererDelegate` through an extension. In `floorDidChange` update the current visible floor on the map control object.

```swift
extension AdvancedDirectionsController : MPDirectionsRendererDelegate {
    func floorDidChange(_ floor: NSNumber) {
        mapControl.currentFloor = floor
    }
}
```

Implement the `MySearchControllerDelegate` through an extension. In `didSelectLocation` update the `destinationLocation` property.

```swift
extension AdvancedDirectionsController : MySearchControllerDelegate {
    func didSelectLocation(location: MPLocation) {
        destinationLocation = location
    }
}
```

[See the sample in AdvancedDirectionsController.swift](<https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Advanced> Directions/AdvancedDirectionsController.swift)
