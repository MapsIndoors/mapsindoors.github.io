---
title: Getting Started
guide_title: getting-started
layout: guide
nav_weight: 100
published: true
date: 2019-09-30
permalink: /ios/v3/getting-started/
---

{% include toc.md %}

## Basic Examples

For simple examples of MapsIndoors implementations, run `pod try MapsIndoors` (follow the tutorials below for setting up CocoaPods, or just clone [this repository](https://github.com/MapsIndoors/MapsIndoorsIOS/tree/SDK_V3)) and run the XCode Scheme called *Demos*. The code for these samples are to find in the */Example/DemoSamples* folder.

You can follow the tutorials on this site to start your app from scratch or to enhance the basic examples.

## Set up your environment

### Setup CocoaPods

If you haven’t already, install CocoaPods:
[Getting Started with CocoaPods](https://guides.cocoapods.org/using/getting-started.html)

### Setup MapsIndoors

* If you don't have an Xcode project yet, create one now and save it to your local machine. (If you're new to iOS development, create a "Single View Application".)
* Create a file named `Podfile` in your project directory. This file defines your project's dependencies.
* Edit the `Podfile` and add your dependencies. Here is an example:

```swift
{% raw %}source 'https://github.com/CocoaPods/Specs.git'
target 'YOUR_APPLICATION_TARGET_NAME_HERE' do
pod 'MapsIndoors', '~>3.5'
end{% endraw %}
```

* Save the `Podfile`.
* Open a terminal and go to the directory containing the `Podfile`:
* `cd <path-to-project>`
* Run the `pod install` command. This will install the APIs specified in the `Podfile`, along with any dependencies they may have.
* Close Xcode, and then open (double-click) your project's *.xcworkspace* file to launch Xcode. From this time onwards, you must use the *.xcworkspace* file to open the project.
* Add your credentials to your `AppDelegate.swift`
  1. Add the following import statements:

    ```swift
    import GoogleMaps
    import MapsIndoors
    ```

  1. Add the following to your `application(_:didFinishLaunchingWithOptions:)` method:

    ```swift
    GMSServices.provideAPIKey(      "YOUR_GOOGLE_API_KEY")
    MapsIndoors.provideAPIKey(      "YOUR_MAPSINDOORS_API_KEY",
                googleAPIKey:       "YOUR_GOOGLE_API_KEY")
    ```

    Replace:

  * `YOUR_GOOGLE_API_KEY` with your Google API key
  * `YOUR_MAPSINDOORS_API_KEY` with your MapsIndoors API key. (In MapsIndoors iOS SDK v1, this key was known as your `Solution Id`)

## Get your Google Maps API keys

You need to setup the Google Maps API in your project by following the steps in the link below:

* iOS: [Google Maps SDK for iOS](https://developers.google.com/maps/documentation/ios-sdk/start).

Some Web Service APIs are needed also for the MapsIndoors SDK, so make sure to enable them when getting your key:

* [Google Maps Distance Matrix API](https://developers.google.com/maps/documentation/distance-matrix/start).
* [Google Maps Directions API](https://developers.google.com/maps/documentation/directions/start).
* [Google Places API Web Service](https://developers.google.com/places/web-service/intro)

Remember to enable relevant Maps products (i.e. SDK for iOS) in your Google project and include these on your API key if you apply restrictions.

## Get a Google Maps up and running

Use the `MPMapControl` class to set up a Google map with MapsPeople venues, buildings & locations. Place the following code in the `viewDidLoad` method in your view controller displaying the Google map.

```swift
// Place the map above the demo-building
let camera = GMSCameraPosition.camera(withLatitude: 57.08585, longitude: 9.95751, zoom: 17)
// Initialise the Google map
mapView = GMSMapView.map(withFrame: CGRect.zero, camera: camera)
view = mapView
let myMapControl = MPMapControl.init(map: mapView)!
```

## Set the MapsIndoors API Key

In order to include MapsIndoors in your app, you need an API key. If you are not a customer you can use this API key `57e4e4992e74800ef8b69718` to follow the above guide.

In order to include MapsIndoors in your own app with your own content, you need to [contact MapsPeople](https://resources.mapspeople.com/contact-us) to get your building drawings processed and hosted by us.

You will receive a unique API key to use when access has been granted. If you are exploring how this service can become part of your own product, you can read about [partnering with MapsPeople here](https://www.mapspeople.com/become-a-partner).
