---
layout: tutorial
title: Working with Events
parent: directions
nav_weight: 450
published: true
date: 2019-09-30
---

The MapControl delegate can inform you when the various data from the MapsIndoors services are loaded through it's `MPMapControlDelegate` so you should set the delegate, in most of the cases with the current UIViewController:

```swift
myMapControl.delegate = self
```

Implement the `onMapDataReady` method :

```swift
class ViewController: UIViewController, MPMapControlDelegate
```

Then implementing the methods below :

```swift
func onMapDataReady(){

}
```
