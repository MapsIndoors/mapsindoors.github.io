---
layout: start
title: MapsIndoors iOS SDK v2
permalink: /ios/v2/
date: 2019-09-30
published: true
nav_weight: 1
---

> A [newer version]({{ site.url }}/ios/v3) of the MapsIndoors SDK for iOS is available. The legacy version will not receive new features and will only get critical bugfix and security updates.
{: .mi-warning}

This guide explains how to start using a MapsIndoors map in your iOS application using the MapsIndoors iOS SDK v2.

To benefit from the guides, you will need basic knowledge about:

* iOS Development
* Google Maps iOS SDK

You can get started in two ways, either by reviewing and modifying the [basic examples](#basic-examples) or do the [clean setup](#setup-cocoapods).

## Basic Examples

For simple examples of MapsIndoors implementations, run `pod try MapsIndoors` (see below for setting up CocoaPods or just clone [this repository](https://github.com/MapsIndoors/MapsIndoorsIOS/tree/SDK_V2)) and run the XCode Scheme called *Demos*. The code for these samples are to find in the */Example/DemoSamples* folder.

You can also follow the steps below to start your app from scratch or to enhance the basic examples, more features will be explained in the [guides](/ios/v2/guides).

## Setup CocoaPods

If you haven’t already, install CocoaPods:
[Getting Started with CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

## Setup MapsIndoors

* If you don't have an Xcode project yet, create one now and save it to your local machine. (If you're new to iOS development, create a Single View Application.)
* Create a file named Podfile in your project directory. This file defines your project's dependencies.
* Edit the Podfile and add your dependencies. Here is an example:

```swift
source 'https://github.com/CocoaPods/Specs.git'
target 'YOUR_APPLICATION_TARGET_NAME_HERE' do
  pod 'MapsIndoors' '{% raw %}{{%product-version%}}{% endraw %}'
end
```

* Save the Podfile.
* Open a terminal and go to the directory containing the Podfile:
* `cd <path-to-project>`
* Run the `pod install` command. This will install the APIs specified in the Podfile, along with any dependencies they may have.
* Close Xcode, and then open (double-click) your project's *.xcworkspace* file to launch Xcode. From this time onwards, you must use the *.xcworkspace* file to open the project.

Add your credentials to your `AppDelegate.swift` as follows:

Add the following import statements:

```swift
import GoogleMaps
import MapsIndoors
```

Add the following to your `application(_:didFinishLaunchingWithOptions:)` method:

```swift
GMSServices.provideAPIKey(      "YOUR_GOOGLE_API_KEY")
MapsIndoors.provideAPIKey(      "YOUR_MAPSINDOORS_API_KEY",
            googleAPIKey:       "YOUR_GOOGLE_API_KEY")
```

Replace:

* `YOUR_GOOGLE_API_KEY` with your Google API key
* `YOUR_MAPSINDOORS_API_KEY` with your MapsIndoors API key. (In version 1, this key was known as your Solution Id)

## Setup a Google Map with MapsIndoors

Use the `MPMapControl` class to set up a Google map with MapsPeople venues, buildings & locations. Place the following code in the `viewDidLoad` method in your view controller displaying the Google map.

```swift
// Place the map above the demo-building
let camera = GMSCameraPosition.camera(withLatitude: 57.08585, longitude: 9.95751, zoom: 17)
// Initialise the Google map
mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
view = mapView
let myMapControl = MPMapControl.init(map: mapView)!
```

Head to the [guides](/ios/v2/guides) to learn about searching, getting directions, display settings and more.

## Download and Bundle Offline Content

If needed, it is possible to bundle MapsIndoors content to make your app work better in offline or poor network conditions. (Please note that while MapsIndoors content can be used offline, Google Maps does not provide offline features. Outdoor wayfinding, Google Places searches will be unavailable and the surrounding map may be unavailable unless it has been cached.)

In your app targets build phases, add a "Run Script" build phase containing the following command:

```bash
{SRCROOT}/Pods/MapsIndoors/Scripts/derive_ressources.sh --api-key=YOUR_MAPSINDOORS_API_KEY --language=en
```

Replace:

* `YOUR_MAPSINDOORS_API_KEY` with your MapsIndoors API key.
* `en` with any one of the languages that your MapsIndoors solution supports (Two letter ISO-639-1 language code). If you only have one language deployed you may remove this input parameter entirely

Depending on the overall size of your MapsIndoors deployment, this may take some time, so during development you might want to check the "Run script only when installing" option. This means that content will only be bundled when archiving for e.g. a release.

## Work with MapsIndoors SDK behind a Firewall

If you need to work with MapsIndoors SDK behind a firewall, you might need to [white-list some IP-adresses](../../ip-whitelisting).
