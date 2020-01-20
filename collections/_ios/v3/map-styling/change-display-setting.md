---
layout: tutorial
title: Working with Display Settings
parent: map-styling
nav_weight: 330
published: true
date: 2019-12-05
permalink: /ios/v3/map-styling/work-with-display-settings
---

In this tutorial we will create a view controller that can enable and disable different custom location display settings on a MapsIndoors map. At the end you should be able to see a map of a building with some colored buttons below the map enabling custom display settings for specified locations.

Start by creating a `UIImage` extension that can generate a mock icon for a color. Alternatively you can refer to your own images instead.
```
public extension UIImage {
    convenience init?(color: UIColor, size: CGSize = CGSize(width: 18, height: 18)) {
    let rect = CGRect(origin: .zero, size: size)
    UIGraphicsBeginImageContextWithOptions(rect.size, false, 0.0)
    color.setFill()
    UIRectFill(rect)
    let image = UIGraphicsGetImageFromCurrentImageContext()
    UIGraphicsEndImageContext()

    guard let cgImage = image?.cgImage else { return nil }
    self.init(cgImage: cgImage)
  }
}
```
Create a `UIViewController` class that will contain all our code. 
```
class ChangeDisplaySettingController: UIViewController {
```
Add a `GMSMapView` and a `MPMapControl` as properties to the class.
```
var map: GMSMapView? = nil
var mapControl: MPMapControl? = nil
```
Add buttons for toggling display settings for a type, a single location and multiple locations.
```
let typeDisplayButton = UIButton.init()
let singleLocationDisplayButton = UIButton.init()
let multipleLocationDisplayButton = UIButton.init()
```
Add properties to hold the locations we are going to alter the appearance for.
```
var multipleLocations = [MPLocation]()
var singleLocation:MPLocation? = nil
```
Add display setting properties of type `MPLocationDisplayRule` used for overriding display settings for a type, a single location and multiple locations. Also add a property `originalTypeDisplaySetting` to hold on to the original type display setting.
```
let typeDisplaySetting = MPLocationDisplayRule.init(name: "MeetingRoom", andIcon: UIImage.init(color: UIColor.red), andZoomLevelOn: 15)!
let singleLocationDisplaySetting = MPLocationDisplayRule.init(name: nil, andIcon: UIImage.init(color: UIColor.blue), andZoomLevelOn: 15)!
let multipleLocationDisplaySetting = MPLocationDisplayRule.init(name: nil, andIcon: UIImage.init(color: UIColor.green), andZoomLevelOn: 15)!
var originalTypeDisplaySetting:MPLocationDisplayRule?
```
Add a method `setupDisplaySettingButtons()` setting up buttons that enables/disables the location display settings.
```
fileprivate func setupDisplaySettingButtons() {
    typeDisplayButton.setTitle("Type Normal", for: .normal)
    typeDisplayButton.setTitle("Type Custom", for: .selected)
    typeDisplayButton.addTarget(self, action: #selector(toggleDisplaySettingsForType), for: .touchUpInside)
    typeDisplayButton.backgroundColor = UIColor.red
    
    singleLocationDisplayButton.setTitle("Single Normal", for: .normal)
    singleLocationDisplayButton.setTitle("Single Custom", for: .selected)
    singleLocationDisplayButton.addTarget(self, action: #selector(toggleDisplaySettingsForSingle), for: .touchUpInside)
    singleLocationDisplayButton.backgroundColor = UIColor.blue
    
    multipleLocationDisplayButton.setTitle("Multiple Normal", for: .normal)
    multipleLocationDisplayButton.setTitle("Multiple Custom", for: .selected)
    multipleLocationDisplayButton.addTarget(self, action: #selector(toggleDisplaySettingsForMultiple), for: .touchUpInside)
    multipleLocationDisplayButton.backgroundColor = UIColor.green
}
```
Add a method `prepareData()` that fetches some random meeting rooms and stores one of them in `singleLocation`and the full result in `multipleLocations`. Get the default display rule for the location type `MeetingRoom` and store a copy in `originalTypeDisplaySetting`.
```
func prepareData() {
    let q = MPQuery()
    q.query = "meeting room"
    let f = MPFilter()
    f.take = UInt.max
    MPLocationService.sharedInstance().getLocationsUsing(q, filter: f) { (locations, error) in
        self.multipleLocations = locations!
        self.singleLocation = locations!.last
        self.originalTypeDisplaySetting = self.mapControl?.getDisplayRule(forTypeNamed: "MeetingRoom")?.copy() as? MPLocationDisplayRule
    }
}
```
Define an objective-c method `toggleDisplaySettingsForMultiple()` that will receive events from your `multipleLocationDisplayButton`, swap current selected state for button and toggle the display settings for `multipleLocations`.
```
@objc func toggleDisplaySettingsForMultiple(sender:UIButton) {
    sender.isSelected = !sender.isSelected
    
    if sender.isSelected {
        self.mapControl?.setDisplayRule(multipleLocationDisplaySetting, for: multipleLocations)
    } else {
        self.mapControl?.removeDisplayRules(for: multipleLocations)
    }
}
```
Define an objective-c method `toggleDisplaySettingsForSingle()` that will receive events from your `singleLocationDisplayButton`, swap current selected state for button and toggle the display settings for the `singleLocation`.
```
@objc func toggleDisplaySettingsForSingle(sender:UIButton) {
    sender.isSelected = !sender.isSelected
    
    if sender.isSelected {
        self.mapControl?.setDisplayRule(singleLocationDisplaySetting, for: singleLocation!)
        self.mapControl?.go(to: singleLocation!)
    } else {
        self.mapControl?.removeDisplayRule(for: singleLocation!)
    }
}
```
Define an objective-c method `toggleDisplaySettingsForType()` that will receive events from your `typeDisplayButton`, swap current selected state for button and toggle the display settings for the type.
```
@objc func toggleDisplaySettingsForType(sender:UIButton) {
    sender.isSelected = !sender.isSelected
    
    if sender.isSelected {
        self.mapControl?.setDisplayRule(typeDisplaySetting)
    } else {
        self.mapControl?.setDisplayRule(originalTypeDisplaySetting!)
    }
}


override func viewDidLoad() {
    
    super.viewDidLoad()
```
In your `viewDidLoad()` method, setup map so that it shows a random building and initialise mapControl
```
self.map = GMSMapView.init(frame: CGRect.zero)
self.mapControl = MPMapControl.init(map: self.map!)

let q = MPQuery()
q.query = "building"
let f = MPFilter()
f.take = 1
MPLocationService.sharedInstance().getLocationsUsing(q, filter: f) { (locations, error) in
    self.mapControl?.go(to: locations!.first!)
}
```
In your `viewDidLoad()` method, call `setupDisplaySettingButtons()` and `prepareData()` in order to setup the buttons and prepare the room data.
```
setupDisplaySettingButtons()
prepareData()
```
In your `viewDidLoad()` method, arrange the map view and the buttons in stackviews
```
let buttonStackView = UIStackView.init(arrangedSubviews: [typeDisplayButton, singleLocationDisplayButton, multipleLocationDisplayButton])
buttonStackView.axis = .horizontal
buttonStackView.distribution = .fillEqually
let stackView = UIStackView.init(arrangedSubviews: [map!, buttonStackView])
stackView.axis = .vertical
view = stackView
```
At this point you should be able to run this view controller in your own application. You should see a map with some colored buttons below the map. Tapping each button should enable/disable the custom display settings for either a single locations, multiple locations or all locations belonging to a specific type.

[See the sample in ChangeDisplaySettingController.swift](https://github.com/MapsIndoors/MapsIndoorsIOS/blob/master/Example/DemoSamples/Change Display Setting/ChangeDisplaySettingController.swift)
